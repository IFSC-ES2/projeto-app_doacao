package es2.appDoacao;

import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.repository.EntradaDoacaoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
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
    void deveRegistrarDoacaoComSucesso() throws Exception {
        String json = """
                {
                    "produto": "Arroz",
                    "quantidade": 10,
                    "dataEntrada": "2026-05-14",
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
    void deveRegistrarDoacaoMesmoSemData() throws Exception {
        String json = """
                {
                    "produto": "Feijão",
                    "quantidade": 5,
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
    void naoDeveRegistrarDoacaoComQuantidadeZero() throws Exception {
        String json = """
                {
                    "produto": "Arroz",
                    "quantidade": 0,
                    "dataEntrada": "2026-05-14",
                    "doador": "Mercado Central",
                    "observacao": "Quantidade inválida"
                }
                """;

        mockMvc.perform(post("/doacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
    }

    @Test
    void naoDeveRegistrarDoacaoComQuantidadeNegativa() throws Exception {
        String json = """
                {
                    "produto": "Arroz",
                    "quantidade": -5,
                    "dataEntrada": "2026-05-14",
                    "doador": "Mercado Central",
                    "observacao": "Quantidade inválida"
                }
                """;

        mockMvc.perform(post("/doacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
    }

    @Test
    void naoDeveRegistrarDoacaoComProdutoVazio() throws Exception {
        String json = """
                {
                    "produto": "",
                    "quantidade": 10,
                    "dataEntrada": "2026-05-14",
                    "doador": "Mercado Central",
                    "observacao": "Produto inválido"
                }
                """;

        mockMvc.perform(post("/doacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
    }

    @Test
    void naoDeveRegistrarDoacaoComDoadorVazio() throws Exception {
        String json = """
                {
                    "produto": "Arroz",
                    "quantidade": 10,
                    "dataEntrada": "2026-05-14",
                    "doador": "",
                    "observacao": "Doador inválido"
                }
                """;

        mockMvc.perform(post("/doacoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
    }

    @Test
    void deveListarDoacoes() throws Exception {
        entradaDoacaoRepository.save(criarEntradaValida());

        mockMvc.perform(get("/doacoes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThanOrEqualTo(1)))
                .andExpect(jsonPath("$[0].produto").value("Arroz"));
    }

    private EntradaDoacao criarEntradaValida() {
        EntradaDoacao entrada = new EntradaDoacao();
        entrada.setProduto("Arroz");
        entrada.setQuantidade(10);
        entrada.setDataEntrada(LocalDate.now());
        entrada.setDoador("Mercado Central");
        entrada.setObservacao("Pacotes de 1kg");
        return entrada;
    }
    @Test
void deveRetornarListaVaziaQuandoNaoHouverDoacoes() throws Exception {
    mockMvc.perform(get("/doacoes"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.length()").value(0));
}

@Test
void naoDeveRegistrarDoacaoSemProduto() throws Exception {
    String json = """
            {
                "quantidade": 10,
                "dataEntrada": "2026-05-14",
                "doador": "Mercado Central",
                "observacao": "Sem produto"
            }
            """;

    mockMvc.perform(post("/doacoes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
}

@Test
void naoDeveRegistrarDoacaoSemQuantidade() throws Exception {
    String json = """
            {
                "produto": "Arroz",
                "dataEntrada": "2026-05-14",
                "doador": "Mercado Central",
                "observacao": "Sem quantidade"
            }
            """;

    mockMvc.perform(post("/doacoes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
}

@Test
void naoDeveRegistrarDoacaoSemDoador() throws Exception {
    String json = """
            {
                "produto": "Arroz",
                "quantidade": 10,
                "dataEntrada": "2026-05-14",
                "observacao": "Sem doador"
            }
            """;

    mockMvc.perform(post("/doacoes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.mensagem").value("Dados inválidos ou campos obrigatórios inválidos"));
}

@Test
void deveRegistrarDoacaoSemObservacao() throws Exception {
    String json = """
            {
                "produto": "Arroz",
                "quantidade": 10,
                "dataEntrada": "2026-05-14",
                "doador": "Mercado Central"
            }
            """;

    mockMvc.perform(post("/doacoes")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(json))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.mensagem").value("Doação registrada com sucesso"));
}
}