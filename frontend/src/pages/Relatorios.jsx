import { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { apiFetch } from '../utils/api.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export function Relatorios() {
  const [loading, setLoading] = useState('');
  const [error, setError] = useState('');

  const exportar = async (tipo, nome) => {
    setLoading(tipo);
    setError('');
    try {
      const response = await apiFetch(`${API_URL}/relatorios/${tipo}.csv`);
      if (!response.ok) throw new Error('Não foi possível gerar o relatório. Tente novamente.');
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = nome;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || 'Falha ao exportar o relatório.');
    } finally {
      setLoading('');
    }
  };

  return (
    <div className="app-grid">
      <section className="app-section">
        <div className="app-section-header">
          <div>
            <p className="app-section-eyebrow">Prestação de contas</p>
            <h2>Relatórios exportáveis</h2>
            <p className="app-muted">Exporte os dados da sua organização em CSV para abrir em planilhas.</p>
          </div>
        </div>
        {error && <p className="app-feedback" role="alert">{error}</p>}
        <div className="report-cards">
          <article className="app-card report-card">
            <h3>Relatório de estoque</h3>
            <p className="app-muted">Saldo atual, entradas, distribuições e limite de alerta por produto.</p>
            <button type="button" className="app-button" disabled={Boolean(loading)} onClick={() => exportar('estoque', 'relatorio-estoque.csv')}>
              <FiDownload aria-hidden /> {loading === 'estoque' ? 'Gerando...' : 'Exportar CSV'}
            </button>
          </article>
          <article className="app-card report-card">
            <h3>Relatório de distribuições</h3>
            <p className="app-muted">Histórico de entregas com data, produto, quantidade e entidade beneficiada.</p>
            <button type="button" className="app-button" disabled={Boolean(loading)} onClick={() => exportar('distribuicoes', 'relatorio-distribuicoes.csv')}>
              <FiDownload aria-hidden /> {loading === 'distribuicoes' ? 'Gerando...' : 'Exportar CSV'}
            </button>
          </article>
        </div>
      </section>
    </div>
  );
}
