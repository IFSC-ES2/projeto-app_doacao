package es2.appDoacao;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.model.Produto;
import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.EntidadeRepository;
import es2.appDoacao.repository.ProdutoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class DistribuicaoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DistribuicaoRepository distribuicaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private EntidadeRepository entidadeRepository;

    @BeforeEach
    void limparBanco() {
        distribuicaoRepository.deleteAll();
        produtoRepository.deleteAll();
        entidadeRepository.deleteAll();
    }

    @Test
    void deveRegistrarDistribuicaoComSucesso() throws Exception {
        Produto produto = new Produto();
        produto.setNome("Arroz");
        produto.setUnidade("kg");
        produto.setQuantidadeEstoque(10);
        produto = produtoRepository.save(produto);

        Entidade entidade = new Entidade();
        entidade.setNome("ONG Vida");
        entidade.setCnpj("12345678000199");
        entidade.setEndereco("Rua Central, 100");
        entidade.setTelefone("48999999999");
        entidade.setEmail("ongvida@email.com");
        entidade = entidadeRepository.save(entidade);

        String json = String.format("""
                {
                    "produto": {"id": %d},
                    "entidade": {"id": %d},
                    "quantidade": 3,
                    "dataDistribuicao": "2026-05-23"
                }
                """, produto.getId(), entidade.getId());

        mockMvc.perform(post("/distribuicoes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.mensagem").value("Distribuição registrada com sucesso"));
    }

    @Test
    void deveListarDistribuicoes() throws Exception {
        Produto produto = new Produto();
        produto.setNome("Feijão");
        produto.setUnidade("kg");
        produto.setQuantidadeEstoque(20);
        produto = produtoRepository.save(produto);

        Entidade entidade = new Entidade();
        entidade.setNome("ONG Esperança");
        entidade.setCnpj("98765432000100");
        entidade.setEndereco("Rua B, 200");
        entidade.setTelefone("48988888888");
        entidade.setEmail("esperanca@email.com");
        entidade = entidadeRepository.save(entidade);

        String json = String.format("""
                {
                    "produto": {"id": %d},
                    "entidade": {"id": %d},
                    "quantidade": 2,
                    "dataDistribuicao": "2026-05-23"
                }
                """, produto.getId(), entidade.getId());

        mockMvc.perform(post("/distribuicoes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json));

        mockMvc.perform(get("/distribuicoes"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }
}