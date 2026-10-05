package es2.appDoacao.security;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.Base64;
import java.util.Map;

@Service
public class JwtService {

    private static final String ALGORITHM = "HmacSHA256";

    private final ObjectMapper objectMapper;
    private final String secret;
    private final long expirationMillis;

    public JwtService(
            ObjectMapper objectMapper,
            @Value("${app.jwt.secret}") String secret,
            @Value("${app.jwt.expiration-ms:86400000}") long expirationMillis
    ) {
        if (secret == null || secret.length() < 32) {
            throw new IllegalArgumentException("app.jwt.secret deve ter pelo menos 32 caracteres");
        }
        this.objectMapper = objectMapper;
        this.secret = secret;
        this.expirationMillis = expirationMillis;
    }

    public String generateToken(String subject) {
        try {
            long issuedAt = Instant.now().toEpochMilli();
            long expiresAt = issuedAt + expirationMillis;

            String header = encodeJson(Map.of("alg", "HS256", "typ", "JWT"));
            String payload = encodeJson(Map.of(
                    "sub", subject,
                    "iat", issuedAt,
                    "exp", expiresAt
            ));
            String content = header + "." + payload;

            return content + "." + sign(content);
        } catch (Exception exception) {
            throw new IllegalStateException("Não foi possível gerar o token de acesso", exception);
        }
    }

    public String extractSubjectIfValid(String token) {
        try {
            String[] parts = token.split("\\.");
            if (parts.length != 3 || !isSignatureValid(parts[0] + "." + parts[1], parts[2])) {
                return null;
            }

            String payloadJson = new String(
                    Base64.getUrlDecoder().decode(parts[1]),
                    StandardCharsets.UTF_8
            );
            JsonNode payload = objectMapper.readTree(payloadJson);
            JsonNode subject = payload.get("sub");
            JsonNode expiration = payload.get("exp");

            if (subject == null || subject.asText().isBlank() || expiration == null) {
                return null;
            }

            if (expiration.asLong() <= Instant.now().toEpochMilli()) {
                return null;
            }

            return subject.asText();
        } catch (Exception exception) {
            return null;
        }
    }

    public long getExpirationSeconds() {
        return expirationMillis / 1000;
    }

    private String encodeJson(Object value) throws Exception {
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(objectMapper.writeValueAsBytes(value));
    }

    private String sign(String content) throws Exception {
        Mac mac = Mac.getInstance(ALGORITHM);
        mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), ALGORITHM));
        return Base64.getUrlEncoder()
                .withoutPadding()
                .encodeToString(mac.doFinal(content.getBytes(StandardCharsets.UTF_8)));
    }

    private boolean isSignatureValid(String content, String receivedSignature) throws Exception {
        return MessageDigest.isEqual(sign(content).getBytes(StandardCharsets.US_ASCII), receivedSignature.getBytes(StandardCharsets.US_ASCII));
    }
}
