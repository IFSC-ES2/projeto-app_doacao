package es2.appDoacao.repository;

import es2.appDoacao.model.Entidade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EntidadeRepository extends JpaRepository<Entidade, Long> {

    Optional<Entidade> findByCnpj(String cnpj);

    Optional<Entidade> findByEmail(String email);

}