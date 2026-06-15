# Testes de Aceitação da Release Candidate

**Entrega:** 9  
**Versão prevista:** `v1.0.0-rc.1`  
**Data da execução:** 15/06/2026  
**Responsável pela execução:** Isadora Eidt  
**Ambiente:** ambiente público e execução local  

## Objetivo

Registrar os testes de aceitação da Release Candidate, validando se o MVP está utilizável de ponta a ponta para os principais fluxos do Sistema de Gestão de Doações.

## Ambientes de validação

| Tipo | URL |
|------|-----|
| Frontend público | https://projeto-app-doacao.vercel.app |
| Backend público | https://projeto-appdoacao-production.up.railway.app |
| Frontend local | http://localhost:5173 |
| Backend local | http://localhost:8080 |

## Credenciais usadas

| Login | Senha |
|-------|-------|
| `admin` | `Admin123!` |
| `teste` | `Senha123!` |

## Legenda de resultado

- **Aprovado:** comportamento ocorreu como esperado.
- **Aprovado com ressalva:** fluxo principal funcionou, mas existe limitação conhecida.
- **Reprovado:** comportamento esperado não ocorreu.
- **Pendente:** teste ainda não foi executado.

---

## Caso 1 - Login com usuário válido

**Funcionalidade:** autenticação de usuários

**Pré-condição:** backend ativo e usuário `admin` carregado pelo `DataLoader`.

**Passos:**

1. Acessar o frontend.
2. Informar login `admin`.
3. Informar senha `Admin123!`.
4. Acionar o botão de entrada.

**Resultado esperado:** o sistema autentica o usuário e exibe a área interna da aplicação.

**Resultado obtido:** usuário autenticado com sucesso e área interna exibida.

**Status:** Aprovado

---

## Caso 2 - Bloqueio de login inválido

**Funcionalidade:** autenticação de usuários

**Pré-condição:** backend ativo.

**Passos:**

1. Acessar o frontend.
2. Informar um login existente.
3. Informar senha incorreta.
4. Acionar o botão de entrada.

**Resultado esperado:** o sistema não permite acesso e exibe mensagem de erro.

**Resultado obtido:** acesso bloqueado e mensagem de erro exibida.

**Status:** Aprovado

---

## Caso 3 - Cadastro e listagem de entidade

**Funcionalidade:** cadastro de entidades filantrópicas

**Pré-condição:** usuário autenticado.

**Dados sugeridos:**

| Campo | Valor |
|-------|-------|
| Nome | Entidade RC |
| CNPJ | 12.345.678/0001-90 |
| Endereço | Rua da Validação, 100 |
| Telefone | (49) 99999-0000 |
| E-mail | entidade.rc@example.com |

**Passos:**

1. Acessar a tela de Entidades.
2. Preencher os dados da entidade.
3. Salvar a entidade.
4. Conferir a tabela de entidades cadastradas.

**Resultado esperado:** a entidade cadastrada aparece na listagem.

**Resultado obtido:** entidade cadastrada e exibida na listagem.

**Status:** Aprovado

---

## Caso 4 - Cadastro de produto com doação inicial

**Funcionalidade:** cadastro de produtos e registro de entrada de doação

**Pré-condição:** usuário autenticado.

**Dados sugeridos:**

| Campo | Valor |
|-------|-------|
| Nome | Arroz RC |
| Descrição | Pacote de arroz para validação da RC |
| Unidade | kg |
| Quantidade | 10 |
| Tipo de doador | Doador avulso |
| Doador | Doador RC |

**Passos:**

1. Acessar a tela de Produtos.
2. Preencher os dados do produto.
3. Informar o doador da entrada inicial.
4. Salvar o produto.
5. Conferir se o produto aparece na listagem de produtos.

**Resultado esperado:** o produto é cadastrado e a entrada inicial de doação é registrada.

**Resultado obtido:** produto cadastrado e entrada inicial de doação registrada.

**Status:** Aprovado

---

## Caso 5 - Listagem e busca de doações

**Funcionalidade:** listagem de doações recebidas

**Pré-condição:** existir pelo menos uma doação registrada, preferencialmente criada no Caso 4.

**Passos:**

1. Acessar a tela de Doações.
2. Conferir a listagem de doações.
3. Buscar pelo produto `Arroz RC`.
4. Buscar pelo doador `Doador RC`.

**Resultado esperado:** a doação registrada aparece na listagem e pode ser encontrada pela busca de produto ou doador.

**Resultado obtido:** doação exibida na listagem e localizada pela busca de produto e doador.

**Status:** Aprovado

---

## Caso 6 - Registro e listagem de distribuição

**Funcionalidade:** registro de distribuições para entidades

**Pré-condição:** usuário autenticado, produto e entidade cadastrados.

**Dados sugeridos:**

| Campo | Valor |
|-------|-------|
| Produto | Arroz RC |
| Entidade | Entidade RC |
| Quantidade | 3 |
| Data da distribuição | 2026-06-15 |
| Observação | Distribuição de validação da RC |

**Passos:**

1. Acessar a tela de Distribuições.
2. Selecionar o produto cadastrado.
3. Selecionar a entidade cadastrada.
4. Informar quantidade, data e observação.
5. Salvar a distribuição.
6. Conferir a tabela de últimas distribuições.

**Resultado esperado:** a distribuição é registrada e aparece na listagem.

**Resultado obtido:** distribuição registrada e exibida na listagem.

**Status:** Aprovado

---

## Caso 7 - Consulta de estoque após entrada e saída

**Funcionalidade:** consulta de estoque

**Pré-condição:** produto cadastrado com entrada inicial e distribuição registrada.

**Passos:**

1. Acessar a tela de Estoque.
2. Buscar pelo produto `Arroz RC`.
3. Conferir a quantidade atual.
4. Conferir o status do item.

**Resultado esperado:** o produto aparece no estoque com quantidade disponível e status compatível com o saldo atual.

**Resultado obtido:** produto exibido no estoque com quantidade e status compatíveis com o saldo atual.

**Status:** Aprovado

**Observação:** a regra de cálculo de estoque deve estar alinhada com a decisão técnica registrada na Release Candidate.

---

## Caso 8 - Navegação autenticada entre telas principais

**Funcionalidade:** navegação do MVP

**Pré-condição:** usuário autenticado.

**Passos:**

1. Acessar Visão geral.
2. Acessar Entidades.
3. Acessar Doações.
4. Acessar Produtos.
5. Acessar Distribuições.
6. Acessar Estoque.

**Resultado esperado:** todas as telas principais carregam sem erro visível e sem interromper a sessão do usuário.

**Resultado obtido:** todas as telas principais carregaram sem erro visível e sem interromper a sessão.

**Status:** Aprovado

---

## Caso 9 - Logout

**Funcionalidade:** encerramento de sessão no frontend

**Pré-condição:** usuário autenticado.

**Passos:**

1. Acionar o botão `Sair`.
2. Conferir se a aplicação retorna para a tela de login.
3. Tentar acessar uma rota interna novamente.

**Resultado esperado:** a sessão é encerrada no frontend e o usuário volta para a tela de login.

**Resultado obtido:** sessão encerrada e usuário redirecionado para a tela de login.

**Status:** Aprovado

---

## Caso 10 - Validação técnica automatizada

**Funcionalidade:** qualidade técnica da RC

**Pré-condição:** dependências instaladas e projeto atualizado no commit final da RC.

**Passos:**

1. Executar build e testes do backend.
2. Executar lint, build e testes do frontend.
3. Conferir o resultado da CI no GitHub.

**Comandos:**

```bash
mvn compile -f backend/pom.xml
mvn test -f backend/pom.xml
cd frontend
npm run lint
npm run build
npm test
```

**Resultado esperado:** todos os comandos passam e a CI fica verde.

**Resultado obtido:** comandos de validação concluídos e CI considerada apta para a RC.

**Status:** Aprovado

---

## Resumo da execução

| Caso | Funcionalidade | Status |
|------|----------------|--------|
| 1 | Login com usuário válido | Aprovado |
| 2 | Bloqueio de login inválido | Aprovado |
| 3 | Cadastro e listagem de entidade | Aprovado |
| 4 | Cadastro de produto com doação inicial | Aprovado |
| 5 | Listagem e busca de doações | Aprovado |
| 6 | Registro e listagem de distribuição | Aprovado |
| 7 | Consulta de estoque após entrada e saída | Aprovado |
| 8 | Navegação autenticada entre telas principais | Aprovado |
| 9 | Logout | Aprovado |
| 10 | Validação técnica automatizada | Aprovado |

## Conclusão

Status geral da RC: **aprovada nos testes de aceitação.**

Os testes de aceitação foram registrados como aprovados e este documento pode ser usado como evidência para a publicação da tag `v1.0.0-rc.1`.
