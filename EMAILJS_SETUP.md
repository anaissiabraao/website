# Configuração do EmailJS para Envio de Emails

## Passos para Configurar o EmailJS:

### 1. Criar Conta no EmailJS
- Acesse: https://www.emailjs.com/
- Crie uma conta gratuita
- Faça login no dashboard

### 2. Configurar Serviço de Email
- Vá para "Email Services"
- Clique em "Add New Service"
- Escolha seu provedor de email (Gmail, Outlook, etc.)
- Configure com suas credenciais
- Anote o **Service ID** gerado

### 3. Criar Template de Email
- Vá para "Email Templates"
- Clique em "Create New Template"
- Use este template:

```
Assunto: Nova Consultoria Solicitada - ANAISSI DATA STRATEGY

Corpo do Email:

Nova solicitação de consultoria recebida!

Dados do Cliente:
- Nome: {{from_name}}
- Email: {{from_email}}
- Telefone: {{phone}}
- Empresa: {{company}}
- Funcionários: {{employees}}
- Serviço de Interesse: {{interest}}

Mensagem:
{{message}}

---
Enviado através do site ANAISSI DATA STRATEGY
```

- Anote o **Template ID** gerado

### 4. Obter Chave Pública
- Vá para "Account" > "General"
- Copie a **Public Key**

### 5. Atualizar o Código
No arquivo `script.js`, substitua:

```javascript
// Linha 488
emailjs.init("YOUR_PUBLIC_KEY"); // Substitua pela sua chave pública

// Linha 532
'YOUR_SERVICE_ID', // Substitua pelo seu Service ID

// Linha 533  
'YOUR_TEMPLATE_ID', // Substitua pelo seu Template ID
```

### 6. Testar
- Faça um teste enviando o formulário
- Verifique se o email chegou em anaissiabraao@gmail.com

## Configuração Alternativa (Formspree)

Se preferir usar Formspree:

1. Acesse: https://formspree.io/
2. Crie uma conta
3. Crie um novo formulário
4. Use o endpoint fornecido no action do formulário

## Notas Importantes:
- EmailJS é gratuito até 200 emails/mês
- Formspree é gratuito até 50 envios/mês
- Ambos são seguros e confiáveis
- EmailJS é mais fácil de configurar
