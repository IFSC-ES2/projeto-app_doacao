package es2.appDoacao.service;

import es2.appDoacao.model.Distribuicao;
import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.EntidadeRepository;
import es2.appDoacao.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DistribuicaoService {

    private final DistribuicaoRepository distribuicaoRepository;
    private final ProdutoRepository produtoRepository;
    private final EntidadeRepository entidadeRepository;

    public DistribuicaoService(DistribuicaoRepository distribuicaoRepository,
                               ProdutoRepository produtoRepository,
                               EntidadeRepository entidadeRepository) {
        this.distribuicaoRepository = distribuicaoRepository;
        this.produtoRepository = produtoRepository;
        this.entidadeRepository = entidadeRepository;
    }

    public List<Distribuicao> listarTodas() {
        return distribuicaoRepository.findAll();
    }

    public Optional<Distribuicao> buscarPorId(Long id) {
        return distribuicaoRepository.findById(id);
    }

    public Optional<String> registrar(Distribuicao distribuicao) {
        Optional<String> erro = validar(distribuicao);
        if (erro.isPresent()){
             return erro;
        }

        if (distribuicao.getDataDistribuicao() == null) {
            distribuicao.setDataDistribuicao(LocalDate.now());
        }

        distribuicaoRepository.save(distribuicao);
        return Optional.empty();
    }

    public void deletar(Long id) {
        distribuicaoRepository.deleteById(id);
    }

    private Optional<String> validar(Distribuicao distribuicao) {
        if (distribuicao.getProduto() == null || distribuicao.getProduto().getId() == null) {
            return Optional.of("Produto é obrigatório");
        }
        if (!produtoRepository.existsById(distribuicao.getProduto().getId())) {
            return Optional.of("Produto não encontrado");
        }
        if (distribuicao.getEntidade() == null || distribuicao.getEntidade().getId() == null) {
            return Optional.of("Entidade é obrigatória");
        }
        if (!entidadeRepository.existsById(distribuicao.getEntidade().getId())) {
            return Optional.of("Entidade não encontrada");
        }
        if (distribuicao.getQuantidade() == null || distribuicao.getQuantidade() <= 0) {
            return Optional.of("Quantidade deve ser positiva");
        }
        return Optional.empty();
    }
}