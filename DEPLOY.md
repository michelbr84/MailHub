# 🚀 Guia de Deploy - MailHub

## 📋 Pré-requisitos para Deploy Público

### 1. ✅ Verificações de Segurança

- [x] **Client ID movido** para variável de ambiente
- [x] **Arquivo .env** adicionado ao .gitignore
- [x] **Validação de Client ID** implementada
- [x] **Sem credenciais hardcoded** no código

### 2. 📁 Estrutura do Projeto

```
MailHub/
├── src/                    # Código fonte
├── public/                 # Arquivos públicos
├── .env                    # ⚠️ NÃO COMMITAR (contém Client ID)
├── .env.example           # ✅ Exemplo de configuração
├── .gitignore             # ✅ Ignora .env
├── README.md              # ✅ Documentação
├── package.json           # ✅ Dependências
└── tsconfig.json          # ✅ Configuração TypeScript
```

## 🔧 Passos para Deploy

### 1. Criar Repositório no GitHub

```bash
# No GitHub.com
1. Vá para github.com/michelbr84
2. Clique em "New repository"
3. Nome: "MailHub"
4. Descrição: "Organize seus emails do Gmail por remetentes"
5. Marque como "Public"
6. NÃO inicialize com README (já temos)
```

### 2. Configurar Git Local

```bash
# No terminal, na pasta do projeto
git init
git add .
git commit -m "Initial commit: MailHub - Gmail organizer by senders"
git branch -M main
git remote add origin https://github.com/michelbr84/MailHub.git
git push -u origin main
```

### 3. Verificar se .env não foi commitado

```bash
# Verificar se .env está sendo ignorado
git status
# Não deve aparecer .env na lista
```

### 4. Configurar GitHub Pages (Opcional)

```bash
# No GitHub, vá em Settings > Pages
# Source: Deploy from a branch
# Branch: main
# Folder: / (root)
```

## 🔒 Configuração de Segurança

### 1. Variáveis de Ambiente

**Para Desenvolvimento Local:**
```bash
# Criar arquivo .env (não commitar)
echo "REACT_APP_GOOGLE_CLIENT_ID=252093419442-pcntf4b18v8s8sd34f76j09tskbds0qf.apps.googleusercontent.com" > .env
```

**Para Produção (Vercel/Netlify):**
- Configure a variável `REACT_APP_GOOGLE_CLIENT_ID` no painel do serviço

### 2. Google Cloud Console

**Atualizar URIs autorizadas:**
- Adicionar: `https://michelbr84.github.io` (se usar GitHub Pages)
- Adicionar: `https://seu-dominio.vercel.app` (se usar Vercel)
- Adicionar: `https://seu-dominio.netlify.app` (se usar Netlify)

## 📝 Arquivos Importantes

### .env.example
```env
REACT_APP_GOOGLE_CLIENT_ID=seu_client_id_aqui.apps.googleusercontent.com
```

### .gitignore
```
# Garante que .env não seja commitado
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

## 🎯 Checklist Final

- [ ] **Repositório criado** no GitHub
- [ ] **Código commitado** sem .env
- [ ] **README atualizado** com instruções
- [ ] **Google Cloud Console** configurado
- [ ] **Variáveis de ambiente** configuradas
- [ ] **Teste local** funcionando
- [ ] **Deploy** realizado (opcional)

## 🚀 Deploy Automático

### Vercel (Recomendado)
1. Conecte o repositório ao Vercel
2. Configure `REACT_APP_GOOGLE_CLIENT_ID`
3. Deploy automático a cada push

### Netlify
1. Conecte o repositório ao Netlify
2. Configure variáveis de ambiente
3. Deploy automático

## 📞 Suporte

Para dúvidas sobre o deploy:
- Abra uma issue no GitHub
- Consulte a documentação do Google Cloud Console
- Verifique os logs de deploy

---

**✅ Projeto pronto para ser público no GitHub!** 🎉 