import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import './css/Login.css';

const API_URL = 'http://localhost:8080';

function getRegisterErrorMessage(response, data) {
  const rawMessage = String(data?.mensagem || data?.message || '').trim();
  const normalizedMessage = rawMessage.toLowerCase();

  if (!response) {
    return 'Não foi possível concluir o cadastro.';
  }

  if (rawMessage) {
    return rawMessage;
  }

  if (response.status === 409) {
    return 'Este usuário ou email já está em uso.';
  }

  if (response.status === 422 || normalizedMessage.includes('inválid') || normalizedMessage.includes('invalíd') || normalizedMessage.includes('campos')) {
    return 'Confira os dados informados e tente novamente.';
  }

  return 'Não foi possível concluir o cadastro. Tente novamente.';
}

export function Register() {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [tipoMensagem, setTipoMensagem] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensagem('');
    setTipoMensagem('');

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setTipoMensagem('success');
        setMensagem('Cadastro concluído com sucesso.');
        setLogin('');
        setEmail('');
        setSenha('');
        setShowPassword(false);
        setTimeout(() => navigate('/'), 1200);
      } else {
        setTipoMensagem('error');
        setMensagem(getRegisterErrorMessage(response, data));
      }
    } catch {
<<<<<<< HEAD
      setTipoMensagem('error');
      setMensagem('Sem conexão com o servidor. Tente novamente.');
=======
      setMensagem('Erro de conexão com o servidor.');
>>>>>>> 7cf92ea (fix: ajustando arquivos para que passem no lint)
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
            <p className="login-subtitle">Crie sua conta</p>
          </div>

          <form onSubmit={handleRegister} className="login-form">
            <div className="login-field">
              <label htmlFor="login" className="login-label">
                Usuário
              </label>
              <input
                id="login"
                type="text"
                placeholder="nome.usuario"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                className="login-input"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="email-register" className="login-label">
                Email
              </label>
              <input
                id="email-register"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="senha-register" className="login-label">
                Senha
              </label>
              <div className="login-input-wrap">
                <input
                  id="senha-register"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="********"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="login-input"
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

            <p className={`login-feedback ${tipoMensagem ? `is-${tipoMensagem}` : ''}`} aria-live="polite" aria-atomic="true">
              {mensagem}
            </p>

            <button type="submit" className="login-submit">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
