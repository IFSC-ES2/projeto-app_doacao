package es2.appDoacao;

import es2.appDoacao.model.Distribuicao;
import es2.appDoacao.model.Entidade;
import es2.appDoacao.model.Produto;
import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.EntidadeRepository;
import es2.appDoacao.repository.ProdutoRepository;
import es2.appDoacao.service.DistribuicaoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class DistribuicaoServiceTest {

    @Test
    void deveRegistrarDistribuicaoComSucesso() {
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntidadeRepository entidadeRepo = Mockito.mock(EntidadeRepository.class);
        DistribuicaoService service = new DistribuicaoService(distribuicaoRepo, produtoRepo, entidadeRepo);

        Mockito.when(produtoRepo.existsById(1L)).thenReturn(true);
        Mockito.when(entidadeRepo.existsById(1L)).thenReturn(true);
        Mockito.when(produtoRepo.findById(1L)).thenReturn(Optional.of(criarDistribuicaoValida().getProduto()));
        Mockito.when(entidadeRepo.findById(1L)).thenReturn(Optional.of(criarDistribuicaoValida().getEntidade()));

        Distribuicao distribuicao = criarDistribuicaoValida();

        Optional<String> resultado = service.registrar(distribuicao);

        assertTrue(resultado.isEmpty());
        Mockito.verify(distribuicaoRepo).save(distribuicao);
    }

    @Test
    void naoDeveRegistrarComQuantidadeZeroOuNegativa() {
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntidadeRepository entidadeRepo = Mockito.mock(EntidadeRepository.class);
        DistribuicaoService service = new DistribuicaoService(distribuicaoRepo, produtoRepo, entidadeRepo);

        Mockito.when(produtoRepo.existsById(1L)).thenReturn(true);
        Mockito.when(entidadeRepo.existsById(1L)).thenReturn(true);

        Distribuicao distribuicao = criarDistribuicaoValida();
        distribuicao.setQuantidade(0);

        Optional<String> resultado = service.registrar(distribuicao);

        assertTrue(resultado.isPresent());
        assertEquals("Quantidade deve ser positiva", resultado.get());
        Mockito.verify(distribuicaoRepo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarComProdutoNaoEncontrado() {
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntidadeRepository entidadeRepo = Mockito.mock(EntidadeRepository.class);
        DistribuicaoService service = new DistribuicaoService(distribuicaoRepo, produtoRepo, entidadeRepo);

        Mockito.when(produtoRepo.existsById(1L)).thenReturn(false);

        Distribuicao distribuicao = criarDistribuicaoValida();

        Optional<String> resultado = service.registrar(distribuicao);

        assertTrue(resultado.isPresent());
        assertEquals("Produto não encontrado", resultado.get());
        Mockito.verify(distribuicaoRepo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarComEntidadeNaoEncontrada() {
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntidadeRepository entidadeRepo = Mockito.mock(EntidadeRepository.class);
        DistribuicaoService service = new DistribuicaoService(distribuicaoRepo, produtoRepo, entidadeRepo);

        Mockito.when(produtoRepo.existsById(1L)).thenReturn(true);
        Mockito.when(entidadeRepo.existsById(1L)).thenReturn(false);
        Mockito.when(produtoRepo.findById(1L)).thenReturn(Optional.of(criarDistribuicaoValida().getProduto()));

        Distribuicao distribuicao = criarDistribuicaoValida();

        Optional<String> resultado = service.registrar(distribuicao);

        assertTrue(resultado.isPresent());
        assertEquals("Entidade não encontrada", resultado.get());
        Mockito.verify(distribuicaoRepo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void devePreencherDataAutomaticamenteQuandoNula() {
        DistribuicaoRepository distribuicaoRepo = Mockito.mock(DistribuicaoRepository.class);
        ProdutoRepository produtoRepo = Mockito.mock(ProdutoRepository.class);
        EntidadeRepository entidadeRepo = Mockito.mock(EntidadeRepository.class);
        DistribuicaoService service = new DistribuicaoService(distribuicaoRepo, produtoRepo, entidadeRepo);

        Mockito.when(produtoRepo.existsById(1L)).thenReturn(true);
        Mockito.when(entidadeRepo.existsById(1L)).thenReturn(true);
        Mockito.when(produtoRepo.findById(1L)).thenReturn(Optional.of(criarDistribuicaoValida().getProduto()));
        Mockito.when(entidadeRepo.findById(1L)).thenReturn(Optional.of(criarDistribuicaoValida().getEntidade()));

        Distribuicao distribuicao = criarDistribuicaoValida();
        distribuicao.setDataDistribuicao(null);

        service.registrar(distribuicao);

        assertEquals(LocalDate.now(), distribuicao.getDataDistribuicao());
    }

    private Distribuicao criarDistribuicaoValida() {
        Produto produto = new Produto();
        produto.setId(1L);
        produto.setNome("Arroz");
        produto.setUnidade("kg");
        produto.setQuantidadeEstoque(10);

        Entidade entidade = new Entidade();
        entidade.setId(1L);
        entidade.setNome("ONG Vida");

        Distribuicao distribuicao = new Distribuicao();
        distribuicao.setProduto(produto);
        distribuicao.setEntidade(entidade);
        distribuicao.setQuantidade(5);
        return distribuicao;
    }
}
