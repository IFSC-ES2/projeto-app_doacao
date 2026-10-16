package es2.appDoacao.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.Instant;

@Data
@Entity
@Table(name = "logs_movimentacao", indexes = {
        @Index(name = "idx_logs_usuario_data", columnList = "usuario_id, data_hora")
})
public class LogMovimentacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 40)
    private String tipo;

    @Column(nullable = false, length = 160)
    private String descricao;

    @Column(name = "referencia_id")
    private Long referenciaId;

    @Column(name = "data_hora", nullable = false)
    private Instant dataHora = Instant.now();

    @JsonIgnore
    @ToString.Exclude
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;
}
