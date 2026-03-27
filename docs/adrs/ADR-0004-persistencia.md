# ADR-0004 – Persistência de dados

## Status
Aceita

## Contexto
O sistema precisa guardar dados de produtos, doações e entidades.

## Decisão
- Usar PostgreSQL como banco principal  
- Usar H2 para desenvolvimento  
- Usar JPA/Hibernate  

## Alternativas consideradas
- MongoDB  
- Sem ORM  

## Consequências

### Positivas
- Dados organizados  
- Fácil integração com Spring  

### Negativas
- Precisa modelar bem o banco  