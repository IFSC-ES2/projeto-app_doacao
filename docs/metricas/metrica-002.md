# Contagem de Defeitos (Defect Count)

- **Data do acompanhamento:** 08/06/2026
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

## Análise da Sprint 2
A quantidade de defeitos diminuiu em relação à Sprint 1 devido ao aumento da cobertura de testes automatizados e melhoria nas validações das funcionalidades implementadas.

## Análise da Sprint 4

**Valor anterior (Sprint 3):** 0  
**Valor atual (Sprint 4):** 0

**O que foi planejado:** Manter zero defeitos registrados, mesmo com a refatoração da autenticação para BCrypt e a adição da API de doações.

**O que foi executado:** Nenhuma issue foi aberta com a label `bug` durante a Sprint 4. Correções pontuais foram realizadas diretamente via commits de fix sem a abertura formal de issues de defeito.

**O que influenciou o resultado:** O CI exigiu que todos os testes passassem antes de qualquer merge, funcionando como barreira automática contra regressões. A cobertura de testes de backend e frontend foi mantida e ampliada na sprint.