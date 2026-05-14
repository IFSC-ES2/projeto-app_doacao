package es2.appDoacao;

import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.repository.EntradaDoacaoRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EntradaDoacaoRepositoryTest {

    @Autowired
    private EntradaDoacaoRepository repository;

    @Test
    void deveBuscarDoacoesPorDoador() {
        repository.save(criarEntrada("Arroz", 10, "Mercado Central", LocalDate.of(2026, 5, 10)));
        repository.save(criarEntrada("Feijão", 5, "Mercado Central", LocalDate.of(2026, 5, 11)));
        repository.save(criarEntrada("Leite", 3, "Outro Doador", LocalDate.of(2026, 5, 12)));

        List<EntradaDoacao> resultado = repository.findByDoador("Mercado Central");

        assertEquals(2, resultado.size());
    }

    @Test
    void deveRetornarListaVaziaQuandoDoadorNaoExistir() {
        repository.save(criarEntrada("Arroz", 10, "Mercado Central", LocalDate.of(2026, 5, 10)));

        List<EntradaDoacao> resultado = repository.findByDoador("Doador Inexistente");

        assertTrue(resultado.isEmpty());
    }

    @Test
    void deveBuscarDoacoesPorPeriodo() {
        repository.save(criarEntrada("Arroz", 10, "Mercado A", LocalDate.of(2026, 5, 10)));
        repository.save(criarEntrada("Feijão", 5, "Mercado B", LocalDate.of(2026, 5, 12)));
        repository.save(criarEntrada("Leite", 3, "Mercado C", LocalDate.of(2026, 6, 1)));

        List<EntradaDoacao> resultado = repository.findByDataEntradaBetween(
                LocalDate.of(2026, 5, 1),
                LocalDate.of(2026, 5, 31)
        );

        assertEquals(2, resultado.size());
    }

    private EntradaDoacao criarEntrada(String produto, Integer quantidade, String doador, LocalDate data) {
        EntradaDoacao entrada = new EntradaDoacao();
        entrada.setProduto(produto);
        entrada.setQuantidade(quantidade);
        entrada.setDoador(doador);
        entrada.setDataEntrada(data);
        entrada.setObservacao("Teste");
        return entrada;
    }
}