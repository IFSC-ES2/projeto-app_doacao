import { FiBox, FiHeart, FiUsers, FiStar } from 'react-icons/fi';

export function Dashboard({ entidades, doacoes, loading, error, onRefresh }) {
  const totalEstoque = doacoes.reduce((sum, item) => sum + Number(item.quantidade || 0), 0);
  const totalDoacoes = doacoes.length;
  const totalEntidades = entidades.length;
  const doadoresUnicos = new Set(doacoes.map((item) => item.doador)).size;

  const produtos = doacoes.reduce((acc, item) => {
    const key = item.produto || 'Sem nome';
    acc[key] = (acc[key] || 0) + Number(item.quantidade || 0);
    return acc;
  }, {});

  const topProdutos = Object.entries(produtos)
    .sort((a, b) => b[1] - a[1])
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
          <h3>Doacoes recebidas</h3>
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
          <h3>Doadores unicos</h3>
          <strong>{doadoresUnicos}</strong>
          <p className="app-muted">Pessoas apoiadoras</p>
        </div>
      </section>

      <section className="app-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>Resumo operacional</h2>
        </div>
        {error && <p className="app-feedback">{error}</p>}
        <div className="app-form-row" style={{ marginTop: 12 }}>
          <div className="app-section">
            <h2>Top produtos</h2>
            {topProdutos.length === 0 ? (
              <p className="app-muted">Nenhum item registrado ainda.</p>
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
            <h2>Doacoes recentes</h2>
            {recentes.length === 0 ? (
              <p className="app-muted">Sem doacoes por enquanto.</p>
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
