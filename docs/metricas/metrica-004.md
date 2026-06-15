# Velocidade (Velocity)

- **Data do acompanhamento:** 08/06/2026
- **Valor coletado:** Não aplicável — o valor de 39 pontos já havia sido coletado na Sprint 3, referente ao backlog original do MVP estimado via Planning Poker. As issues da Sprint 4 não passaram por estimativa formal, portanto a velocidade em story points não se aplica a esta sprint.

## Classificação
Processo

## Objetivo
Ver quantos pontos a equipe conseguiu entregar na sprint.

## Definição / Fórmula
Soma dos story points das tarefas concluídas na sprint.

## Fonte dos dados
Issues concluídas. O Planning Poker formal foi aplicado ao backlog original do MVP (7 funcionalidades, 39 pontos, documentadas em `docs/baseline.md`). As issues criadas na Sprint 4 para atender necessidades operacionais (deploy, CI, refatoração, documentação) foram estimadas informalmente pela equipe no início da sprint, sem sessão dedicada de Planning Poker.

## Frequência
Final de cada sprint.

## Responsável
Isaac Kozuchovski

## Interpretação
Ajuda a saber quantos pontos a equipe consegue fazer nas próximas sprints.

## Análise da Sprint 4

**Valor anterior (Sprint 3):** 39 pontos  
**Valor atual (Sprint 4):** Não aplicável

**O que foi planejado:** Entregar as 13 issues operacionais da Sprint 4 (#84, #85, #86, #87, #88, #89, #90, #91, #92, #93, #94, #95, #103), organizadas em três frentes: Deploy/CI (Haydeé), backend com API de doações e hash de senha (Isaac) e frontend/documentação (Isadora). Essas issues não foram estimadas via Planning Poker.

**O que foi executado:** Todas as 13 issues foram concluídas. Os destaques foram #88 (API de doações) e #89 (autenticação segura com BCrypt), que encerraram as funcionalidades pendentes do MVP. O backlog original de 39 pontos, estimado via Planning Poker, já estava registrado na Sprint 3 e não se repete na contagem da Sprint 4.

**O que influenciou o resultado:** A divisão clara de responsabilidades evitou bloqueios e o CI reduziu o retrabalho ao capturar falhas cedo.