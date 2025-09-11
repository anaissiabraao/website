# 🌐 IPs do Render para Configuração DNS

## 📍 IPs Principais do Render:

### Para registro A (domínio principal):
```
76.76.19.61
```

### Para registro CNAME (subdomínios):
```
anaissidata.onrender.com
```

## 🔧 Configuração DNS Completa:

### Exemplo para domínio: anaissidata.com.br

#### Registro.br - Configurações DNS:

1. **Domínio Principal (A Record):**
   ```
   Tipo: A
   Nome: @
   Valor: 76.76.19.61
   TTL: 3600
   ```

2. **Subdomínio www (CNAME):**
   ```
   Tipo: CNAME
   Nome: www
   Valor: anaissidata.onrender.com
   TTL: 3600
   ```

3. **Subdomínio api (CNAME - opcional):**
   ```
   Tipo: CNAME
   Nome: api
   Valor: anaissidata.onrender.com
   TTL: 3600
   ```

## 🎯 Render - Custom Domains:

### Domínios a adicionar no Render:
1. `anaissidata.com.br`
2. `www.anaissidata.com.br`

## ⚡ Configuração Rápida:

### 1. No Registro.br:
- Acesse: https://registro.br/
- Vá para "Meus Domínios" → "Gerenciar DNS"
- Adicione os registros acima

### 2. No Render:
- Acesse: https://dashboard.render.com/
- Vá para seu serviço → "Settings" → "Custom Domains"
- Adicione: `anaissidata.com.br`
- Adicione: `www.anaissidata.com.br`

### 3. Aguarde:
- DNS: 24-48 horas
- SSL: 5-10 minutos

## 🔍 Verificação:

### Teste DNS:
```bash
nslookup anaissidata.com.br
nslookup www.anaissidata.com.br
```

### Teste HTTPS:
```bash
curl -I https://anaissidata.com.br
curl -I https://www.anaissidata.com.br
```

## 📱 URLs Finais:
- https://anaissidata.com.br
- https://www.anaissidata.com.br
- https://anaissidata.onrender.com (backup)
