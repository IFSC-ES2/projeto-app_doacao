package es2.appDoacao;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.repository.EntidadeRepository;
import es2.appDoacao.service.EntidadeService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

class EntidadeServiceTest {

    @Test
    void deveSalvarEntidadeComSucesso() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();

        Mockito.when(repo.findByCnpj(entidade.getCnpj())).thenReturn(Optional.empty());
        Mockito.when(repo.findByEmail(entidade.getEmail())).thenReturn(Optional.empty());

        boolean resultado = service.salvar(entidade);

        assertTrue(resultado);
        Mockito.verify(repo).save(entidade);
    }

    @Test
    void naoDeveSalvarEntidadeComCnpjDuplicado() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();

        Mockito.when(repo.findByCnpj(entidade.getCnpj())).thenReturn(Optional.of(entidade));

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailDuplicado() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();

        Mockito.when(repo.findByCnpj(entidade.getCnpj())).thenReturn(Optional.empty());
        Mockito.when(repo.findByEmail(entidade.getEmail())).thenReturn(Optional.of(entidade));

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComNomeNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setNome(null);

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComNomeVazio() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setNome("");

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComCnpjNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setCnpj(null);

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComCnpjVazio() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setCnpj("");

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setEmail(null);

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailSemArroba() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setEmail("ongvidaemail.com");

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailSemPonto() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setEmail("ongvida@emailcom");

        boolean resultado = service.salvar(entidade);

        assertFalse(resultado);
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void deveListarTodasEntidades() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Mockito.when(repo.findAll()).thenReturn(List.of(criarEntidadeValida()));

        List<Entidade> resultado = service.listarTodas();

        assertEquals(1, resultado.size());
        Mockito.verify(repo).findAll();
    }

    @Test
    void deveBuscarEntidadePorId() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setId(1L);

        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(entidade));

        Optional<Entidade> resultado = service.buscarPorId(1L);

        assertTrue(resultado.isPresent());
        assertEquals("ONG Vida", resultado.get().getNome());
    }

    @Test
    void deveDeletarEntidadePorId() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        service.deletar(1L);

        Mockito.verify(repo).deleteById(1L);
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
void naoDeveSalvarEntidadeComNomeApenasEspacos() {
    EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
    EntidadeService service = new EntidadeService(repo);

    Entidade entidade = criarEntidadeValida();
    entidade.setNome("   ");

    boolean resultado = service.salvar(entidade);

    assertFalse(resultado);
    Mockito.verify(repo, Mockito.never()).save(Mockito.any());
}

@Test
void naoDeveSalvarEntidadeComCnpjApenasEspacos() {
    EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
    EntidadeService service = new EntidadeService(repo);

    Entidade entidade = criarEntidadeValida();
    entidade.setCnpj("   ");

    boolean resultado = service.salvar(entidade);

    assertFalse(resultado);
    Mockito.verify(repo, Mockito.never()).save(Mockito.any());
}

@Test
void naoDeveSalvarEntidadeComEmailApenasEspacos() {
    EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
    EntidadeService service = new EntidadeService(repo);

    Entidade entidade = criarEntidadeValida();
    entidade.setEmail("   ");

    boolean resultado = service.salvar(entidade);

    assertFalse(resultado);
    Mockito.verify(repo, Mockito.never()).save(Mockito.any());
}

@Test
void deveRetornarListaVaziaQuandoNaoHouverEntidades() {
    EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
    EntidadeService service = new EntidadeService(repo);

    Mockito.when(repo.findAll()).thenReturn(List.of());

    List<Entidade> resultado = service.listarTodas();

    assertTrue(resultado.isEmpty());
    Mockito.verify(repo).findAll();
}

@Test
void deveRetornarVazioAoBuscarIdInexistente() {
    EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
    EntidadeService service = new EntidadeService(repo);

    Mockito.when(repo.findById(99L)).thenReturn(Optional.empty());

    Optional<Entidade> resultado = service.buscarPorId(99L);

    assertTrue(resultado.isEmpty());
    Mockito.verify(repo).findById(99L);
}
}