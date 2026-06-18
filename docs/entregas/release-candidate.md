# Release Candidate - Entrega 9 - Recuperação

**Versão prevista:** `v1.0.0-rc.1`  
**Data da RC:** 15/06/2026  
**Status:** pronta para publicação da Release Candidate  

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
mvn clean -f backend/pom.xml
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

Os comandos abaixo compõem a validação técnica da RC.

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

Status da CI da RC: **configurada.**

Critérios atendidos:

- CI executando em pull requests para `dev` e `main`
- CI executando em push para `main`
- Job de backend executando build e testes
- Job de frontend executando lint, build e testes

## Testes de aceitação

Os testes de aceitação da RC foram registrados em:

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

## Riscos e métricas

Documentos de registro atualizados para a Entrega 9:

- [Registro de Riscos](../riscos.md) — inclui a atualização "Entrega 9 — Release Candidate", com R6 e R7 documentados como riscos aceitos e R2 com a causa do atraso da entrega.
- [Métricas](../metricas/) — cada uma das nove fichas (`metrica-001.md` a `metrica-009.md`) recebeu a seção "Atualização Entrega 9 — Release Candidate", com valores e evidências da RC.

## Limitações conhecidas

As limitações abaixo ficam registradas para esta RC:

1. **Proteção da API por token/sessão**
   - Situação atual: limitação conhecida e aceita.
   - A autenticação controla apenas a navegação no frontend. Os endpoints da API não validam token nas requisições, ou seja, acesso direto via Postman ou curl não é bloqueado.
   - Decisão técnica: a equipe optou por não implementar autenticação stateful na API dado o escopo acadêmico do projeto. A limitação está registrada como R6 em docs/riscos.md.
   - Mitigação futura: implementar filtro de token simples ou Spring Security.

2. **Inconsistência no cálculo de estoque**
   - Situação atual: limitação conhecida e aceita para esta RC.
   - Entradas de doação vinculam produto por nome, enquanto distribuições vinculam por ID, o que pode gerar saldo incorreto.
   - A equipe optou por não corrigir durante a RC devido ao risco de regressão. Registrada como R7 em docs/riscos.md.

3. **Banco H2 em memória**
   - Situação aceita para a RC.
   - Os dados podem ser resetados quando o backend reinicia.
   - Para uso real em produção, será necessário configurar banco persistente.

4. **Escopo de relatórios**
   - Situação aceita para a RC.
   - A versão atual cobre consulta operacional básica, mas não inclui relatórios avançados.

## Critérios de aceitação da RC

- [x] MVP descrito e consolidado neste documento
- [x] Ambiente público validado
- [x] Testes de aceitação executados e registrados
- [x] CI executando em PR e push para `main`
- [x] Riscos atualizados para a Entrega 9
- [x] Métricas atualizadas para a Entrega 9
- [x] Limitações técnicas documentadas ou corrigidas
- [x] Tag `v1.0.0-rc.1` criada
- [x] Release `v1.0.0-rc.1` publicada no GitHub

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

Status da release: **pronta para publicação.**

Quando publicada, a release deve incluir:

- Funcionalidades entregues
- Correções e hardening realizados
- Link para este documento
- Link para testes de aceitação
- Link para documentação de deploy
- Limitações conhecidas
- Evidências de validação da CI
