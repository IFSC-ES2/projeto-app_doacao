import { useState } from 'react';

const API_URL = 'http://localhost:8080';

export function Doacoes({ items, loading, onRefresh }) {
  const [form, setForm] = useState({
    produto: '',
    quantidade: '',
    dataEntrada: '',
    doador: '',
    observacao: '',
  });
  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/doacoes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          quantidade: Number(form.quantidade),
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.mensagem || 'Nao foi possivel registrar a doacao');
        return;
      }

      setForm({ produto: '', quantidade: '', dataEntrada: '', doador: '', observacao: '' });
      onRefresh();
    } catch (err) {
      setError('Erro de conexao com o servidor');
    }
  };

  return (
    <div className="app-grid">
      <section className="app-section">
        <h2>Registrar entrada de doacao</h2>
        <form className="app-form" onSubmit={handleSubmit}>
          <div className="app-form-row">
            <input
              className="app-input"
              placeholder="Produto"
              value={form.produto}
              onChange={handleChange('produto')}
              required
            />
            <input
              className="app-input"
              type="number"
              placeholder="Quantidade"
              value={form.quantidade}
              onChange={handleChange('quantidade')}
              required
              min="1"
            />
          </div>
          <div className="app-form-row">
            <input
              className="app-input"
              type="date"
              value={form.dataEntrada}
              onChange={handleChange('dataEntrada')}
              required
            />
            <input
              className="app-input"
              placeholder="Doador"
              value={form.doador}
              onChange={handleChange('doador')}
              required
            />
          </div>
          <textarea
            className="app-input app-textarea"
            placeholder="Observacoes"
            value={form.observacao}
            onChange={handleChange('observacao')}
          />
          <div className="app-feedback">{error}</div>
          <button className="app-button" type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Registrar doacao'}
          </button>
        </form>
      </section>

      <section className="app-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Entradas registradas</h2>
        </div>
        {items.length === 0 ? (
          <p className="app-muted">Nenhuma entrada registrada ainda.</p>
        ) : (
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
              {items.map((doacao) => (
                <tr key={doacao.id}>
                  <td>{doacao.produto}</td>
                  <td>{doacao.quantidade}</td>
                  <td>{doacao.dataEntrada}</td>
                  <td>{doacao.doador}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
