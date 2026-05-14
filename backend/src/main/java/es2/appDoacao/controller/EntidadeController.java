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
        boolean criado = entidadeService.salvar(entidade);

        if (criado) {
            return ResponseEntity.ok(Map.of("mensagem", "Entidade cadastrada com sucesso"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", "Entidade já existente ou dados inválidos"));
        }
    }

}