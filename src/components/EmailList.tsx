import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  Paper,
  Divider,
  Chip
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { Sender, GmailMessage } from '../services/gmail';

interface EmailListProps {
  sender: Sender;
  emails: GmailMessage[];
  onBack: () => void;
}

const EmailList: React.FC<EmailListProps> = ({ sender, emails, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(parseInt(dateString));
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getHeaderValue = (message: GmailMessage, headerName: string): string => {
    return message.payload?.headers?.find(h => h.name === headerName)?.value || '';
  };

  if (emails.length === 0) {
    return (
      <Box>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
        
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <EmailIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Nenhum email encontrado
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Não há emails de {sender.name} na sua caixa de entrada.
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onBack}
        sx={{ mb: 2 }}
      >
        Voltar
      </Button>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Emails de {sender.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {sender.email} • {emails.length} email(s)
        </Typography>
      </Paper>

      <List>
        {emails.map((email, index) => {
          const subject = getHeaderValue(email, 'Subject');
          const date = getHeaderValue(email, 'Date');
          
          return (
            <React.Fragment key={email.id}>
              <ListItem
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="subtitle1" component="span">
                        {subject || '(Sem assunto)'}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Box component="div">
                      <Typography variant="body2" color="text.secondary" component="div" sx={{ mb: 1 }}>
                        {email.snippet}
                      </Typography>
                      <Box display="flex" gap={1} alignItems="center">
                        <Chip
                          label={formatDate(email.internalDate)}
                          size="small"
                          variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary" component="span">
                          ID: {email.id}
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < emails.length - 1 && <Divider />}
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
};

export default EmailList; 