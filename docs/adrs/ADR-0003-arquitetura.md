# ADR-0003 – Arquitetura do sistema

## Status
Aceita

## Contexto
O projeto precisava de uma organização que suportasse o desenvolvimento em equipe com responsabilidades claras. Sem uma estrutura definida, o risco era que cada desenvolvedor organizasse o código de forma diferente, misturando lógica HTTP, regras de negócio e acesso ao banco na mesma classe.

## Decisão
Adotar arquitetura em camadas com o seguinte fluxo obrigatório para todas as funcionalidades do backend:

```
Controller → Service → Repository → Model
```

- **Controller:** recebe e responde requisições HTTP; não contém lógica de negócio
- **Service:** aplica validações e regras de negócio; não conhece detalhes HTTP
- **Repository:** acessa o banco via JPA; não contém regras de negócio
- **Model:** representa os dados persistidos

## Aplicação no código

| Camada | Classes |
|---|---|
| Controller | `AuthController`, `EntidadeController`, `DistribuicaoController`, `ProdutoController` |
| Service | `AuthService`, `EntidadeService`, `EntradaDoacaoService`, `ProdutoService`, `DistribuicaoService` |
| Repository | `UsuarioRepository`, `EntidadeRepository`, `EntradaDoacaoRepository`, `ProdutoRepository`, `DistribuicaoRepository` |
| Model | `Usuario`, `Entidade`, `EntradaDoacao`, `Produto`, `Distribuicao` |

## Alternativas consideradas
- **Sem separação:** controllers acessando o banco diretamente. Descartado por criar acoplamento alto e dificultar testes.
- **Arquitetura hexagonal:** mais robusta, mas com complexidade desnecessária para o escopo do MVP.

## Consequências

### Positivas
- Código previsível: qualquer desenvolvedor sabe onde encontrar cada tipo de lógica
- Testabilidade: serviços testados com mocks de repositório; controllers testados com testes de integração
- Separação clara: controllers não conhecem JPA; repositórios não conhecem HTTP

### Negativas
- Mais arquivos no projeto
- Em operações simples como `listarTodas()`, o serviço é uma camada passante
