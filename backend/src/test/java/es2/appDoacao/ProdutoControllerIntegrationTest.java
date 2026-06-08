package es2.appDoacao;

import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.ProdutoRepository;
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
class ProdutoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DistribuicaoRepository distribuicaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @BeforeEach
    void limparBanco() {
        distribuicaoRepository.deleteAll();
        produtoRepository.deleteAll();
    }

    @Test
    void deveCriarProdutoComSucesso() throws Exception {
        String json = """
                {
                    "nome": "Arroz",
                    "descricao": "Arroz branco",
                    "unidade": "kg",
                    "quantidadeEstoque": 10
                }
                """;

        mockMvc.perform(post("/produtos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensagem").value("Produto cadastrado com sucesso"));
    }

    @Test
    void deveRetornarEstoque() throws Exception {
        mockMvc.perform(get("/estoque"))
                .andExpect(status().isOk());
    }

    @Test
    void deveListarProdutos() throws Exception {
        String json = """
                {
                    "nome": "Feijão",
                    "unidade": "kg",
                    "quantidadeEstoque": 5
                }
                """;

        mockMvc.perform(post("/produtos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json));

        mockMvc.perform(get("/produtos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThanOrEqualTo(1)));
    }

    @Test
    void deveExcluirProduto() throws Exception {
        String json = """
                {
                    "nome": "Arroz",
                    "unidade": "kg",
                    "quantidadeEstoque": 10
                }
                """;

        mockMvc.perform(post("/produtos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json));

        Long id = produtoRepository.findAll().get(0).getId();

        mockMvc.perform(delete("/produtos/{id}", id))
                .andExpect(status().isNoContent());

        mockMvc.perform(get("/produtos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
}
