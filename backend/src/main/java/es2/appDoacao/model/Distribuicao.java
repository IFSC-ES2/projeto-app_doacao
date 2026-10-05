package es2.appDoacao.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "distribuicoes", indexes = @Index(name = "idx_distribuicoes_usuario_id", columnList = "usuario_id"))
public class Distribuicao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "entidade_id", nullable = false)
    private Entidade entidade;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private LocalDate dataDistribuicao;

    @Column
    private String observacao;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}
