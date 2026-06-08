package es2.appDoacao.controller;

import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.service.EntradaDoacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class EntradaDoacaoController {

    private final EntradaDoacaoService entradaDoacaoService;

    public EntradaDoacaoController(EntradaDoacaoService entradaDoacaoService) {
        this.entradaDoacaoService = entradaDoacaoService;
    }

    @GetMapping("/doacoes")
    public ResponseEntity<?> listar() {
        List<EntradaDoacao> doacoes = entradaDoacaoService.listarTodas();
        return ResponseEntity.ok(doacoes);
    }

    @PostMapping("/doacoes")
    public ResponseEntity<?> registrar(@RequestBody EntradaDoacao entrada) {
        boolean sucesso = entradaDoacaoService.registrar(entrada);
        if (sucesso) {
            return ResponseEntity.ok(Map.of("mensagem", "Doação registrada com sucesso"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", "Dados inválidos: produto, quantidade positiva e doador são obrigatórios"));
        }
    }
}