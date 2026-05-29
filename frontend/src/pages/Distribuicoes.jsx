import { useCallback, useEffect, useMemo, useState } from 'react';
import './css/Distribuicoes.css';

const API_URL = 'http://localhost:8080';

const initialForm = {
  produtoId: '',
  entidadeId: '',
  quantidade: '',
  dataDistribuicao: '',
  observacao: '',
};

export function Distribuicoes() {
  const [form, setForm] = useState(initialForm);
  const [produtos, setProdutos] = useState([]);
  const [entidades, setEntidades] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const loadOptions = useCallback(async () => {
    try {
      const [produtosResponse, entidadesResponse] = await Promise.all([
        fetch(`${API_URL}/produtos`),
        fetch(`${API_URL}/entidades`),
      ]);
      const produtosData = await produtosResponse.json();
      const entidadesData = await entidadesResponse.json();

      if (produtosResponse.ok) {
        setProdutos(Array.isArray(produtosData) ? produtosData : []);
      }
      if (entidadesResponse.ok) {
        setEntidades(Array.isArray(entidadesData) ? entidadesData : []);
      }
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de conexao com o servidor' });
    }
  }, []);

  const loadDistribuicoes = useCallback(async (options = { resetStatus: true }) => {
    setLoading(true);
    if (options.resetStatus) {
      setStatus({ type: '', message: '' });
    }
    try {
      const response = await fetch(`${API_URL}/distribuicoes`);
      const data = await response.json();
      if (!response.ok) {
        setStatus({ type: 'error', message: data.mensagem || 'Não foi possível carregar as distribuições' });
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
    loadOptions();
    loadDistribuicoes();
  }, [loadOptions, loadDistribuicoes]);

  const produtoLookup = useMemo(() => {
    return new Map(produtos.map((produto) => [String(produto.id), produto.nome]));
  }, [produtos]);

  const entidadeLookup = useMemo(() => {
    return new Map(entidades.map((entidade) => [String(entidade.id), entidade.nome]));
  }, [entidades]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch(`${API_URL}/distribuicoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto: { id: Number(form.produtoId) },
          entidade: { id: Number(form.entidadeId) },
          quantidade: Number(form.quantidade),
          dataDistribuicao: form.dataDistribuicao,
          observacao: form.observacao,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setStatus({ type: 'error', message: data.mensagem || 'Não foi possível registrar a distribuição' });
        return;
      }

      setStatus({ type: 'success', message: data.mensagem || 'Distribuição registrada com sucesso' });
      setForm(initialForm);
      await loadDistribuicoes({ resetStatus: false });
    } catch (err) {
      setStatus({ type: 'error', message: 'Erro de conexao com o servidor' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="app-grid">
      <section className="app-section">
        <h2>Registro de distribuições</h2>
        <form className="app-form" onSubmit={handleSubmit}>
          <div className="app-form-row">
            <label className="page-field">
              Produto
              <select
                className="app-input"
                value={form.produtoId}
                onChange={handleChange('produtoId')}
                required
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </label>
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
          </div>
          <div className="app-form-row">
            <label className="page-field">
              Quantidade
              <input
                className="app-input"
                type="number"
                value={form.quantidade}
                onChange={handleChange('quantidade')}
                min="1"
                required
              />
            </label>
            <label className="page-field">
              Data da distribuição
              <input
                className="app-input"
                type="date"
                value={form.dataDistribuicao}
                onChange={handleChange('dataDistribuicao')}
                required
              />
            </label>
          </div>
          <label className="page-field">
            Observação
            <textarea
              className="app-input app-textarea"
              value={form.observacao}
              onChange={handleChange('observacao')}
              placeholder="Detalhes adicionais da entrega"
            />
          </label>
          {status.message && (
            <p className={`page-feedback ${status.type}`}>{status.message}</p>
          )}
          <button className="app-button" type="submit" disabled={saving}>
            {saving ? 'Salvando...' : 'Registrar distribuicao'}
          </button>
        </form>
      </section>

      <section className="app-section">
        <div className="page-toolbar">
          <div>
            <h2>Últimas distribuições</h2>
            <p className="app-muted">Histórico das entregas mais recentes.</p>
          </div>
        </div>
        {loading ? (
          <p className="app-muted">Carregando distribuições...</p>
        ) : items.length === 0 ? (
          <p className="app-muted">Nenhuma distribuição registrada ainda.</p>
        ) : (
          <table className="app-table">
            <thead>
              <tr>
                <th>Produto</th>
                <th>Entidade</th>
                <th>Quantidade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const produtoNome =
                  item.produtoNome ||
                  (typeof item.produto === 'string' ? item.produto : item.produto?.nome) ||
                  produtoLookup.get(String(item.produtoId)) ||
                  'Produto';
                const entidadeNome =
                  item.entidadeNome ||
                  (typeof item.entidade === 'string' ? item.entidade : item.entidade?.nome) ||
                  entidadeLookup.get(String(item.entidadeId)) ||
                  'Entidade';
                const dataDistribuicao = item.dataDistribuicao ?? item.data;
                return (
                  <tr key={item.id ?? `${produtoNome}-${dataDistribuicao}`}>
                    <td>{produtoNome}</td>
                    <td>{entidadeNome}</td>
                    <td>{item.quantidade}</td>
                    <td>{dataDistribuicao}</td>
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
