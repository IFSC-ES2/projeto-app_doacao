# Lead Time Médio (Average Lead Time)

- **Data do acompanhamento:** 08/06/2026
- **Valor coletado:** 5 dias

## Classificação
Processo

## Objetivo
Ver quanto tempo a equipe leva para terminar uma tarefa.

## Definição / Fórmula
Soma do tempo gasto nas tarefas ÷ número de tarefas concluídas

## Fonte dos dados
Data de abertura e fechamento das issues.

## Frequência
Final de cada sprint.

## Responsável
Lucas Gabriel

## Interpretação
Se estiver demorando muito, talvez as tarefas estejam grandes demais.

## Análise da Sprint 4

**Valor anterior (Sprint 3):** 7 dias  
**Valor atual (Sprint 4):** 5 dias

**O que foi planejado:** Manter um lead time baixo com issues bem delimitadas e responsáveis definidos desde o início da sprint.

**O que foi executado:** A divisão das tarefas foi feita no dia 01/06 pela scrum master (Isadora) e as issues foram abertas no dia 02/06. As de deploy e padrões tiveram commits e merge no próprio dia 02/06. As de backend (API de doações, BCrypt e ADR) tiveram commits em 04/06 e PRs mergeados em 07/06 (~5 dias). Frontend, CI e documentação fecharam em 08/06 (~6 dias). A média resultou em aproximadamente 5 dias.

**O que influenciou o resultado:** A definição clara de escopo por issue e a divisão de responsabilidades desde o primeiro dia da sprint reduziram o tempo de execução. O CI encurtou o ciclo de revisão ao automatizar a validação, diminuindo o tempo de espera por aprovação.