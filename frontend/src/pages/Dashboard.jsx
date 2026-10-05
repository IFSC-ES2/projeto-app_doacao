import { useEffect, useMemo, useState } from 'react';
import { FiBox, FiHeart, FiUsers, FiStar } from 'react-icons/fi';
import { APP_DATA_SYNC_EVENT } from '../utils/dataSync.js';
import { apiFetch } from '../utils/api.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function getStockQuantity(item) {
  return Number(item.saldoCalculado ?? item.quantidadeAtual ?? item.quantidadeEstoque ?? item.quantidade ?? 0);
}

export function Dashboard() {
  const [entidades, setEntidades] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [estoque, setEstoque] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;

    const fetchJson = async (path) => {
      const response = await apiFetch(`${API_URL}${path}`);
      if (!response.ok) {
        throw new Error('Falha ao carregar dados');
      }
      return response.json();
    };

    const loadDashboard = async () => {
      if (!cancelled) {
        setError('');
      }

      try {
        const [entidadesResponse, doacoesResponse, estoqueResponse] = await Promise.all([
          fetchJson('/entidades'),
          fetchJson('/doacoes'),
          fetchJson('/estoque'),
        ]);

        if (!cancelled) {
          setEntidades(Array.isArray(entidadesResponse) ? entidadesResponse : []);
          setDoacoes(Array.isArray(doacoesResponse) ? doacoesResponse : []);
          setEstoque(Array.isArray(estoqueResponse) ? estoqueResponse : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Erro ao atualizar dados');
        }
      }
    };

    void loadDashboard();

    const handleDataSync = () => {
      void loadDashboard();
    };

    window.addEventListener(APP_DATA_SYNC_EVENT, handleDataSync);

    return () => {
      cancelled = true;
      window.removeEventListener(APP_DATA_SYNC_EVENT, handleDataSync);
    };
  }, []);

  const totalEstoque = useMemo(
    () => estoque.reduce((sum, item) => sum + getStockQuantity(item), 0),
    [estoque]
  );
  const totalDoacoes = doacoes.length;
  const totalEntidades = entidades.length;
  const doadoresUnicos = new Set(doacoes.map((item) => item.doador)).size;

  const topProdutos = estoque
    .map((item) => [
      item.produto || item.nome || 'Sem nome',
      getStockQuantity(item),
    ])
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 5);

  const recentes = [...doacoes]
    .sort((a, b) => new Date(b.dataEntrada) - new Date(a.dataEntrada))
    .slice(0, 5);

  return (
    <div className="app-grid">
      <section className="app-cards">
        <div className="app-card">
          <div className="app-card-icon" aria-hidden>
            <FiBox />
          </div>
          <h3>Total em estoque</h3>
          <strong>{totalEstoque}</strong>
          <p className="app-muted">Itens registrados</p>
        </div>
        <div className="app-card">
          <div className="app-card-icon" aria-hidden>
            <FiHeart />
          </div>
          <h3>Doações recebidas</h3>
          <strong>{totalDoacoes}</strong>
          <p className="app-muted">Entradas registradas</p>
        </div>
        <div className="app-card">
          <div className="app-card-icon" aria-hidden>
            <FiUsers />
          </div>
          <h3>Entidades ativas</h3>
          <strong>{totalEntidades}</strong>
          <p className="app-muted">Cadastros ativos</p>
        </div>
        <div className="app-card">
          <div className="app-card-icon" aria-hidden>
            <FiStar />
          </div>
          <h3>Doadores únicos</h3>
          <strong>{doadoresUnicos}</strong>
          <p className="app-muted">Pessoas apoiadoras</p>
        </div>
      </section>

      <section className="app-section">
        <div className="app-section-header">
          <div>
            <p className="app-section-eyebrow">Acompanhamento</p>
            <h2>Resumo operacional</h2>
            <p className="app-muted">Uma leitura rápida do que entrou, está disponível e já foi distribuído.</p>
          </div>
          <span className="app-section-count">Atualizado agora</span>
        </div>
        {error && <p className="app-feedback">{error}</p>}
        <div className="app-form-row dashboard-panels">
          <div className="app-section">
            <h2>Top produtos</h2>
            <p className="app-muted">Itens com maior saldo disponível.</p>
            {topProdutos.length === 0 ? (
              <div className="app-empty-state"><strong>Nenhum item registrado</strong><p className="app-muted">Cadastre produtos para acompanhar o saldo.</p></div>
            ) : (
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                  </tr>
                </thead>
                <tbody>
                  {topProdutos.map(([produto, quantidade]) => (
                    <tr key={produto}>
                      <td>{produto}</td>
                      <td>
                        <span className="app-pill">{quantidade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="app-section">
            <h2>Doações recentes</h2>
            <p className="app-muted">Últimas entradas registradas.</p>
            {recentes.length === 0 ? (
              <div className="app-empty-state"><strong>Sem doações por enquanto</strong><p className="app-muted">As novas entradas aparecerão aqui.</p></div>
            ) : (
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Doador</th>
                    <th>Produto</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {recentes.map((item) => (
                    <tr key={item.id}>
                      <td>{item.doador}</td>
                      <td>{item.produto}</td>
                      <td>{item.dataEntrada}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
