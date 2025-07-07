# MailHub 📧

Organize seus emails por remetentes de forma inteligente e eficiente.

## 🚀 Sobre o Projeto

O MailHub é uma aplicação web que permite aos usuários organizar seus emails do Gmail por remetentes, criando "pastas virtuais" para cada pessoa ou empresa que envia emails. Os usuários podem favoritar remetentes importantes, que aparecerão na tela inicial para acesso rápido.

## ✨ Funcionalidades

- 🔐 **Autenticação Google OAuth2** - Login seguro com sua conta Google
- 📬 **Leitura de Emails** - Acesso à caixa de entrada do Gmail
- 👥 **Lista de Remetentes** - Visualização de todos os remetentes únicos
- ⭐ **Sistema de Favoritos** - Marque remetentes importantes
- 📁 **Pastas Virtuais** - Organize emails por remetente
- 💾 **Persistência Local** - Favoritos salvos no navegador
- 📱 **Interface Responsiva** - Funciona em desktop e mobile

## 🛠️ Tecnologias Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipagem estática
- **Material-UI (MUI)** - Componentes de interface
- **Gmail API** - Integração com Gmail
- **Google Identity Services** - Autenticação moderna

## 📋 Pré-requisitos

- Node.js 16+ e npm
- Conta Google com Gmail
- Projeto no Google Cloud Console com Gmail API habilitada

## 🔧 Configuração

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Google Cloud Console

**📋 Guia Completo**: Veja o arquivo `GOOGLE_CLOUD_SETUP.md` para instruções detalhadas.

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou use um existente
3. Habilite a **Gmail API**
4. Configure o **OAuth Consent Screen**:
   - Escolha "External" para desenvolvimento
   - Adicione o scope: `https://www.googleapis.com/auth/gmail.readonly`
   - Adicione seu email como test user
5. Crie credenciais OAuth2:
   - Tipo: Web Application
   - JavaScript origins: `http://localhost:3000` (desenvolvimento)
   - Redirect URIs: `http://localhost:3000`

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com
```

**⚠️ IMPORTANTE:** Nunca commite o arquivo `.env` no repositório. Ele contém informações sensíveis.

### 4. Executar o Projeto

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Login.tsx          # Componente de autenticação
│   ├── Dashboard.tsx      # Dashboard principal
│   ├── SenderList.tsx     # Lista de remetentes
│   └── EmailList.tsx      # Lista de emails por remetente
├── services/
│   └── gmail.ts           # Serviços da Gmail API
├── App.tsx                # Componente principal
└── index.tsx              # Ponto de entrada
```

## 🔄 Fluxo de Uso

1. **Login**: Usuário faz login com sua conta Google
2. **Carregamento**: Sistema busca emails e extrai remetentes únicos
3. **Organização**: Usuário pode favoritar remetentes importantes
4. **Visualização**: Clica em um remetente para ver todos os emails dele
5. **Persistência**: Favoritos são salvos automaticamente

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao Vercel
2. Configure a variável de ambiente `REACT_APP_GOOGLE_CLIENT_ID`
3. Atualize as URIs no Google Cloud Console para incluir seu domínio
4. Deploy automático a cada push

### Netlify

1. Conecte seu repositório ao Netlify
2. Configure as variáveis de ambiente
3. Deploy

## 🔒 Segurança

- Apenas permissões de leitura do Gmail
- Tokens OAuth2 seguros
- Nenhum dado sensível é armazenado no servidor
- Favoritos salvos apenas localmente

## 🐛 Solução de Problemas

### Erro "idpiframe_initialization_failed"
- ✅ **SOLUCIONADO**: Agora usando Google Identity Services
- Não mais usa bibliotecas depreciadas

### Erro de CSP (Content Security Policy)
- ✅ **SOLUCIONADO**: Removidas meta tags restritivas
- Google Identity Services é compatível com CSP padrão

### Erro de Autenticação
- Verifique se o Client ID está correto
- Confirme se as URIs estão configuradas no Google Cloud Console
- Limpe o cache do navegador
- Adicione-se como test user no OAuth consent screen

### Erro ao Carregar Emails
- Verifique se a Gmail API está habilitada
- Confirme se o usuário autorizou as permissões
- Verifique a conexão com a internet

## 📝 Licença

Este projeto está sob a licença MIT.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

## 🔗 Links

- **Repositório:** [github.com/michelbr84/MailHub](https://github.com/michelbr84/MailHub)
- **Deploy Guide:** [DEPLOY.md](./DEPLOY.md)
- **Google Cloud Setup:** [GOOGLE_CLOUD_SETUP.md](./GOOGLE_CLOUD_SETUP.md)

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

**Desenvolvido com ❤️ para organizar emails de forma inteligente** 