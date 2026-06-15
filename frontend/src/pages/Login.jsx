import { useMemo, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './css/Login.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function getAuthErrorMessage(response, data, mode) {
  const rawMessage = String(data?.mensagem || data?.message || '').trim();
  const normalizedMessage = rawMessage.toLowerCase();

  if (!response) {
    return 'Não foi possível concluir a operação.';
  }

  if (rawMessage) {
    return rawMessage;
  }

  if (response.status === 401 || response.status === 403 || normalizedMessage.includes('senha') || normalizedMessage.includes('credencial')) {
    return mode === 'login'
      ? 'Email, usuário ou senha inválidos.'
      : 'Não foi possível validar seus dados.';
  }

  if (response.status === 404 || normalizedMessage.includes('não encontrado') || normalizedMessage.includes('nao encontrado')) {
    return mode === 'login'
      ? 'Conta não encontrada. Verifique seu email ou usuário.'
      : 'Não foi possível localizar os dados informados.';
  }

  if (response.status === 422 || normalizedMessage.includes('inválid') || normalizedMessage.includes('invalíd') || normalizedMessage.includes('campos')) {
    return 'Confira os campos informados e tente novamente.';
  }

  if (response.status === 429) {
    return 'Muitas tentativas. Aguarde alguns instantes e tente de novo.';
  }

  if (mode === 'login') {
    return 'Não foi possível fazer login. Tente novamente.';
  }

  return 'Não foi possível concluir o cadastro. Tente novamente.';
}

function getNetworkErrorMessage(mode) {
  return mode === 'login'
    ? 'Sem conexão com o servidor. Verifique sua internet e tente novamente.'
    : 'Sem conexão com o servidor. Não foi possível concluir o cadastro.';
}

export function Login({ onSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const feedback = useMemo(() => {
    if (error) {
      return { type: 'error', text: error };
    }

    if (message) {
      return { type: 'success', text: message };
    }

    return { type: '', text: '' };
  }, [error, message]);

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
          setMessage('Login realizado com sucesso.');
          setTimeout(() => {
            if (typeof onSuccess === 'function') {
              onSuccess();
              return;
            }

            window.location.href = '/';
          }, 1200);
        } else {
          setError(getAuthErrorMessage(response, data, 'login'));
        }
      } else {
        if (password !== confirmPassword) {
          setError('As senhas informadas não conferem.');
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
          setMessage('Cadastro concluído. Faça login para continuar.');
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setShowPassword(false);
          setShowConfirmPassword(false);
          setTimeout(() => {
            setIsLogin(true);
            setMessage('');
          }, 1400);
        } else {
          setError(getAuthErrorMessage(response, data, 'register'));
        }
      }
    } catch (err) {
      setError(getNetworkErrorMessage(isLogin ? 'login' : 'register'));
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
              onClick={() => {
                setIsLogin(true);
                setError('');
                setMessage('');
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className={`login-tab ${isLogin ? 'login-tab-active' : ''}`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                setError('');
                setMessage('');
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
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
              <div className="login-input-wrap">
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
                  className="login-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="login-field">
                <label htmlFor="confirmPassword" className="login-label">
                  Confirmar senha
                </label>
                <div className="login-input-wrap">
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
                    className="login-password-toggle"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    aria-label={showConfirmPassword ? 'Ocultar confirmação de senha' : 'Mostrar confirmação de senha'}
                    aria-pressed={showConfirmPassword}
                  >
                    {showConfirmPassword ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                  </button>
                </div>
              </div>
            )}

            <p
              className={`login-feedback ${feedback.type ? `is-${feedback.type}` : ''}`}
              aria-live="polite"
              aria-atomic="true"
            >
              {feedback.text}
            </p>

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
