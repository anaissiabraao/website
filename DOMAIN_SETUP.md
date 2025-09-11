# 🌐 Configuração de Domínio - Registro.br + Render

## 📋 Pré-requisitos:
- Domínio registrado no registro.br
- Site deployado no Render
- Acesso ao painel do registro.br
- Acesso ao dashboard do Render

## 🔧 Passo 1: Configurar DNS no Registro.br

### 1.1 Acesse o Painel do Registro.br:
- Acesse: https://registro.br/
- Faça login com suas credenciais
- Vá para "Meus Domínios" → "Gerenciar DNS"

### 1.2 Configure os Registros DNS:

#### Para domínio principal (exemplo: anaissids.com.br):
```
Tipo: A
Nome: @
Valor: 216.24.57.1
TTL: 3600
```

#### Para subdomínio www (exemplo: www.anaissids.com.br):
```
Tipo: CNAME
Nome: www
Valor: website-wll9.onrender.com
TTL: 3600
```

#### Para subdomínio api (opcional):
```
Tipo: CNAME
Nome: api
Valor: website-wll9.onrender.com
TTL: 3600
```

## 🔧 Passo 2: Configurar Domínio no Render

### 2.1 Acesse o Dashboard do Render:
- Acesse: https://dashboard.render.com/
- Vá para seu serviço
- Clique em "Settings" → "Custom Domains"

### 2.2 Adicione o Domínio:
1. Clique em "Add Custom Domain"
2. Digite seu domínio: `anaissids.com.br`
3. Clique em "Add Domain"

### 2.3 Configure o Subdomínio www:
1. Clique em "Add Custom Domain"
2. Digite: `www.anaissids.com.br`
3. Clique em "Add Domain"

## 🔧 Passo 3: Configurar SSL/HTTPS

### 3.1 No Render:
- Após adicionar os domínios, o Render automaticamente:
  - Provisiona certificados SSL
  - Configura HTTPS
  - Redireciona HTTP para HTTPS

### 3.2 Aguarde a Propagação:
- DNS: 24-48 horas
- SSL: 5-10 minutos após DNS

## 🔧 Passo 4: Configurações Adicionais

### 4.1 Redirecionamento no Render:
No arquivo `index.js`, adicione:

```javascript
// Forçar HTTPS
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`);
  } else {
    next();
  }
});
```

### 4.2 Configuração de Headers:
```javascript
// Headers de segurança
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
```

## 🔧 Passo 5: Verificação

### 5.1 Teste o Domínio:
```bash
# Teste DNS
nslookup anaissids.com.br
nslookup www.anaissids.com.br

# Teste HTTPS
curl -I https://anaissids.com.br
curl -I https://www.anaissids.com.br
```

### 5.2 Verifique no Browser:
- https://anaissids.com.br
- https://www.anaissids.com.br
- Certificado SSL válido
- Redirecionamento funcionando

## 📋 Configuração Completa - Exemplo:

### DNS Records (Registro.br):
```
@           A       216.24.57.1
www         CNAME   website-wll9.onrender.com
api         CNAME   website-wll9.onrender.com
```

### Custom Domains (Render):
```
anaissids.com.br
www.anaissids.com.br
```

## ⚠️ Importante:

1. **Propagação DNS**: Pode levar até 48 horas
2. **SSL**: Render provisiona automaticamente
3. **Backup**: Mantenha sempre o domínio .onrender.com
4. **Monitoramento**: Use ferramentas como DNS Checker

## 🚨 Troubleshooting:

### DNS não resolve:
- Verifique se os registros estão corretos
- Aguarde mais tempo para propagação
- Use ferramentas de verificação DNS

### SSL não funciona:
- Aguarde o provisionamento automático
- Verifique se o DNS está resolvendo corretamente
- Contate suporte do Render se necessário

### Site não carrega:
- Verifique se o serviço está rodando no Render
- Confirme se os domínios estão adicionados
- Teste o domínio .onrender.com primeiro
