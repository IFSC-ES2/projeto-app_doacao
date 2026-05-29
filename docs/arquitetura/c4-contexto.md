# C4 - Contexto

```mermaid
flowchart LR
    funcionario[" Funcionário da ONG: Cadastra doações, produtos, entidades e acompanha o estoque"] -->|"usa via HTTPS"| sistema[" Sistema de Controle de Doações: Permite registrar entradas de doações, distribuições e consultar o estoque disponível"]
```

## Descricao

O diagrama de contexto apresenta o App de Doacao como uma caixa preta e o ator principal
(Funcionario da ONG), que utiliza o sistema para registrar doacoes, gerenciar produtos e
acompanhar distribuicoes e estoque.