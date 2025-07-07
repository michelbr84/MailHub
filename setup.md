# 🚀 Setup Rápido - MailHub

## Passo a Passo para Configurar o Projeto

### 1. Instalar Node.js
- Baixe e instale o Node.js 16+ em: https://nodejs.org/
- Verifique a instalação: `node --version` e `npm --version`

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Google Cloud Console

#### 3.1 Criar Projeto
1. Acesse: https://console.cloud.google.com/
2. Clique em "Selecionar projeto" → "Novo projeto"
3. Digite um nome (ex: "MailHub") e clique "Criar"

#### 3.2 Habilitar Gmail API
1. No menu lateral: "APIs e serviços" → "Biblioteca"
2. Busque por "Gmail API"
3. Clique em "Gmail API" → "Ativar"

#### 3.3 Criar Credenciais OAuth2
1. "APIs e serviços" → "Credenciais"
2. Clique "Criar credenciais" → "ID do cliente OAuth"
3. Selecione "Aplicativo da Web"
4. Configure:
   - **Nome**: MailHub
   - **Origens JavaScript autorizadas**: `http://localhost:3000`
   - **URIs de redirecionamento autorizados**: `http://localhost:3000`
5. Clique "Criar"
6. **Copie o Client ID** (você precisará dele)

### 4. Configurar Variáveis de Ambiente
1. Crie um arquivo `.env` na raiz do projeto
2. Adicione seu Client ID:
```env
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com
```

### 5. Executar o Projeto
```bash
npm start
```

### 6. Testar
1. Acesse: http://localhost:3000
2. Clique em "Entrar com Google"
3. Autorize o acesso ao Gmail
4. Teste as funcionalidades

## 🐛 Problemas Comuns

### Erro: "Google API não carregada"
- Verifique se o script do Google API está no HTML
- Confirme a conexão com a internet

### Erro: "Client ID inválido"
- Verifique se o Client ID está correto no arquivo `.env`
- Confirme se as URIs estão configuradas no Google Cloud Console

### Erro: "Gmail API não habilitada"
- Vá ao Google Cloud Console e habilite a Gmail API
- Aguarde alguns minutos para propagação

## 📱 Para Produção

### Vercel (Recomendado)
1. Conecte seu repositório ao Vercel
2. Configure a variável de ambiente `REACT_APP_GOOGLE_CLIENT_ID`
3. No Google Cloud Console, adicione seu domínio nas URIs autorizadas
4. Deploy automático

### Atualizar URIs no Google Cloud
- Adicione seu domínio de produção nas "Origens JavaScript autorizadas"
- Exemplo: `https://seu-app.vercel.app`

## ✅ Checklist de Setup

- [ ] Node.js instalado
- [ ] Dependências instaladas (`npm install`)
- [ ] Projeto criado no Google Cloud Console
- [ ] Gmail API habilitada
- [ ] Credenciais OAuth2 criadas
- [ ] Client ID configurado no `.env`
- [ ] Projeto executando (`npm start`)
- [ ] Login funcionando
- [ ] Emails carregando
- [ ] Favoritos funcionando

## 🎯 Próximos Passos

1. **Personalizar Interface**: Modifique cores, layout, etc.
2. **Adicionar Funcionalidades**: Busca, filtros, paginação
3. **Melhorar Performance**: Cache, lazy loading
4. **Deploy**: Publique em Vercel/Netlify
5. **Monitoramento**: Analytics, logs de erro

---

**🎉 Parabéns! Seu MailHub está funcionando!** 