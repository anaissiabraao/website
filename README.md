# ANAISSI DATA STRATEGY Website

Website profissional da ANAISSI DATA STRATEGY, especializada em automação de processos com RPA e análise de indicadores de SLA.

## 🚀 Características

- **Design Moderno**: Interface clean e responsiva usando CSS Grid e Flexbox
- **Performance Otimizada**: Carregamento rápido com otimizações de imagem e CSS
- **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **SEO Friendly**: Estrutura otimizada para mecanismos de busca
- **Acessível**: Seguindo padrões de acessibilidade web

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica moderna
- **CSS3**: Grid Layout, Flexbox, Custom Properties, Animações
- **JavaScript**: Interatividade, animações e funcionalidades dinâmicas
- **Font Awesome**: Ícones profissionais
- **Google Fonts**: Tipografia Inter para melhor legibilidade

## 📁 Estrutura do Projeto

```
website/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript
├── static/             # Imagens e assets
│   ├── logo.png
│   ├── logo-marca.png
│   ├── implementações.jpg
│   ├── photo face.jpg
│   └── crachá.jpg
├── render.yaml         # Configuração para Render
├── nginx.conf          # Configuração do servidor
├── package.json        # Metadados do projeto
└── README.md           # Este arquivo
```

## 🚀 Deploy no Render

### Pré-requisitos
- Conta no [Render](https://render.com)
- Repositório Git (GitHub, GitLab, etc.)

### Passos para Deploy

1. **Conecte seu repositório ao Render**
   - Faça login no Render
   - Clique em "New +" e selecione "Static Site"
   - Conecte seu repositório Git

2. **Configure o projeto**
   - **Name**: `anaissi-data-strategy`
   - **Branch**: `main` (ou sua branch principal)
   - **Root Directory**: Deixe vazio (raiz do projeto)
   - **Build Command**: Deixe vazio (site estático)
   - **Publish Directory**: Deixe vazio (raiz do projeto)

3. **Deploy**
   - Clique em "Create Static Site"
   - O Render irá automaticamente fazer o deploy
   - Aguarde alguns minutos para o processo completar

### Configurações Avançadas

O projeto inclui arquivos de configuração otimizados:

- **render.yaml**: Configuração específica para Render
- **nginx.conf**: Configuração do servidor web com otimizações

## 🎨 Personalização

### Cores e Tema
As cores principais estão definidas como CSS Custom Properties no arquivo `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... outras variáveis */
}
```

### Conteúdo
- **Serviços**: Edite a seção `#services` no `index.html`
- **Informações de contato**: Atualize a seção `#contact`
- **Imagens**: Substitua as imagens na pasta `static/`

## 📱 Responsividade

O website é totalmente responsivo e funciona em:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🔧 Desenvolvimento Local

Para executar localmente:

```bash
# Usando Python (recomendado)
python -m http.server 8000

# Ou usando Node.js
npx serve .

# Acesse: http://localhost:8000
```

## 📊 Performance

O website foi otimizado para:
- **Carregamento rápido**: Imagens otimizadas e CSS minificado
- **SEO**: Meta tags e estrutura semântica
- **Acessibilidade**: Contraste adequado e navegação por teclado
- **Mobile-first**: Design responsivo otimizado

## 📞 Suporte

Para dúvidas sobre o website ou serviços da ANAISSI DATA STRATEGY:

- **Email**: contato@anaissidata.com
- **Telefone**: +55 (11) 99999-9999
- **Localização**: São Paulo, SP - Brasil

## 📄 Licença

© 2024 ANAISSI DATA STRATEGY. Todos os direitos reservados.
