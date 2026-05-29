import { useState } from 'react';
import './css/Login.css';

const API_URL = 'http://localhost:8080';

export function Login({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
          localStorage.setItem('token', data.token || 'logado');
          if (onSuccess) {
            onSuccess();
          }
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
          // Registro OK: volta para a aba de login sem mensagem de sucesso
          setIsLogin(true);
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
            <h1 className="login-title">Onganizer</h1>
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
              <div className="input-with-icon">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="login-input"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M9.88 9.88a3 3 0 004.24 4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10.94 5.06C12.23 4.76 13.57 4.75 14.86 5.06c4 1 7 5.02 7 6.94 0 .54-.2 1.2-.47 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                      <path d="M2.99 12.02C4.99 7.99 8.99 5 12 5c3.01 0 7.01 2.99 9.01 7.02-2 4.03-6 7.98-9.01 7.98-3.02 0-7.02-3.95-9.01-7.98z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="login-field">
                <label htmlFor="confirmPassword" className="login-label">
                  Confirmar senha
                </label>
                <div className="input-with-icon">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="login-input"
                    placeholder="********"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword((s) => !s)}
                    aria-label={showConfirmPassword ? 'Esconder senha' : 'Mostrar senha'}
                  >
                    {showConfirmPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.88 9.88a3 3 0 004.24 4.24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10.94 5.06C12.23 4.76 13.57 4.75 14.86 5.06c4 1 7 5.02 7 6.94 0 .54-.2 1.2-.47 1.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M2.99 12.02C4.99 7.99 8.99 5 12 5c3.01 0 7.01 2.99 9.01 7.02-2 4.03-6 7.98-9.01 7.98-3.02 0-7.02-3.95-9.01-7.98z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="login-feedback">
              <div className={`login-error ${error ? 'show' : ''}`} role="alert" aria-live="polite">{error || ''}</div>
            </div>

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