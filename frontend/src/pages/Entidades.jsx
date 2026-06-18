import { useEffect, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Pagination } from '../components/Pagination.jsx';
import { emitAppDataSync } from '../utils/dataSync.js';
import './css/Produtos.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
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
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadEntidades = async (options = { resetStatus: true }) => {
    setLoading(true);
    if (options.resetStatus) {
      setStatus({ type: '', message: '' });
    }
    try {
      const response = await fetch(`${API_URL}/entidades`);
      const data = await response.json();
      if (!response.ok) {
        setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar as entidades' });
        return;
      }
      setItems(Array.isArray(data) ? data : []);
    } catch {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadInitialEntidades = async () => {
      setLoading(true);
      setStatus({ type: '', message: '' });
      try {
        const response = await fetch(`${API_URL}/entidades`);
        const data = await response.json();
        if (!response.ok) {
          if (!cancelled) {
            setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar as entidades' });
          }
          return;
        }
        if (!cancelled) {
          setItems(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
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
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const visibleItems = items.slice((safeCurrentPage - 1) * PAGE_SIZE, safeCurrentPage * PAGE_SIZE);
  const deletingEntity = useMemo(() => {
    return items.find((entidade) => String(entidade.id) === String(deletingId)) || null;
  }, [items, deletingId]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/entidades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: data.mensagem || 'Não foi possível salvar a entidade' });
        return;
      }

      setForm({ nome: '', cnpj: '', endereco: '', telefone: '', email: '' });
      setStatus({ type: 'success', message: data.mensagem || 'Entidade salva com sucesso' });
      await loadEntidades({ resetStatus: false });
      emitAppDataSync({ resource: 'entidades', action: 'create' });
    } catch {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingId) {
      return;
    }

    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/entidades/${deletingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setStatus({
          type: 'error',
          message: data.mensagem || 'Não foi possível excluir a entidade',
        });
        return;
      }

      setDeletingId(null);
      setStatus({ type: 'success', message: 'Entidade excluída com sucesso' });
      await loadEntidades({ resetStatus: false });
      emitAppDataSync({ resource: 'entidades', action: 'delete' });
    } catch {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
    } finally {
      setSaving(false);
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
          {status.message && <p className={`page-feedback ${status.type}`}>{status.message}</p>}
          <button className="app-button" type="submit" disabled={loading || saving}>
            {saving ? 'Salvando...' : 'Salvar entidade'}
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
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((entidade) => (
                  <tr key={entidade.id}>
                    <td>{entidade.nome}</td>
                    <td>{entidade.cnpj}</td>
                    <td>{entidade.email}</td>
                    <td>{entidade.telefone}</td>
                    <td>
                      <button
                        type="button"
                        className="product-delete-button"
                        onClick={() => setDeletingId(entidade.id)}
                        aria-label={`Excluir entidade ${entidade.nome}`}
                      >
                        <FiTrash2 aria-hidden />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination currentPage={safeCurrentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </section>

      {deletingEntity && (
        <div className="product-modal-overlay" role="presentation" onClick={() => setDeletingId(null)}>
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-entity-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="delete-entity-title">Excluir entidade</h3>
            <p>
              Tem certeza que deseja excluir <strong>{deletingEntity.nome}</strong>?
            </p>
            <p className="app-muted">
              Essa ação remove a entidade da lista cadastrada e não pode ser desfeita.
            </p>
            <div className="product-modal-actions">
              <button
                type="button"
                className="product-modal-cancel"
                onClick={() => setDeletingId(null)}
                disabled={saving}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="product-modal-confirm"
                onClick={handleDelete}
                disabled={saving}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
