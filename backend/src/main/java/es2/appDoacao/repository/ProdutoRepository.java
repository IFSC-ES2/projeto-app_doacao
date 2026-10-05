package es2.appDoacao.repository;

import es2.appDoacao.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    Optional<Produto> findByNome(String nome);
    List<Produto> findAllByUsuario_Id(Long usuarioId);
    Optional<Produto> findByIdAndUsuario_Id(Long id, Long usuarioId);
}
