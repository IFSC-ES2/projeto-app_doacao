package es2.appDoacao;

import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.UsuarioRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.emptyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    void limparBanco() {
        usuarioRepository.deleteAll();
    }

    @Test
    void loginDeveRetornarTokenJwt() throws Exception {
        criarUsuario();

        mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"login":"teste","senha":"Senha123!"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", not(emptyString())))
                .andExpect(jsonPath("$.expiresIn").isNumber());
    }

    @Test
    void endpointProtegidoDeveRecusarRequisicaoSemToken() throws Exception {
        mockMvc.perform(get("/entidades"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void endpointProtegidoDeveAceitarTokenValido() throws Exception {
        criarUsuario();

        MvcResult login = mockMvc.perform(post("/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"login":"teste","senha":"Senha123!"}
                                """))
                .andExpect(status().isOk())
                .andReturn();

        String response = login.getResponse().getContentAsString();
        String token = response.replaceAll(".*\\\"token\\\":\\\"([^\\\"]+)\\\".*", "$1");

        mockMvc.perform(get("/entidades").header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    private void criarUsuario() {
        Usuario usuario = new Usuario();
        usuario.setLogin("teste");
        usuario.setEmail("teste@email.com");
        usuario.setSenha(new BCryptPasswordEncoder().encode("Senha123!"));
        usuarioRepository.save(usuario);
    }
}
