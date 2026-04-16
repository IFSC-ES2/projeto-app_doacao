# Qualidade do Projeto

## Modelo usado

A equipe vai usar a ISO/IEC 25010 como base para pensar na qualidade do sistema.

A ideia aqui não é medir tudo agora. O objetivo é deixar claro o que é mais importante para o projeto e o que a equipe vai observar nas próximas etapas.

---

# 1. Manutenibilidade

## O que é
É o quanto o sistema fica fácil de entender e de mexer depois.

## Subatributos escolhidos
- modularidade
- modificabilidade
- testabilidade

## Por que isso é importante
O sistema ainda vai crescer bastante. Ainda vamos adicionar mais coisas no cadastro de produtos, estoque, doações e entidades.

Se o código ficar bagunçado, depois vai ser muito mais difícil corrigir bugs ou criar novas funções.

## O que a equipe vai observar no futuro
- se o código está separado em partes
- se dá para mudar uma parte sem quebrar outra
- se existem testes
- se está tendo muito retrabalho

## O que pode mostrar que isso está bom
- uso de Controller, Service e Repository
- código organizado em pastas
- testes funcionando
- pouca dificuldade para alterar o sistema

---

# 2. Confiabilidade

## O que é
É o quanto o sistema funciona sem dar erro.

## Subatributos escolhidos
- ausência de falhas
- disponibilidade

## Por que isso é importante
O sistema não pode perder uma doação, errar a quantidade no estoque ou travar quando alguém estiver usando.

## O que a equipe vai observar no futuro
- quantidade de bugs
- se as funções principais estão funcionando
- se o sistema fica disponível sem parar

## O que pode mostrar que isso está bom
- poucas issues de bug
- cadastro e estoque funcionando sem erro
- testes passando
- sistema funcionando durante toda a sprint

---

# 3. Segurança

## O que é
É o quanto o sistema protege as informações.

## Subatributos escolhidos
- confidencialidade
- integridade
- autenticidade

## Por que isso é importante
Nem todo mundo deve poder entrar no sistema ou mudar informações importantes.

## O que a equipe vai observar no futuro
- se existe login
- se existem permissões diferentes
- se alguém consegue acessar algo sem autorização

## O que pode mostrar que isso está bom
- login funcionando
- administrador e usuário comum com permissões diferentes
- páginas protegidas
- dados não sendo alterados por quem não deveria

---

# 4. Usabilidade

## O que é
É o quanto o sistema é fácil de usar.

## Subatributos escolhidos
- aprendibilidade
- proteção contra erros do usuário

## Por que isso é importante
O sistema vai ser usado por pessoas da ONG. Então ele precisa ser simples e fácil de entender.

## O que a equipe vai observar no futuro
- se as pessoas conseguem usar o sistema sem ajuda
- se é fácil encontrar as funções
- se os usuários cometem muitos erros

## O que pode mostrar que isso está bom
- poucas telas confusas
- cadastro de doação feito sem dificuldade
- mensagens de erro claras
- poucas dúvidas durante os testes

---

# Relação com os riscos do projeto

| Risco | O que pode ser afetado |
|-------|------------------------|
| Requisitos mal definidos | Confiabilidade e Usabilidade |
| Atraso nas entregas | Confiabilidade e Manutenibilidade |
| Conflito com outras disciplinas | Confiabilidade e Manutenibilidade |
| Dificuldade com tecnologias | Segurança e Confiabilidade |
| Código mal estruturado | Manutenibilidade, Confiabilidade e Segurança |

---

# Como a equipe vai usar isso

Esses pontos vão ajudar a equipe a:
- revisar melhor o código
- pensar nos testes
- acompanhar bugs
- descobrir problemas mais cedo
- decidir o que precisa de mais atenção nas próximas sprints