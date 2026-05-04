package es2.appDoacao.service;

import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;

    // Injeção por construtor (melhor prática)
    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public boolean autenticar(String loginOuEmail, String senha) {

        // valida senha
        if (!senhaValida(senha)) return false;

        Optional<Usuario> usuario;

        // verifica se é email ou login
        if (loginOuEmail.contains("@")) {

            if (!emailValido(loginOuEmail)) return false;

            usuario = usuarioRepository.findByEmail(loginOuEmail);

        } else {
            usuario = usuarioRepository.findByLogin(loginOuEmail);
        }

        // valida usuário e senha
        return usuario.isPresent() && usuario.get().getSenha().equals(senha);
    }

    // valida email
    private boolean emailValido(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

    // valida senha forte
    private boolean senhaValida(String senha) {
        if (senha == null || senha.length() < 6) return false;

        boolean temMaiuscula = senha.matches(".*[A-Z].*");
        boolean temMinuscula = senha.matches(".*[a-z].*");
        boolean temNumero = senha.matches(".*[0-9].*");

        return temMaiuscula && temMinuscula && temNumero;
    }
    public boolean registrar(String login, String email, String senha) {

        if (!emailValido(email) || !senhaValida(senha)) return false;

        if (usuarioRepository.findByEmail(email).isPresent()) return false;
        if (usuarioRepository.findByLogin(login).isPresent()) return false;

        Usuario usuario = new Usuario();
        usuario.setLogin(login);
        usuario.setEmail(email);
        usuario.setSenha(senha);

        usuarioRepository.save(usuario);

        return true;
    }
}