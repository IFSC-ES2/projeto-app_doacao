package es2.appDoacao.service;

import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;


    public AuthService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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


        return usuario.isPresent() && usuario.get().getSenha().equals(senha);
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