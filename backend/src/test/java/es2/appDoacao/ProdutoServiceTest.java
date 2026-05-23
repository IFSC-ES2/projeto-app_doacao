package es2.appDoacao;

import es2.appDoacao.model.Produto;
import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.EntradaDoacaoRepository;
import es2.appDoacao.repository.ProdutoRepository;
import es2.appDoacao.service.ProdutoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class ProdutoServiceTest {

    @Test
    void deveSalvarProdutoComSucesso() {
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntradaDoacaoRepository entradaRepo = Mockito.mock(EntradaDoacaoRepository.class);
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoService service = new ProdutoService(produtoRepo, entradaRepo, distribuicaoRepo);

        Produto produto = criarProdutoValido();

        Optional<String> resultado = service.salvar(produto);

        assertTrue(resultado.isEmpty());
        Mockito.verify(produtoRepo).save(produto);
    }

    @Test
    void naoDeveSalvarProdutoComNomeVazio() {
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntradaDoacaoRepository entradaRepo = Mockito.mock(EntradaDoacaoRepository.class);
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoService service = new ProdutoService(produtoRepo, entradaRepo, distribuicaoRepo);

        Produto produto = criarProdutoValido();
        produto.setNome("");

        Optional<String> resultado = service.salvar(produto);

        assertTrue(resultado.isPresent());
        assertEquals("Nome é obrigatório", resultado.get());
        Mockito.verify(produtoRepo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarProdutoComUnidadeVazia() {
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntradaDoacaoRepository entradaRepo = Mockito.mock(EntradaDoacaoRepository.class);
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoService service = new ProdutoService(produtoRepo, entradaRepo, distribuicaoRepo);

        Produto produto = criarProdutoValido();
        produto.setUnidade("");

        Optional<String> resultado = service.salvar(produto);

        assertTrue(resultado.isPresent());
        assertEquals("Unidade é obrigatória", resultado.get());
        Mockito.verify(produtoRepo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarProdutoComQuantidadeNegativa() {
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntradaDoacaoRepository entradaRepo = Mockito.mock(EntradaDoacaoRepository.class);
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoService service = new ProdutoService(produtoRepo, entradaRepo, distribuicaoRepo);

        Produto produto = criarProdutoValido();
        produto.setQuantidadeEstoque(-1);

        Optional<String> resultado = service.salvar(produto);

        assertTrue(resultado.isPresent());
        assertEquals("Quantidade em estoque deve ser zero ou positiva", resultado.get());
        Mockito.verify(produtoRepo, Mockito.never()).save(Mockito.any());
    }

    private Produto criarProdutoValido() {
        Produto produto = new Produto();
        produto.setNome("Arroz");
        produto.setUnidade("kg");
        produto.setQuantidadeEstoque(10);
        return produto;
    }
}
