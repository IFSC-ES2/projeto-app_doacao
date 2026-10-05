package es2.appDoacao.repository;

import es2.appDoacao.model.Entidade;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface EntidadeRepository extends JpaRepository<Entidade, Long> {

    Optional<Entidade> findByCnpj(String cnpj);

    Optional<Entidade> findByEmail(String email);

    List<Entidade> findAllByUsuario_Id(Long usuarioId);
    Optional<Entidade> findByIdAndUsuario_Id(Long id, Long usuarioId);
    Optional<Entidade> findByUsuario_IdAndCnpj(Long usuarioId, String cnpj);
    Optional<Entidade> findByUsuario_IdAndEmail(Long usuarioId, String email);

}
