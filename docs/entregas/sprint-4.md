# Sprint 4 — Entrega final
Data da entrega: 08/06/2026

## Escopo da Sprint 4

### Issues planejadas
- #84 [Sprint 4][Deploy] Criar ambiente de staging ou equivalente e documentar em `DEPLOY.md`
- #85 [Sprint 4][CI] Atualizar o workflow para o estado atual do projeto e exigir revisão/aprovação real de PR
- #86 [Sprint 4][Docs][Padrões] Reforçar a justificativa de `Repository Pattern`, `Service Layer` e arquitetura em camadas
- #87 [Sprint 4][Métricas] Atualizar métricas com data atual, valor observado e comparação antes/depois
- #88 [Sprint 4][Backend] Como usuário do sistema, quero registrar e listar entradas de doações pela API, para que o fluxo de doações funcione ponta a ponta
- #89 [Sprint 4][Backend][Security] Como sistema, quero armazenar senhas com hash, para que o login seja seguro
- #90 [Sprint 4][Backend][Tests] Atualizar testes do fluxo de autenticação e das doações
- #91 [Sprint 4][Docs][ADR] Registrar a decisão sobre armazenamento seguro de senhas
- #92 [Sprint 4][Frontend] Corrigir lint e estabilizar os testes do frontend
- #103 [Sprint 4][Frontend][UI] Fazer correções visuais no frontend, com foco em login, cadastro e consistência visual
- #93 [Sprint 4][Docs] Atualizar `README` e alinhar instruções ao estado real do projeto
- #94 [Sprint 4][Docs] Criar o documento da Sprint 4 e consolidar o estado da entrega
- #95 [Sprint 4][Release] Publicar a tag e release `v0.4.0`


### Status
- Concluídas: todas concluídas

## Incremento funcional entregue

- Deploy ou equivalente documentado em `docs/DEPLOY.md`
- Pipeline de CI atualizado para backend e frontend
- Fluxo completo de entradas de doações exposto por API com `GET /doacoes` e `POST /doacoes`
- Senhas armazenadas com hash, sem persistência em texto puro
- Frontend com lint limpo e testes estáveis
- `README` atualizado para refletir o estado real do projeto
- Documento final da Sprint 4 consolidado
- Release `v0.4.0` publicada

## Documentação de arquitetura

### Padrões de projeto
- `Repository Pattern`: reforçado com justificativa de isolamento do acesso a dados por repositório e redução do acoplamento com a persistência.
- `Service Layer`: reforçado como camada responsável pela lógica de negócio, mantendo os controllers focados em HTTP.
- Arquitetura em camadas: consolidada como organização entre interface, domínio/aplicação e persistência, sustentando a evolução do MVP.

### ADRs
- ADR de segurança de senha: registrado para justificar o uso de hash com BCrypt.
- ADRs existentes: mantidos como base da arquitetura e da implementação do MVP.

## Testes incluídos

### Backend
- Testes de autenticação atualizados para o novo fluxo com hash de senha.
- Testes do controller e do serviço de doações atualizados para `GET /doacoes` e `POST /doacoes`.
- Execução local: `mvn test` na pasta `backend`.

### Frontend
- Testes de componente estabilizados para as páginas de produtos, distribuições, doações, estoque e cadastro.
- Execução local: `npm test` na pasta `frontend`.

## Situação do CI

- Workflow atualizado para o estado real do projeto.
- Pipeline cobrindo backend e frontend.
- Frontend com `npm run lint` incluído na validação local da entrega.
- Revisão e aprovação de PR tratadas como parte do fluxo esperado da sprint.

### Board e backlog
- Board e backlog: https://github.com/orgs/IFSC-ES2/projects/28

### Detalhamento da issue de UI
- Revisar a tela de login para sair de mensagens genéricas e mostrar erros mais específicos de autenticação, cadastro e conexão.
- Reduzir o tamanho dos inputs e ajustar espaçamentos, para evitar campos visualmente exagerados e melhorar leitura em telas menores.
- Reintroduzir o controle visual de senha com ícone de olho, permitindo mostrar ou ocultar a senha digitada.
- Revisar estados de erro e sucesso para que fiquem consistentes com os demais formulários do projeto.
- Ajustar alinhamento, largura e responsividade dos componentes de autenticação e cadastro.
- Verificar se outras páginas do frontend também precisam de polimento visual, especialmente formulários e feedbacks que ficaram com estilo genérico.

## Fluxo de trabalho

- Haydeé iniciou a base operacional com deploy, CI, padrões e métricas.
- Isaac implementou a API de doações, a segurança com hash e os testes do backend.
- Isadora corrigiu o frontend, fez correções visuais, atualizou o README, consolidou a documentação final e publicou a release.
- Desenvolvimento realizado via branches e Pull Requests conforme o fluxo do repositório.

## Contribuições individuais

- **Haydeé Murara:** documentação de deploy equivalente, atualização do CI, reforço da justificativa dos padrões de projeto e atualização das métricas.
- **Isaac Kozuchovski:** implementação da API de doações, refatoração da autenticação para BCrypt, atualização dos testes do backend e registro do ADR de segurança.
- **Isadora Eidt:** correção do lint do frontend, estabilização dos testes do frontend, correções visuais do frontend com foco em login/cadastro e consistência visual, atualização do README, criação do documento da Sprint 4 e publicação da release v0.4.0.
- **Lucas Gabriel:** integrante da equipe sem atribuição formal registrada nesta Sprint 4.

## Release

- Tag e release: v0.4.0
