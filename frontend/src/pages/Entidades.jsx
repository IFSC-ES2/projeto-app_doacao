import { useEffect, useState } from 'react';
import { Pagination } from '../components/Pagination.jsx';

const API_URL = 'http://localhost:8080';
const PAGE_SIZE = 6;

export function Entidades() {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
  });
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const loadEntidades = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/entidades`);
      const data = await response.json();
      if (!response.ok) {
        setError(data.mensagem || 'Não foi possível carregar as entidades');
        return;
      }
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setError('Erro de conexão com o servidor');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialEntidades = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/entidades`);
        const data = await response.json();
        if (!response.ok) {
          if (!cancelled) {
            setError(data.mensagem || 'Não foi possível carregar as entidades');
          }
          return;
        }
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setError('Erro de conexão com o servidor');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadInitialEntidades();

    return () => {
      cancelled = true;
    };
  }, []);

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages));
  }, [totalPages]);

  const visibleItems = items.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/entidades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.mensagem || 'Não foi possível salvar a entidade');
        return;
      }

      setForm({ nome: '', cnpj: '', endereco: '', telefone: '', email: '' });
      await loadEntidades();
    } catch {
      setError('Erro de conexão com o servidor');
    }
  };

  return (
    <div className="app-grid">
      <section className="app-section">
        <h2>Cadastro de entidades</h2>
        <form className="app-form" onSubmit={handleSubmit}>
          <div className="app-form-row">
            <input
              className="app-input"
              placeholder="Nome da entidade"
              value={form.nome}
              onChange={handleChange('nome')}
              required
            />
            <input
              className="app-input"
              placeholder="CNPJ"
              value={form.cnpj}
              onChange={handleChange('cnpj')}
              required
            />
          </div>
          <div className="app-form-row">
            <input
              className="app-input"
              placeholder="Endereço"
              value={form.endereco}
              onChange={handleChange('endereco')}
              required
            />
            <input
              className="app-input"
              placeholder="Telefone"
              value={form.telefone}
              onChange={handleChange('telefone')}
              required
            />
          </div>
          <input
            className="app-input"
            placeholder="E-mail"
            value={form.email}
            onChange={handleChange('email')}
            required
          />
          <div className="app-feedback">{error}</div>
          <button className="app-button" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar entidade'}
          </button>
        </form>
      </section>

      <section className="app-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Entidades cadastradas</h2>
        </div>
        {items.length === 0 ? (
          <p className="app-muted">Nenhuma entidade registrada ainda.</p>
        ) : (
          <>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CNPJ</th>
                  <th>Email</th>
                  <th>Telefone</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((entidade) => (
                  <tr key={entidade.id}>
                    <td>{entidade.nome}</td>
                    <td>{entidade.cnpj}</td>
                    <td>{entidade.email}</td>
                    <td>{entidade.telefone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </section>
    </div>
  );
}
