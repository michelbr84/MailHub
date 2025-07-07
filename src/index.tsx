import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Global error handler para capturar erros não tratados
window.addEventListener('error', (event) => {
  console.error('❌ Erro global capturado:', event.error);
  console.error('❌ Detalhes do erro:', {
    message: event.message,
    filename: event.filename,
    lineno: event.lineno,
    colno: event.colno,
  });
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('❌ Promise rejection não tratada:', event.reason);
  event.preventDefault(); // Previne que o erro quebre a aplicação
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 