# Padrões de Projeto Aplicados

---

## Padrão 1 — Repository Pattern

**Problema:** o acesso ao banco estava acoplado aos controllers e serviços, misturando responsabilidades. Sem uma camada dedicada, cada classe que precisasse de dados teria que conhecer detalhes de JPA, dificultando testes e manutenção.

**Padrão aplicado:** interfaces que estendem `JpaRepository`, uma por entidade. O Spring Data JPA gera as implementações automaticamente a partir dos nomes dos métodos declarados.

**Classes afetadas:** `EntidadeRepository`, `EntradaDoacaoRepository`, `UsuarioRepository`, `ProdutoRepository` e `DistribuicaoRepository`.

**Decisões de design dentro do padrão:**
- Todos os métodos de busca usam queries derivadas do nome (`findByCnpj`, `findByDoador`, `findByDataEntradaBetween`) em vez de `@Query` JPQL. A escolha foi feita porque os filtros do MVP são simples e o nome do método já documenta a intenção sem SQL adicional.
- A lógica de verificação de duplicidade (CNPJ e e-mail já cadastrados) ficou em `EntidadeService.validarCadastro()`, usando `findByCnpj()` e `findByEmail()` do repositório. A consulta ao banco fica isolada no repositório; a decisão do que fazer com o resultado fica no serviço.
- Os repositórios são injetados por construtor nos serviços, não como campo com `@Autowired`, o que permite substituição por mock nos testes unitários (`EntidadeServiceTest`, `AuthServiceTest`, `ProdutoServiceTest`, `DistribuicaoServiceTest`, `EntradaDoacaoServiceTest`).

**Benefícios:** acesso a dados centralizado em uma camada; consultas automáticas pelo nome do método; testabilidade garantida por injeção via construtor.

**Trade-offs:** consultas mais complexas, como filtros combinados por período e produto, precisariam de `@Query`. Para o escopo do MVP, as queries derivadas foram suficientes.

---

## Padrão 2 — Service Layer

**Problema:** sem a camada de serviço, as regras de negócio ficariam nos controllers. O `EntidadeController` teria que validar CNPJ, e-mail e telefone. O `AuthController` teria que verificar força de senha. Controllers com lógica de negócio são difíceis de testar e de evoluir.

**Padrão aplicado:** classes anotadas com `@Service` centralizam regras de negócio e validações, deixando os controllers responsáveis apenas por receber e responder requisições HTTP.

**Classes afetadas:** `EntidadeService`, `EntradaDoacaoService`, `AuthService`, `ProdutoService` e `DistribuicaoService`.

**Decisões de design dentro do padrão:**
- A validação de formato (CNPJ, e-mail, telefone) ficou no `EntidadeService` via regex, em vez de usar anotações do Bean Validation (`@Pattern`, `@Email`) no model. A razão é que algumas validações precisam de lógica adicional, como verificar duplicidade de CNPJ antes de salvar, o que não é possível com anotações simples.
- O método `salvar()` em `EntidadeService` e `registrar()` em `DistribuicaoService` retornam `Optional<String>` com a mensagem de erro em vez de lançar exceção. Isso simplifica o controller, que verifica apenas se o Optional está presente antes de montar a resposta HTTP, sem bloco try/catch.
- A validação de força de senha em `AuthService` (maiúsculas, minúsculas, números e caracteres especiais) ficou no serviço, não no model, porque é uma regra de negócio do sistema, não uma restrição de persistência.

**Benefícios:** controllers com responsabilidade única (HTTP); regras de negócio centralizadas e testáveis em isolamento; decisões de validação explícitas e rastreáveis no código.

**Trade-offs:** em operações simples como `listarTodas()`, o serviço é uma camada passante. Para o MVP, a consistência da estrutura compensa essa passagem extra.

---

## Padrão 3 — Arquitetura em Camadas

A decisão arquitetural está registrada em [ADR-0003](adrs/ADR-0003-arquitetura.md).

**Fluxo adotado em todo o backend:**

```
Controller → Service → Repository → Model
```

**Exemplos rastreáveis no código:**
- **Login:** `AuthController.login()` → `AuthService.autenticar()` → `UsuarioRepository.findByLogin()` → `Usuario`
- **Cadastro de entidade:** `EntidadeController.criar()` → `EntidadeService.salvar()` → validações → `EntidadeRepository.save()` → `Entidade`
- **Registro de distribuição:** `DistribuicaoController.registrar()` → `DistribuicaoService.registrar()` → `DistribuicaoRepository.save()` → `Distribuicao`

**Relação com manutenção e testabilidade:**
- O `EntidadeController` nunca acessa o banco diretamente — só conhece o `EntidadeService`
- O `EntidadeRepository` nunca sabe que existe uma resposta HTTP — só faz consultas
- Essa separação permite testar cada camada de forma independente: nos testes unitários (`EntidadeServiceTest`, `AuthServiceTest`), o repositório é substituído por mock sem precisar do banco; nos testes de integração (`EntidadeControllerIntegrationTest`, `ProdutoControllerIntegrationTest`, `DistribuicaoControllerIntegrationTest`), o sistema inteiro sobe contra o H2
