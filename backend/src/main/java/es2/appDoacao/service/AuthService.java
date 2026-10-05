package es2.appDoacao.service;

import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;


    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public boolean autenticar(String loginOuEmail, String senha) {


        if (!senhaValida(senha)) return false;

        Optional<Usuario> usuario;


        if (loginOuEmail.contains("@")) {

            if (!emailValido(loginOuEmail)) return false;

            usuario = usuarioRepository.findByEmail(loginOuEmail);

        } else {
            usuario = usuarioRepository.findByLogin(loginOuEmail);
        }


        return usuario.isPresent() && passwordEncoder.matches(senha, usuario.get().getSenha());
    }

    public boolean registrar(String login, String email, String senha) {
        if (validarRegistro(login, email, senha) != null) return false;

        Usuario usuario = new Usuario();
        usuario.setLogin(login);
        usuario.setEmail(email);
        usuario.setSenha(passwordEncoder.encode(senha));
        usuarioRepository.save(usuario);
        return true;
    }

    public String validarRegistro(String login, String email, String senha) {
        if (login == null || login.isBlank() || email == null || email.isBlank() || senha == null || senha.isBlank()) {
            return "Preencha todos os campos obrigatórios.";
        }
        if (!emailValido(email)) {
            return "Informe um e-mail válido.";
        }
        if (!senhaValida(senha)) {
            return "A senha deve ter pelo menos 6 caracteres, com maiúscula, minúscula, número e símbolo.";
        }
        if (usuarioRepository.findByEmail(email).isPresent()) {
            return "Este e-mail já está cadastrado.";
        }
        if (usuarioRepository.findByLogin(login).isPresent()) {
            return "Este usuário já está cadastrado.";
        }
        return null;
    }

    private boolean emailValido(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }


    private boolean senhaValida(String senha) {
        if (senha == null || senha.length() < 6) return false;

        boolean temMaiuscula = senha.matches(".*[A-Z].*");
        boolean temMinuscula = senha.matches(".*[a-z].*");
        boolean temNumero = senha.matches(".*[0-9].*");
        boolean temEspecial = senha.matches(".*[^a-zA-Z0-9].*");

        return temMaiuscula && temMinuscula && temNumero && temEspecial;
    }
    
}
