# Documentação de Deploy

## Ambiente de execução

O sistema não possui hospedagem web externa. O MVP é validado por execução local reprodutível, sem necessidade de configuração adicional.

---

## Pré-requisitos

| Ferramenta | Versão mínima | Verificação |
|------------|--------------|-------------|
| Java (JDK) | 21 | `java -version` |
| Maven | 3.9 | `mvn -version` |
| Node.js | 20 | `node -version` |
| npm | 10 | `npm -version` |
| Git | qualquer | `git --version` |

---

## Obter o código

```bash
git clone https://github.com/IFSC-ES2/projeto-app_doacao.git
cd projeto-app_doacao
```

---

## Variáveis de ambiente

Nenhuma variável de ambiente é necessária. O backend usa banco H2 em memória, configurado em `backend/src/main/resources/application.properties`.

---

## Backend

Rodar em um terminal dedicado:

```bash
mvn spring-boot:run -f backend/pom.xml
```

Aguardar a mensagem `Started AppDoacaoApplication`.  
API disponível em: `http://localhost:8080`

Ao subir, o `DataLoader` cria automaticamente os usuários de teste. O banco H2 é recriado a cada inicialização.

---

## Frontend

Rodar em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Interface disponível em: `http://localhost:5173`

---

## Credenciais de teste

Criadas automaticamente pelo `DataLoader` ao iniciar o backend:

| Login | E-mail | Senha |
|-------|--------|-------|
| `teste` | `teste@example.com` | `Senha123!` |
| `admin` | `admin@example.com` | `Admin123!` |
| `joao` | `joao@example.com` | `Joao1234!` |

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
| GET | `/entradaDoacao` | Listar doações |
| POST | `/entradaDoacao` | Registrar doação |
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
