package es2.appDoacao;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.annotation.Order;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

/**
 * Keeps existing PostgreSQL deployments compatible when ownership is introduced.
 * Existing rows without an owner stay hidden by the scoped queries until they are
 * explicitly assigned to an account; they are never exposed to every account.
 */
@Component
@Profile("postgres")
@Order(0)
public class TenantOwnershipMigration implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    public TenantOwnershipMigration(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public void run(String... args) {
        addOwnerColumn("produtos", "idx_produtos_usuario_id");
        addOwnerColumn("entidades", "idx_entidades_usuario_id");
        addOwnerColumn("entradas_doacao", "idx_entradas_doacao_usuario_id");
        addOwnerColumn("distribuicoes", "idx_distribuicoes_usuario_id");
    }

    private void addOwnerColumn(String table, String index) {
        jdbcTemplate.execute("ALTER TABLE " + table + " ADD COLUMN IF NOT EXISTS usuario_id BIGINT");
        jdbcTemplate.execute("CREATE INDEX IF NOT EXISTS " + index + " ON " + table + " (usuario_id)");
        jdbcTemplate.execute("DO $$ BEGIN "
                + "IF NOT EXISTS (SELECT 1 FROM pg_constraint c "
                + "JOIN pg_attribute a ON a.attrelid = c.conrelid "
                + "AND a.attnum = ANY(c.conkey) "
                + "WHERE c.contype = 'f' AND c.conrelid = '" + table + "'::regclass "
                + "AND a.attname = 'usuario_id') THEN "
                + "ALTER TABLE " + table + " ADD CONSTRAINT " + index + "_fk "
                + "FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL; "
                + "END IF; END $$;");
    }
}
