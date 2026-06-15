# Release Candidate - Entrega 9 - Recuperação

**Versão prevista:** `v1.0.0-rc.1`  
**Data da RC:** 15/06/2026  
**Status:** em consolidação para publicação da Release Candidate  

## Objetivo da Release Candidate

Esta Release Candidate consolida o MVP do Sistema de Gestão de Doações para validação final antes da entrega da versão estável.

O objetivo é apresentar uma versão integrada, acessível e testável do sistema, reunindo frontend, backend, deploy, testes de aceitação, documentação final, limitações conhecidas e evidências de validação.

## MVP entregue

O MVP cobre o fluxo essencial de uma ONG que registra doações recebidas, controla estoque e organiza distribuições para entidades cadastradas.

Funcionalidades consolidadas na RC:

- Autenticação de usuários
- Cadastro e listagem de entidades filantrópicas
- Cadastro e listagem de produtos
- Registro e listagem de doações recebidas
- Registro e listagem de distribuições
- Consulta de estoque
- Deploy do frontend em Vercel
- Deploy do backend em Railway
- Testes automatizados de backend e frontend
- Documentação de execução e validação do ambiente

## Itens fora do escopo desta RC

As funcionalidades abaixo permanecem fora do escopo do MVP e podem ser tratadas em evoluções futuras:

- Geração automática de rotas de distribuição
- Relatórios avançados e análises estatísticas
- Integração com sistemas externos
- Aplicativo móvel
- Controle automático de validade dos alimentos
- Cálculo financeiro detalhado das doações
- Automação da montagem de cestas básicas

## Ambiente de teste

| Serviço | Plataforma | URL |
|---------|------------|-----|
| Frontend | Vercel | https://projeto-app-doacao.vercel.app |
| Backend | Railway | https://projeto-appdoacao-production.up.railway.app |

O banco utilizado no ambiente atual é H2 em memória. Por isso, os dados podem ser recriados quando o backend reinicia.

### Credenciais de teste

| Login | E-mail | Senha |
|-------|--------|-------|
| `teste` | `teste@example.com` | `Senha123!` |
| `admin` | `admin@example.com` | `Admin123!` |

## Execução local

### Backend

```bash
mvn spring-boot:run -f backend/pom.xml
```

API local disponível em:

```text
http://localhost:8080
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Interface local disponível em:

```text
http://localhost:5173
```

## Validação técnica

Os comandos abaixo devem ser executados antes da publicação da tag `v1.0.0-rc.1`.

### Backend

```bash
mvn compile -f backend/pom.xml
mvn test -f backend/pom.xml
```

### Frontend

```bash
cd frontend
npm run lint
npm run build
npm test
```

### Integração contínua

Status da CI da RC: **pendente de confirmação após ajuste do workflow para `push` na branch `main`.**

Critérios esperados:

- CI executando em pull requests para `dev` e `main`
- CI executando em push para `main`
- Job de backend executando build e testes
- Job de frontend executando lint, build e testes

## Testes de aceitação

Os testes de aceitação da RC devem ser registrados em:

- `docs/entregas/testes-aceitacao-rc.md`

Fluxos mínimos a validar:

- Login com usuário de teste
- Cadastro e listagem de entidades
- Cadastro e listagem de produtos
- Registro e listagem de doações
- Registro e listagem de distribuições
- Consulta de estoque após entradas e saídas
- Acesso ao sistema pelo ambiente público

Status dos testes de aceitação: **aprovados.**

Documento de registro:

- [Testes de Aceitação da RC](testes-aceitacao-rc.md)

## Limitações conhecidas

As limitações abaixo devem ser confirmadas ou atualizadas antes da publicação da RC:

1. **Proteção da API por token/sessão**
   - Situação atual: limitação conhecida e aceita.
   - A autenticação controla apenas a navegação no frontend. Os endpoints da API não validam token nas requisições, ou seja, acesso direto via Postman ou curl não é bloqueado.
   - Decisão técnica: a equipe optou por não implementar autenticação stateful na API dado o escopo acadêmico do projeto. A limitação está registrada como R6 em docs/riscos.md.
   - Mitigação futura: implementar filtro de token simples ou Spring Security.

2. **Consistência entre doações, produtos e estoque**
   - Situação atual: pendente de revisão técnica.
   - A avaliação apontou que entradas de doação armazenam o produto como texto e que o cálculo de estoque pode misturar fontes diferentes.
   - A equipe deve corrigir o fluxo ou documentar a regra usada e suas limitações.

3. **Banco H2 em memória**
   - Situação aceita para a RC.
   - Os dados podem ser resetados quando o backend reinicia.
   - Para uso real em produção, será necessário configurar banco persistente.

4. **Escopo de relatórios**
   - Situação aceita para a RC.
   - A versão atual cobre consulta operacional básica, mas não inclui relatórios avançados.

## Critérios de aceitação da RC

- [ ] MVP descrito e consolidado neste documento
- [ ] Ambiente público validado
- [ ] Testes de aceitação executados e registrados
- [ ] CI executando em PR e push para `main`
- [ ] Riscos atualizados para a Entrega 9
- [ ] Métricas atualizadas para a Entrega 9
- [ ] Limitações técnicas documentadas ou corrigidas
- [ ] Tag `v1.0.0-rc.1` criada
- [ ] Release `v1.0.0-rc.1` publicada no GitHub

## Responsabilidades na recuperação da Entrega 9

| Pessoa | Responsabilidades |
|--------|-------------------|
| Isadora | Documento da RC, testes de aceitação, consolidação da release e publicação da tag |
| Haydee | CI, validação do deploy, métricas, riscos e evidências de execução |
| Isaac | Hardening técnico do backend, segurança da API, consistência de estoque e testes backend |

## Release

Tag prevista:

```text
v1.0.0-rc.1
```

Status da release: **pendente de publicação.**

Quando publicada, a release deve incluir:

- Funcionalidades entregues
- Correções e hardening realizados
- Link para este documento
- Link para testes de aceitação
- Link para documentação de deploy
- Limitações conhecidas
- Evidências de validação da CI
