import { useEffect, useMemo, useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { Pagination } from '../components/Pagination.jsx';
import './css/Produtos.css';

const API_URL = 'http://localhost:8080';
const PAGE_SIZE = 6;

const initialForm = {
  nome: '',
  descricao: '',
  unidade: '',
  quantidadeEstoque: '',
  doadorTipo: 'avulso',
  doador: '',
  entidadeId: '',
};

export function Produtos() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [entidades, setEntidades] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadProdutos = async (options = { resetStatus: true }) => {
    setLoading(true);
    if (options.resetStatus) {
      setStatus({ type: '', message: '' });
    }
    try {
      const response = await fetch(`${API_URL}/produtos`);
      const data = await response.json();
      if (!response.ok) {
        setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar os produtos' });
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

    const loadInitialProdutos = async () => {
      setLoading(true);
      setStatus({ type: '', message: '' });
      try {
        const response = await fetch(`${API_URL}/produtos`);
        const data = await response.json();
        if (!response.ok) {
          if (!cancelled) {
            setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar os produtos' });
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

    void loadInitialProdutos();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadInitialEntidades = async () => {
      try {
        const response = await fetch(`${API_URL}/entidades`);
        const data = await response.json();
        if (response.ok && !cancelled) {
          setEntidades(Array.isArray(data) ? data : []);
        }
      } catch {
        if (!cancelled) {
          setEntidades([]);
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

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const doadorNome =
        form.doadorTipo === 'entidade'
          ? entidades.find((entidade) => String(entidade.id) === String(form.entidadeId))?.nome || ''
          : form.doador.trim();

      if (!doadorNome) {
        setStatus({
          type: 'error',
          message:
            form.doadorTipo === 'entidade'
              ? 'Selecione uma entidade válida'
              : 'Informe o nome do doador',
        });
        return;
      }

      const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          descricao: form.descricao,
          unidade: form.unidade,
          quantidadeEstoque: Number(form.quantidadeEstoque),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: data.mensagem || 'Não foi possível cadastrar o produto' });
        return;
      }

      const doacaoResponse = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto: form.nome,
          quantidade: Number(form.quantidadeEstoque),
          dataEntrada: new Date().toISOString().slice(0, 10),
          doador: doadorNome,
          observacao:
            form.doadorTipo === 'entidade'
              ? `Entrada vinculada a entidade ${doadorNome}`
              : `Entrada registrada com doador avulso ${doadorNome}`,
        }),
      });

      if (!doacaoResponse.ok) {
        const doacaoData = await doacaoResponse.json();
        setStatus({
          type: 'error',
          message: doacaoData.mensagem || 'Não foi possível registrar a doação recebida',
        });
        return;
      }

      setStatus({ type: 'success', message: data.mensagem || 'Produto cadastrado com sucesso' });
      setForm(initialForm);
      setCurrentPage(1);
      await loadProdutos({ resetStatus: false });
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

    try {
      setStatus({ type: '', message: '' });
      const response = await fetch(`${API_URL}/produtos/${deletingId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setStatus({
          type: 'error',
          message: data.mensagem || 'Não foi possível excluir o produto',
        });
        return;
      }

      setStatus({ type: 'success', message: 'Produto excluído com sucesso' });
      setDeletingId(null);
      await loadProdutos({ resetStatus: false });
    } catch {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
    }
  };

  const visibleItems = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return items.slice(start, start + PAGE_SIZE);
  }, [items, safeCurrentPage]);

  const deletingProduct = useMemo(() => {
    return items.find((produto) => String(produto.id) === String(deletingId)) || null;
  }, [items, deletingId]);

  return (
    <div className="app-grid">
      <section className="app-section">
        <h2>Cadastro de produtos</h2>
        <form className="app-form" onSubmit={handleSubmit}>
          <div className="app-form-row">
            <input
              className="app-input"
              placeholder="Nome do produto"
              value={form.nome}
              onChange={handleChange('nome')}
              required
            />
            <input
              className="app-input"
              placeholder="Unidade de medida"
              value={form.unidade}
              onChange={handleChange('unidade')}
              required
            />
          </div>
          <input
            className="app-input"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange('descricao')}
            required
          />
          <div className="page-toggle-group" role="group" aria-label="Tipo de doador">
            <button
              type="button"
              className={`page-toggle ${form.doadorTipo === 'avulso' ? 'active' : ''}`}
              onClick={() => setForm((prev) => ({ ...prev, doadorTipo: 'avulso', entidadeId: '' }))}
            >
              Doador avulso
            </button>
            <button
              type="button"
              className={`page-toggle ${form.doadorTipo === 'entidade' ? 'active' : ''}`}
              onClick={() => setForm((prev) => ({ ...prev, doadorTipo: 'entidade', doador: '' }))}
            >
              Entidade
            </button>
          </div>
          {form.doadorTipo === 'avulso' ? (
            <input
              className="app-input"
              placeholder="Nome do doador"
              value={form.doador}
              onChange={handleChange('doador')}
              required
            />
          ) : (
            <label className="page-field">
              Entidade
              <select
                className="app-input"
                value={form.entidadeId}
                onChange={handleChange('entidadeId')}
                required
              >
                <option value="">Selecione uma entidade</option>
                {entidades.map((entidade) => (
                  <option key={entidade.id} value={entidade.id}>
                    {entidade.nome}
                  </option>
                ))}
              </select>
            </label>
          )}
          <input
            className="app-input"
            type="number"
            placeholder="Quantidade inicial"
            value={form.quantidadeEstoque}
            onChange={handleChange('quantidadeEstoque')}
            min="0"
            required
          />
          {status.message && (
            <p className={`page-feedback ${status.type}`}>{status.message}</p>
          )}
          <button className="app-button" type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Cadastrar produto'}
          </button>
        </form>
      </section>

      <section className="app-section">
        <div className="page-toolbar">
          <div>
            <h2>Produtos cadastrados</h2>
            <p className="app-muted">Lista atualizada de itens disponíveis.</p>
          </div>
        </div>
        {loading ? (
          <p className="app-muted">Carregando produtos...</p>
        ) : items.length === 0 ? (
          <p className="app-muted">Nenhum produto registrado ainda.</p>
        ) : (
          <>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Produto</th>
                  <th>Descrição</th>
                  <th>Unidade</th>
                  <th>Quantidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {visibleItems.map((produto) => {
                  const quantidade =
                    produto.quantidadeEstoque ?? produto.quantidadeAtual ?? produto.quantidade ?? 0;

                  return (
                    <tr key={produto.id ?? `${produto.nome}-${produto.unidade}`}>
                      <td>{produto.nome}</td>
                      <td>{produto.descricao}</td>
                      <td>{produto.unidade}</td>
                      <td>
                        <span className="app-pill">{quantidade}</span>
                      </td>
                      <td>
                        <button
                          type="button"
                          className="product-delete-button"
                          onClick={() => setDeletingId(produto.id)}
                          aria-label={`Excluir produto ${produto.nome}`}
                        >
                          <FiTrash2 aria-hidden />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination currentPage={safeCurrentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        )}
      </section>

      {deletingProduct && (
        <div className="product-modal-overlay" role="presentation" onClick={() => setDeletingId(null)}>
          <div
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-product-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 id="delete-product-title">Excluir produto</h3>
            <p>
              Tem certeza que deseja excluir <strong>{deletingProduct.nome}</strong>?
            </p>
            <p className="app-muted">
              Essa ação remove o produto da lista cadastrada e não pode ser desfeita.
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
