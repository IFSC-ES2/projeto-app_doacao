# Registro Inicial de Riscos do Projeto

---

## Riscos

### 1 – Requisitos mal definidos

**Natureza:** Escopo  
**Descrição:** Falta de clareza nos requisitos e critérios fazem com que a equipe implemente a funcionalidade sem precisão, resultando em entregas que não correspondem ao esperado.  
**Causa:** Falta de alinhamento entre a equipe e o professor sobre o que deve ser construído.  
**Consequência:** Retrabalho, funcionalidades entregues erradas e atraso nas sprints.  
**Probabilidade:** Médio  
**Impacto:** Alto  
**Prioridade:** Alta  
**Mitigação:** Definir critérios de aceitação detalhados para cada funcionalidade antes do início da sprint, garantindo que toda a equipe tenha o mesmo entendimento do que deve ser implementado.  
**Responsável:** Scrum Master  

---

### 2 – Atraso nas entregas por subestimação de tarefas

**Natureza:** Prazo  
**Descrição:** Tarefas estimadas com tempo de execução insuficiente resultam em sprints incompletas.  
**Causa:** Desconhecimento da complexidade técnica real e falta de experiência em estimativas.  
**Consequência:** Funcionalidades incompletas ou com qualidade abaixo do esperado nas entregas.  
**Probabilidade:** Alto  
**Impacto:** Médio  
**Prioridade:** Alta  
**Mitigação:** Usar estimativas relativas: story points. Reservar 20% de folga nas sprints e usar as dailies para encontrar problemas com antecedência.  
**Responsável:** Scrum Master  

---

### 3 – Conflito de prazos com outras disciplinas

**Natureza:** Equipe  
**Descrição:** Provas, trabalhos e prazos de outras disciplinas reduzem a disponibilidade da equipe em períodos mais críticos.  
**Causa:** Calendário acadêmico sobrecarregado coincidindo com sprints ou entregas do projeto.  
**Consequência:** Queda de produtividade, tarefas não concluídas e acúmulo.  
**Probabilidade:** Alto  
**Impacto:** Médio  
**Prioridade:** Alta  
**Mitigação:** Mapear períodos críticos do calendário acadêmico e antecipar tarefas nas semanas anteriores.  
**Responsável:** Scrum Master  

---

### 4 – Dificuldade técnica com tecnologias

**Natureza:** Tecnologia  
**Descrição:** A equipe encontra dificuldades com ferramentas ou integrações escolhidas, travando o desenvolvimento.  
**Causa:** Novas tecnologias exigem um tempo maior de aprendizado da equipe.  
**Consequência:** Bloqueio de tarefas e possível necessidade de substituir tecnologias, comprometendo o prazo.  
**Probabilidade:** Médio  
**Impacto:** Alto  
**Prioridade:** Alta  
**Mitigação:** Criar tarefas de investigação nas primeiras sprints para validar integrações complexas antes que virem bloqueios.  
**Responsável:** Toda a equipe  

---

### 5 – Código mal estruturado

**Natureza:** Qualidade / Processo  
**Descrição:** A pressão de prazo leva a equipe a adotar soluções rápidas e mal estruturadas, dificultando a manutenção e evolução do código ao longo do projeto.  
**Causa:** Priorização de velocidade na entrega com comprometimento da qualidade das soluções implementadas.  
**Consequência:** Código difícil de modificar, aumento do esforço para implementar novas funcionalidades e maior probabilidade de erros nas sprints seguintes.  
**Probabilidade:** Médio  
**Impacto:** Alto  
**Prioridade:** Alta  
**Mitigação:** Reservar tempo em cada sprint para revisão e melhoria do código existente.  
**Responsável:** Toda a equipe  

---

## Plano de Resposta

### 1 – Requisitos mal definidos

**Prevenção:** Definir critérios de aceitação detalhados para cada funcionalidade antes do início da sprint e alinhar previamente com o professor.  
**Reação:** Realizar um alinhamento imediato, corrigir os critérios e ajustar a funcionalidade na próxima sprint.  
**Monitoramento:** O Scrum Master verifica se todas as funcionalidades possuem critérios claros durante o planejamento da sprint.  

---

### 2 – Atraso nas entregas por subestimação de tarefas

**Prevenção:** Estimar em conjunto com toda a equipe e reservar 20% da capacidade como folga na sprint.  
**Reação:** Priorizar as tarefas da sprint, removendo as de menor valor para garantir as entregas principais.  
**Monitoramento:** Acompanhar o progresso da sprint diariamente, revisar a velocidade da equipe e usar as dailies para identificar problemas com antecedência.  

---

### 3 – Conflito de prazos com outras disciplinas

**Prevenção:** Mapear datas de períodos críticos no início de cada sprint e antecipar as tarefas mais importantes.  
**Reação:** Ajustar o escopo da sprint afetada.  
**Monitoramento:** O Scrum Master avalia a disponibilidade da equipe no início de cada sprint e ajusta a capacidade planejada.  

---

### 4 – Dificuldade técnica com tecnologias

**Prevenção:** Criar tarefas de investigação nas primeiras sprints para validar integrações complexas e reduzir incertezas.  
**Reação:** Discutir alternativas em equipe e substituir a tecnologia se for necessário.  
**Monitoramento:** Identificar bloqueios técnicos nas dailies.  

---

### 5 – Código mal estruturado

**Prevenção:** Reservar tempo em cada sprint para revisão do código existente e definir critérios mínimos de qualidade no checklist do PR.  
**Reação:** Dedicar parte de uma sprint para revisão das partes mais críticas antes de continuar com novas funcionalidades.  
**Monitoramento:** O Scrum Master verifica se a equipe está com dificuldades crescentes para evoluir o código.  

---
## Análise e Priorização dos Riscos

Critérios:

* **Probabilidade:** Frequência com que o evento pode ocorrer.
* **Impacto:** Grau de prejuízo para o sucesso do MVP.

### Matriz de Riscos

| Probabilidade \ Impacto | Baixo | Médio | Alto |
| :--- | :---: | :---: | :---: |
| **Alta** | - | R3 | R1, R2 |
| **Média** | - | - | R4, R5 |
| **Baixa** | - | - | - |

### Justificativa de Prioridade
Os riscos **R1 e R2** foram classificados com a prioridade mais alta por estarem no quadrante de probabilidade Alta e impacto Alto. O **R1** é o mais crítico no momento, pois qualquer falha na definição do que deve ser construído compromete todas as fases seguintes de desenvolvimento e arquitetura. 

Os riscos **R4 e R5**, embora tenham um impacto Alto na integridade do software, foram mantidos com probabilidade Média, uma vez que a definição prévia da stack tecnológica e dos padrões de arquitetura ajuda a mitigar a ocorrência de problemas técnicos graves.

---

## Atualização Sprint 2

### Riscos que permanecem ativos
- **R2 (Atraso por subestimação):** continua ativo. Projetos e demandas de outras disciplinas reduziram a disponibilidade da equipe durante a sprint, exigindo maior concentração do esforço nos dias finais.

### Riscos mitigados
- **R1 (Requisitos mal definidos):** mitigado. Critérios de aceitação foram definidos nas issues antes do início da sprint, garantindo alinhamento entre os integrantes.
- **R4 (Dificuldade técnica):** mitigado. A configuração do CI exigiu ajustes pontuais, como a correção do limite de caracteres nos arquivos YAML, mas foi resolvida sem impacto significativo. O pipeline funcionou como esperado e permitiu identificar e corrigir problemas antes do merge.

### Riscos que se concretizaram
- **R3 (Conflito com outras disciplinas):** concretizou-se parcialmente. A equipe teve projetos e entregas simultâneas em outras disciplinas, o que reduziu a disponibilidade em alguns momentos da sprint.

### Novos riscos identificados
- **R6 – Endpoints sem proteção JWT:** as rotas do sistema estão acessíveis sem autenticação. A implementação do login retorna sucesso ou falha, mas não gera token JWT, o que significa que qualquer requisição pode acessar os endpoints sem estar autenticada.
  - **Probabilidade:** Alta
  - **Impacto:** Alto
  - **Prioridade:** Alta
  - **Mitigação:** Implementar autenticação JWT na Sprint 3, protegendo todos os endpoints com verificação de token.

### Ações de mitigação para a Sprint 3
- Implementar autenticação JWT e proteger os endpoints da API
- Mapear a disponibilidade da equipe no início da sprint considerando o calendário acadêmico

---

## Atualização Sprint 9

### Riscos que permanecem ativos
- **R6 – Endpoints sem proteção JWT:** risco aceito. A equipe avaliou a implementação de autenticação stateful na API e optou por documentar formalmente a limitação por conta do escopo acadêmico do projeto. A proteção de rotas é feita exclusivamente pelo frontend. Acesso direto à API via ferramentas externas não é bloqueado. Mitigação futura: implementar filtro de token ou Spring Security em versão pós-RC.
- **R7 – Inconsistência no cálculo de estoque:** risco aceito. O saldo de estoque é calculado a partir de três fontes diferentes: o campo quantidadeEstoque do modelo Produto, entradas de doação vinculadas por nome e distribuições vinculadas por ID. A correção exigiria mudanças em backend, frontend e testes, com risco de regressão. Mitigação futura: vincular EntradaDoacao a Produto por ID.

### Riscos mitigados
### Riscos mitigados
- **R2 – Atraso por subestimação:** parcialmente realizado. A entrega atrasou por desconhecimento do prazo final por parte da equipe, e não por subestimação das tarefas em si.

### Riscos aceitos
- **R6 – Endpoints sem proteção:** limitação conhecida, documentada e aceita para o escopo da RC. Registrada também em docs/entregas/release-candidate.md.
- **R7 – Inconsistência no cálculo de estoque:** limitação conhecida, documentada e aceita para o escopo da RC. Registrada também em docs/entregas/release-candidate.md.