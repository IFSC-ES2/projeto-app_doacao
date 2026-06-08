package es2.appDoacao.service;

import es2.appDoacao.model.Produto;
import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.EntradaDoacaoRepository;
import es2.appDoacao.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final EntradaDoacaoRepository entradaDoacaoRepository;
    private final DistribuicaoRepository distribuicaoRepository;

    public ProdutoService(ProdutoRepository produtoRepository,
                          EntradaDoacaoRepository entradaDoacaoRepository,
                          DistribuicaoRepository distribuicaoRepository) {
        this.produtoRepository = produtoRepository;
        this.entradaDoacaoRepository = entradaDoacaoRepository;
        this.distribuicaoRepository = distribuicaoRepository;
    }

    public List<Produto> listarTodos() {
        return produtoRepository.findAll();
    }

    public Optional<Produto> buscarPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public Optional<String> salvar(Produto produto) {
        Optional<String> erro = validar(produto);
        if (erro.isPresent()) {
            return erro;
        }

        produtoRepository.save(produto);
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (!produtoRepository.existsById(id)) {
            return false;
        }

        produtoRepository.deleteById(id);
        return true;
    }

    public List<Map<String, Object>> listarEstoque() {
        List<Produto> produtos = produtoRepository.findAll();

        return produtos.stream().map(produto -> {
            int totalEntradas = entradaDoacaoRepository.findAll().stream()
                    .filter(e -> produto.getNome().equalsIgnoreCase(e.getProduto()))
                    .mapToInt(e -> e.getQuantidade() != null ? e.getQuantidade() : 0)
                    .sum();

            int totalDistribuido = distribuicaoRepository.sumQuantidadeByProdutoId(produto.getId());

            int saldo = totalEntradas - totalDistribuido;

            return Map.<String, Object>of(
                    "id", produto.getId(),
                    "nome", produto.getNome(),
                    "descricao", produto.getDescricao() != null ? produto.getDescricao() : "",
                    "unidade", produto.getUnidade(),
                    "quantidadeEstoque", produto.getQuantidadeEstoque(),
                    "totalEntradas", totalEntradas,
                    "totalDistribuido", totalDistribuido,
                    "saldoCalculado", saldo
            );
        }).collect(Collectors.toList());
    }

    private Optional<String> validar(Produto produto) {
        if (produto.getNome() == null || produto.getNome().isBlank()) {
            return Optional.of("Nome é obrigatório");
        }
        if (produto.getUnidade() == null || produto.getUnidade().isBlank()) {
            return Optional.of("Unidade é obrigatória");
        }
        if (produto.getQuantidadeEstoque() == null || produto.getQuantidadeEstoque() < 0) {
            return Optional.of("Quantidade em estoque deve ser zero ou positiva");
        }
        return Optional.empty();
    }
}
