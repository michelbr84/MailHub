# 📦 Instalação e Configuração - MailHub

## ⚡ Setup Rápido (5 minutos)

### 1. Instalar Node.js
```bash
# Baixe em: https://nodejs.org/
# Ou use o gerenciador de pacotes do seu sistema
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Google Cloud Console
1. Acesse: https://console.cloud.google.com/
2. Crie um projeto ou use um existente
3. Habilite a **Gmail API**
4. Crie credenciais OAuth2 (Web Application)
5. Configure URIs: `http://localhost:3000`

### 4. Configurar Variáveis
Crie arquivo `.env`:
```env
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com
```

### 5. Executar
```bash
npm start
```

## 🔧 Configuração Detalhada

### Google Cloud Console

#### Passo 1: Criar Projeto
1. Acesse https://console.cloud.google.com/
2. Clique em "Selecionar projeto" → "Novo projeto"
3. Nome: "MailHub" (ou qualquer nome)
4. Clique "Criar"

#### Passo 2: Habilitar Gmail API
1. Menu lateral: "APIs e serviços" → "Biblioteca"
2. Busque: "Gmail API"
3. Clique em "Gmail API" → "Ativar"

#### Passo 3: Criar Credenciais OAuth2
1. "APIs e serviços" → "Credenciais"
2. "Criar credenciais" → "ID do cliente OAuth"
3. Tipo: "Aplicativo da Web"
4. Configurar:
   - **Nome**: MailHub
   - **Origens JavaScript autorizadas**: `http://localhost:3000`
   - **URIs de redirecionamento autorizados**: `http://localhost:3000`
5. "Criar"
6. **Copie o Client ID** (formato: xxx.apps.googleusercontent.com)

### Configurar Projeto

#### Passo 1: Variáveis de Ambiente
```bash
# Na raiz do projeto, crie o arquivo .env
echo "REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com" > .env
```

#### Passo 2: Instalar Dependências
```bash
npm install
```

#### Passo 3: Executar Projeto
```bash
npm start
```

## 🧪 Testando

1. Acesse: http://localhost:3000
2. Clique "Entrar com Google"
3. Autorize o acesso ao Gmail
4. Teste as funcionalidades:
   - Visualizar remetentes
   - Favoritar remetentes
   - Ver emails por remetente

## 🚀 Deploy para Produção

### Vercel (Recomendado)
1. Conecte repositório ao Vercel
2. Configure variável: `REACT_APP_GOOGLE_CLIENT_ID`
3. No Google Cloud, adicione seu domínio nas URIs
4. Deploy automático

### Netlify
1. Conecte repositório ao Netlify
2. Configure variáveis de ambiente
3. Deploy

## 🐛 Problemas Comuns

### "Google API não carregada"
- Verifique conexão com internet
- Confirme se o script está no HTML

### "Client ID inválido"
- Verifique o arquivo `.env`
- Confirme URIs no Google Cloud Console

### "Gmail API não habilitada"
- Habilite a Gmail API no Google Cloud Console
- Aguarde propagação (5-10 minutos)

### Erros de TypeScript
- Execute: `npm install`
- Verifique se todas as dependências estão instaladas

## 📱 Para Produção

### Atualizar URIs no Google Cloud
1. Vá ao Google Cloud Console
2. Edite suas credenciais OAuth2
3. Adicione seu domínio de produção:
   - `https://seu-app.vercel.app`
   - `https://seu-app.netlify.app`

### Variáveis de Ambiente
Configure no seu provedor de deploy:
- `REACT_APP_GOOGLE_CLIENT_ID`

## ✅ Checklist Final

- [ ] Node.js instalado
- [ ] `npm install` executado
- [ ] Projeto Google Cloud criado
- [ ] Gmail API habilitada
- [ ] Credenciais OAuth2 criadas
- [ ] Client ID no arquivo `.env`
- [ ] `npm start` funcionando
- [ ] Login Google funcionando
- [ ] Emails carregando
- [ ] Favoritos salvando

## 🎯 Próximos Passos

1. **Personalizar**: Cores, layout, logo
2. **Funcionalidades**: Busca, filtros, paginação
3. **Performance**: Cache, lazy loading
4. **Deploy**: Vercel/Netlify
5. **Monitoramento**: Analytics, logs

---

**🎉 Seu MailHub está pronto para uso!** 