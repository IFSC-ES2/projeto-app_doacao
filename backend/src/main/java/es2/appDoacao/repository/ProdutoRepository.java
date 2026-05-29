package es2.appDoacao.repository;

import es2.appDoacao.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    
    Optional<Produto> findByNome(String nome);
}