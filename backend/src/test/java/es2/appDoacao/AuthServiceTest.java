package es2.appDoacao;

import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.UsuarioRepository;
import es2.appDoacao.service.AuthService;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class AuthServiceTest {


    @Test
    void deveRegistrarUsuarioComSucesso() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Mockito.when(repo.findByEmail("teste@email.com"))
                .thenReturn(Optional.empty());

        Mockito.when(repo.findByLogin("lucas"))
                .thenReturn(Optional.empty());

        AuthService service = new AuthService(repo);

        boolean resultado = service.registrar("lucas", "teste@email.com", "Senha123!");

        assertTrue(resultado);
    }

    @Test
    void deveSalvarSenhaEncodadaENaoTextoPlano() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);
        AuthService service = new AuthService(repo);

        String senhaPlana = "Senha123!";

        service.registrar("joao", "joao@email.com", senhaPlana);

        ArgumentCaptor<Usuario> captor = ArgumentCaptor.forClass(Usuario.class);
        Mockito.verify(repo).save(captor.capture());

        String senhaSalva = captor.getValue().getSenha();

        assertNotEquals(senhaPlana, senhaSalva);
        assertTrue(new BCryptPasswordEncoder().matches(senhaPlana, senhaSalva));
    }

    @Test
    void naoDeveRegistrarEmailDuplicado() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Usuario user = new Usuario();
        user.setEmail("teste@email.com");

        Mockito.when(repo.findByEmail("teste@email.com"))
                .thenReturn(Optional.of(user));

        AuthService service = new AuthService(repo);

        boolean resultado = service.registrar("lucas", "teste@email.com", "Senha123!");

        assertFalse(resultado);
    }

    @Test
    void naoDeveRegistrarLoginDuplicado() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Usuario user = new Usuario();
        user.setLogin("lucas");

        Mockito.when(repo.findByLogin("lucas"))
                .thenReturn(Optional.of(user));

        AuthService service = new AuthService(repo);

        boolean resultado = service.registrar("lucas", "outro@email.com", "Senha123!");

        assertFalse(resultado);
    }

    @Test
    void naoDeveRegistrarEmailInvalido() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        AuthService service = new AuthService(repo);

        boolean resultado = service.registrar("lucas", "emailerrado", "Senha123!");

        assertFalse(resultado);
    }

    @Test
    void naoDeveRegistrarSenhaFraca() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        AuthService service = new AuthService(repo);

        boolean resultado = service.registrar("lucas", "teste@email.com", "123");

        assertFalse(resultado);
    }


    @Test
    void loginComEmail() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Usuario user = new Usuario();
        user.setEmail("teste@email.com");
        user.setSenha(new BCryptPasswordEncoder().encode("Senha123!"));

        Mockito.when(repo.findByEmail("teste@email.com"))
                .thenReturn(Optional.of(user));

        AuthService service = new AuthService(repo);

        assertTrue(service.autenticar("teste@email.com", "Senha123!"));
    }

    @Test
    void loginComUsername() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Usuario user = new Usuario();
        user.setLogin("lucas");
        user.setSenha(new BCryptPasswordEncoder().encode("Senha123!"));

        Mockito.when(repo.findByLogin("lucas"))
                .thenReturn(Optional.of(user));

        AuthService service = new AuthService(repo);

        assertTrue(service.autenticar("lucas", "Senha123!"));
    }

    @Test
    void loginSenhaErrada() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Usuario user = new Usuario();
        user.setLogin("lucas");
        user.setSenha(new BCryptPasswordEncoder().encode("Senha123!"));

        Mockito.when(repo.findByLogin("lucas"))
                .thenReturn(Optional.of(user));

        AuthService service = new AuthService(repo);

        assertFalse(service.autenticar("lucas", "Errado123"));
    }

    @Test
    void loginUsuarioNaoExiste() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        Mockito.when(repo.findByLogin("lucas"))
                .thenReturn(Optional.empty());

        AuthService service = new AuthService(repo);

        assertFalse(service.autenticar("lucas", "Senha123!"));
    }

    @Test
    void loginEmailESenhaTrocados() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        AuthService service = new AuthService(repo);

        assertFalse(service.autenticar("Senha123!", "teste@email.com"));
    }

    @Test
    void naoDeveAceitarSenhaSemCaracterEspecial() {
        UsuarioRepository repo = Mockito.mock(UsuarioRepository.class);

        AuthService service = new AuthService(repo);

        boolean resultado = service.registrar("lucas", "teste@email.com", "Senha123");

        assertFalse(resultado);
    }
}