package es2.appDoacao.repository;

import es2.appDoacao.model.EntradaDoacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface EntradaDoacaoRepository extends JpaRepository<EntradaDoacao, Long> {

    List<EntradaDoacao> findByDoador(String doador);

    List<EntradaDoacao> findByDataEntradaBetween(LocalDate inicio, LocalDate fim);

}