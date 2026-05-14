package es2.appDoacao.service;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.repository.EntidadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EntidadeService {

    private final EntidadeRepository entidadeRepository;

    public EntidadeService(EntidadeRepository entidadeRepository) {
        this.entidadeRepository = entidadeRepository;
    }

    public List<Entidade> listarTodas() {
        return entidadeRepository.findAll();
    }

    public Optional<Entidade> buscarPorId(Long id) {
        return entidadeRepository.findById(id);
    }

    public boolean salvar(Entidade entidade) {
        if (!nomeValido(entidade.getNome())) return false;
        if (!cnpjValido(entidade.getCnpj())) return false;
        if (!emailValido(entidade.getEmail())) return false;

        if (entidadeRepository.findByCnpj(entidade.getCnpj()).isPresent()) return false;
        if (entidadeRepository.findByEmail(entidade.getEmail()).isPresent()) return false;

        entidadeRepository.save(entidade);
        return true;
    }

    public void deletar(Long id) {
        entidadeRepository.deleteById(id);
    }

    private boolean nomeValido(String nome) {
        return nome != null && nome.length() > 0;
    }

    private boolean cnpjValido(String cnpj) {
        return cnpj != null && cnpj.length() > 0;
    }

    private boolean emailValido(String email) {
        return email != null && email.contains("@") && email.contains(".");
    }

}