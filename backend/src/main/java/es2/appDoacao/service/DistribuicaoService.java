package es2.appDoacao.service;
import es2.appDoacao.model.Distribuicao;
import es2.appDoacao.model.Produto;
import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.DistribuicaoRepository;
import es2.appDoacao.repository.EntidadeRepository;
import es2.appDoacao.repository.ProdutoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    public List<Distribuicao> listarTodas(Usuario usuario) {
        return distribuicaoRepository.findAllByUsuario_Id(usuario.getId());
    }

    public Optional<Distribuicao> buscarPorId(Long id) {
        return distribuicaoRepository.findById(id);
    }

    public Optional<Distribuicao> buscarPorId(Long id, Usuario usuario) {
        return distribuicaoRepository.findByIdAndUsuario_Id(id, usuario.getId());
    }

    @Transactional
    public Optional<String> registrar(Distribuicao distribuicao) {
        return registrar(distribuicao, null);
    }

    @Transactional
    public Optional<String> registrar(Distribuicao distribuicao, Usuario usuario) {
        if (usuario != null && distribuicao.getId() != null
                && distribuicaoRepository.existsById(distribuicao.getId())
                && distribuicaoRepository.findByIdAndUsuario_Id(distribuicao.getId(), usuario.getId()).isEmpty()) {
            return Optional.of("Distribuição não encontrada");
        }

        Optional<String> erro = validar(distribuicao);
        if (erro.isPresent()) {
            return erro;
        }

        if (distribuicao.getDataDistribuicao() == null) {
            distribuicao.setDataDistribuicao(LocalDate.now());
        }

        Produto produto = usuario == null
                ? produtoRepository.findById(distribuicao.getProduto().getId()).orElse(null)
                : produtoRepository.findByIdAndUsuario_Id(distribuicao.getProduto().getId(), usuario.getId()).orElse(null);
        if (produto == null) {
            return Optional.of("Produto não encontrado");
        }

        var entidade = usuario == null
                ? entidadeRepository.findById(distribuicao.getEntidade().getId()).orElse(null)
                : entidadeRepository.findByIdAndUsuario_Id(distribuicao.getEntidade().getId(), usuario.getId()).orElse(null);
        if (entidade == null) {
            return Optional.of("Entidade não encontrada");
        }

        int estoqueAtual = produto.getQuantidadeEstoque() != null ? produto.getQuantidadeEstoque() : 0;
        int novoEstoque = estoqueAtual - distribuicao.getQuantidade();
        if (novoEstoque < 0) {
            return Optional.of("Quantidade indisponível em estoque");
        }

        produto.setQuantidadeEstoque(novoEstoque);
        produtoRepository.save(produto);
        distribuicao.setProduto(produto);
        distribuicao.setEntidade(entidade);
        distribuicao.setUsuario(usuario);
        distribuicaoRepository.save(distribuicao);
        return Optional.empty();
    }

    public void deletar(Long id) {
        distribuicaoRepository.deleteById(id);
    }

    public boolean deletar(Long id, Usuario usuario) {
        Optional<Distribuicao> distribuicao = distribuicaoRepository.findByIdAndUsuario_Id(id, usuario.getId());
        if (distribuicao.isEmpty()) {
            return false;
        }

        distribuicaoRepository.delete(distribuicao.get());
        return true;
    }

    private Optional<String> validar(Distribuicao distribuicao) {
        if (distribuicao.getProduto() == null || distribuicao.getProduto().getId() == null) {
            return Optional.of("Produto é obrigatório");
        }

        if (distribuicao.getEntidade() == null || distribuicao.getEntidade().getId() == null) {
            return Optional.of("Entidade é obrigatória");
        }

        if (distribuicao.getQuantidade() == null || distribuicao.getQuantidade() <= 0) {
            return Optional.of("Quantidade deve ser positiva");
        }

        return Optional.empty();
    }
}
