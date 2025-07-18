import { chatActionTypes } from './constant';

// Session actions
export const createChatSession = (userId = null) => ({
  type: chatActionTypes.CHAT_SESSION_REQUEST,
  payload: { userId }
});

export const chatSessionSuccess = (sessionId) => ({
  type: chatActionTypes.CHAT_SESSION_SUCCESS,
  payload: { sessionId }
});

export const chatSessionFailure = (error) => ({
  type: chatActionTypes.CHAT_SESSION_FAILURE,
  payload: { error }
});

// History actions
export const getChatHistory = (sessionId) => ({
  type: chatActionTypes.CHAT_HISTORY_REQUEST,
  payload: { sessionId }
});

export const chatHistorySuccess = (messages) => ({
  type: chatActionTypes.CHAT_HISTORY_SUCCESS,
  payload: { messages }
});

export const chatHistoryFailure = (error) => ({
  type: chatActionTypes.CHAT_HISTORY_FAILURE,
  payload: { error }
});

// Message actions
export const sendChatMessage = (sessionId, message, messageType = 'text') => ({
  type: chatActionTypes.CHAT_SEND_MESSAGE,
  payload: { sessionId, message, messageType }
});

export const receiveChatMessage = (message) => ({
  type: chatActionTypes.CHAT_RECEIVE_MESSAGE,
  payload: { message }
});

// Connection actions
export const connectChat = () => ({
  type: chatActionTypes.CHAT_CONNECT
});

export const disconnectChat = () => ({
  type: chatActionTypes.CHAT_DISCONNECT
});

export const chatConnected = () => ({
  type: chatActionTypes.CHAT_CONNECTED
});

export const chatDisconnected = () => ({
  type: chatActionTypes.CHAT_DISCONNECTED
});

// Typing actions
export const startTyping = (sessionId) => ({
  type: chatActionTypes.CHAT_TYPING_START,
  payload: { sessionId }
});

export const stopTyping = (sessionId) => ({
  type: chatActionTypes.CHAT_TYPING_STOP,
  payload: { sessionId }
});

// Voice actions
export const startVoiceRecording = () => ({
  type: chatActionTypes.CHAT_VOICE_START
});

export const stopVoiceRecording = () => ({
  type: chatActionTypes.CHAT_VOICE_STOP
});

export const sendVoiceMessage = (sessionId, transcription) => ({
  type: chatActionTypes.CHAT_VOICE_SEND,
  payload: { sessionId, transcription }
});

// Reset action
export const resetChat = () => ({
  type: chatActionTypes.CHAT_RESET
});