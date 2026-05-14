import { useState } from 'react';

const API_URL = 'http://localhost:8080';

export function Entidades({ items, loading, onRefresh }) {
  const [form, setForm] = useState({
    nome: '',
    cnpj: '',
    endereco: '',
    telefone: '',
    email: '',
  });
  const [error, setError] = useState('');

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
        setError(data.mensagem || 'Nao foi possivel salvar a entidade');
        return;
      }

      setForm({ nome: '', cnpj: '', endereco: '', telefone: '', email: '' });
      onRefresh();
    } catch (err) {
      setError('Erro de conexao com o servidor');
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
              placeholder="Endereco"
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
            placeholder="Email"
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
              {items.map((entidade) => (
                <tr key={entidade.id}>
                  <td>{entidade.nome}</td>
                  <td>{entidade.cnpj}</td>
                  <td>{entidade.email}</td>
                  <td>{entidade.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
