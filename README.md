# Sistema de Gestão de Doações

## Navegação

- [Visão do Produto](docs/inception.md#visão-do-produto)
- [Escopo do MVP](docs/inception.md#mvp)
- [Board e Backlog](https://github.com/orgs/IFSC-ES2/projects/28)
- [Definition of Done](docs/dod.md)
- [ADRs](docs/adrs/)
- [Estimativas](docs/estimativas.md)
- [Métricas](docs/metricas.md)
- [Baseline](docs/baseline.md)
- [Registro de Riscos](docs/riscos.md)
- [Critérios de Qualidade](docs/qualidade.md)
- [Fluxo de Trabalho](docs/fluxo-de-trabalho.md)

---

## Como rodar o projeto

### Back-end
1. Ter o Java 17+ e Maven instalados
2. Entrar na pasta backend/
3. Rodar: ./mvnw spring-boot:run
4. O servidor roda em: http://localhost:8080

### Front-end
1. Ter o Node.js instalado
2. Entrar na pasta onde está o front
3. Rodar: npm install e depois npm run dev
4. O front roda em: http://localhost:5173

### Endpoint de login
- POST: http://localhost:8080/login
- Body JSON: { "email": "...", "senha": "..." }
- Sucesso: 200 com "Login bem-sucedido"
- Falha: 401 com "Email ou senha inválidos"

---

# Equipe

- Haydeé Murara  
- Isaac Kozuchovski  
- Isadora Eidt  
- Lucas Gabriel  

**Scrum Master da primeira sprint:** Isadora Eidt  
**Arquiteto de Software:** Isaac Kozuchovski  
**DevOps/Infra:** Haydeé Murara  
**Engenheiro de Qualidade:** Lucas Gabriel  