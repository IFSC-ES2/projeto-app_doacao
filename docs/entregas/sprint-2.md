# Sprint 2 — Entrega 6

Data da entrega: 14/05/2026

## Escopo da Sprint 2

### Issues planejadas
- #8 — Cadastro de Entidades Filantrópicas
- #12 — Registro de Entrada de Doações

### Issues de suporte
- #45 - Configurar CI no GitHub Actions
- #46 - Implementar testes de unidade e integração 
- #47 - Documentar padrões OO aplicados
- #48 - Atualizar métricas
- #49 - Atualizar registro de riscos 
- #50 - Criar documento de entrega da Sprint 2
- #51 - Cadastro de Entidades e Registro de Doações (Frontend)
- #53 - Cadastro de Entidades e Registro de Doações (Backend)
- #52 - Publicar release v0.2.0

### Status
- Concluídas: #8, #12, #45, #46, #47, #48, #49, #50, #51, #52, #53

## Incremento funcional entregue

- Fluxo completo de cadastro e listagem de entidades filantrópicas
- Fluxo completo de registro e listagem de entradas de doações
- Camadas envolvidas: interface, lógica de aplicação e persistência
- Endpoints entregues: POST /entidades, GET /entidades, POST /doacoes, GET /doacoes

## Padrões OO aplicados

- **Repository Pattern:** isolamento do acesso ao banco por meio de interfaces de repositório por entidade (EntidadeRepository, EntradaDoacaoRepository). Permite trocar o banco de dados sem alterar a lógica de negócio.
- **Service Layer:** concentração da lógica de negócio em classes de serviço, mantendo os controllers responsáveis apenas pelo tratamento HTTP (EntidadeService, EntradaDoacaoService).

Documentação completa: docs/padroes-de-projeto.md

## Testes incluídos

- Testes de unidade: EntidadeServiceTest, EntradaDoacaoServiceTest
- Testes de integração: EntidadeControllerIntegrationTest, EntradaDoacaoControllerIntegrationTest
- Execução local: `./mvn test` na pasta backend

## Situação do CI

- Workflow configurado em .github/workflows/ci.yml
- Executado automaticamente em todo pull request aberto, atualizado ou reaberto para a dev
- Etapas: checkout, build, testes, validação YAML, verificação de arquivos obrigatórios
- CI verde em todos os pull requests da sprint

### Board e backlog
- Board e backlog: https://github.com/orgs/IFSC-ES2/projects/28

## Fluxo de trabalho

- Desenvolvimento realizado via branches criadas a partir da `dev` e integradas por Pull Requests
- Revisão e aprovação de PRs conforme fluxo definido no repositório
- CI executado automaticamente em cada PR aberto para a `dev`
- Merge da `dev` para a `main` ao final da sprint

## Contribuições individuais

- **Isaac Kozuchovski:** Implementação do backend — models, repositories, services e controllers de Entidade e EntradaDoacao. Documentação dos padrões OO aplicados em docs/padroes-de-projeto.md. (Issues:#47 e #53)
- **Isadora Eidt:** Implementação das telas de cadastro de entidades e registro de doações no frontend. Integração HTTP com a API do backend. Correção do CI após identificação de problemas no pipeline. (Issue: #51)
- **Lucas Gabriel:** Testes de unidade e de integração das novas funcionalidades. Atualização das métricas ao final da sprint. (Issues:#46 e #48)
- **Haydeé Murara:** Configuração do CI no GitHub Actions. Organização das issues e board da sprint. Atualização do registro de riscos. Criação do documento de entrega da sprint. Publicação da release v0.2.0. (Issues: #45, #49, #50 e #52)

## Release

- Tag e release: v0.2.0
