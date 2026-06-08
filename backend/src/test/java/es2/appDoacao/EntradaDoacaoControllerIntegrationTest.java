package es2.appDoacao;

import es2.appDoacao.repository.EntradaDoacaoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EntradaDoacaoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private EntradaDoacaoRepository entradaDoacaoRepository;

    @BeforeEach
    void limparBanco() {
        entradaDoacaoRepository.deleteAll();
    }

    @Test
    void deveListarDoacoesComSucesso() throws Exception {
        mockMvc.perform(get("/doacoes"))
                .andExpect(status().isOk());
    }

    @Test
    void deveRetornarListaVaziaQuandoNaoHouverDoacoes() throws Exception {
        mockMvc.perform(get("/doacoes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    @Test
    void deveRegistrarDoacaoComSucesso() throws Exception {
        String json = """
                {
                    "produto": "Arroz",
                    "quantidade": 10,
                    "dataEntrada": "2026-06-08",
                    "doador": "Mercado Central",
                    "observacao": "Pacotes de 1kg"
                }
                """;

        mockMvc.perform(post("/doacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensagem").value("Doação registrada com sucesso"));
    }

    @Test
    void deveListarDoacaoAposRegistro() throws Exception {
        String json = """
                {
                    "produto": "Feijão",
                    "quantidade": 5,
                    "dataEntrada": "2026-06-08",
                    "doador": "Doador Teste"
                }
                """;

        mockMvc.perform(post("/doacoes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json));

        mockMvc.perform(get("/doacoes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThanOrEqualTo(1)));
    }

    @Test
    void naoDeveRegistrarDoacaoSemDadosObrigatorios() throws Exception {
        String json = """
                {
                    "observacao": "sem produto nem doador"
                }
                """;

        mockMvc.perform(post("/doacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest());
    }
}
