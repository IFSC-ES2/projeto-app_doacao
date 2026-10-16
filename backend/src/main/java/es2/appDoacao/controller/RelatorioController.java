package es2.appDoacao.controller;

import es2.appDoacao.model.Distribuicao;
import es2.appDoacao.security.CurrentUserService;
import es2.appDoacao.service.DistribuicaoService;
import es2.appDoacao.service.ProdutoService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;

@RestController
public class RelatorioController {
    private final ProdutoService produtoService;
    private final DistribuicaoService distribuicaoService;
    private final CurrentUserService currentUserService;

    public RelatorioController(ProdutoService produtoService,
                               DistribuicaoService distribuicaoService,
                               CurrentUserService currentUserService) {
        this.produtoService = produtoService;
        this.distribuicaoService = distribuicaoService;
        this.currentUserService = currentUserService;
    }

    @GetMapping(value = "/relatorios/estoque.csv", produces = "text/csv")
    public ResponseEntity<byte[]> estoque() {
        List<Map<String, Object>> itens = produtoService.listarEstoque(currentUserService.requireUser());
        StringBuilder csv = new StringBuilder("\uFEFFProduto;Unidade;Entradas;Distribuído;Saldo;Limite de alerta\n");
        for (Map<String, Object> item : itens) {
            csv.append(row(item.get("nome"), item.get("unidade"), item.get("totalEntradas"),
                    item.get("totalDistribuido"), item.get("saldoCalculado"), item.get("limiteEstoqueBaixo")));
        }
        return csvResponse("relatorio-estoque.csv", csv.toString());
    }

    @GetMapping(value = "/relatorios/distribuicoes.csv", produces = "text/csv")
    public ResponseEntity<byte[]> distribuicoes() {
        List<Distribuicao> itens = distribuicaoService.listarTodas(currentUserService.requireUser());
        StringBuilder csv = new StringBuilder("\uFEFFData;Produto;Quantidade;Unidade;Entidade;CNPJ;Observação\n");
        for (Distribuicao item : itens) {
            csv.append(row(item.getDataDistribuicao(), item.getProduto().getNome(), item.getQuantidade(),
                    item.getProduto().getUnidade(), item.getEntidade().getNome(), item.getEntidade().getCnpj(),
                    item.getObservacao()));
        }
        return csvResponse("relatorio-distribuicoes.csv", csv.toString());
    }

    private ResponseEntity<byte[]> csvResponse(String filename, String csv) {
        return ResponseEntity.ok()
                .contentType(new MediaType("text", "csv", StandardCharsets.UTF_8))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                .body(csv.getBytes(StandardCharsets.UTF_8));
    }

    private String row(Object... values) {
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < values.length; i++) {
            if (i > 0) result.append(';');
            String value = values[i] == null ? "" : values[i].toString();
            if (value.matches("^[\\s]*[=+@-].*")) value = "'" + value;
            result.append('"').append(value.replace("\"", "\"\"")).append('"');
        }
        return result.append('\n').toString();
    }
}
