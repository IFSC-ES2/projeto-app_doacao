package es2.appDoacao.controller;

import es2.appDoacao.model.Produto;
import es2.appDoacao.service.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/produtos")
    public ResponseEntity<?> listar() {
        List<Produto> produtos = produtoService.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    @PostMapping("/produtos")
    public ResponseEntity<?> criar(@RequestBody Produto produto) {
        var erro = produtoService.salvar(produto);
        if (erro.isEmpty()) {
            return ResponseEntity.ok(Map.of("mensagem", "Produto cadastrado com sucesso"));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("mensagem", erro.get()));
        }
    }

    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<?> excluir(@PathVariable Long id) {
        boolean removido = produtoService.deletar(id);
        if (removido) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.status(404)
                .body(Map.of("mensagem", "Produto não encontrado"));
    }

    @GetMapping("/estoque")
    public ResponseEntity<?> estoque() {
        return ResponseEntity.ok(produtoService.listarEstoque());
    }
}
