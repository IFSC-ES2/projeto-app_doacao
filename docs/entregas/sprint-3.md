# Sprint 3 — Entrega 7
Data da entrega: 28/05/2026

## Escopo da Sprint 3

### Issues planejadas
- #10 — Cadastro de Produtos
- #19 — Registro de Distribuições
- #13 — Consulta de Estoque

### Issues de suporte
- #67 - Configurar Vitest no frontend
- #65 - Refatorar CI
- #72 - Backend de Produto e Distribuição
- #68 - Testes de Backend Produto e Distribuição
- #78 - Correção da atualização de estoque
- #69 - Roteamento React router
- #70 - Telas de Produto, Distribuições, Estoque e Doações
- #71 - Testes das telas de frontend
- #73 - C4 e ADRS
- #74 - Métricas e Readme

### Status
- Concluídas: Todas concluídas

## Incremento funcional entregue
- Fluxo completo de cadastro e listagem de produtos
- Fluxo completo de registro e listagem de distribuições
- Consulta de estoque com cálculo dinâmico 
- Listagem e consulta de doações com filtro por produto ou doador
- Camadas envolvidas: interface, lógica de aplicação e persistência
- Endpoints entregues: POST /produtos, GET /produtos, POST /distribuicoes, GET /distribuicoes, GET /estoque

## Documentação de arquitetura

### Diagramas C4
- **Visão de Contexto**: diagrama Mermaid mostrando o ator Funcionário da ONG e o sistema como caixa preta.
- **Visão de Contêineres**: diagrama Mermaid com Frontend React (porta 5173) → Backend Spring Boot (porta 8080) → PostgreSQL/H2, com explicação textual de cada componente, suas responsabilidades, dependências e seção "Como a arquitetura apoia o MVP".

### ADRs
- ADR-0001 a ADR-0005: revisados com atualização de status onde necessário.
- ADR-0006: criado em `docs/adrs/ADR-0006-testes-frontend.md — documenta a decisão pelo uso de Vitest + React Testing Library para testes do frontend React, com contexto, decisão, justificativa (integração nativa com Vite, mesma configuração de build) e consequências positivas e negativas.

## Testes incluídos

### Backend
- Testes de unidade: ProdutoServiceTest, DistribuicaoServiceTest
- Testes de integração: ProdutoControllerIntegrationTest, DistribuicaoControllerIntegrationTest
- Execução local: mvn test na pasta backend

### Frontend
- Testes de componente: Produtos.test.jsx, Distribuicoes.test.jsx, Estoque.test.jsx, Doacoes.test.jsx
- Execução local: npm test na pasta frontend

## Situação do CI
- Workflow refatorado em `.github/workflows/ci.yml` com dois jobs independentes: `backend` (Java 21 + Maven) e `frontend` (Node 20 + npm)
- Branch `main` adicionada ao trigger do pipeline (anteriormente cobria apenas `dev`)
- Job backend: checkout → Java 21 → `mvn dependency:resolve` → `mvn compile` → `mvn test` → yamllint → verificação de arquivos obrigatórios
- Job frontend: checkout → Node 20 → `npm install` → `npm run build` → `npm test`
- Branch protection ativada na `main`: merge bloqueado caso o check de CI não passe
- CI verde em todos os pull requests da sprint

### Board e backlog
- Board e backlog: https://github.com/orgs/IFSC-ES2/projects/28

## Fluxo de trabalho
- PR de refatoração do CI (`refactor/ci-pipeline`) aberto primeiro, garantindo pipeline completo para os demais PRs
- Desenvolvimento realizado via branches criadas a partir da `dev` e integradas por Pull Requests
- Testes de backend escritos após integração do PR `feature/backend-sprint3` na `main`
- Testes de frontend escritos após configuração do Vitest pela Haydée (`refactor/ci-pipeline` integrado)
- Integração do frontend com a API realizada após aprovação do PR de backend
- Revisão e aprovação de PRs conforme fluxo definido no repositório
- CI executado automaticamente em cada PR aberto para a dev
- Merge da dev para a main ao final da sprint

## Contribuições individuais
- **Isaac Kozuchovski:** Implementação do backend: models, repositories, services e controllers de Produto e Distribuicao. Diagramas C4 de contexto e contêineres. Revisão dos ADRs existentes (ADR-0001 a ADR-0005) e criação do ADR-0006. Atualização das métricas e criação do comparativo Sprint 2 - Sprint 3. Atualização do README. Criação do documento sprint-3.md. Publicação da release v0.3.0.
- **Isadora Eidt:** Implementação das telas de Cadastro de Produtos, Registro de Distribuições, Consulta de Estoque e Listagem de Doações no frontend. Roteamento com React Router. Integração HTTP com a API do backend. Testes das páginas frontend com Vitest e React Testing Library. 
- **Haydeé Murara:** Refatoração do pipeline CI com separação em jobs de backend e frontend e cobertura da branch main. Configuração do ambiente de testes Vitest no frontend (dependências, script test e bloco test no vite.config.js). Ativação da branch protection na main. Testes de unidade (ProdutoServiceTest, DistribuicaoServiceTest) e de integração (ProdutoControllerIntegrationTest, DistribuicaoControllerIntegrationTest) do backend. 

## Release
- Tag e release: v0.3.0