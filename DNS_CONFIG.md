# 🌐 IPs do Render para Configuração DNS

## 📍 IPs Principais do Render:

### Para registro A (domínio principal):
```
216.24.57.1
```

### Para registro CNAME (subdomínios):
```
website-wll9.onrender.com
```

## 🔧 Configuração DNS Completa:

### Exemplo para domínio: anaissids.com.br

#### Registro.br - Configurações DNS:

1. **Domínio Principal (A Record):**
   ```
   Tipo: A
   Nome: @
   Valor: 216.24.57.1
   TTL: 3600
   ```

2. **Subdomínio www (CNAME):**
   ```
   Tipo: CNAME
   Nome: www
   Valor: website-wll9.onrender.com
   TTL: 3600
   ```

3. **Subdomínio api (CNAME - opcional):**
   ```
   Tipo: CNAME
   Nome: api
   Valor: website-wll9.onrender.com
   TTL: 3600
   ```

## 🎯 Render - Custom Domains:

### Domínios a adicionar no Render:
1. `anaissids.com.br`
2. `www.anaissids.com.br`

## ⚡ Configuração Rápida:

### 1. No Registro.br:
- Acesse: https://registro.br/
- Vá para "Meus Domínios" → "Gerenciar DNS"
- Adicione os registros acima

### 2. No Render:
- Acesse: https://dashboard.render.com/
- Vá para seu serviço → "Settings" → "Custom Domains"
- Adicione: `anaissids.com.br`
- Adicione: `www.anaissids.com.br`

### 3. Aguarde:
- DNS: 24-48 horas
- SSL: 5-10 minutos

## 🔍 Verificação:

### Teste DNS:
```bash
nslookup anaissids.com.br
nslookup www.anaissids.com.br
```

### Teste HTTPS:
```bash
curl -I https://anaissids.com.br
curl -I https://www.anaissids.com.br
```

## 📱 URLs Finais:
- https://anaissids.com.br
- https://www.anaissids.com.br
- https://website-wll9.onrender.com (backup)
