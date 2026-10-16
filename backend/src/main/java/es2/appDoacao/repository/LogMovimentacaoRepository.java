package es2.appDoacao.repository;

import es2.appDoacao.model.LogMovimentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LogMovimentacaoRepository extends JpaRepository<LogMovimentacao, Long> {
    List<LogMovimentacao> findTop200ByUsuario_IdOrderByDataHoraDesc(Long usuarioId);
}
