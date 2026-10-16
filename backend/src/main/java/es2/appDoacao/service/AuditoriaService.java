package es2.appDoacao.service;

import es2.appDoacao.model.LogMovimentacao;
import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.LogMovimentacaoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AuditoriaService {
    private final LogMovimentacaoRepository repository;

    public AuditoriaService(LogMovimentacaoRepository repository) {
        this.repository = repository;
    }

    public void registrar(String tipo, String descricao, Long referenciaId, Usuario usuario) {
        if (usuario == null) return;
        LogMovimentacao log = new LogMovimentacao();
        log.setTipo(tipo);
        log.setDescricao(descricao);
        log.setReferenciaId(referenciaId);
        log.setUsuario(usuario);
        repository.save(log);
    }

    public List<LogMovimentacao> listar(Usuario usuario) {
        return repository.findTop200ByUsuario_IdOrderByDataHoraDesc(usuario.getId());
    }
}
