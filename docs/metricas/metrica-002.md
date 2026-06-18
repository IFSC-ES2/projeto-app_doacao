# Contagem de Defeitos (Defect Count)

- **Data do acompanhamento:** 17/06/2026
- **Valor coletado:** 0

## Classificação
Produto

## Objetivo
Ver se o sistema está com muitos erros.

## Definição / Fórmula
Número de issues marcadas como bug.

## Fonte dos dados
Issues com a label `bug`.

## Frequência
Semanalmente.

## Responsável
Haydeé Murara

## Interpretação
Se aparecer muito bug, alguma parte do sistema precisa de mais testes.

## Atualização Entrega 9 — Release Candidate 

**Valor anterior (Sprint 4):** 0  
**Valor atual (RC):** 0

**O que foi planejado:** Manter zero defeitos com a label `bug` durante o fechamento da RC, e tratar formalmente como limitação as questões já conhecidas (proteção da API e consistência de estoque), em vez de deixá-las como bugs não documentados.

**O que foi executado:** Nenhuma issue foi aberta com a label `bug`. As duas questões técnicas conhecidas: ausência de validação de token nos endpoints da API (issue #119) e inconsistência no cálculo de estoque (issue #120), foram registradas como riscos aceitos (R6 e R7 em `docs/riscos.md`) e como limitações conhecidas em `docs/entregas/release-candidate.md`, não como defeitos em aberto.

**O que influenciou o resultado:** A equipe optou por documentar formalmente as limitações em vez de corrigi-las sob risco de regressão tão perto da entrega, mantendo a contagem de defeitos em zero sem mascarar problemas reais.