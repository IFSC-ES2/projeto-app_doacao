# Percentual de Conclusão do MVP (Feature Completion Rate)

- **Data do acompanhamento:** 08/06/2026
- **Valor coletado:** 100%

## Classificação
Produto

## Objetivo
Ver quanto do sistema já está pronto.

## Definição / Fórmula
(funcionalidades prontas / total de funcionalidades do MVP) × 100

## Fonte dos dados
Issues concluídas e board do projeto.

## Frequência
Final de cada sprint.

## Responsável
Isadora Eidt

## Interpretação
Quanto maior o número, mais perto o sistema está de ficar pronto.

## Análise da Sprint 4

**Valor anterior (Sprint 3):** 100% (reportado, mas o endpoint de doações ainda estava incompleto)  
**Valor atual (Sprint 4):** 100%

**O que foi planejado:** Concluir as funcionalidades pendentes do MVP: API de doações, autenticação segura com BCrypt e polimento do frontend.

**O que foi executado:** As 13 issues planejadas foram entregues (#84, #85, #86, #87, #88, #89, #90, #91, #92, #93, #94, #95, #103). O fluxo completo de doações foi exposto via `GET /doacoes` e `POST /doacoes`. A autenticação passou a armazenar senhas com hash. O frontend teve lint limpo, testes estabilizados e ajustes visuais realizados.

**Funcionalidades do MVP e seu estado ao final da Sprint 4:**

| Funcionalidade | Issue original | Entregue em | Evidência local |
|---|---|---|---|
| Autenticação de usuários | #17 | Sprint 1 | `AuthService`, `POST /login`, `POST /register` |
| Cadastro de entidades filantrópicas | #8 | Sprint 2 | `EntidadeController`, `GET/POST /entidades` |
| Cadastro de tipos de alimentos (produtos) | #10 | Sprint 3 | `ProdutoController`, `GET/POST /produtos` |
| Registro de entrada de doações | #12 | Sprint 4 | `EntradaDoacaoController`, `POST /doacoes` |
| Registro de distribuições para entidades | #18 | Sprint 3 | `DistribuicaoController`, `GET/POST /distribuicoes` |
| Consulta de estoque atual | #13 | Sprint 3 | `EstoqueController`, `GET /estoque` |
| Listagem e consulta de doações | #19 | Sprint 4 | `EntradaDoacaoController`, `GET /doacoes` |

**O que influenciou o resultado:** O CI atualizado garantiu que nenhuma entrega introduzisse regressão. A divisão de responsabilidades entre os membros evitou gargalos no final da sprint.