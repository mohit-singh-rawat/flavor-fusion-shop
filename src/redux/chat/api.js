import { postRequest, getRequest } from '../../helpers/api/apiCores';

// Create new chat session
export const createChatSession = (userId = null) => {
  return postRequest('/api/chat/session', { userId });
};

// Get chat history
export const getChatHistory = (sessionId) => {
  return getRequest(`/api/chat/history/${sessionId}`);
};