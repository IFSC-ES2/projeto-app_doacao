# Documentação de Deploy

## Ambiente de produção

**Para testar a aplicação:** acesse https://projeto-app-doacao.vercel.app, faça login com as credenciais da tabela e use normalmente. O backend é chamado automaticamente pelo frontend e não precisa ser acessado diretamente.

**Para rodar localmente:** siga as instruções da seção [Execução local](#execução-local) mais abaixo.


| Serviço | Plataforma | URL |
|---------|------------|-----|
| Frontend (acesso principal) | Vercel | https://projeto-app-doacao.vercel.app |
| Backend (API) | Railway | https://projeto-appdoacao-production.up.railway.app |

O banco de dados usado pela aplicação é PostgreSQL persistente. Os dados permanecem após reinícios do backend.

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
| `SPRING_PROFILES_ACTIVE` | Railway | `postgres` |
| `SPRING_DATASOURCE_URL` | Railway | URL JDBC do PostgreSQL provisionado |
| `SPRING_DATASOURCE_USERNAME` | Railway | usuário do PostgreSQL |
| `SPRING_DATASOURCE_PASSWORD` | Railway | senha do PostgreSQL |
| `JWT_SECRET` | Railway/Render | chave aleatória com pelo menos 32 caracteres |
| `JWT_EXPIRATION_MS` | Railway/Render | `86400000` |
| `APP_CORS_ALLOWED_ORIGINS` | Railway/Render | URL do frontend, por exemplo `https://seu-projeto.vercel.app` |

Localmente, o `docker compose` fornece o PostgreSQL com os valores padrão usados pelo backend. O frontend usa `http://localhost:8080` como fallback quando `VITE_API_URL` não está definida.

O backend usa JWT: `/login` e `/register` são públicos; as demais rotas exigem o header `Authorization: Bearer <token>`. Em produção, configure obrigatoriamente `JWT_SECRET` e inclua a URL final do frontend em `APP_CORS_ALLOWED_ORIGINS`.
No Railway, adicione um serviço PostgreSQL ao mesmo projeto e copie dele os valores `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER` e `PGPASSWORD` para as variáveis `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD` do backend. A URL deve seguir o formato `jdbc:postgresql://<host>:<porta>/<banco>`.

### Usar o pooler do Supabase localmente

O backend aceita o pooler compartilhado do Supabase pelas mesmas variáveis de ambiente. O exemplo seguro está em `backend/.env.example`; copie-o para um arquivo local não versionado e preencha a senha apenas na sua máquina:

```bash
cp backend/.env.example backend/.env.local
```

Carregue as variáveis antes de iniciar o backend (ajuste o comando conforme seu shell):

```bash
set -a
. backend/.env.local
set +a
mvn spring-boot:run -f backend/pom.xml
```

Se a senha tiver caracteres especiais, prefira mantê-la em `SPRING_DATASOURCE_PASSWORD`; não é necessário incluí-la na URL JDBC nem fazer percent-encoding manual. Nunca commite `backend/.env.local`.

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
| Docker | 24+ | `docker --version` |
| Docker Compose | 2+ | `docker compose version` |

---

### 1. Clonar o repositório

```bash
git clone https://github.com/IFSC-ES2/projeto-app_doacao.git
cd projeto-app_doacao
```

### 2. Subir o PostgreSQL

Na raiz do projeto, iniciar o banco persistente:

```bash
docker compose up -d postgres
docker compose ps
```

O compose cria o banco `doacao`, com usuário `doacao` e senha `doacao`, e mantém os dados no volume `doacao-postgres-data`.

### 3. Verificar o build do backend

```bash
mvn compile -f backend/pom.xml
```

### 4. Subir o backend

Rodar em um terminal dedicado:

```bash
mvn clean -f backend/pom.xml
mvn spring-boot:run -f backend/pom.xml
```

Aguardar a mensagem `Started AppDoacaoApplication`.
API disponível em: `http://localhost:8080`

Ao subir pela primeira vez, o Hibernate cria/atualiza as tabelas no PostgreSQL e o `DataLoader` cria automaticamente os usuários de teste.

### 5. Instalar dependências do frontend

Rodar em outro terminal:

```bash
cd frontend
npm install
```

### 6. Verificar o build do frontend

```bash
npm run build
```

### 7. Subir o frontend

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

### PostgreSQL (banco da aplicação)

O banco não possui console web habilitado. Para verificar se o container está saudável:

```bash
docker compose exec postgres pg_isready -U doacao -d doacao
```

Em produção, use um PostgreSQL provisionado no Railway e informe as variáveis `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD`.

---

## Testes automatizados

### Backend

```bash
mvn test -f backend/pom.xml
```

O H2 é usado somente durante os testes automatizados; a execução normal usa PostgreSQL.

### Frontend

```bash
cd frontend
npm test
npm run lint
```
