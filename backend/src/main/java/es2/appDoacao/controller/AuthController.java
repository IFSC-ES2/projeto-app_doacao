package es2.appDoacao.controller;

import es2.appDoacao.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    // injeção por construtor (melhor que @Autowired)
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {

        // agora aceita login OU email
        String loginOuEmail = body.get("login"); // pode ser login ou email
        String senha = body.get("senha");

        if (loginOuEmail == null || senha == null) {
            return ResponseEntity
                    .badRequest()
                    .body(Map.of("mensagem", "Login/email e senha são obrigatórios"));
        }

        boolean autenticado = authService.autenticar(loginOuEmail, senha);

        if (autenticado) {
            return ResponseEntity.ok(Map.of("mensagem", "Login bem-sucedido"));
        } else {
            return ResponseEntity
                    .status(401)
                    .body(Map.of("mensagem", "Login/email ou senha inválidos"));
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {

        String login = body.get("login");
        String email = body.get("email");
        String senha = body.get("senha");

        if (login == null || email == null || senha == null) {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", "Campos obrigatórios"));
        }

        boolean criado = authService.registrar(login, email, senha);

        if (criado) {
            return ResponseEntity.ok(Map.of("mensagem", "Usuário criado"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", "Login ou email já existe ou dados inválidos"));
        }
    }
}