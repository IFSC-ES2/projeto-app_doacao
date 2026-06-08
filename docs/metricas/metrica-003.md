# Taxa de Aprovação nos Testes (Test Pass Rate)

- **Data do acompanhamento:** 08/06/2026
- **Valor coletado:** 100%

## Classificação
Produto

## Objetivo
Ver se as partes do sistema que já foram feitas realmente funcionam.

## Definição / Fórmula
(funcionalidades funcionando / funcionalidades feitas) × 100

## Fonte dos dados
Testes feitos pela equipe.

## Frequência
Final de cada sprint.

## Responsável
Haydeé Murara

## Interpretação
Se chegar perto de 100%, quer dizer que quase tudo que foi testado está funcionando.

## Análise da Sprint 2
Houve aumento da estabilidade do sistema em relação à Sprint 1, com testes cobrindo autenticação, entidades, doações, repositories e controllers.

## Análise da Sprint 4

**Valor anterior (Sprint 3):** 100%  
**Valor atual (Sprint 4):** 100%

**O que foi planejado:** Manter 100% dos testes passando após a refatoração da autenticação para BCrypt e a adição de testes para o fluxo de doações. No final da sprint, a partir do feedback do professor, foi identificada a ausência de teste de integração para o contrato HTTP de /doacoes e o teste foi adicionado como melhoria não prevista nas issues inicias da sprint.

**O que foi executado:** Os testes de autenticação foram atualizados para o novo fluxo com armazenamento de senha via BCryptPasswordEncoder (AuthServiceTest). Foram criados testes de controller e service para o fluxo de doações (EntradaDoacaoControllerTest e EntradaDoacaoServiceTest), além de teste de integração via HTTP para cobrir o contrato dos endpoints GET /doacoes e POST /doacoes (EntradaDoacaoControllerIntegrationTest). No frontend, o teste Doacoes.test.jsx foi estabilizado junto com os demais testes de componente.

**O que influenciou o resultado:** A refatoração para BCrypt exigiu reescrita dos testes de autenticação, já que a comparação de senha mudou de texto puro para hash. O CI impediu merges enquanto algum teste estivesse falhando, garantindo que a integração só ocorresse com todos os testes passando.

**Comparação antes/depois da refatoração (BCrypt):**

| Momento | Situação dos testes de autenticação |
|---|---|
| Antes da refatoração (Sprint 3) | Testes validavam senha em texto puro |
| Após a refatoração (Sprint 4) | Testes atualizados para BCrypt, todos passando |

A refatoração não introduziu regressão: a taxa se manteve em 100%. A mudança representou uma reorganização necessária dos testes para refletir a nova implementação segura, não uma piora de qualidade.
