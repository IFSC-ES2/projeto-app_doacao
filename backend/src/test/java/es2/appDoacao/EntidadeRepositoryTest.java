package es2.appDoacao;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.repository.EntidadeRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EntidadeRepositoryTest {

    @Autowired
    private EntidadeRepository repository;

    @Test
    void deveBuscarEntidadePorCnpj() {
        Entidade entidade = criarEntidade();
        repository.save(entidade);

        Optional<Entidade> resultado = repository.findByCnpj("12345678000199");

        assertTrue(resultado.isPresent());
        assertEquals("ONG Vida", resultado.get().getNome());
    }

    @Test
    void deveBuscarEntidadePorEmail() {
        Entidade entidade = criarEntidade();
        repository.save(entidade);

        Optional<Entidade> resultado = repository.findByEmail("ongvida@email.com");

        assertTrue(resultado.isPresent());
        assertEquals("12345678000199", resultado.get().getCnpj());
    }

    @Test
    void deveRetornarVazioQuandoCnpjNaoExistir() {
        Optional<Entidade> resultado = repository.findByCnpj("00000000000000");

        assertTrue(resultado.isEmpty());
    }

    @Test
    void deveRetornarVazioQuandoEmailNaoExistir() {
        Optional<Entidade> resultado = repository.findByEmail("naoexiste@email.com");

        assertTrue(resultado.isEmpty());
    }

    private Entidade criarEntidade() {
        Entidade entidade = new Entidade();
        entidade.setNome("ONG Vida");
        entidade.setCnpj("12345678000199");
        entidade.setEndereco("Rua Central, 100");
        entidade.setTelefone("48999999999");
        entidade.setEmail("ongvida@email.com");
        return entidade;
    }
}