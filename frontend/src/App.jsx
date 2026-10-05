import { useEffect, useMemo, useState } from 'react';
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom';
import { FiActivity, FiHome, FiUsers, FiInbox, FiBox, FiShare2, FiArchive } from 'react-icons/fi';
import './App.css';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Cadastro.jsx';
import { AUTH_EXPIRED_EVENT, AUTH_TOKEN_KEY } from './utils/api.js';

const NAV_ITEMS = [
  {
    id: 'dashboard',
    to: '/',
    label: 'Visão geral',
    icon: <FiHome aria-hidden />,
  },
  {
    id: 'entidades',
    to: '/entidades',
    label: 'Entidades',
    icon: <FiUsers aria-hidden />,
  },
  {
    id: 'doacoes',
    to: '/doacoes',
    label: 'Doações',
    icon: <FiInbox aria-hidden />,
  },
  {
    id: 'produtos',
    to: '/produtos',
    label: 'Produtos',
    icon: <FiBox aria-hidden />,
  },
  {
    id: 'distribuicoes',
    to: '/distribuicoes',
    label: 'Distribuições',
    icon: <FiShare2 aria-hidden />,
  },
  {
    id: 'estoque',
    to: '/estoque',
    label: 'Estoque',
    icon: <FiArchive aria-hidden />,
  },
];

const HEADER_COPY = {
  '/': {
    eyebrow: 'Painel de doações',
    title: 'Controle geral das operações',
  },
  '/entidades': {
    eyebrow: 'Gestão institucional',
    title: 'Cadastre e acompanhe entidades parceiras',
  },
  '/doacoes': {
    eyebrow: 'Entradas de doação',
    title: 'Visualize todas as doações registradas',
  },
  '/produtos': {
    eyebrow: 'Cadastro de produtos',
    title: 'Controle itens disponíveis para distribuição',
  },
  '/distribuicoes': {
    eyebrow: 'Registro de distribuições',
    title: 'Acompanhe entregas realizadas pela ONG',
  },
  '/estoque': {
    eyebrow: 'Consulta de estoque',
    title: 'Status atualizado dos itens armazenados',
  },
};

export function App() {
  const [token, setToken] = useState(() => {
    return sessionStorage.getItem(AUTH_TOKEN_KEY);
  });
  const location = useLocation();

  const header = useMemo(() => {
    const normalized = location.pathname === '' ? '/' : location.pathname;
    return HEADER_COPY[normalized] || HEADER_COPY['/'];
  }, [location.pathname]);

  const isCadastroRoute = location.pathname === '/cadastro';

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => setToken(null);
    window.addEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
    return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handleAuthExpired);
  }, [token]);

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
  };

  if (!token) {
    return isCadastroRoute
      ? <Register />
      : <Login onSuccess={(authToken) => setToken(authToken)} />;
  }

  if (isCadastroRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <div className="app-brand">
          <div className="app-logo">OA</div>
          <div>
            <p className="app-title">Onganizer</p>
            <p className="app-subtitle">Gestão estratégica</p>
          </div>
        </div>
        <div className="app-nav-wrap">
          <p className="app-nav-label">Workspace</p>
          <nav className="app-nav">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) => `app-nav-item ${isActive ? 'active' : ''}`}
              >
                <span className="app-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
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
            <p className="app-eyebrow">{header.eyebrow}</p>
            <h1>{header.title}</h1>
          </div>
          <div className="app-header-meta">
            <span className="app-status"><FiActivity aria-hidden /> Painel ativo</span>
            <span className="app-header-date">
              {new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date())}
            </span>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
