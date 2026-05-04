package es2.appDoacao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

import es2.appDoacao.service.AuthService;


@RestController
@CrossOrigin(origins = "*")
public class AuthController {
    
@Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String senha = body.get("senha");

        if (authService.autenticar(email, senha)) {
            return ResponseEntity.ok().body(Map.of("mensagem", "Login bem-sucedido"));
        } else {
            return ResponseEntity.status(401).body(Map.of("mensagem", "Email ou senha inválidos"));
        }
    }

}
