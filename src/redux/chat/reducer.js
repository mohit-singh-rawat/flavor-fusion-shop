import { chatActionTypes } from './constant';

const initialState = {
  sessionId: null,
  messages: [],
  isConnected: false,
  isLoading: false,
  isTyping: false,
  isRecording: false,
  error: null
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    // Session
    case chatActionTypes.CHAT_SESSION_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case chatActionTypes.CHAT_SESSION_SUCCESS:
      return {
        ...state,
        sessionId: action.payload.sessionId,
        isLoading: false
      };
    case chatActionTypes.CHAT_SESSION_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
      
    // History
    case chatActionTypes.CHAT_HISTORY_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case chatActionTypes.CHAT_HISTORY_SUCCESS:
      return {
        ...state,
        messages: action.payload.messages,
        isLoading: false
      };
    case chatActionTypes.CHAT_HISTORY_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload.error
      };
      
    // Messages
    case chatActionTypes.CHAT_RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        isTyping: false
      };
      
    // Connection
    case chatActionTypes.CHAT_CONNECTED:
      return {
        ...state,
        isConnected: true
      };
    case chatActionTypes.CHAT_DISCONNECTED:
      return {
        ...state,
        isConnected: false
      };
      
    // Typing
    case chatActionTypes.CHAT_TYPING_START:
      return {
        ...state,
        isTyping: true
      };
    case chatActionTypes.CHAT_TYPING_STOP:
      return {
        ...state,
        isTyping: false
      };
      
    // Voice
    case chatActionTypes.CHAT_VOICE_START:
      return {
        ...state,
        isRecording: true
      };
    case chatActionTypes.CHAT_VOICE_STOP:
      return {
        ...state,
        isRecording: false
      };
      
    // Reset
    case chatActionTypes.CHAT_RESET:
      return initialState;
      
    default:
      return state;
  }
};

export default chatReducer;