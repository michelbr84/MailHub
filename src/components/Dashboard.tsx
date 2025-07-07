import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  Container
} from '@mui/material';
import { Logout as LogoutIcon } from '@mui/icons-material';
import SenderList from './SenderList';
import EmailList from './EmailList';
import { Sender, GmailMessage } from '../services/gmail';

interface DashboardProps {
  onLogout: () => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`dashboard-tabpanel-${index}`}
      aria-labelledby={`dashboard-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [tabValue, setTabValue] = useState(0);
  const [senders, setSenders] = useState<Sender[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selectedSender, setSelectedSender] = useState<Sender | null>(null);
  const [emails, setEmails] = useState<GmailMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar remetentes favoritos do localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('mailhub-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Salvar favoritos no localStorage
  useEffect(() => {
    localStorage.setItem('mailhub-favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Carregar remetentes
  useEffect(() => {
    loadSenders();
  }, []);

  const loadSenders = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔄 Iniciando carregamento de remetentes...');
      
      // Importar dinamicamente para evitar problemas de carregamento
      const { getSenders, isAuthenticated } = await import('../services/gmail');
      
      // Verificar se está autenticado
      if (!isAuthenticated()) {
        throw new Error('Usuário não está autenticado. Faça login novamente.');
      }
      
      console.log('✅ Usuário autenticado, buscando remetentes...');
      const sendersData = await getSenders(20); // Reduzir para 20 emails para teste
      console.log('✅ Remetentes carregados:', sendersData.length);
      
      setSenders(sendersData);
    } catch (err: any) {
      console.error('❌ Erro ao carregar remetentes:', err);
      setError('Erro ao carregar remetentes: ' + (err?.message || 'Erro desconhecido'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log('🔄 Iniciando logout...');
      const { signOut } = await import('../services/gmail');
      await signOut();
      console.log('✅ Logout concluído, redirecionando...');
      onLogout();
    } catch (err: any) {
      console.error('❌ Erro durante logout:', err);
      // Mesmo com erro, continuar com o logout da aplicação
      console.log('🔄 Continuando logout da aplicação...');
      onLogout();
    }
  };

  const toggleFavorite = (senderEmail: string) => {
    setFavorites(prev => 
      prev.includes(senderEmail)
        ? prev.filter(email => email !== senderEmail)
        : [...prev, senderEmail]
    );
  };

  const handleSenderSelect = async (sender: Sender) => {
    setSelectedSender(sender);
    setTabValue(1); // Muda para a aba de emails
    
    try {
      const { getEmailsBySender } = await import('../services/gmail');
      const emailsData = await getEmailsBySender(sender.email, 50);
      setEmails(emailsData);
    } catch (err: any) {
      setError('Erro ao carregar emails: ' + err.message);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const favoriteSenders = senders.filter(sender => favorites.includes(sender.email));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MailHub
          </Typography>
          <Button 
            color="inherit" 
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Sair
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ width: '100%' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Remetentes" />
            <Tab label="Emails" disabled={!selectedSender} />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {isLoading ? (
              <Box display="flex" justifyContent="center" p={3}>
                <CircularProgress />
              </Box>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Favoritos ({favoriteSenders.length})
                  </Typography>
                  <SenderList
                    senders={favoriteSenders}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onSenderSelect={handleSenderSelect}
                    emptyMessage="Nenhum remetente favoritado"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>
                    Todos os Remetentes ({senders.length})
                  </Typography>
                  <SenderList
                    senders={senders}
                    favorites={favorites}
                    onToggleFavorite={toggleFavorite}
                    onSenderSelect={handleSenderSelect}
                    emptyMessage="Nenhum remetente encontrado"
                  />
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            {selectedSender && (
              <EmailList
                sender={selectedSender}
                emails={emails}
                onBack={() => setTabValue(0)}
              />
            )}
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default Dashboard; 