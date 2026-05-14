# Padrões de Projeto Aplicados

---

## Padrão 1 — Repository Pattern

**Problema:** o acesso ao banco estava muito ligado aos Controllers, misturando funções diferentes.

**Padrão aplicado:** foram criadas interfaces que estendem JpaRepository, responsáveis pelo acesso aos dados.

**Por que foi adequado:** o projeto já utilizava UsuarioRepository, então seguir o mesmo padrão manteve a organização do sistema.

**Classes afetadas:** EntidadeRepository, EntradaDoacaoRepository e UsuarioRepository.

**Benefícios:** código mais organizado, facilidade para trocar o banco de dados, consultas automáticas pelo nome do método, mais fácil de testar.

**Trade-offs:** adiciona uma camada a mais no projeto e consultas mais complexas podem precisar de @Query.

---

## Padrão 2 — Service Layer

**Problema:** as regras de negócio poderiam ficar espalhadas nos Controllers conforme o sistema crescesse.

**Padrão aplicado:** criação de classes @Service para centralizar regras e validações, deixando os Controllers responsáveis apenas pelas requisições HTTP.

**Por que foi adequado:** o AuthService já utilizava esse padrão, então aplicar o mesmo nas novas funcionalidades manteve a consistência do código.

**Classes afetadas:** EntidadeService, EntradaDoacaoService, AuthService, EntidadeController e EntradaDoacaoController.

**Benefícios:** Controllers mais simples, lógica de negócio mais organizada e código mais fácil de testar e manter.

**Trade-offs:** adiciona mais uma camada no sistema e em CRUDs simples pode parecer excesso de estrutura.

---

## ADR-001 — Arquitetura em Camadas

**Status:** Aceito

**Contexto:** com o crescimento do sistema na Sprint 2, foi necessário definir uma organização padrão para o backend.

**Decisão:** adotar oficialmente a arquitetura em camadas:
- Controller: recebe requisições HTTP
- Service: aplica regras de negócio
- Repository: acessa o banco de dados

**Justificativa:** essa estrutura já era usada em parte do projeto. Formalizar o padrão ajuda a manter consistência e facilita o trabalho em equipe.

**Consequências:** código mais organizado e fácil de manter; novas funcionalidades devem seguir o fluxo:
model - repository - service - controller.