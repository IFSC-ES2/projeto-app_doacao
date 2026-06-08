import { useEffect, useMemo, useState } from 'react';
import { Pagination } from '../components/Pagination.jsx';
import './css/Estoque.css';

const API_URL = 'http://localhost:8080';
const PAGE_SIZE = 6;

export function Estoque() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    const loadEstoque = async () => {
      setLoading(true);
      setStatus({ type: '', message: '' });
      try {
        const response = await fetch(`${API_URL}/estoque`);
        const data = await response.json();
        if (!response.ok) {
          setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar o estoque' });
          return;
        }
        setItems(Array.isArray(data) ? data : []);
      } catch {
        setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
      } finally {
        setLoading(false);
      }
    };

    loadEstoque();
  }, []);

  const filteredItems = items.filter((item) => {
    const nome = String(item.produto || item.nome || '').toLowerCase();
    return nome.includes(search.trim().toLowerCase());
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

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
            <h2>Consulta de estoque</h2>
            <p className="app-muted">Acompanhe a quantidade disponível de cada item.</p>
          </div>
          <input
            className="app-input estoque-search"
            type="search"
            placeholder="Buscar por nome do produto"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        {status.message && (
          <p className={`page-feedback ${status.type}`}>{status.message}</p>
        )}
        {loading ? (
          <p className="app-muted">Carregando estoque...</p>
        ) : items.length === 0 ? (
          <p className="app-muted">Nenhum item em estoque no momento.</p>
        ) : filteredItems.length === 0 ? (
          <p className="app-muted">Nenhum produto encontrado para essa busca.</p>
        ) : (
          <>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Unidade</th>
                  <th>Quantidade atual</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((item) => {
                  const quantidade = Number(
                    item.quantidadeEstoque ?? item.quantidadeAtual ?? item.quantidade ?? 0
                  );
                  const zerado = quantidade <= 0;
                  return (
                    <tr key={item.id ?? `${item.produto}-${item.unidade}`}>
                      <td>{item.produto || item.nome}</td>
                      <td>{item.unidade}</td>
                      <td>{quantidade}</td>
                      <td>
                        <span className={`estoque-badge ${zerado ? 'estoque-zero' : 'estoque-ok'}`}>
                          {zerado ? 'Zerado' : 'Disponível'}
                        </span>
                      </td>
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
