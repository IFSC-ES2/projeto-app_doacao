import { useEffect, useState } from 'react';
import { apiFetch } from '../utils/api.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function Auditoria() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    apiFetch(`${API_URL}/auditoria`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Não foi possível carregar a trilha de auditoria.');
        return response.json();
      })
      .then((data) => { if (active) setLogs(Array.isArray(data) ? data : []); })
      .catch((err) => { if (active) setError(err.message); });
    return () => { active = false; };
  }, []);

  return (
    <div className="app-grid">
      <section className="app-section">
        <div className="app-section-header">
          <div>
            <p className="app-section-eyebrow">Rastreabilidade</p>
            <h2>Movimentações recentes</h2>
            <p className="app-muted">As últimas 200 entradas de doações e distribuições da sua organização.</p>
          </div>
          <span className="app-section-count">{logs.length} registros</span>
        </div>
        {error && <p className="app-feedback" role="alert">{error}</p>}
        {logs.length === 0 && !error ? (
          <div className="app-empty-state"><strong>Nenhuma movimentação registrada</strong><p className="app-muted">As próximas entradas e distribuições aparecerão aqui.</p></div>
        ) : (
          <div className="audit-table-wrap">
            <table className="app-table">
              <thead><tr><th>Data e hora</th><th>Movimentação</th><th>Descrição</th><th>Referência</th></tr></thead>
              <tbody>{logs.map((log) => (
                <tr key={log.id}>
                  <td>{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(new Date(log.dataHora))}</td>
                  <td><span className="app-pill">{log.tipo === 'DISTRIBUICAO' ? 'Distribuição' : 'Entrada de doação'}</span></td>
                  <td>{log.descricao}</td>
                  <td>#{log.referenciaId}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
