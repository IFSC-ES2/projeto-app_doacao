package es2.appDoacao;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.repository.EntidadeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EntidadeControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EntidadeRepository entidadeRepository;

    @BeforeEach
    void limparBanco() {
        entidadeRepository.deleteAll();
    }

    @Test
    void deveCriarEntidadeComSucesso() throws Exception {
        String json = """
                {
                    "nome": "ONG Vida",
                    "cnpj": "12345678000199",
                    "endereco": "Rua Central, 100",
                    "telefone": "48999999999",
                    "email": "ongvida@email.com"
                }
                """;

        mockMvc.perform(post("/entidades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensagem").value("Entidade cadastrada com sucesso"));
    }

    @Test
    void naoDeveCriarEntidadeComCnpjDuplicado() throws Exception {
        entidadeRepository.save(criarEntidadeValida());

        String json = """
                {
                    "nome": "ONG Nova",
                    "cnpj": "12345678000199",
                    "endereco": "Rua B, 200",
                    "telefone": "48988888888",
                    "email": "nova@email.com"
                }
                """;

        mockMvc.perform(post("/entidades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Entidade já existente ou dados inválidos"));
    }

    @Test
    void naoDeveCriarEntidadeComEmailDuplicado() throws Exception {
        entidadeRepository.save(criarEntidadeValida());

        String json = """
                {
                    "nome": "ONG Nova",
                    "cnpj": "99999999000199",
                    "endereco": "Rua B, 200",
                    "telefone": "48988888888",
                    "email": "ongvida@email.com"
                }
                """;

        mockMvc.perform(post("/entidades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Entidade já existente ou dados inválidos"));
    }

    @Test
    void naoDeveCriarEntidadeComEmailInvalido() throws Exception {
        String json = """
                {
                    "nome": "ONG Vida",
                    "cnpj": "12345678000199",
                    "endereco": "Rua Central, 100",
                    "telefone": "48999999999",
                    "email": "emailinvalido"
                }
                """;

        mockMvc.perform(post("/entidades")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Entidade já existente ou dados inválidos"));
    }

    @Test
    void deveListarEntidades() throws Exception {
        entidadeRepository.save(criarEntidadeValida());

        mockMvc.perform(get("/entidades"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$[0].nome").value("ONG Vida"));
    }

    private Entidade criarEntidadeValida() {
        Entidade entidade = new Entidade();
        entidade.setNome("ONG Vida");
        entidade.setCnpj("12345678000199");
        entidade.setEndereco("Rua Central, 100");
        entidade.setTelefone("48999999999");
        entidade.setEmail("ongvida@email.com");
        return entidade;
    }
    @Test
void deveRetornarListaVaziaQuandoNaoHouverEntidades() throws Exception {
    mockMvc.perform(get("/entidades"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(0));
}

@Test
void naoDeveCriarEntidadeComNomeVazio() throws Exception {
    String json = """
            {
                "nome": "",
                "cnpj": "12345678000199",
                "endereco": "Rua Central, 100",
                "telefone": "48999999999",
                "email": "ongvida@email.com"
            }
            """;

    mockMvc.perform(post("/entidades")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.mensagem").value("Entidade já existente ou dados inválidos"));
}

@Test
void naoDeveCriarEntidadeComCnpjVazio() throws Exception {
    String json = """
            {
                "nome": "ONG Vida",
                "cnpj": "",
                "endereco": "Rua Central, 100",
                "telefone": "48999999999",
                "email": "ongvida@email.com"
            }
            """;

    mockMvc.perform(post("/entidades")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.mensagem").value("Entidade já existente ou dados inválidos"));
}

@Test
void naoDeveCriarEntidadeComEmailSemPonto() throws Exception {
    String json = """
            {
                "nome": "ONG Vida",
                "cnpj": "12345678000199",
                "endereco": "Rua Central, 100",
                "telefone": "48999999999",
                "email": "ongvida@emailcom"
            }
            """;

    mockMvc.perform(post("/entidades")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.mensagem").value("Entidade já existente ou dados inválidos"));
}
}