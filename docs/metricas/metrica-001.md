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

## Análise da Sprint 2
Em relação à Sprint 1, houve aumento significativo do progresso do MVP com a implementação das funcionalidades de entidades, registro de doações e ampliação da cobertura de testes automatizados.

## Análise da Sprint 4

**Valor anterior (Sprint 3):** 100% (reportado, mas o endpoint de doações ainda estava incompleto)  
**Valor atual (Sprint 4):** 100%

**O que foi planejado:** Concluir as funcionalidades pendentes do MVP: API de doações, autenticação segura com BCrypt e polimento do frontend.

**O que foi executado:** As 13 issues planejadas foram entregues. O fluxo completo de doações foi exposto via GET /doacoes e POST /doacoes. A autenticação passou a armazenar senhas com hash. O frontend teve lint limpo, testes estabilizados e ajustes visuais realizados.

**O que influenciou o resultado:** O CI atualizado garantiu que nenhuma entrega introduzisse regressão. A divisão de responsabilidades entre os membros evitou gargalos no final da sprint.