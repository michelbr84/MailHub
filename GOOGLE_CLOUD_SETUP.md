# Configuração do Google Cloud Console para MailHub

## 1. Acessar Google Cloud Console

1. Vá para [Google Cloud Console](https://console.cloud.google.com/)
2. Selecione seu projeto ou crie um novo
3. Ative a Gmail API:
   - Vá para "APIs & Services" > "Library"
   - Procure por "Gmail API"
   - Clique em "Enable"

## 2. Configurar OAuth Consent Screen

1. Vá para "APIs & Services" > "OAuth consent screen"
2. Escolha "External" (para desenvolvimento)
3. Preencha as informações:
   - **App name**: MailHub
   - **User support email**: Seu email
   - **Developer contact information**: Seu email
   - **App logo**: Opcional
   - **App domain**: localhost (para desenvolvimento)
   - **Authorized domains**: localhost

4. **Scopes**:
   - Clique em "Add or Remove Scopes"
   - Adicione: `https://www.googleapis.com/auth/gmail.readonly`
   - Salve

5. **Test users**:
   - Adicione seu email como test user
   - Isso permite que você teste sem verificação

## 3. Criar Credenciais OAuth 2.0

1. Vá para "APIs & Services" > "Credentials"
2. Clique em "Create Credentials" > "OAuth 2.0 Client IDs"
3. Configure:
   - **Application type**: Web application
   - **Name**: MailHub Web Client
   - **Authorized JavaScript origins**:
     - `http://localhost:3000` (desenvolvimento)
     - `https://seu-dominio.com` (produção)
   - **Authorized redirect URIs**:
     - `http://localhost:3000` (desenvolvimento)
     - `https://seu-dominio.com` (produção)

4. Clique em "Create"
5. Copie o **Client ID** gerado

## 4. Atualizar o Código

Substitua o CLIENT_ID no arquivo `src/components/Login.tsx`:

```typescript
const CLIENT_ID = 'SEU_CLIENT_ID_AQUI';
```

## 5. Configurações Importantes

### Para Desenvolvimento:
- Use `http://localhost:3000` como origem autorizada
- Adicione seu email como test user
- O app funcionará sem verificação

### Para Produção:
- Use seu domínio real como origem autorizada
- Publique o OAuth consent screen (requer verificação do Google)
- Configure HTTPS

## 6. Solução de Problemas

### Erro "idpiframe_initialization_failed":
- ✅ **SOLUCIONADO**: Usando OAuth2 flow manual com popup
- Evita bibliotecas depreciadas do Google

### Erro de CSP (Content Security Policy):
- ✅ **SOLUCIONADO**: Removidas meta tags restritivas
- OAuth2 flow é compatível com CSP padrão

### Erro 401 (Unauthorized):
- ✅ **SOLUCIONADO**: Obtém access tokens corretos via OAuth2
- Configuração adequada dos scopes no OAuth consent screen

### Erro de verificação:
- Para desenvolvimento: Adicione-se como test user
- Para produção: Publique o OAuth consent screen

## 7. Testando

1. Inicie o servidor: `npm start`
2. Acesse `http://localhost:3000`
3. Clique no botão "Sign in with Google"
4. Autorize o acesso ao Gmail
5. Verifique se os emails e remetentes carregam

## 8. Deploy para Produção

1. Configure seu domínio no Google Cloud Console
2. Publique o OAuth consent screen
3. Configure HTTPS no seu servidor
4. Atualize as origens autorizadas
5. Deploy da aplicação

## Notas Importantes

- ✅ **OAuth2 Manual**: Implementação manual do fluxo OAuth2
- ✅ **Access Tokens**: Obtém tokens corretos para Gmail API
- ✅ **CSP Compatível**: Funciona com políticas de segurança padrão
- ✅ **Sem Depreciação**: Não usa bibliotecas depreciadas do Google 