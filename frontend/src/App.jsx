import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiHome, FiUsers, FiInbox } from 'react-icons/fi';
import './App.css';
import { Login } from './pages/Login.jsx';
import { Dashboard } from './pages/Dashboard.jsx';
import { Entidades } from './pages/Entidades.jsx';
import { Doacoes } from './pages/Doacoes.jsx';

const API_URL = 'http://localhost:8080';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    label: 'Visao geral',
    icon: <FiHome aria-hidden />,
  },
  {
    id: 'entidades',
    label: 'Entidades',
    icon: <FiUsers aria-hidden />,
  },
  {
    id: 'doacoes',
    label: 'Entradas de doacao',
    icon: <FiInbox aria-hidden />,
  },
];

export function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [activeView, setActiveView] = useState('dashboard');
  const [entidades, setEntidades] = useState([]);
  const [doacoes, setDoacoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchJson = useCallback(async (path) => {
    const response = await fetch(`${API_URL}${path}`);
    if (!response.ok) {
      throw new Error('Falha ao carregar dados');
    }
    return response.json();
  }, []);

  const refreshEntidades = useCallback(async () => {
    const data = await fetchJson('/entidades');
    setEntidades(Array.isArray(data) ? data : []);
  }, [fetchJson]);

  const refreshDoacoes = useCallback(async () => {
    const data = await fetchJson('/doacoes');
    setDoacoes(Array.isArray(data) ? data : []);
  }, [fetchJson]);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      await Promise.all([refreshEntidades(), refreshDoacoes()]);
    } catch (err) {
      setError(err.message || 'Erro ao atualizar dados');
    } finally {
      setLoading(false);
    }
  }, [refreshEntidades, refreshDoacoes]);

  useEffect(() => {
    if (!token) return;
    refreshAll();
  }, [token, refreshAll]);

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '');
      const valid = NAV_ITEMS.some((item) => item.id === hash);
      setActiveView(valid ? hash : 'dashboard');
    };

    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setActiveView('dashboard');
  };

  const view = useMemo(() => {
    if (activeView === 'entidades') {
      return (
        <Entidades
          items={entidades}
          loading={loading}
          onRefresh={refreshEntidades}
        />
      );
    }
    if (activeView === 'doacoes') {
      return (
        <Doacoes
          items={doacoes}
          loading={loading}
          onRefresh={refreshDoacoes}
        />
      );
    }
    return (
      <Dashboard
        entidades={entidades}
        doacoes={doacoes}
        loading={loading}
        error={error}
        onRefresh={refreshAll}
      />
    );
  }, [activeView, entidades, doacoes, loading, error, refreshAll, refreshEntidades, refreshDoacoes]);

  if (!token) {
    return <Login onSuccess={() => setToken(localStorage.getItem('token'))} />;
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <div className="app-logo">OA</div>
          <div>
            <p className="app-title">Onganizer</p>
            <p className="app-subtitle">Gestao estrategica</p>
          </div>
        </div>
        <nav className="app-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                window.location.hash = item.id;
                setActiveView(item.id);
              }}
              className={`app-nav-item ${activeView === item.id ? 'active' : ''}`}
            >
              <span className="app-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="app-sidebar-footer">
          <div className="app-user">
            <div className="app-avatar">G</div>
            <div>
              <p className="app-user-name">Gestor</p>
              <p className="app-user-role">Administrador</p>
            </div>
          </div>
          <button type="button" className="app-logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </aside>
      <main className="app-main">
        <header className="app-header">
          <div>
            <p className="app-eyebrow">Painel de doacoes</p>
            <h1>Controle geral das operacoes</h1>
          </div>
          <div className="app-actions" />
        </header>
        {view}
      </main>
    </div>
  );
}
