package es2.appDoacao.controller;

import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.security.CurrentUserService;
import es2.appDoacao.service.EntradaDoacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class EntradaDoacaoController {

    private final EntradaDoacaoService entradaDoacaoService;
    private final CurrentUserService currentUserService;

    @Autowired
    public EntradaDoacaoController(EntradaDoacaoService entradaDoacaoService, CurrentUserService currentUserService) {
        this.entradaDoacaoService = entradaDoacaoService;
        this.currentUserService = currentUserService;
    }

    public EntradaDoacaoController(EntradaDoacaoService entradaDoacaoService) {
        this(entradaDoacaoService, null);
    }

    @GetMapping("/doacoes")
    public ResponseEntity<?> listar() {
        List<EntradaDoacao> doacoes = currentUserService == null
                ? entradaDoacaoService.listarTodas()
                : entradaDoacaoService.listarTodas(currentUserService.requireUser());
        return ResponseEntity.ok(doacoes);
    }

    @PostMapping("/doacoes")
    public ResponseEntity<?> registrar(@RequestBody EntradaDoacao entrada) {
        boolean sucesso = currentUserService == null
                ? entradaDoacaoService.registrar(entrada)
                : entradaDoacaoService.registrar(entrada, currentUserService.requireUser());
        if (sucesso) {
            return ResponseEntity.ok(Map.of("mensagem", "Doação registrada com sucesso"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", "Dados inválidos: produto, quantidade positiva e doador são obrigatórios"));
        }
    }
}
