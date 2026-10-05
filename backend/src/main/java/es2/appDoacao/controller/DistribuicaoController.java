package es2.appDoacao.controller;

import es2.appDoacao.model.Distribuicao;
import es2.appDoacao.security.CurrentUserService;
import es2.appDoacao.service.DistribuicaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
public class DistribuicaoController {

    private final DistribuicaoService distribuicaoService;
    private final CurrentUserService currentUserService;

    public DistribuicaoController(DistribuicaoService distribuicaoService, CurrentUserService currentUserService) {
        this.distribuicaoService = distribuicaoService;
        this.currentUserService = currentUserService;
    }

    @GetMapping("/distribuicoes")
    public ResponseEntity<?> listar() {
        List<Distribuicao> distribuicoes = distribuicaoService.listarTodas(currentUserService.requireUser());
        return ResponseEntity.ok(distribuicoes);
    }

    @PostMapping("/distribuicoes")
    public ResponseEntity<?> registrar(@RequestBody Distribuicao distribuicao) {
        var erro = distribuicaoService.registrar(distribuicao, currentUserService.requireUser());
        if (erro.isEmpty()) {
            return ResponseEntity.ok(Map.of("mensagem", "Distribuição registrada com sucesso"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", erro.get()));
        }
    }
}
