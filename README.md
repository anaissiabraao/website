# Anaissi DS - Website + CRM + Analytics

Sistema unificado com:

- Website institucional público
- CRM administrativo
- Analytics interno (visitas, eventos, heatmap, funil)
- Orçamentos e pagamentos Stripe
- Banco real PostgreSQL com Prisma ORM

## Estrutura principal

- `api/` backend Express
- `prisma/` schema Prisma
- `middleware/` autenticação e segurança
- `utils/` utilitários de auth
- `src/` frontend público + admin
- `admin/`, `crm/`, `analytics/`, `components/` organização de módulos

## Variáveis obrigatórias

Configure a partir de `.env.example`:

- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `FRONTEND_URL`
- `VITE_API_BASE_URL`

## Comandos

```bash
npm install
npm run prisma:generate
npm run dev
```

Build:

```bash
npm run build:api
npm run build
```
