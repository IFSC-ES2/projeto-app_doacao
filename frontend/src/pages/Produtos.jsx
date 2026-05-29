import { useCallback, useEffect, useState } from 'react';
import './css/Produtos.css';

const API_URL = 'http://localhost:8080';

const initialForm = {
  nome: '',
  descricao: '',
  unidade: '',
  quantidadeEstoque: '',
  entidadeId: '',
};

export function Produtos() {
  const [form, setForm] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [entidades, setEntidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadProdutos = useCallback(async (options = { resetStatus: true }) => {
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
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProdutos();
  }, [loadProdutos]);

  useEffect(() => {
    const loadEntidades = async () => {
      try {
        const response = await fetch(`${API_URL}/entidades`);
        const data = await response.json();
        if (response.ok) {
          setEntidades(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        setEntidades([]);
      }
    };

    loadEntidades();
  }, []);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
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

      const entidadeSelecionada = entidades.find(
        (entidade) => String(entidade.id) === String(form.entidadeId)
      );

      if (!entidadeSelecionada) {
        setStatus({ type: 'error', message: 'Selecione uma entidade válida' });
        return;
      }

      const doacaoResponse = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto: form.nome,
          quantidade: Number(form.quantidadeEstoque),
          dataEntrada: new Date().toISOString().slice(0, 10),
          doador: entidadeSelecionada.nome,
          observacao: `Entrada vinculada a entidade ${entidadeSelecionada.nome}`,
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
      await loadProdutos({ resetStatus: false });
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor' });
    } finally {
      setSaving(false);
    }
  };

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
          <table className="app-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Descrição</th>
                <th>Unidade</th>
                <th>Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {items.map((produto) => {
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
