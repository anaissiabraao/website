# ANAISSI DATA STRATEGY — App (Vite + React + TS + shadcn-ui)

Código atualizado do site com i18n (pt/en/es/de) e modal de vídeo de RPA.

## Requisitos
- Node.js 18+ (ou 20)
- npm (ou pnpm/yarn se preferir, ajustando os comandos)

## Scripts
- `npm install` — instala dependências
- `npm run dev` — modo desenvolvimento (Vite)
- `npm run build` — build de produção (saída em `dist`)
- `npm run preview` — pré-visualiza o build
- `npm run lint` — lint do projeto

## Estrutura
- `src/` — código React/TS, componentes, hooks, i18n (`src/i18n`)
- `public/` — estáticos. Inclui `_redirects` (SPA no Render) e `videos/RPA1.mp4`
- `tailwind.config.ts` — tema e tokens
- `tsconfig.app.json` — inclui `types: ["vite/client"]` para resolver assets

## Padrão de commits (Conventional Commits)
- `feat: …` nova funcionalidade
- `fix: …` correção
- `chore: …` rotina (deps, lint, config)
- `docs: …` documentação
- `refactor: …` refatoração sem mudança de comportamento

## Deploy no Render (Static Site)
- **Service type**: Static Site
- **Root Directory**: `project update`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `project update/dist`
- **Node version**: 18 ou 20 (definir env `NODE_VERSION=20` opcional)
- `_redirects` já presente em `public` (`/* /index.html 200`)

## Notas
- Vídeo RPA: servido em `/videos/RPA1.mp4` a partir de `public/videos`.
- Toggle de idioma no Header (pt/en/es/de) com persistência em `localStorage`.
