import { useState } from 'react';
import './Login.css';

const API_URL = 'http://localhost:8080';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const response = await fetch(`${API_URL}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: email, senha: password }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Login bem-sucedido!');
          localStorage.setItem('token', data.token || 'logado');
          setTimeout(() => window.location.href = '/', 2000);
        } else {
          setError(data.mensagem || 'Erro ao fazer login');
        }
      } else {
        if (password !== confirmPassword) {
          setError('As senhas não conferem');
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            login: email.split('@')[0], 
            email, 
            senha: password 
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage('Cadastro feito com sucesso! Faça login agora.');
          setTimeout(() => setIsLogin(true), 2000);
        } else {
          setError(data.mensagem || 'Erro ao cadastrar');
        }
      }
    } catch (err) {
      setError('Erro de conexão: ' + err.message);
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <svg className="login-logo-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h1 className="login-title">DoaOps</h1>
            <p className="login-subtitle">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </p>
          </div>

          <div className="login-tabs">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`login-tab ${isLogin ? 'login-tab-active' : ''}`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`login-tab ${!isLogin ? 'login-tab-active' : ''}`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-field">
              <label htmlFor="email" className="login-label">
                Email ou usuario
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password" className="login-label">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                placeholder="********"
                required
              />
            </div>

            {!isLogin && (
              <div className="login-field">
                <label htmlFor="confirmPassword" className="login-label">
                  Confirmar senha
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="login-input"
                  placeholder="********"
                  required
                />
              </div>
            )}

            {error && (
              <div style={{ 
                color: '#dc2626', 
                padding: '10px', 
                backgroundColor: '#fee2e2', 
                borderRadius: '4px',
                marginBottom: '10px'
              }}>
                {error}
              </div>
            )}

            {message && (
              <div style={{ 
                color: '#16a34a', 
                padding: '10px', 
                backgroundColor: '#dcfce7', 
                borderRadius: '4px',
                marginBottom: '10px'
              }}>
                {message}
              </div>
            )}

            <button 
              type="submit" 
              className="login-submit"
              disabled={loading}
              style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Enviando...' : (isLogin ? 'Entrar' : 'Criar conta')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}