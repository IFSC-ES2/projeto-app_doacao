package es2.appDoacao.repository;

import es2.appDoacao.model.Distribuicao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface DistribuicaoRepository extends JpaRepository<Distribuicao, Long> {
    
    List<Distribuicao> findByEntidadeId(Long entidadeId);
    List<Distribuicao> findByProdutoId(Long produtoId);

    @Query("SELECT COALESCE(SUM(d.quantidade), 0) FROM Distribuicao d WHERE d.produto.id = :produtoId")
    Integer sumQuantidadeByProdutoId(@Param("produtoId") Long produtoId);
}