# Fluxo de Trabalho do Repositório

## 1. Branches

A equipe adota uma versão simplificada do **Git Flow** com três níveis de branches:

| Branch | Uso |
|--------|-----|
| `main` | Código estável e aprovado. Recebe merges apenas da `dev` |
| `dev` | Branch de integração. Para onde todo desenvolvimento vai antes da `main` |
| `feature/`, `fix/`, `docs/` | Branches de trabalho, criadas a partir da `dev` |

**Fluxo:**
```
feature/... → dev → main
```

É proibido fazer commits diretos na `main` ou na `dev`.

Padrão de nomenclatura para branches de trabalho:

| Prefixo | Uso |
|--------|-----|
| `feature/` | Nova funcionalidade ou documento |
| `fix/` | Correção de bug |
| `docs/` | Atualização de documentação |
| `refactor/` | Melhoria no código sem alterar funcionalidade |
| `test/` | Adição ou ajuste de testes |

Exemplo: `feature/cadastro-doacao`, `docs/fluxo-de-trabalho`

---

## 2. Pull Requests

Toda mudança (código ou documentação) deve entrar na `main` via Pull Request.

- Nunca fazer merge direto na `main`
- O PR deve ter título claro e descrição do que foi feito
- O template de PR disponível em `.github/PULL_REQUEST_TEMPLATE.md` deve ser preenchido obrigatoriamente

---

## 3. Revisão e Aprovação

- Todo PR exige no mínimo 1 aprovação antes do merge
- A **Isadora Eidt** é responsável por revisar e aprovar os PRs
- Quando a Isadora for a autora do PR, qualquer outro membro da equipe assume a revisão
- O autor do PR não pode aprovar o próprio PR

---

## 4. Merge

- O merge só pode ser feito após a aprovação mínima
- Após o merge, a branch pode ser deletada
