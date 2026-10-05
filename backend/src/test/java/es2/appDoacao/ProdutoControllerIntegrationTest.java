package es2.appDoacao;

import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.ProdutoRepository;
import es2.appDoacao.repository.UsuarioRepository;
import es2.appDoacao.model.Usuario;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser(username = "test-user")
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
class ProdutoControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private DistribuicaoRepository distribuicaoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @BeforeEach
    void limparBanco() {
        distribuicaoRepository.deleteAll();
        produtoRepository.deleteAll();
        usuarioRepository.deleteAll();
        criarUsuarioTeste();
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

    @Test
    void deveIsolarProdutosEntreContas() throws Exception {
        Usuario outraConta = new Usuario();
        outraConta.setLogin("outra-conta");
        outraConta.setEmail("outra-conta@email.com");
        outraConta.setSenha(new BCryptPasswordEncoder().encode("Senha123!"));
        usuarioRepository.save(outraConta);

        mockMvc.perform(post("/produtos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"nome":"Produto da primeira conta","unidade":"kg","quantidadeEstoque":1}
                                """))
                .andExpect(status().isOk());

        mockMvc.perform(get("/produtos").with(user("outra-conta")))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }

    private void criarUsuarioTeste() {
        Usuario usuario = new Usuario();
        usuario.setLogin("test-user");
        usuario.setEmail("test-user@email.com");
        usuario.setSenha(new BCryptPasswordEncoder().encode("Senha123!"));
        usuarioRepository.save(usuario);
    }
}
