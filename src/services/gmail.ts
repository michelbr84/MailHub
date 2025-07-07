// Tipos para a API do Gmail
export interface GmailMessage {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  historyId: string;
  internalDate: string;
  payload?: {
    headers: Array<{
      name: string;
      value: string;
    }>;
    body?: {
      data?: string;
    };
  };
}

export interface GmailMessageList {
  messages: GmailMessage[];
  nextPageToken?: string;
  resultSizeEstimate: number;
}

export interface Sender {
  email: string;
  name: string;
  count: number;
}

// Função para verificar se o usuário está autenticado
export function isAuthenticated(): boolean {
  try {
    // Verificar se há token configurado na Google API
    // @ts-ignore
    const hasToken = window.gapi?.client?.getToken();
    
    // Verificar se a Gmail API está carregada
    // @ts-ignore
    const hasGmailAPI = window.gapi?.client?.gmail;
    
    // Verificar se há token válido no localStorage
    const savedToken = localStorage.getItem('mailhub-access-token');
    const timestamp = localStorage.getItem('mailhub-token-timestamp');
    
    let hasValidSavedToken = false;
    if (savedToken && timestamp) {
      const tokenAge = Date.now() - parseInt(timestamp);
      const tokenExpiry = 3600000; // 1 hora
      hasValidSavedToken = tokenAge < tokenExpiry;
    }
    
    console.log('🔍 Verificação de autenticação:', {
      hasToken: !!hasToken,
      hasGmailAPI: !!hasGmailAPI,
      hasValidSavedToken: hasValidSavedToken
    });
    
    // Se não há token na API mas há token válido no localStorage, restaurar
    if (!hasToken && hasValidSavedToken && hasGmailAPI) {
      console.log('🔄 Restaurando token do localStorage...');
      // @ts-ignore
      window.gapi.client.setToken({
        access_token: savedToken
      });
      return true;
    }
    
    return !!hasToken && !!hasGmailAPI;
  } catch (error) {
    console.error('❌ Erro ao verificar autenticação:', error);
    return false;
  }
}

// Função para listar emails da caixa de entrada
export async function listEmails(maxResults: number = 50, pageToken?: string): Promise<GmailMessageList> {
  try {
    console.log('🔍 Buscando emails...');
    
    // Verificar se está autenticado
    if (!isAuthenticated()) {
      throw new Error('Usuário não está autenticado');
    }

    // @ts-ignore
    const response = await window.gapi.client.gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      maxResults,
      pageToken,
    });
    
    console.log('✅ Emails encontrados:', response.result.messages?.length || 0);
    return response.result;
  } catch (error: any) {
    console.error('❌ Erro ao listar emails:', error);
    throw new Error(`Falha ao carregar emails: ${error?.message || 'Erro desconhecido'}`);
  }
}

// Função para obter detalhes de um email específico
export async function getEmailDetails(messageId: string): Promise<GmailMessage> {
  try {
    console.log('📧 Buscando detalhes do email:', messageId);
    
    // @ts-ignore
    const response = await window.gapi.client.gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'metadata',
      metadataHeaders: ['From', 'Subject', 'Date', 'To'],
    });
    
    return response.result;
  } catch (error: any) {
    console.error('❌ Erro ao obter detalhes do email:', error);
    throw new Error(`Falha ao carregar detalhes do email: ${error?.message || 'Erro desconhecido'}`);
  }
}

// Função para extrair remetentes únicos dos emails
export async function getSenders(maxResults: number = 100): Promise<Sender[]> {
  try {
    console.log('👥 Iniciando busca de remetentes...');
    
    const emailList = await listEmails(maxResults);
    console.log('📬 Emails carregados:', emailList.messages?.length || 0);
    
    if (!emailList.messages || emailList.messages.length === 0) {
      console.log('⚠️ Nenhum email encontrado na caixa de entrada');
      return [];
    }

    const sendersMap = new Map<string, { name: string; count: number }>();

    // Processar cada email para extrair remetentes
    for (let i = 0; i < Math.min(emailList.messages.length, 20); i++) {
      const message = emailList.messages[i];
      console.log(`📧 Processando email ${i + 1}/${Math.min(emailList.messages.length, 20)}`);
      
      try {
        const details = await getEmailDetails(message.id);
        const fromHeader = details.payload?.headers?.find(h => h.name === 'From');
        
        if (fromHeader) {
          const { email, name } = parseEmailAddress(fromHeader.value);
          console.log(`👤 Remetente encontrado: ${name} <${email}>`);
          
          if (sendersMap.has(email)) {
            const existing = sendersMap.get(email)!;
            existing.count += 1;
          } else {
            sendersMap.set(email, { name, count: 1 });
          }
        }
      } catch (error: any) {
        console.error(`❌ Erro ao processar email ${message.id}:`, error);
        // Continuar com o próximo email
      }
    }

    // Converter para array e ordenar por quantidade de emails
    const senders = Array.from(sendersMap.entries())
      .map(([email, { name, count }]) => ({ email, name, count }))
      .sort((a, b) => b.count - a.count);

    console.log('✅ Remetentes encontrados:', senders.length);
    return senders;
  } catch (error: any) {
    console.error('❌ Erro ao extrair remetentes:', error);
    throw new Error(`Falha ao carregar remetentes: ${error?.message || 'Erro desconhecido'}`);
  }
}

// Função para buscar emails de um remetente específico
export async function getEmailsBySender(senderEmail: string, maxResults: number = 50): Promise<GmailMessage[]> {
  try {
    console.log('🔍 Buscando emails do remetente:', senderEmail);
    
    // Buscar emails com query específica para o remetente
    // @ts-ignore
    const response = await window.gapi.client.gmail.users.messages.list({
      userId: 'me',
      labelIds: ['INBOX'],
      q: `from:${senderEmail}`,
      maxResults,
    });
    
    const messages = response.result.messages || [];
    console.log('📬 Emails encontrados do remetente:', messages.length);
    
    // Obter detalhes completos de cada email
    const detailedMessages = await Promise.all(
      messages.map((message: { id: string }) => getEmailDetails(message.id))
    );
    
    return detailedMessages;
  } catch (error: any) {
    console.error('❌ Erro ao buscar emails do remetente:', error);
    throw new Error(`Falha ao carregar emails do remetente: ${error?.message || 'Erro desconhecido'}`);
  }
}

// Função auxiliar para parsear endereço de email
function parseEmailAddress(fromHeader: string): { email: string; name: string } {
  // Padrão comum: "Nome <email@domain.com>" ou "email@domain.com"
  const emailMatch = fromHeader.match(/<(.+?)>/) || fromHeader.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  const nameMatch = fromHeader.match(/^([^<]+)/);
  
  const email = emailMatch ? emailMatch[1] : fromHeader.trim();
  const name = nameMatch ? nameMatch[1].trim().replace(/"/g, '') : email;
  
  return { email, name };
}

// Função para fazer logout
export async function signOut(): Promise<void> {
  try {
    console.log('🔄 Iniciando processo de logout...');
    
    // Limpar o token da Google API
    try {
      // @ts-ignore
      if (window.gapi && window.gapi.client && window.gapi.client.setToken) {
        // @ts-ignore
        window.gapi.client.setToken(null);
        console.log('✅ Token da Google API removido');
      }
    } catch (gapiError) {
      console.warn('⚠️ Erro ao limpar token da Google API:', gapiError);
    }
    
    // Limpar dados locais
    try {
      localStorage.removeItem('mailhub-favorites');
      localStorage.removeItem('mailhub-access-token');
      localStorage.removeItem('mailhub-token-timestamp');
      console.log('✅ Dados locais removidos');
    } catch (storageError) {
      console.warn('⚠️ Erro ao limpar dados locais:', storageError);
    }
    
    console.log('✅ Logout realizado com sucesso');
  } catch (error) {
    console.error('❌ Erro geral ao fazer logout:', error);
    // Não lançar erro para evitar quebrar a aplicação
    // O logout ainda é considerado bem-sucedido mesmo com erros menores
  }
} 