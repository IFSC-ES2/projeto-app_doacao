# ADR-0007 – Armazenamento seguro de senhas com BCrypt

## Status
Aceita

## Contexto
Senhas eram salvas em texto puro no banco. Qualquer acesso indevido poderia expor
todas as credenciais diretamente.

## Decisão
Usar BCryptPasswordEncoder do Spring Security para salvar e comparar senhas.
O contrato da API não mudou.

## Alternativas consideradas
- Texto puro — descartado, inseguro
- MD5 / SHA-1 — descartados, algoritmos quebrados
- SHA-256 — sem salt automático nem fator de custo adaptável

## Consequências
### Positivas
- Senhas não ficam legíveis no banco
- Salt automático previne rainbow table
- Nenhuma mudança necessária no frontend

### Negativas
- Latência mínima no login (intencional)
- Senhas antigas em texto puro exigiriam migração em produção