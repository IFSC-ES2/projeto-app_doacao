import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../components/Pagination.jsx';
import './css/Doacoes.css';

const API_URL = 'http://localhost:8080';
const PAGE_SIZE = 6;

export function Doacoes() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const loadDoacoes = async () => {
      setLoading(true);
      setStatus({ type: '', message: '' });
      try {
        const response = await fetch(`${API_URL}/doacoes`);
        const data = await response.json();
        if (!response.ok) {
          setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar as doações' });
          return;
        }
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
      } finally {
        setLoading(false);
      }
    };

    loadDoacoes();
  }, []);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => {
      const produto = String(item.produto || '').toLowerCase();
      const doador = String(item.doador || '').toLowerCase();
      return produto.includes(normalized) || doador.includes(normalized);
    });
  }, [items, query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const visibleItems = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, currentPage]);

  return (
    <div className="app-grid">
      <section className="app-section">
        <div className="page-toolbar">
          <div>
            <h2>Listagem de doações</h2>
            <p className="app-muted">Consulte as doações registradas e filtre por produto ou doador.</p>
          </div>
          <input
            className="app-input page-search"
            placeholder="Buscar por produto ou doador"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>
        {status.message && (
          <p className={`page-feedback ${status.type}`}>{status.message}</p>
        )}
        {loading ? (
          <p className="app-muted">Carregando doações...</p>
        ) : filteredItems.length === 0 ? (
          <p className="app-muted">Nenhuma doação encontrada.</p>
        ) : (
          <>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Quantidade</th>
                  <th>Data</th>
                  <th>Doador</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((doacao) => {
                  const data = doacao.dataEntrada ?? doacao.data;
                  return (
                    <tr key={doacao.id ?? `${doacao.produto}-${data}`}>
                      <td>{doacao.produto}</td>
                      <td>{doacao.quantidade}</td>
                      <td>{data}</td>
                      <td>{doacao.doador}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </section>
    </div>
  );
}
