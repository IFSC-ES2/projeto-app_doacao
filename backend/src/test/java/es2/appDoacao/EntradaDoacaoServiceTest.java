package es2.appDoacao;

import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.repository.EntradaDoacaoRepository;
import es2.appDoacao.service.EntradaDoacaoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class EntradaDoacaoServiceTest {

    @Test
    void deveRegistrarDoacaoComSucesso() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();

        boolean resultado = service.registrar(entrada);

        assertTrue(resultado);
        Mockito.verify(repo).save(entrada);
    }

    @Test
    void devePreencherDataAtualQuandoDataForNula() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setDataEntrada(null);

        boolean resultado = service.registrar(entrada);

        assertTrue(resultado);
        assertEquals(LocalDate.now(), entrada.getDataEntrada());
        Mockito.verify(repo).save(entrada);
    }

    @Test
    void naoDeveRegistrarDoacaoComProdutoNulo() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setProduto(null);

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComProdutoVazio() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setProduto("");

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComQuantidadeNula() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setQuantidade(null);

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComQuantidadeZero() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setQuantidade(0);

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComQuantidadeNegativa() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setQuantidade(-5);

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComDoadorNulo() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setDoador(null);

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComDoadorVazio() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setDoador("");

        boolean resultado = service.registrar(entrada);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void deveRegistrarDoacaoComObservacaoNula() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setObservacao(null);

        boolean resultado = service.registrar(entrada);

        assertTrue(resultado);
        Mockito.verify(repo).save(entrada);
    }

    @Test
    void deveListarTodasDoacoes() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        Mockito.when(repo.findAll()).thenReturn(List.of(criarEntradaValida()));

        List<EntradaDoacao> resultado = service.listarTodas();

        assertEquals(1, resultado.size());
        Mockito.verify(repo).findAll();
    }

    @Test
    void deveBuscarDoacaoPorId() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        EntradaDoacao entrada = criarEntradaValida();
        entrada.setId(1L);

        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(entrada));

        Optional<EntradaDoacao> resultado = service.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("Arroz", resultado.get().getProduto());
    }

    @Test
    void deveDeletarDoacaoPorId() {
        EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
        EntradaDoacaoService service = new EntradaDoacaoService(repo);

        service.deletar(1L);

        Mockito.verify(repo).deleteById(1L);
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
void deveRegistrarDoacaoComQuantidadeUm() {
    EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
    EntradaDoacaoService service = new EntradaDoacaoService(repo);

    EntradaDoacao entrada = criarEntradaValida();
    entrada.setQuantidade(1);

    boolean resultado = service.registrar(entrada);

    assertTrue(resultado);
    Mockito.verify(repo).save(entrada);
}

@Test
void deveRegistrarDoacaoComQuantidadeAlta() {
    EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
    EntradaDoacaoService service = new EntradaDoacaoService(repo);

    EntradaDoacao entrada = criarEntradaValida();
    entrada.setQuantidade(1000);

    boolean resultado = service.registrar(entrada);

    assertTrue(resultado);
    Mockito.verify(repo).save(entrada);
}

@Test
void deveRetornarListaVaziaQuandoNaoHouverDoacoes() {
    EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
    EntradaDoacaoService service = new EntradaDoacaoService(repo);

    Mockito.when(repo.findAll()).thenReturn(List.of());

    List<EntradaDoacao> resultado = service.listarTodas();

    assertTrue(resultado.isEmpty());
    Mockito.verify(repo).findAll();
}

@Test
void deveRetornarVazioAoBuscarDoacaoInexistente() {
    EntradaDoacaoRepository repo = Mockito.mock(EntradaDoacaoRepository.class);
    EntradaDoacaoService service = new EntradaDoacaoService(repo);

    Mockito.when(repo.findById(99L)).thenReturn(Optional.empty());

    Optional<EntradaDoacao> resultado = service.buscarPorId(99L);

    assertTrue(resultado.isEmpty());
    Mockito.verify(repo).findById(99L);
}
}