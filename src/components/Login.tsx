import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Paper, 
  CircularProgress,
  Alert
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

// Configuração do Google OAuth2
const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

interface LoginProps {
  onSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  // Função para salvar token no localStorage
  const saveToken = (token: string) => {
    try {
      localStorage.setItem('mailhub-access-token', token);
      localStorage.setItem('mailhub-token-timestamp', Date.now().toString());
      console.log('✅ Token salvo no localStorage');
    } catch (error) {
      console.warn('⚠️ Erro ao salvar token:', error);
    }
  };

  // Função para carregar token do localStorage
  const loadToken = (): string | null => {
    try {
      const token = localStorage.getItem('mailhub-access-token');
      const timestamp = localStorage.getItem('mailhub-token-timestamp');
      
      if (token && timestamp) {
        const tokenAge = Date.now() - parseInt(timestamp);
        const tokenExpiry = 3600000; // 1 hora em millisegundos
        
        if (tokenAge < tokenExpiry) {
          console.log('✅ Token válido encontrado no localStorage');
          return token;
        } else {
          console.log('⚠️ Token expirado, removendo...');
          localStorage.removeItem('mailhub-access-token');
          localStorage.removeItem('mailhub-token-timestamp');
        }
      }
    } catch (error) {
      console.warn('⚠️ Erro ao carregar token:', error);
    }
    return null;
  };

  // Função para configurar token na Google API
  const configureToken = (token: string): boolean => {
    try {
      // @ts-ignore
      if (window.gapi && window.gapi.client) {
        // @ts-ignore
        window.gapi.client.setToken({
          access_token: token
        });
        console.log('✅ Token configurado na Google API');
        return true;
      }
    } catch (error) {
      console.error('❌ Erro ao configurar token:', error);
    }
    return false;
  };

  useEffect(() => {
    const initializeGoogleAPI = () => {
      setDebugInfo('Iniciando carregamento da Google API...');
      
      // @ts-ignore
      if (window.gapi) {
        setDebugInfo('Google API detectada, inicializando...');
        
        // @ts-ignore
        window.gapi.load('client', () => {
          setDebugInfo('Carregando módulo client...');
          
          // @ts-ignore
          window.gapi.client.init({
            apiKey: undefined, // Não precisamos de API key para OAuth
            discoveryDocs: ['https://gmail.googleapis.com/$discovery/rest?version=v1'],
          }).then(() => {
            setIsGapiLoaded(true);
            setDebugInfo('✅ Google API inicializada com sucesso');
            console.log('✅ Google API inicializada com sucesso');
            
            // Tentar restaurar token existente
            const savedToken = loadToken();
            if (savedToken && configureToken(savedToken)) {
              console.log('✅ Token restaurado com sucesso');
              setDebugInfo('✅ Login restaurado com sucesso');
              onSuccess();
            }
          }).catch((err: any) => {
            console.error('❌ Erro detalhado:', err);
            setError(`Erro na configuração: ${err.message || 'Erro desconhecido'}`);
            setDebugInfo(`❌ Erro: ${err.message || 'Erro desconhecido'}`);
          });
        });
      } else {
        setError('Google API não carregada. Recarregue a página.');
        setDebugInfo('❌ Google API não encontrada');
      }
    };

    // Aguardar um pouco para garantir que a API carregou
    const timer = setTimeout(() => {
      initializeGoogleAPI();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onSuccess]);

  // Verificar se há token na URL ao carregar a página
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');
    const error = urlParams.get('error');
    
    if (accessToken) {
      console.log('✅ Token encontrado na URL:', accessToken.substring(0, 20) + '...');
      
      // Salvar token no localStorage
      saveToken(accessToken);
      
      // Configurar o token na Google API
      if (configureToken(accessToken)) {
        // Limpar a URL
        window.history.replaceState({}, document.title, window.location.pathname);
        
        setDebugInfo('✅ Login realizado com sucesso');
        onSuccess();
      } else {
        setError('Erro ao configurar token na Google API.');
        setDebugInfo('❌ Erro ao configurar token');
      }
    } else if (error) {
      console.error('❌ Erro no OAuth2:', error);
      setError(`Erro de autorização: ${error}`);
      setDebugInfo(`❌ Erro: ${error}`);
      
      // Limpar a URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [onSuccess]);

  const handleLogin = async () => {
    if (!CLIENT_ID) {
      setError('Client ID não configurado. Configure a variável REACT_APP_GOOGLE_CLIENT_ID.');
      setDebugInfo('❌ Client ID não encontrado');
      return;
    }

    setIsLoading(true);
    setError(null);
    setDebugInfo('Iniciando OAuth2 flow...');

    try {
      // Obter o domínio atual dinamicamente
      const currentOrigin = window.location.origin;
      
      // Criar URL de autorização OAuth2
      const authUrl = `https://accounts.google.com/o/oauth2/auth?` +
        `client_id=${CLIENT_ID}&` +
        `redirect_uri=${encodeURIComponent(currentOrigin)}&` +
        `scope=${encodeURIComponent(SCOPES)}&` +
        `response_type=token&` +
        `prompt=consent`;

      // Redirecionar para a página de autorização
      window.location.href = authUrl;

    } catch (err: any) {
      console.error('❌ Erro durante o login:', err);
      setError(`Erro durante o login: ${err.message || 'Erro desconhecido'}`);
      setDebugInfo(`❌ Erro de login: ${err.message || 'Erro desconhecido'}`);
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    setDebugInfo('Recarregando...');
    window.location.reload();
  };

  const handleClearToken = () => {
    try {
      localStorage.removeItem('mailhub-access-token');
      localStorage.removeItem('mailhub-token-timestamp');
      console.log('✅ Token removido do localStorage');
      setDebugInfo('Token removido. Tente fazer login novamente.');
    } catch (error) {
      console.error('❌ Erro ao remover token:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          MailHub
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Organize seus emails do Gmail por remetentes
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {debugInfo && (
          <Alert severity="info" sx={{ mb: 3 }}>
            <Typography variant="body2" component="div">
              {debugInfo}
            </Typography>
          </Alert>
        )}

        <Button
          variant="contained"
          size="large"
          startIcon={isLoading ? <CircularProgress size={20} /> : <GoogleIcon />}
          onClick={handleLogin}
          disabled={!isGapiLoaded || isLoading}
          fullWidth
          sx={{ mb: 2 }}
        >
          {isLoading ? 'Entrando...' : 'Entrar com Google'}
        </Button>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={handleRetry}
            disabled={isLoading}
            sx={{ flex: 1 }}
          >
            Tentar Novamente
          </Button>
          
          <Button
            variant="outlined"
            onClick={handleClearToken}
            disabled={isLoading}
            sx={{ flex: 1 }}
          >
            Limpar Token
          </Button>
        </Box>

        {!isGapiLoaded && !error && (
          <Box sx={{ mt: 2 }}>
            <CircularProgress size={24} />
            <Typography variant="body2" sx={{ mt: 1 }}>
              Carregando Google API...
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Login; 