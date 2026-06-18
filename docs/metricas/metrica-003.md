# Taxa de Aprovação nos Testes (Test Pass Rate)

- **Data do acompanhamento:** 17/06/2026
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

**Comparação antes/depois da refatoração de segurança:**

| Aspecto de segurança/qualidade | Antes da Sprint 4 (Sprint 3) | Após a Sprint 4 |
|---|---|---|
| Armazenamento de senha | Texto puro (`String.equals`) | Hash via `BCryptPasswordEncoder` |
| Risco em caso de vazamento do banco | Alto — senha legível diretamente | Baixo — reversão computacionalmente inviável |
| Vulnerabilidade de autenticação documentada | Presente (identificada na Entrega 5) | Eliminada |
| Cenários cobertos pelos testes de autenticação | Login com senha em texto puro | Login com hash; registro seguro; rejeição de senha incorreta |
| Taxa de aprovação nos testes de autenticação | 100% (sobre implementação insegura) | 100% (sobre implementação segura) |

A taxa se manteve em 100%, mas o que os testes cobrem mudou: antes validavam uma autenticação vulnerável com senha em texto puro; após a Sprint 4, validam uma autenticação segura com hash de senha.

## Atualização Entrega 9 — RC (15/06/2026)

**Valor anterior (Sprint 4):** 100%  
**Valor atual (RC):** 100%

**O que foi planejado:** Executar os testes automatizados de backend e frontend e os testes de aceitação da RC (issue #116), mantendo a taxa de aprovação em 100% sem expandir escopo.

**O que foi executado:** Os 10 casos de teste de aceitação registrados em `docs/entregas/testes-aceitacao-rc.md` (login, bloqueio de login inválido, cadastro de entidade, cadastro de produto com doação inicial, listagem de doações, distribuição, consulta de estoque, navegação, logout e validação técnica automatizada) foram executados e resultaram em "Aprovado". O pipeline de CI, ajustado pela issue #117 para também executar em push para `main`, confirmou build, lint e testes automatizados passando.

**O que influenciou o resultado:** A execução do CI antes do merge final e a checagem manual dos fluxos principais pela equipe garantiram que a RC fosse fechada sem nenhum teste reprovado.
