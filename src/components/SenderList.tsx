import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Chip,
  Tooltip
} from '@mui/material';
import {
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { Sender } from '../services/gmail';

interface SenderListProps {
  senders: Sender[];
  favorites: string[];
  onToggleFavorite: (senderEmail: string) => void;
  onSenderSelect: (sender: Sender) => void;
  emptyMessage: string;
}

const SenderList: React.FC<SenderListProps> = ({
  senders,
  favorites,
  onToggleFavorite,
  onSenderSelect,
  emptyMessage
}) => {
  if (senders.length === 0) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
        sx={{ minHeight: 200 }}
      >
        <EmailIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ maxHeight: 400, overflow: 'auto' }}>
      {senders.map((sender) => {
        const isFavorite = favorites.includes(sender.email);
        
        return (
          <ListItem
            key={sender.email}
            button
            onClick={() => onSenderSelect(sender)}
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
                <Box component="div" display="flex" alignItems="center" gap={1}>
                  <Typography variant="subtitle1" component="span">
                    {sender.name}
                  </Typography>
                  <Chip
                    label={sender.count}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              }
              secondary={
                <Typography variant="body2" color="text.secondary" component="div">
                  {sender.email}
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <Tooltip title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}>
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(sender.email);
                  }}
                  color={isFavorite ? "primary" : "default"}
                >
                  {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SenderList; 