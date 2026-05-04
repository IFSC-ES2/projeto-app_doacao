# Sprint 1 - Entrega 5

Data da entrega: 04/05/2026

## Escopo da Sprint 1

### Issues planejadas (epic e desdobramentos)
- #17 (epic) - Autenticacao de usuarios
- #38 - API de autenticacao
- #36 - Persistencia de usuarios
- #40 - Testes de unidade da autenticacao
- #42 - Front-end de login/cadastro

### Status
- Concluidas: #38, #36, #40, #42

## Justificativa do vertical slice

O vertical slice escolhido para a Sprint 1 foi a Autenticacao de Usuarios (Issue #17). A escolha se justifica por sua prioridade alta no backlog e por ser o item de maior esforço no planejamento inicial. A funcionalidade e central para o MVP, pois funciona como ponto de entrada do sistema e pre-requisito para as demais funcionalidades de gestao. Implementar o fluxo de login atraves de interface, logica e persistencia permitiu validar a integracao da stack, ajudando a mitigar riscos tecnicos mapeados.

## Incremento funcional entregue

- Fluxo completo de login e cadastro de usuarios
- Camadas envolvidas: interface, logica de aplicacao e persistencia 
- Endpoints: POST /login e POST /register

## Testes de unidade automatizados

- Testes do servico de autenticacao  cobrindo cenarios de sucesso e falha
- Execucao: ./mvnw test (na pasta backend)

## Backlog e board

- Board e backlog: https://github.com/orgs/IFSC-ES2/projects/28
- Issues com criterios de aceitacao no GitHub (referencias: #17, #38, #36, #40, #42)

## Fluxo de trabalho

- Desenvolvimento realizado via branches e Pull Requests
- Revisao e aprovacao de PRs conforme fluxo definido no repositorio

## Contribuicoes individuais

- Isadora Eidt: Implementacao do front-end (Login/Cadastro) e integracao HTTP com a API. Revisao e aprovacao de PRs. Documentacao da release v0.1.0. (Issues: #42 e #17)
- Haydee Murara: Persistencia de dados (Usuario, UsuarioRepository) e configuracao de bancos H2/PostgreSQL. (Issues: #36 e #17)
- Isaac Kozuchovski: Logica de negocio e API REST (AuthService, AuthController) com validacoes. Atualizacao do README. (Issues: #38 e #17)
- Lucas Gabriel: Testes de unidade (AuthServiceTest) com JUnit/Mockito e verificacao da DoD. (Issues: #40 e #17)

## Release

- Tag e release: v0.1.0
