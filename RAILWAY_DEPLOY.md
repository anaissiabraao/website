# Deploy Railway - Anaissi DS SaaS

Projeto único no Railway com frontend + API + PostgreSQL.

## Serviço recomendado no mesmo projeto

- `website` (Express + Prisma + frontend Vite servido no mesmo domínio)

## Variáveis obrigatórias

- `DATABASE_URL`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `JWT_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD_HASH`
- `FRONTEND_URL`
- `VITE_API_BASE_URL` (frontend)
- `VITE_TURNSTILE_SITE_KEY` (Cloudflare Turnstile no login admin)
- `TURNSTILE_SECRET_KEY` (validação server-side)

## Build/Start

### Serviço único (website)
- Build: `npm install && npm run prisma:generate && npm run build:api && npm run build`
- Start: `npm run start:api`

## Prisma migration

```bash
npm run prisma:migrate
```

## Stripe webhook

Endpoint:

`POST https://anaissids.com.br/api/stripe-webhook`

Eventos:

- `checkout.session.completed`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`
