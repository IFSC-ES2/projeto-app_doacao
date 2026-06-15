# Documentação de Deploy

## Ambiente de produção

**Para testar a aplicação:** acesse https://projeto-app-doacao.vercel.app, faça login com as credenciais da tabela e use normalmente. O backend é chamado automaticamente pelo frontend e não precisa ser acessado diretamente.

**Para rodar localmente:** siga as instruções da seção [Execução local](#execução-local) mais abaixo.


| Serviço | Plataforma | URL |
|---------|------------|-----|
| Frontend (acesso principal) | Vercel | https://projeto-app-doacao.vercel.app |
| Backend (API) | Railway | https://projeto-appdoacao-production.up.railway.app |

O banco de dados é H2 em memória: os dados são resetados quando o backend reinicia.

### Credenciais de acesso

| Login | E-mail | Senha |
|-------|--------|-------|
| `teste` | `teste@example.com` | `Senha123!` |
| `admin` | `admin@example.com` | `Admin123!` |
| `joao` | `joao@example.com` | `Joao1234!` |

---

## Variáveis de ambiente

| Variável | Onde | Valor em produção |
|----------|------|-------------------|
| `VITE_API_URL` | Vercel | `https://projeto-appdoacao-production.up.railway.app` |

Localmente nenhuma variável é necessária. O frontend usa `http://localhost:8080` como fallback quando `VITE_API_URL` não está definida.

---

## Execução local

### Pré-requisitos

| Ferramenta | Versão mínima | Verificação |
|------------|--------------|-------------|
| Java (JDK) | 21 | `java -version` |
| Maven | 3.9 | `mvn -version` |
| Node.js | 20 | `node -version` |
| npm | 10 | `npm -version` |
| Git | qualquer | `git --version` |

---

### 1. Clonar o repositório

```bash
git clone https://github.com/IFSC-ES2/projeto-app_doacao.git
cd projeto-app_doacao
```

### 2. Verificar o build do backend

```bash
mvn compile -f backend/pom.xml
```

### 3. Subir o backend

Rodar em um terminal dedicado:

```bash
mvn clean -f backend/pom.xml
mvn spring-boot:run -f backend/pom.xml
```

Aguardar a mensagem `Started AppDoacaoApplication`.  
API disponível em: `http://localhost:8080`

Ao subir, o `DataLoader` cria automaticamente os usuários de teste. O banco H2 é recriado a cada inicialização.

### 4. Instalar dependências do frontend

Rodar em outro terminal:

```bash
cd frontend
npm install
```

### 5. Verificar o build do frontend

```bash
npm run build
```

### 6. Subir o frontend

```bash
npm run dev
```

Interface disponível em: `http://localhost:5173`

---

## Validação do ambiente

### Login via frontend

Acesse `http://localhost:5173` e faça login com qualquer usuário da tabela acima.

### Login via API

```bash
curl -s -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{"login": "admin", "senha": "Admin123!"}'
# Resposta esperada: {"mensagem":"Login bem-sucedido"}
```

### Endpoints disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/login` | Autenticação |
| POST | `/register` | Cadastro de usuário |
| GET | `/entidades` | Listar entidades |
| POST | `/entidades` | Cadastrar entidade |
| GET | `/doacoes` | Listar doações |
| POST | `/doacoes` | Registrar doação |
| GET | `/produtos` | Listar produtos |
| POST | `/produtos` | Cadastrar produto |
| GET | `/distribuicoes` | Listar distribuições |
| POST | `/distribuicoes` | Registrar distribuição |
| GET | `/estoque` | Consultar estoque |

### Console H2 (banco de dados)

Acesse `http://localhost:8080/h2-console` com:

- JDBC URL: `jdbc:h2:mem:doacao`
- Usuário: `sa`
- Senha: (deixar em branco)

---

## Testes automatizados

### Backend

```bash
mvn test -f backend/pom.xml
```

### Frontend

```bash
cd frontend
npm test
npm run lint
```
