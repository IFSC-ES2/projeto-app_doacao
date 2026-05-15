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

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isEmpty());
        Mockito.verify(repo).save(entidade);
    }

    @Test
    void naoDeveSalvarEntidadeComCnpjDuplicado() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();

        Mockito.when(repo.findByCnpj(entidade.getCnpj())).thenReturn(Optional.of(entidade));

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("CNPJ já cadastrado", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailDuplicado() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();

        Mockito.when(repo.findByCnpj(entidade.getCnpj())).thenReturn(Optional.empty());
        Mockito.when(repo.findByEmail(entidade.getEmail())).thenReturn(Optional.of(entidade));

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Email já cadastrado", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComNomeNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setNome(null);

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Nome é obrigatório", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComNomeVazio() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setNome("");

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Nome é obrigatório", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComCnpjNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setCnpj(null);

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("CNPJ inválido. Use 14 dígitos ou o formato 00.000.000/0000-00", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComCnpjVazio() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setCnpj("");

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("CNPJ inválido. Use 14 dígitos ou o formato 00.000.000/0000-00", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setEmail(null);

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Email inválido", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailSemArroba() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setEmail("ongvidaemail.com");

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Email inválido", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComEmailSemPonto() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setEmail("ongvida@emailcom");

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Email inválido", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComTelefoneNulo() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setTelefone(null);

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Telefone inválido. Use DDD com 10 ou 11 dígitos (ex: 11999998888 ou (48) 99999-8888)", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void naoDeveSalvarEntidadeComTelefoneInvalido() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setTelefone("123");

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isPresent());
        assertEquals("Telefone inválido. Use DDD com 10 ou 11 dígitos (ex: 11999998888 ou (48) 99999-8888)", resultado.get());
        Mockito.verify(repo, Mockito.never()).save(Mockito.any());
    }

    @Test
    void deveSalvarEntidadeComTelefoneFormatado() {
        EntidadeRepository repo = Mockito.mock(EntidadeRepository.class);
        EntidadeService service = new EntidadeService(repo);

        Entidade entidade = criarEntidadeValida();
        entidade.setTelefone("(48) 99999-9999");

        Mockito.when(repo.findByCnpj(entidade.getCnpj())).thenReturn(Optional.empty());
        Mockito.when(repo.findByEmail(entidade.getEmail())).thenReturn(Optional.empty());

        Optional<String> resultado = service.salvar(entidade);

        assertTrue(resultado.isEmpty());
        Mockito.verify(repo).save(entidade);
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