# Percentual de Conclusão do MVP (Feature Completion Rate)

- **Data do acompanhamento:** 17/06/2026
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

## Atualização Entrega 9 — Release Candidate 

**Valor anterior (Sprint 4):** 100%  
**Valor atual (RC):** 100%

**O que foi planejado:** Consolidar o MVP já completo, sem expandir escopo, fechando os itens de hardening, documentação e RC das issues #115 a #122.

**O que foi executado:** As issues #115 (documento da RC), #116 (testes de aceitação), #117 (CI em push para `main`), #118 (riscos e métricas), #119 (limitação de segurança da API), #120 (consistência de estoque), #121 (validação do ambiente público) e #122 (publicação da tag `v1.0.0-rc.1`) foram concluídas. Nenhuma funcionalidade nova foi adicionada ao MVP.

**O que influenciou o resultado:** Por se tratar de uma etapa de hardening e consolidação, o percentual de conclusão do MVP permaneceu em 100%, o esforço foi direcionado a estabilidade, documentação e evidências, não a novas funcionalidades.