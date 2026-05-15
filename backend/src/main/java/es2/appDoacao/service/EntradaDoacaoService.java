package es2.appDoacao.service;

import es2.appDoacao.model.EntradaDoacao;
import es2.appDoacao.repository.EntradaDoacaoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class EntradaDoacaoService {

    private final EntradaDoacaoRepository entradaDoacaoRepository;

    public EntradaDoacaoService(EntradaDoacaoRepository entradaDoacaoRepository) {
        this.entradaDoacaoRepository = entradaDoacaoRepository;
    }

    public List<EntradaDoacao> listarTodas() {
        return entradaDoacaoRepository.findAll();
    }

    public Optional<EntradaDoacao> buscarPorId(Long id) {
        return entradaDoacaoRepository.findById(id);
    }

    public boolean registrar(EntradaDoacao entrada) {
        if (!produtoValido(entrada.getProduto())) return false;
        if (!quantidadeValida(entrada.getQuantidade())) return false;
        if (!doadorValido(entrada.getDoador())) return false;

        if (entrada.getDataEntrada() == null) {
            entrada.setDataEntrada(LocalDate.now());
        }

        entradaDoacaoRepository.save(entrada);
        return true;
    }

    public void deletar(Long id) {
        entradaDoacaoRepository.deleteById(id);
    }

    private boolean produtoValido(String produto) {
        return produto != null && produto.length() > 0;
    }

    private boolean quantidadeValida(Integer quantidade) {
        return quantidade != null && quantidade > 0;
    }

    private boolean doadorValido(String doador) {
        return doador != null && doador.length() > 0;
    }

}