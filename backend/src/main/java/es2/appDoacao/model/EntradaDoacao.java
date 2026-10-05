package es2.appDoacao.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "entradas_doacao", indexes = @Index(name = "idx_entradas_doacao_usuario_id", columnList = "usuario_id"))
public class EntradaDoacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String produto;

    @Column(nullable = false)
    private Integer quantidade;

    @Column(nullable = false)
    private LocalDate dataEntrada;

    @Column(nullable = false)
    private String doador;

    @Column
    private String observacao;

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

}
