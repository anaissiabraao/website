# Instruções de Deploy no Render

## ✅ Commit e Push Concluídos!

O código foi commitado e enviado para o GitHub com sucesso! 🎉

**Commit:** `ae096fb`  
**Branch:** `main`  
**Repositório:** https://github.com/anaissiabraao/website.git

---

## 🔧 Configurações do Render

### Opção 1: Se você já tem um site no Render (RECOMENDADO)

O Render detectará automaticamente as mudanças e iniciará um novo deploy. **Você precisa atualizar as configurações do seu site existente:**

#### Passos no Dashboard do Render:

1. **Acesse seu site no Render Dashboard**
   - Vá para: https://dashboard.render.com/
   - Selecione o site `anaissi-data-strategy`

2. **Atualize as Configurações de Build**
   - Clique em **"Settings"** no menu lateral
   - Role até a seção **"Build & Deploy"**
   - Atualize os seguintes campos:

   ```
   Build Command: npm install && npm run build
   Publish Directory: dist
   ```

3. **Configure a Versão do Node.js**
   - Na seção **"Environment"**
   - Adicione uma variável de ambiente:
     - **Key:** `NODE_VERSION`
     - **Value:** `20`

4. **Salve e Faça Deploy Manual**
   - Clique em **"Save Changes"**
   - Vá para a aba **"Manual Deploy"**
   - Clique em **"Deploy latest commit"**

---

### Opção 2: Criar um Novo Site no Render

Se preferir criar um novo site do zero:

1. **Acesse o Render Dashboard**
   - Vá para: https://dashboard.render.com/

2. **Crie um Novo Static Site**
   - Clique em **"New +"** → **"Static Site"**

3. **Conecte o Repositório**
   - Selecione o repositório: `anaissiabraao/website`
   - Branch: `main`

4. **Configure o Build**
   - **Name:** `anaissi-data-strategy` (ou outro nome)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

5. **Adicione Variável de Ambiente**
   - Clique em **"Advanced"**
   - Adicione:
     - **Key:** `NODE_VERSION`
     - **Value:** `20`

6. **Crie o Site**
   - Clique em **"Create Static Site"**
   - O Render iniciará o build automaticamente

---

## 📋 Arquivos de Configuração Atualizados

Os seguintes arquivos foram atualizados para o novo build:

### `.render.yaml`
```yaml
services:
  - type: web
    name: anaissi-data-strategy
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: dist
    envVars:
      - key: NODE_VERSION
        value: 20
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

### `render.yaml`
```yaml
version: 0.1.0
name: anaissi-data-strategy
builds:
  - src: .
    use: static
    config:
      publish: dist
      buildCommand: npm install && npm run build
      routes:
        - src: /*
          dest: /index.html
```

---

## 🚀 O que Acontecerá no Deploy

1. **Render detectará o push no GitHub**
2. **Instalará as dependências:** `npm install`
3. **Fará o build do Vite:** `npm run build`
4. **Publicará a pasta `dist/`**
5. **Configurará as rotas SPA** (Single Page Application)

---

## ⏱️ Tempo Estimado de Deploy

- **Build:** ~2-3 minutos
- **Deploy:** ~1 minuto
- **Total:** ~3-5 minutos

---

## ✅ Checklist de Verificação Pós-Deploy

Após o deploy, verifique:

- [ ] Site carrega corretamente
- [ ] Carrossel de vídeos no Hero funciona (marlon.mp4 e murilo.mp4)
- [ ] Modal de vídeo RPA abre ao clicar no card de serviços
- [ ] Troca de idiomas funciona (PT, EN, ES, DE)
- [ ] Formulário de contato funciona
- [ ] Todas as imagens carregam
- [ ] Responsividade em mobile funciona
- [ ] Rotas SPA funcionam (refresh não quebra)

---

## 🐛 Troubleshooting

### Erro: "Build failed"
**Solução:** Verifique se a variável `NODE_VERSION=20` está configurada

### Erro: "404 on refresh"
**Solução:** Verifique se as rotas de rewrite estão configuradas corretamente

### Vídeos não carregam
**Solução:** Verifique se os arquivos estão em `/public/videos/` no repositório

### Build muito lento
**Solução:** Normal na primeira vez. Builds subsequentes usam cache e são mais rápidos.

---

## 📞 Suporte

Se encontrar problemas:

1. **Verifique os logs do Render:**
   - Dashboard → Seu Site → "Logs"

2. **Teste localmente:**
   ```bash
   npm install
   npm run build
   npm run preview
   ```

3. **Entre em contato:**
   - Email: anaissiabraao@gmail.com
   - GitHub Issues: https://github.com/anaissiabraao/website/issues

---

## 🎉 Parabéns!

Seu site moderno em React + TypeScript + Vite está pronto para ser deployado! 🚀

**URL do Render:** Será algo como `https://anaissi-data-strategy.onrender.com`

---

**Última atualização:** 08/12/2025  
**Status:** ✅ Pronto para deploy
