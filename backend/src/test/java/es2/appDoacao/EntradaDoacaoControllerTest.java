package es2.appDoacao;

import es2.appDoacao.controller.EntradaDoacaoController;
import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.service.EntradaDoacaoService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class EntradaDoacaoControllerTest {

    @Test
    void deveListarDoacoesComSucesso() {
        EntradaDoacaoService service = Mockito.mock(EntradaDoacaoService.class);
        EntradaDoacaoController controller = new EntradaDoacaoController(service);

        EntradaDoacao doacao = criarEntradaValida();
        Mockito.when(service.listarTodas()).thenReturn(List.of(doacao));

        var resposta = controller.listar();

        assertEquals(200, resposta.getStatusCode().value());
        assertNotNull(resposta.getBody());
        Mockito.verify(service).listarTodas();
    }

    @Test
    void deveRetornarListaVaziaQuandoNaoHouverDoacoes() {
        EntradaDoacaoService service = Mockito.mock(EntradaDoacaoService.class);
        EntradaDoacaoController controller = new EntradaDoacaoController(service);

        Mockito.when(service.listarTodas()).thenReturn(List.of());

        var resposta = controller.listar();

        assertEquals(200, resposta.getStatusCode().value());
        assertTrue(((List<?>) resposta.getBody()).isEmpty());
    }

    @Test
    void deveRegistrarDoacaoComSucesso() {
        EntradaDoacaoService service = Mockito.mock(EntradaDoacaoService.class);
        EntradaDoacaoController controller = new EntradaDoacaoController(service);

        Mockito.when(service.registrar(Mockito.any())).thenReturn(true);

        var resposta = controller.registrar(criarEntradaValida());

        assertEquals(200, resposta.getStatusCode().value());
        Mockito.verify(service).registrar(Mockito.any());
    }

    @Test
    void naoDeveRegistrarDoacaoComDadosInvalidos() {
        EntradaDoacaoService service = Mockito.mock(EntradaDoacaoService.class);
        EntradaDoacaoController controller = new EntradaDoacaoController(service);

        Mockito.when(service.registrar(Mockito.any())).thenReturn(false);

        var resposta = controller.registrar(criarEntradaValida());

        assertEquals(400, resposta.getStatusCode().value());
        Mockito.verify(service).registrar(Mockito.any());
    }

    @Test
    void deveConfirmarIntegracaoComService() {
        EntradaDoacaoService service = Mockito.mock(EntradaDoacaoService.class);
        EntradaDoacaoController controller = new EntradaDoacaoController(service);

        Mockito.when(service.registrar(Mockito.any())).thenReturn(true);

        controller.registrar(criarEntradaValida());

        Mockito.verify(service, Mockito.times(1)).registrar(Mockito.any());
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
}