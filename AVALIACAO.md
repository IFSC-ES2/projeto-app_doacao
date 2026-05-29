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

## Nota parcial

| aluno             | nota parcial |
| ----------------- | ------------ |
| Haydee Murara     | 7,2          |
| Isaac Kozuchovski | 7,3          |
| Isadora Eidt      | 6,8          |
| Lucas Gabriel     | 7,1          |

## Comentários

### Entrega 1

1. Equipe formada: atendido.
2. Tema definido: atendido.
3. MVP: atendido.
4. Governança mínima: atendido.

### Entrega 2

1. Visão do produto: atendido
2. Definição do MVP: atendido
3. Backlog inicial com critérios de aceitação: parcial
   - Há sete funcionalidades definidas no MVP, mas apenas quatro delas estão no backlog/board.
   - Não foram definidas prioridades para as funcionalidades.
   - Não foi utilizado o formato: Como [`tipo de usuário`], quero [`funcionalidade`], para [`benefício`].
4. Definition of Done (DoD): atendido.
5. ADRs iniciais: atendido.
6. Atualização do README: atendido.

- A equipe apenas definiu algumas regras de proteção da ramificação principal que ainda não estão em vigor.

### Entrega 3

1. Planejamento inicial e baseline: parcial
   - Informar a data de registro do baseline
2. Registro da abordagem de estimativa: atendido
3. Capacidade planejada da equipe: atendido
4. Definição das métricas que serão acompanhadas: atendido
5. Ficha de cada métrica: parcial
   - Separar as fichas de cada métrica em arquivos diferentes
     - Em cada uma adicionar data do acompanhamento e valor coletado
   - Utilzar nomes mais consagrados para melhor reconhecimento das métricas:
     - #1 - Percentual de Conclusão do MVP ou Taxa de Conclusão de Funcionalidades do MVP (_Feature Completion Rate_)
     - #2 - Contagem de Defeitos (_Defect Count_)
     - #3 - Taxa de Aprovação nos Testes (_Test Pass Rate_)
     - #4 - Velocidade (_Velocity_)
     - #5 - Taxa de Conclusão da Sprint (_Sprint Completion Rate_)
     - #6 - Lead Time Médio (_Average Lead Time_)
     - #7 - Capacidade da Equipe (_Team Capacity_)
     - #8 - Variação Planejado vs. Realizado (_Planned vs. Completed Variance_)
     - #9 - Taxa de Tarefas Atrasadas (_Overdue Task Rate_)

### Entrega 4

1. Registro inicial de riscos do projeto: atendido
2. Análise e priorização dos riscos: atendido
3. Plano de resposta aos riscos: atendido
4. Consolidação do fluxo de trabalho no repositório: não atendido
   - A equipe apenas definiu algumas regras de proteção da ramificação principal que ainda não estão em vigor, apesar da comunicação na entrega 1.
   - As definições em `fluxo-de-trabalho.md` não foram implementadas no repositório.
5. Definição inicial de critérios de qualidade do projeto: atendido
6. Relação entre riscos e qualidade: atendido
7. Definição preliminar de avaliação da qualidade: atendido
8. Atualização da documentação do projeto: atendido

### Entrega 5

1. Primeiro incremento funcional do sistema: parcial.
   - Foi implementado um vertical slice de autenticação de usuários, com telas de login/cadastro, endpoints `POST /login` e `POST /register`, lógica de aplicação e persistência de usuários.
   - A escolha é coerente com o MVP e com a priorização registrada no baseline, pois autenticação aparece como item de alta prioridade e maior esforço estimado.
   - O incremento atravessa frontend, backend e persistência em H2, mas não fica plenamente demonstrável pelos comandos documentados porque `./mvnw spring-boot:run` falha na tag `v0.1.0` pela ausência de `backend/.mvn/wrapper/maven-wrapper.properties`.
   - A autenticação armazena e compara senha em texto puro em `AuthService`, sem hash, o que é uma fragilidade técnica relevante mesmo para um MVP.
2. Testes de unidade automatizados: parcial.
   - Há testes versionados para `AuthService`, cobrindo cadastro, login, duplicidade e cenários de falha.
   - O comando documentado `./mvnw test` falha na tag avaliada pela ausência dos arquivos do Maven Wrapper.
   - Maven não está instalado no ambiente para executar `mvn test` como alternativa; porém o problema principal da entrega é que o próprio wrapper versionado está incompleto, apesar de `mvnw` estar presente.
   - Não há testes de frontend versionados na Sprint 1.
3. Escopo da Sprint 1 explicitado e justificado: atendido.
   - O documento `sprint-1.md` informa issues planejadas, concluídas, justificativa do vertical slice e incremento entregue.
   - O recorte da autenticação é coerente com a priorização registrada no baseline.
4. Backlog e board atualizados: parcial.
   - O documento informa o board e referencia as issues `#17`, `#36`, `#38`, `#40` e `#42`.
   - As issues possuem critérios de aceitação no GitH relevante com backend e documentação de padrões. O histórico confirma implementação inicial de models, repositories, services e controllers, além de ajustes posteriores em validações. A nota é maior que a da equipe média, mas limitada porque o controller de doações não está presente no marco final e a documentação superestima o que foi entregue.
      - Isadora: há commit/PR com telas de entidades, doações e dashboard, mas essas telas foram removidas/revertidas antes da tag `v0.2.0`. No estado avaliado, o frontend não entrega as funcionalidades centrais da Sprint 2 e ainda falha no lint. Por isso a nota individual é menor.
      - Lucas: há evidência de contribuição em testes e métricas, incluindo o commit `351c7e8`, mas parte dos testes foi revertida e a versão final manteve apenas uma cobertura parcial; as métricas permaneceram majoritariamente incompletas. A contribuição é relevante, mas com resultado final limitado.
      - Haydee: contribuiu com CI,ub, embora alguns itens estejam simples ou não marcados individualmente como concluídos.
   - A vinculação entre issues, commits e PRs existe em parte pelos títulos/branches, mas não está consolidada com links para cada PR/commit no relatório da sprint.
5. Fluxo de trabalho evidenciado no repositório: parcial.
   - Houve desenvolvimento por branches e PRs relevantes: `#37`, `#39`, `#41`, `#43` e `#44`.
   - Os PRs verificados não têm aprovação registrada no GitHub, apesar de `sprint-1.md` afirmar revisão e aprovação conforme o fluxo definido.
6. Registro das contribuições individuais: atendido.
   - `sprint-1.md` registra objetivamente as contribuições de Isadora, Haydee, Isaac e Lucas.
   - As contribuições descritas são confirmadas, em linhas gerais, pelos commits e PRs.
   - Contribuições individuais:
     - Haydee: contribuiu com persistência de usuários, `UsuarioRepository`, configuração inicial de banco H2/PostgreSQL e estrutura do backend. A participação é relevante, mas limitada pelo papel de DevOps/Infra e pelo problema de reprodutibilidade do backend na entrega.
     - Isaac: contribuiu com a lógica central de autenticação (`AuthService`), API REST (`AuthController`) e atualização do README. Centralidade no slice, mas limitada por a documentação de execução não funcionar e pela fragilidade de senha em texto puro.
     - Isadora: contribuiu com as telas de login/cadastro, integração HTTP com a API, documentação final da Sprint 1 e release. A contribuição é relevante, mas limitada por falha de lint no frontend e por as aprovações/revisões declaradas não aparecerem nos PRs verificados.
     - Lucas: contribuiu com testes unitários de autenticação e verificação da DoD. A contribuição é coerente com o papel de qualidade, mas limitada porque a suíte não é executável pelo comando documentado na tag.
7. Documentação atualizada: parcial.
   - O README contém instruções de execução da aplicação e dos testes.
   - As instruções do backend e dos testes não funcionam na tag `v0.1.0` por ausência dos arquivos do Maven Wrapper.
   - O registro do que já funciona no MVP aparece em `sprint-1.md`, mas o README não resume claramente o estado entregue na Sprint 1.
8. Release do marco: atendido com atraso.
   - A tag `v0.1.0` existe no commit `2f9c875`.
   - A release `Sprint 1` foi publicada no GitHub em 04/05/2026, após o prazo previsto de 30/04/2026.

### Entrega 6

1. Incremento funcional do MVP: parcial.
   - Funcionalidads declaradas para entrega na Sprint 2:
      - #8 — Cadastro de Entidades Filantrópicas (com telas próprias integradas à API)
      - #12 — Registro de Entrada de Doações (com telas próprias integradas à API)
   - As issues `#8` e `#12` possuem critérios de aceitação, mas alguns itens permanecem desmarcados mesmo após o fechamento das issues; a issue `#53` também foi fechada com critérios importantes desmarcados.
   - O cadastro/listagem de entidades está implementado no backend, mas não é utilizável pelo cliente no frontend da tag avaliada. O registro/listagem de entradas de doações não está funcionalmente entregue, pois não há controller/endpoints de doações nem telas de doações no frontend final.
   - Há código e testes para parte da funcionalidade de entidades e para regras de serviço de entradas de doações, mas a documentação e a release afirmam telas e endpoints de doações que não existem; as evidências não comprovam um fluxo completo do ponto de vista do usuário.
   - Em relação à Sprint 1, a Sprint 2 evolui o domínio ao introduzir entidades filantrópicas no backend, mas não entrega um novo fluxo completo e demonstrável para o cliente nas funcionalidades centrais declaradas.
2. Testes automatizados: parcial.
   - A documentação afirma existir `EntradaDoacaoControllerIntegrationTest`, mas esse arquivo não existe na tag avaliada porque também não existe controller de doações.
   - Não há testes automatizados de frontend.
3. Integração contínua mínima: parcial.
   - O workflow está configurado apenas para PRs contra `dev`; PRs relevantes contra `main`, como `#54` e `#64`, não tiveram checks registrados.
   - O pipeline não executa build/lint/testes do frontend, apesar de o frontend fazer parte do incremento funcional.
   - `npm run lint` falha na tag avaliada por variável `error` não usada em `frontend/src/pages/Cadastro.jsx`.
4. Pull requests com revisão: não atendido.
   - A maioria dos PRs verificados não possui aprovação registrada em `latestReviews`; alguns checklists inclusive deixam o item de revisão desmarcado.
   - Alguns PRs não possuem CI executado, e o PR `#60` aparece com `reviewDecision` como `CHANGES_REQUESTED`, apesar de ter sido integrado posteriormente.
5. Aplicação justificada de padrões OO: parcial.
   - A documentação registra Repository Pattern e Service Layer, com problema, justificativa, classes afetadas, benefícios e trade-offs.
   - A aplicação é coerente com a estrutura Spring/JPA usada no backend, mas é uma aplicação básica de camadas, não uma decisão de design particularmente elaborada.
   - A ADR foi registrada dentro de `padroes-de-projeto.md`, e não como ADR própria no diretório `adrs/`, reduzindo a rastreabilidade da decisão arquitetural.
6. Atualização das métricas: não atendido.
   - Seis das nove métricas ainda possuem valores em branco (`____`) na tag avaliada.
   - Não há análise consistente do planejado versus executado e dos fatores que influenciaram o resultado da Sprint 2.
7. Atualização dos riscos: atendido.
   - `riscos.md` registra riscos ativos, mitigados, concretizados, novo risco de endpoints sem JWT e ações para a próxima sprint.
8. Release do marco: parcial.
   - A release `v0.2.0` foi publicada com descrição objetiva de funcionalidades, alterações técnicas, padrões, testes, CI e pendências.
   - A descrição da release afirma entrega de frontend e endpoints de doações que não estão presentes na tag final.
9. Registro das contribuições individuais: parcial.
   - As contribuições individuais foram registradas, mas há divergências entre o que foi descrito e o estado final da release.
   - Contribuições individuais:
      - Haydee: contribuiu com CI, documentação da sprint, riscos e release. A contribuição é coerente com o papel de DevOps/Infra e Scrum Master, mas limitada por CI incompleto, ausência de revisões evidenciadas, documentação divergente do estado real da tag.
      - Isaac: contribuiu de forma relevante com backend e documentação de padrões. O histórico confirma implementação inicial de models, repositories, services e controllers, além de ajustes posteriores em validações. A nota é maior que a da equipe média, mas limitada porque o controller de doações não está presente no marco final e a documentação superestima o que foi entregue.
      - Isadora: há commit/PR com telas de entidades, doações e dashboard, mas essas telas foram removidas/revertidas antes da tag `v0.2.0`. No estado avaliado, o frontend não entrega as funcionalidades centrais da Sprint 2 e ainda falha no lint. Por isso a nota individual é menor.
      - Lucas: há evidência de contribuição em testes e métricas, mas parte dos testes foi revertida e a versão final manteve apenas uma cobertura parcial; as métricas permaneceram majoritariamente incompletas. A contribuição é relevante, mas com resultado final limitado.
