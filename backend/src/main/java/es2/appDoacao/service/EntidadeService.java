package es2.appDoacao.service;

import es2.appDoacao.model.Entidade;
import es2.appDoacao.model.Usuario;
import es2.appDoacao.repository.EntidadeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class EntidadeService {

    private static final Pattern CNPJ_PATTERN = Pattern.compile("^(\\d{2}\\.\\d{3}\\.\\d{3}/\\d{4}-\\d{2}|\\d{14})$");
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$");
    private static final Pattern TELEFONE_PATTERN = Pattern.compile("^(\\d{10,11}|\\(?\\d{2}\\)?\\s?\\d{4,5}-?\\d{4})$");

    private final EntidadeRepository entidadeRepository;

    public EntidadeService(EntidadeRepository entidadeRepository) {
        this.entidadeRepository = entidadeRepository;
    }

    public List<Entidade> listarTodas() {
        return entidadeRepository.findAll();
    }

    public List<Entidade> listarTodas(Usuario usuario) {
        return entidadeRepository.findAllByUsuario_Id(usuario.getId());
    }

    public Optional<Entidade> buscarPorId(Long id) {
        return entidadeRepository.findById(id);
    }

    public Optional<Entidade> buscarPorId(Long id, Usuario usuario) {
        return entidadeRepository.findByIdAndUsuario_Id(id, usuario.getId());
    }

    public Optional<String> salvar(Entidade entidade) {
        Optional<String> erro = validarCadastro(entidade);
        if (erro.isPresent()) {
            return erro;
        }

        entidadeRepository.save(entidade);
        return Optional.empty();
    }

    public Optional<String> salvar(Entidade entidade, Usuario usuario) {
        if (entidade.getId() != null
                && entidadeRepository.existsById(entidade.getId())
                && entidadeRepository.findByIdAndUsuario_Id(entidade.getId(), usuario.getId()).isEmpty()) {
            return Optional.of("Entidade não encontrada");
        }

        Optional<String> erro = validarCadastro(entidade, usuario);
        if (erro.isPresent()) {
            return erro;
        }

        entidade.setUsuario(usuario);
        entidadeRepository.save(entidade);
        return Optional.empty();
    }

    public boolean deletar(Long id) {
        if (!entidadeRepository.existsById(id)) {
            return false;
        }

        entidadeRepository.deleteById(id);
        return true;
    }

    public boolean deletar(Long id, Usuario usuario) {
        Optional<Entidade> entidade = entidadeRepository.findByIdAndUsuario_Id(id, usuario.getId());
        if (entidade.isEmpty()) {
            return false;
        }

        entidadeRepository.delete(entidade.get());
        return true;
    }

    private boolean nomeValido(String nome) {
        return nome != null && nome.length() > 0;
    }

    private boolean cnpjValido(String cnpj) {
        return cnpj != null && CNPJ_PATTERN.matcher(cnpj).matches();
    }

    private boolean emailValido(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    private boolean telefoneValido(String telefone) {
        return telefone != null && TELEFONE_PATTERN.matcher(telefone).matches();
    }

    private Optional<String> validarCadastro(Entidade entidade) {
        return validarCadastro(entidade, null);
    }

    private Optional<String> validarCadastro(Entidade entidade, Usuario usuario) {
        if (!nomeValido(entidade.getNome())) {
            return Optional.of("Nome é obrigatório");
        }

        if (!cnpjValido(entidade.getCnpj())) {
            return Optional.of("CNPJ inválido. Use 14 dígitos ou o formato 00.000.000/0000-00");
        }

        if (!emailValido(entidade.getEmail())) {
            return Optional.of("Email inválido");
        }

        if (!telefoneValido(entidade.getTelefone())) {
            return Optional.of("Telefone inválido. Use DDD com 10 ou 11 dígitos (ex: 11999998888 ou (48) 99999-8888)");
        }

        boolean cnpjDuplicado = usuario == null
                ? entidadeRepository.findByCnpj(entidade.getCnpj()).isPresent()
                : entidadeRepository.findByUsuario_IdAndCnpj(usuario.getId(), entidade.getCnpj()).isPresent();
        if (cnpjDuplicado) {
            return Optional.of("CNPJ já cadastrado");
        }

        boolean emailDuplicado = usuario == null
                ? entidadeRepository.findByEmail(entidade.getEmail()).isPresent()
                : entidadeRepository.findByUsuario_IdAndEmail(usuario.getId(), entidade.getEmail()).isPresent();
        if (emailDuplicado) {
            return Optional.of("Email já cadastrado");
        }

        return Optional.empty();
    }

}
