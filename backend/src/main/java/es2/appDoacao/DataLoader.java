package es2.appDoacao;

import es2.appDoacao.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("dev")
public class DataLoader implements CommandLineRunner {

    private final AuthService authService;

    public DataLoader(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void run(String... args) {
        authService.registrar("teste", "teste@example.com", "Senha123!");
        authService.registrar("admin", "admin@example.com", "Admin123!");
        authService.registrar("joao", "joao@example.com", "Joao1234!");
    }
}
