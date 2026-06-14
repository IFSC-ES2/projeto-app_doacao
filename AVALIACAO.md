# Avaliação - Engenharia de Software II

| entrega | aluno             | commit  | data     | correção | nota | peso |
| ------- | ----------------- | ------- | -------- | -------- | ---- | ---- |
| 1       | equipe            | aeb77c0 | 16/03/26 | 20/03/26 | 10   | 2    |
| 2       | equipe            | a5f6c6c | 27/03/26 | 29/03/26 | 9,2  | 2    |
| 3       | equipe            | 772ad96 | 09/04/26 | 22/04/26 | 9,5  | 3    |
| 4       | equipe            | 61b6433 | 16/04/26 | 09/05/26 | 8,8  | 3    |
| 5       | Haydee Murara     | 2f9c875 | 04/05/26 | 24/05/26 | 7,4  | 10   |
| 5       | Isaac Kozuchovski | 2f9c875 | 04/05/26 | 24/05/26 | 7,7  | 10   |
| 5       | Isadora Eidt      | 2f9c875 | 04/05/26 | 24/05/26 | 7,6  | 10   |
| 5       | Lucas Gabriel     | 2f9c875 | 04/05/26 | 24/05/26 | 7,5  | 10   |
| 6       | Haydee Murara     | 13fdc75 | 15/05/26 | 27/05/26 | 4,8  | 10   |
| 6       | Isaac Kozuchovski | 13fdc75 | 15/05/26 | 27/05/26 | 5,0  | 10   |
| 6       | Isadora Eidt      | 13fdc75 | 15/05/26 | 27/05/26 | 3,5  | 10   |
| 6       | Lucas Gabriel     | 13fdc75 | 15/05/26 | 27/05/26 | 4,5  | 10   |
| 7       | Haydee Murara     | 50aa521 | 28/05/26 | 03/06/26 | 7,4  | 10   |
| 7       | Isaac Kozuchovski | 50aa521 | 28/05/26 | 03/06/26 | 7,6  | 10   |
| 7       | Isadora Eidt      | 50aa521 | 28/05/26 | 03/06/26 | 7,0  | 10   |
| 7       | Lucas Gabriel     | 50aa521 | 28/05/26 | 03/06/26 | 0,0  | 10   |
| 8       | Haydee Murara     | 89fe3ef | 08/06/26 | 11/06/26 | 8,6  | 10   |
| 8       | Isaac Kozuchovski | 89fe3ef | 08/06/26 | 11/06/26 | 8,8  | 10   |
| 8       | Isadora Eidt      | 89fe3ef | 08/06/26 | 11/06/26 | 8,7  | 10   |
| 8       | Lucas Gabriel     | 89fe3ef | 08/06/26 | 11/06/26 | 0,0  | 10   |
| 9       | Haydee Murara     | 89fe3ef | 08/06/26 | 14/06/26 | 5,2  | 10   |
| 9       | Isaac Kozuchovski | 89fe3ef | 08/06/26 | 14/06/26 | 5,3  | 10   |
| 9       | Isadora Eidt      | 89fe3ef | 08/06/26 | 14/06/26 | 5,2  | 10   |
| 9       | Lucas Gabriel     | 89fe3ef | 08/06/26 | 14/06/26 | 0,0  | 10   |
| 10      |                   |         |          |          |      | 10   |
| 11/12   |                   |         |          |          |      | 30   |

## Nota parcial

| aluno             | nota parcial |
| ----------------- | ------------ |
| Haydee Murara     | 7,1          |
| Isaac Kozuchovski | 7,3          |
| Isadora Eidt      | 6,9          |
| Lucas Gabriel     | 3,6          |

## Comentários

### Entrega 1

1. Equipe formada: atendido.
2. Tema definido: atendido.
3. MVP inicial: atendido.
4. Repositório, README e governança mínima: atendido.

### Entrega 2

1. Visão do produto: atendido.
2. Definição do MVP: atendido.
3. Backlog inicial com critérios de aceitação: parcial.
   - Há sete funcionalidades definidas no MVP, mas apenas quatro delas estavam no backlog/board.
   - Não foram definidas prioridades para todas as funcionalidades.
   - As histórias não seguiram de forma consistente o formato: Como [`tipo de usuário`], quero [`funcionalidade`], para [`benefício`].
4. Definition of Done: atendido.
5. ADRs iniciais: atendido.
6. README atualizado: atendido.
7. Governança: parcial.
   - A equipe definiu regras de proteção da branch principal, mas elas ainda não estavam evidenciadas como ativas.

### Entrega 3

1. Planejamento inicial e baseline: parcial.
   - O baseline foi registrado, mas faltou informar claramente a data do registro.
2. Abordagem de estimativa: atendido.
3. Capacidade planejada da equipe: atendido.
4. Definição das métricas acompanhadas: atendido.
5. Fichas das métricas: parcial.
   - As fichas deveriam estar separadas por métrica, com data do acompanhamento e valor coletado.
   - A nomenclatura das métricas poderia usar nomes mais consagrados, como `Feature Completion Rate`, `Defect Count`, `Test Pass Rate`, `Velocity`, `Sprint Completion Rate`, `Average Lead Time`, `Team Capacity`, `Planned vs. Completed Variance` e `Overdue Task Rate`.

### Entrega 4

1. Registro inicial de riscos: atendido.
2. Análise e priorização dos riscos: atendido.
3. Plano de resposta aos riscos: atendido.
4. Consolidação do fluxo de trabalho no repositório: não atendido.
   - As regras de proteção da branch principal e o fluxo descrito em `fluxo-de-trabalho.md` ainda não estavam implementados/evidenciados no repositório.
5. Critérios de qualidade: atendido.
6. Relação entre riscos e qualidade: atendido.
7. Definição preliminar de avaliação da qualidade: atendido.
8. Documentação do projeto: atendido.

### Entrega 5

1. Primeiro incremento funcional: parcial.
   - Foi implementado um vertical slice de autenticação, com telas de login/cadastro, endpoints `POST /login` e `POST /register`, lógica de aplicação e persistência em H2.
   - O incremento era coerente com o MVP, mas a execução documentada com `./mvnw spring-boot:run` falhava pela ausência de arquivos do Maven Wrapper.
   - A autenticação armazenava e comparava senha em texto puro em `AuthService`, fragilidade técnica relevante mesmo para MVP.
2. Testes automatizados: parcial.
   - Havia testes de `AuthService`, mas o comando documentado `./mvnw test` falhava pela ausência do wrapper completo.
   - Não havia testes de frontend.
3. Escopo da sprint: atendido.
4. Backlog e board: parcial.
   - As issues tinham critérios de aceitação, mas a rastreabilidade entre issue, PR, revisão e commit ainda era incompleta.
5. Fluxo de trabalho: parcial.
   - Houve uso de branches e PRs, mas os PRs verificados não tinham aprovação registrada.
6. Registro individual: atendido.
   - Haydee: persistência de usuários, `UsuarioRepository`, banco H2/PostgreSQL e estrutura do backend; nota limitada pelo problema de reprodutibilidade.
   - Isaac: lógica central de autenticação, API REST e README; nota limitada pela execução documentada e senha em texto puro.
   - Isadora: telas de login/cadastro, integração HTTP, documentação e release; nota limitada por falha de lint e revisões não evidenciadas.
   - Lucas: testes unitários de autenticação e verificação da DoD; nota limitada porque a suíte não era executável pelo comando documentado na tag.
7. Release: atendido com atraso.
   - A tag `v0.1.0` existia no commit `2f9c875`, com release publicada em 04/05/2026.

### Entrega 6

1. Incremento funcional do MVP: parcial.
   - As funcionalidades declaradas eram cadastro de entidades e registro de entrada de doações.
   - Cadastro/listagem de entidades estava implementado no backend, mas não era utilizável no frontend da tag avaliada.
   - Registro/listagem de doações não estava funcionalmente entregue: não havia controller/endpoints de doações nem telas finais de doações no frontend.
   - A documentação e a release afirmavam telas e endpoints que não existiam no estado final.
2. Testes automatizados: parcial.
   - Havia testes para entidades e parte das regras de entrada de doações, mas não havia `EntradaDoacaoControllerIntegrationTest` nem testes de frontend.
3. Integração contínua mínima: parcial.
   - O workflow rodava apenas para PRs contra `dev`; PRs relevantes contra `main` não tiveram checks.
   - O pipeline não executava build/lint/testes do frontend.
   - `npm run lint` falhava na tag por variável não usada em `frontend/src/pages/Cadastro.jsx`.
4. Pull requests com revisão: não atendido.
   - A maioria dos PRs verificados não tinha aprovação registrada; alguns checklists deixavam revisão desmarcada.
5. Padrões OO: parcial.
   - Repository Pattern e Service Layer foram documentados e aplicados, mas de forma básica e sem ADR própria no diretório `adrs/`.
6. Métricas: não atendido.
   - Seis das nove métricas ainda tinham valores em branco e faltava análise planejado versus executado.
7. Riscos: atendido.
8. Release: parcial.
   - A release `v0.2.0` existia, mas descrevia funcionalidades de frontend e endpoints de doações que não estavam presentes.
9. Registro individual: parcial.
   - Haydee: CI, documentação da sprint, riscos e release; limitada por CI incompleto e documentação divergente.
   - Isaac: backend e documentação de padrões; contribuição relevante, mas limitada por ausência de controller de doações e documentação superestimada.
   - Isadora: telas que foram removidas/revertidas antes da tag `v0.2.0`; no estado avaliado o frontend não entregava as funcionalidades centrais.
   - Lucas: testes e métricas; contribuição relevante, mas parte dos testes foi revertida e as métricas permaneceram incompletas.

### Entrega 7

1. Incremento funcional da Sprint 3: parcial.
   - Funcionalidades declaradas para entrega na Sprint 3:
     - #10 — Cadastro de Produtos
     - #19 — Registro de Distribuições
     - #13 — Consulta de Estoque
   - Foram entregues backend e frontend para produtos, distribuições e consulta de estoque.
   - Existem endpoints `GET/POST /produtos`, `GET/POST /distribuicoes` e `GET /estoque`.
   - A listagem/cadastro de doações declarada não está completa: o frontend chama `GET /doacoes` e `POST /doacoes`, mas não existe controller/endpoints `/doacoes` no backend.
   - O cadastro de produto no frontend tenta registrar uma doação inicial em `POST /doacoes`; portanto o fluxo de produto pode criar o produto e depois falhar ao registrar a doação, deixando comportamento inconsistente para o usuário.
   - A consulta de estoque mistura `Produto.quantidadeEstoque`, entradas de `EntradaDoacaoRepository` e distribuições; como não há endpoint para entradas/doações, o saldo calculado pode não refletir corretamente o fluxo disponível pela interface.
   - A issue `#19` marca endpoint de listagem de doações como concluído, mas esse endpoint não existe no backend.
   - Os PRs `#75` e `#77` tiveram checks verdes, mas não tinham aprovação registrada em `latestReviews`.
2. Documentação de arquitetura: atendido.
3. ADRs consolidados: parcial.
   - A justificativa não aparece como seção explícita e a revisão dos ADRs existentes é pouco substancial, mas há evidência suficiente de consolidação básica.
4. Atualização das métricas: parcial.
   - As nove métricas foram separadas em arquivos e receberam valores coletados em 28/05/2026.
   - Falta comparação consistente com os valores anteriores e análise planejado versus executado; algumas seções ainda estão intituladas como `Análise da Sprint 2`.
   - Há valores pouco críveis ou mal explicados, como `Percentual de Conclusão do MVP` de 100% apesar do endpoint de doações ausente e `Capacidade da Equipe` de 3 horas.
   - A interpretação para a métrica 3 (`Taxa de Aprovação nos Testes`) deve ser "Se chegar perto de 100%, quer dizer que quase tudo que foi **testado** está funcionando."
   - A definição para a métrica 4 (`Velocidade`) deve ser "Soma dos story points das tarefas concluídas **na sprint**."
5. Testes automatizados integrados ao pipeline: parcial.
   - Há testes de unidade e integração no backend para produtos/distribuições e testes de componentes no frontend.
   - A cobertura não detecta a ausência real dos endpoints `/doacoes`, pois os testes de frontend usam mocks de `fetch` e não validam contrato com o backend.
6. Integração contínua mínima: atendido.
   - O CI não executa `npm run lint`; por isso os problemas estáticos do frontend não bloqueiam PRs.
7. Release/tag do marco: atendido.
   - A tag `v0.3.0` existe e a release `Sprint 3` descreve incremento, testes, CI e documentação.
   - A descrição da release superestima a entrega ao afirmar listagem de doações integrada, pois o backend não expõe `/doacoes`.
8. Registro de contribuição individual: parcial.
   - Haydee: contribuição relevante em CI, configuração de testes frontend e testes backend de produto/distribuição. Nota limitada porque PRs próprios sem aprovação registrada reduzem a evidência de revisão e os testes não capturam a quebra de contrato `/doacoes`.
    - Isaac: principal contribuição em backend de produto/distribuição, correção de estoque, documentação C4/ADRs, métricas, README, sprint e release. Nota limitada pela ausência dos endpoints de doações, inconsistência funcional do estoque/doações e métricas frágeis.
    - Isadora: contribuição relevante em frontend, roteamento e testes de componentes. Nota limitada porque parte importante do frontend depende de endpoints inexistentes, o lint falha com muitos erros e os testes usam mocks que não evidenciam integração real com a API.
    - Lucas: não há commits de Lucas no intervalo `v0.2.0..v0.3.0`, ele não aparece no registro de contribuições de `entregas/sprint-3.md` e não foram encontradas evidências de PRs, reviews, testes ou documentação atribuídos a ele nesta entrega.

### Entrega 8

1. Ambiente de staging ou equivalente acessível: atendido.
   - `DEPLOY.md` informa frontend em Vercel (`https://projeto-app-doacao.vercel.app`) e backend em Railway (`https://projeto-appdoacao-production.up.railway.app`).
   - O frontend público respondeu e o login documentado no backend (`admin` / `Admin123!`) retornou `Login bem-sucedido`.
   - A raiz do backend retorna 404, o que é aceitável para API sem rota raiz, pois os endpoints documentados estão sob caminhos específicos.
2. Manutenção e atualização da integração contínua: atendido.
   - `.github/workflows/ci.yml` roda em PRs para `dev` e `main`, separando jobs de backend e frontend.
   - O workflow executa `mvn compile`, `mvn test`, `npm run lint`, `npm run build` e `npm test`.
   - Verificação local: `mvn test -f backend/pom.xml` passou com 84 testes; `npm run lint`, `npm test` (5 arquivos, 15 testes) e `npm run build` passaram.
   - Não foi possível confirmar aprovações/checks diretamente via GitHub porque `gh` falhou por timeout de rede durante a correção; localmente há histórico de merges de PRs da Sprint 4.
3. Documentação de deploy: atendido.
   - `DEPLOY.md` registra URLs, credenciais, variável `VITE_API_URL`, pré-requisitos, comandos de build/execução, testes e validação por API.
   - A execução local encontrou interferência de artefato antigo em `backend/target/classes/data.sql`, causando login 401 e aviso `Encoded password does not look like BCrypt`; a correção ambiental é executar `mvn clean -f backend/pom.xml` antes de `mvn spring-boot:run -f backend/pom.xml`.
   - Esse problema não foi considerado falha direta da entrega porque o artefato não está no código-fonte rastreado e a implantação pública autenticou corretamente.
4. Atualização das métricas do projeto: parcial.
   - As métricas foram atualizadas para 08/06/2026 e incluem comparação com Sprint 3.
   - Alguns arquivos ainda mantêm seções antigas intituladas `Análise da Sprint 2`, e valores como 100% de conclusão do MVP e 44 pontos dependem de evidências externas do board, não verificáveis localmente.
5. Manutenção/reengenharia: atendido.
   - A refatoração de autenticação para BCrypt resolve problema real de segurança e manutenção identificado anteriormente.
   - `adrs/ADR-0007-armazenamento-seguro-de-senhas.md` registra contexto, decisão, alternativas e consequências.
   - A evidência é tecnicamente relevante, embora o `PasswordEncoder` seja instanciado diretamente em `AuthService` em vez de ser configurado como bean, o que reduz flexibilidade/testabilidade.
   - Como evidência funcional associada, foram adicionados endpoints `GET /doacoes` e `POST /doacoes`, corrigindo a inconsistência registrada na Entrega 7.
   - A autenticação passou a usar BCrypt em `AuthService`, removendo a fragilidade de senha em texto puro para novos cadastros e usuários criados pelo `DataLoader`.
   - O frontend foi ajustado para lint limpo, paginação, busca, exclusão de produtos, sessão em `sessionStorage` e fluxo de doações/produtos mais consistente.
6. Comparação de métrica antes/depois: parcial.
   - Há comparação antes/depois da refatoração em `metrica-003.md`, mas ela mede adaptação dos testes ao BCrypt, não uma métrica direta de design/manutenibilidade ou segurança.
7. Release/tag do marco: atendido.
   - A tag `v0.4.0` existe e aponta para `89fe3ef`, commit de merge da entrega.
   - A descrição da release não pôde ser consultada por `gh` devido a timeout de rede, mas `entregas/sprint-4.md` registra a publicação da release.
8. Registro de contribuição individual: parcial.
   - `entregas/sprint-4.md` discrimina contribuições de Haydeé, Isaac e Isadora e registra Lucas sem atribuição formal.
   - Commits no intervalo `v0.3.0..v0.4.0` confirmam contribuições de Haydeé em deploy/CI/métricas/teste de integração, Isaac em API de doações/BCrypt/ADR e Isadora em frontend/documentação/ajustes de lint.
   - Não há commits, atribuição formal ou evidência local de participação de Lucas na Sprint 4.
Notas individuais:
   - Haydee: responsável por deploy, CI, métricas, documentação de padrões e teste de integração de doações; nota limitada por métricas ainda parcialmente frágeis e por não haver confirmação de reviews/checks via GitHub no momento da correção.
   - Isaac: responsável pela entrega central de backend, endpoints de doações, refatoração de autenticação para BCrypt e ADR; nota limitada pela implementação ainda simples da autenticação e por não configurar `PasswordEncoder` como componente reutilizável.
    - Isadora: responsável pelo volume de correções no frontend, lint, testes, documentação da sprint, README e preparação da release; nota limitada porque parte das evidências de release/review não pôde ser validada via GitHub e algumas mudanças de frontend extrapolam o foco obrigatório.
    - Lucas: nota zero na entrega porque a própria documentação da equipe registra ausência de atribuição formal e não foram encontradas evidências rastreáveis de commits, PRs, reviews, testes ou documentação atribuídos a ele na Sprint 4.

### Entrega 9

1. MVP completo e integrado: parcial.
   - O sistema possui autenticação, entidades, produtos, doações, distribuições e consulta de estoque, com frontend, backend e deploy acessível.
   - A aplicação pública respondeu em Vercel e o backend em Railway autenticou `admin` / `Admin123!` com sucesso.
   - A execução local também funcionou após limpeza do backend: `mvn spring-boot:run -f backend/pom.xml` e `npm run dev` responderam, e o login documentado passou.
   - Persistem fragilidades técnicas importantes para uma RC: os endpoints da API continuam sem proteção real por token/sessão; a autenticação controla apenas a navegação no frontend; entradas de doação armazenam o produto como texto, não como relação com `Produto`; e o cálculo de estoque mistura `Produto.quantidadeEstoque`, entradas por nome e distribuições por entidade, podendo gerar inconsistências.
   - O backlog/board é referenciado no README e na documentação, mas não há documento final da RC indicando claramente itens concluídos, removidos e pendentes nem justificativa formal dos critérios de aceitação das funcionalidades principais.
2. Hardening do sistema: parcial.
   - Há correções relevantes herdadas da Sprint 4, como BCrypt, endpoints `/doacoes`, lint limpo, paginação, busca, exclusão de produtos e ajustes visuais.
   - Essas correções estão registradas em issues/PRs/commits da Sprint 4, com checks e aprovações em PRs como `#96`, `#97`, `#99`, `#100`, `#101`, `#105`, `#108`, `#111`, `#113` e `#114`.
   - Não há evidência de hardening específico da Entrega 9: nenhum PR, commit, issue ou documento de RC posterior a `v0.4.0` foi encontrado.
3. Integração contínua obrigatória: parcial.
   - `.github/workflows/ci.yml` executa backend e frontend em pull requests para `dev` e `main`, com `mvn compile`, `mvn test`, `yamllint`, verificação de arquivos obrigatórios, `npm run lint`, `npm run build` e `npm test`.
   - O GitHub mostra PRs da Sprint 4 com checks verdes e aprovações, por exemplo `#114` com jobs `backend` e `frontend` concluídos com sucesso.
   - Localmente, `mvn test -f backend/pom.xml` passou com 84 testes; `npm run lint`, `npm test` (5 arquivos, 15 testes) e `npm run build` passaram.
   - O workflow não está configurado para `push` na branch principal, apenas para `pull_request`, então não atende ao requisito de execução automática em alterações na branch principal.
   - Não há checks/PRs específicos da Entrega 9, apenas evidências da Sprint 4.
4. Testes de aceitação: não atendido.
   - Não foram encontrados arquivos, checklists, logs ou documentação de testes de aceitação para a Release Candidate.
   - Os testes automatizados existentes cobrem unidades, integração de controllers e componentes frontend, mas não há associação explícita com critérios de aceitação das issues/histórias principais nem registro de resultado aprovado/reprovado/aprovado com ressalvas.
5. Ambiente de execução acessível: atendido.
   - `DEPLOY.md` informa frontend em `https://projeto-app-doacao.vercel.app` e backend em `https://projeto-appdoacao-production.up.railway.app`.
   - O frontend público respondeu HTTP 200 e o backend público autenticou o usuário `admin` com sucesso.
   - O documento inclui credenciais de teste, endpoints disponíveis, dados mínimos via `DataLoader` e instruções de execução local.
6. Revisão final da documentação: parcial.
   - README, DEPLOY, C4, ADRs, métricas, padrões e riscos existem e estavam suficientes para a Sprint 4.
   - Não há revisão final específica da RC, documento de limitações conhecidas, nem indicação consolidada do MVP entregue para apresentação.
   - `riscos.md` ainda termina na atualização da Sprint 2 e mantém como risco ativo a ausência de JWT, sem atualização final para a RC.
   - As métricas foram atualizadas para 08/06/2026, mas não há coleta ou análise específica da Entrega 9.
7. Release Candidate: não atendido.
   - A entrega 9 exigia uma Release Candidate com tag `v1.0.0-rc.1`.
   - A maior tag existente no repositório é `v0.4.0`, apontando para `89fe3ef`, já usada como base da Entrega 8.
   - A avaliação foi feita sobre `v0.4.0` por ser a maior tag disponível, mas a ausência da tag de RC é falha central da entrega.
   - Não existe tag `v1.0.0-rc.1` nem release de RC.
   - Não há descrição de RC com funcionalidades entregues, correções, limitações conhecidas e ambiente de teste.

Registro de contribuição individual: parcial para a base herdada, não atendido para a Entrega 9.
   - Não há contribuições de estudantes depois de `v0.4.0`; portanto, não há evidência rastreável de trabalho específico para Release Candidate.
   - No intervalo `v0.4.0..main` há apenas o commit de avaliação anterior (`ca10953`).
   - As notas consideram a base funcional herdada da Sprint 4, mas são limitadas pela ausência da entrega formal de RC, dos testes de aceitação e de documentação final.
   - Haydee: contribuição anterior relevante em deploy, CI, métricas, documentação de padrões e testes de integração; nota limitada porque não há contribuição ou evidência específica de RC.
   - Isaac: contribuição anterior central no backend, endpoints de doações, BCrypt e ADR de segurança; recebe nota ligeiramente maior pela importância dessas partes para o MVP integrado, mas também sem evidência específica de RC.
   - Isadora: contribuição anterior relevante no frontend, lint, testes, ajustes visuais, README, documentação e release da Sprint 4; nota limitada pela ausência da release candidate e dos testes de aceitação.
   - Lucas: nota zero porque a documentação da Sprint 4 já indicava ausência de atribuição formal e novamente não foram encontrados commits, PRs, reviews, testes, documentação ou qualquer evidência rastreável de participação na Entrega 9.
