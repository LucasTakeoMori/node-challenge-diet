# Daily Diet API

API REST para controle de dieta diária, permitindo que usuários registrem suas refeições e acompanhem métricas de progresso.

## Tech Stack

- **Node.js** + **TypeScript**
- **Fastify** - Framework web
- **Prisma** - ORM para PostgreSQL
- **Zod** - Validação de schemas
- **JWT** - Autenticação via tokens

## Estrutura do Projeto

```
src/
├── app.ts                 # Configuração do Fastify e plugins
├── server.ts              # Entry point da aplicação
├── env/
│   └── index.ts           # Validação de variáveis de ambiente
├── lib/
│   └── prisma.ts          # Instância do Prisma Client
├── middlewares/
│   └── auth.ts            # Middleware de autenticação JWT
└── http/
    ├── routes.ts          # Definição de todas as rotas
    └── controllers/       # Handlers das requisições
        ├── login.ts
        ├── register-user.ts
        ├── get-users.ts
        ├── register-meal.ts
        ├── get-meals.ts
        ├── get-meal-by-id.ts
        ├── update-meal.ts
        ├── delete-meal.ts
        └── get-meals-metrics.ts
```

## Endpoints

### Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/login` | Autenticar usuário (retorna JWT) |

### Usuários

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/users` | Criar usuário |
| GET | `/users` | Listar usuários |

### Refeições (requer autenticação)

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/meals` | Registrar refeição |
| GET | `/meals` | Listar refeições do usuário |
| GET | `/meals/:id` | Buscar refeição por ID |
| PUT | `/meals/:id` | Atualizar refeição |
| DELETE | `/meals/:id` | Remover refeição |
| GET | `/meals/metrics` | Obter métricas do usuário |

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Executar migrations
npx prisma migrate dev

# Iniciar em desenvolvimento
npm run start:dev
```

## Variáveis de Ambiente

```env
DATABASE_URL="postgresql://user:password@localhost:5432/daily_diet"
JWT_SECRET="your-secret-key"
```

## Funcionalidades

- [x] Criar usuário
- [x] Autenticação JWT
- [x] CRUD de refeições
- [x] Métricas de dieta (total, dentro/fora da dieta, melhor sequência)
- [x] Isolamento de dados por usuário
