package es2.appDoacao.controller;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.service.EntidadeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class EntidadeController {

    private final EntidadeService entidadeService;

    public EntidadeController(EntidadeService entidadeService) {
        this.entidadeService = entidadeService;
    }

    @GetMapping("/entidades")
    public ResponseEntity<?> listar() {
        List<Entidade> entidades = entidadeService.listarTodas();
        return ResponseEntity.ok(entidades);
    }

    @PostMapping("/entidades")
    public ResponseEntity<?> criar(@RequestBody Entidade entidade) {
        var erro = entidadeService.salvar(entidade);

        if (erro.isEmpty()) {
            return ResponseEntity.ok(Map.of("mensagem", "Entidade cadastrada com sucesso"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", erro.get()));
        }
    }

    @DeleteMapping("/entidades/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        boolean removida = entidadeService.deletar(id);
        if (removida) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.status(404)
                .body(Map.of("mensagem", "Entidade não encontrada"));
    }

}
