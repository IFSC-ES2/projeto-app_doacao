# ADR-0005 – Comunicação entre frontend e backend

## Status
Aceita

## Contexto
O frontend precisa acessar os dados do backend.

## Decisão
- Usar API REST  
- Comunicação via HTTP  
- Dados em JSON  

## Alternativas consideradas
- GraphQL  
- Acesso direto ao banco  

## Consequências

### Positivas
- Simples e comum no mercado  
- Fácil de integrar  

### Negativas
- Pode precisar de várias requisições  