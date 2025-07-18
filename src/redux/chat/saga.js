import { call, put, takeLatest, fork, take, cancel } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { chatActionTypes } from './constant';
import { createChatSession, getChatHistory } from './api';
import {
  chatSessionSuccess,
  chatSessionFailure,
  chatHistorySuccess,
  chatHistoryFailure,
  chatConnected,
  chatDisconnected,
  receiveChatMessage
} from './actions';
import { io } from 'socket.io-client';

// Socket instance
let socket;

// Create socket connection
function connectSocket() {
  const hostname = window.location.hostname;
  return io(`http://${hostname}:5000`, {
    transports: ['websocket', 'polling']
  });
}

// Create event channel for socket events
function createSocketChannel(socket) {
  return eventChannel(emit => {
    // Connection events
    socket.on('connect', () => {
      emit(chatConnected());
    });

    socket.on('disconnect', () => {
      emit(chatDisconnected());
    });

    // Message events
    socket.on('new-message', (message) => {
      emit(receiveChatMessage({
        id: message.id,
        text: message.message,
        sender: message.sender,
        time: new Date(message.timestamp).toLocaleTimeString(),
        messageType: message.messageType,
        voiceData: message.voiceData
      }));
    });

    // Typing events
    socket.on('user-typing', (data) => {
      if (data.isTyping) {
        emit({ type: chatActionTypes.CHAT_TYPING_START });
      } else {
        emit({ type: chatActionTypes.CHAT_TYPING_STOP });
      }
    });

    // Return unsubscribe function
    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('new-message');
      socket.off('user-typing');
    };
  });
}

// Socket connection saga
function* handleSocketConnection() {
  try {
    socket = yield call(connectSocket);
    const socketChannel = yield call(createSocketChannel, socket);
    
    while (true) {
      const action = yield take(socketChannel);
      yield put(action);
    }
  } catch (error) {
    console.error('Socket error:', error);
    yield put(chatDisconnected());
  } finally {
    if (socket) {
      socket.disconnect();
    }
  }
}

// Create chat session saga
function* createChatSessionSaga(action) {
  try {
    const response = yield call(createChatSession, action.payload.userId);
    const sessionId = response.data.sessionId;
    
    yield put(chatSessionSuccess(sessionId));
    
    // Join session room
    if (socket && sessionId) {
      socket.emit('join-session', sessionId);
    }
  } catch (error) {
    yield put(chatSessionFailure(error.message));
  }
}

// Get chat history saga
function* getChatHistorySaga(action) {
  try {
    const response = yield call(getChatHistory, action.payload.sessionId);
    
    const messages = response.data.messages.map(msg => ({
      id: msg._id,
      text: msg.message,
      sender: msg.sender,
      time: new Date(msg.timestamp).toLocaleTimeString(),
      messageType: msg.messageType,
      voiceData: msg.voiceData
    }));
    
    yield put(chatHistorySuccess(messages));
  } catch (error) {
    yield put(chatHistoryFailure(error.message));
  }
}

// Send message saga
function* sendMessageSaga(action) {
  try {
    const { sessionId, message, messageType } = action.payload;
    
    if (socket) {
      socket.emit('send-message', {
        sessionId,
        message,
        sender: 'user',
        messageType
      });
    }
  } catch (error) {
    console.error('Send message error:', error);
  }
}

// Send voice message saga
function* sendVoiceMessageSaga(action) {
  try {
    const { sessionId, transcription } = action.payload;
    
    if (socket) {
      socket.emit('send-voice', {
        sessionId,
        transcription
      });
    }
  } catch (error) {
    console.error('Send voice message error:', error);
  }
}

// Typing indicator saga
function* typingIndicatorSaga(action) {
  try {
    const { sessionId } = action.payload;
    const isTyping = action.type === chatActionTypes.CHAT_TYPING_START;
    
    if (socket) {
      socket.emit('typing', { sessionId, isTyping });
    }
  } catch (error) {
    console.error('Typing indicator error:', error);
  }
}

// Connect chat saga
function* connectChatSaga() {
  // Start socket connection task
  const socketTask = yield fork(handleSocketConnection);
  
  // Wait for disconnect action
  yield take(chatActionTypes.CHAT_DISCONNECT);
  
  // Cancel socket task
  yield cancel(socketTask);
  
  if (socket) {
    socket.disconnect();
  }
}

// Root chat saga
export default function* chatSaga() {
  yield takeLatest(chatActionTypes.CHAT_CONNECT, connectChatSaga);
  yield takeLatest(chatActionTypes.CHAT_SESSION_REQUEST, createChatSessionSaga);
  yield takeLatest(chatActionTypes.CHAT_HISTORY_REQUEST, getChatHistorySaga);
  yield takeLatest(chatActionTypes.CHAT_SEND_MESSAGE, sendMessageSaga);
  yield takeLatest(chatActionTypes.CHAT_VOICE_SEND, sendVoiceMessageSaga);
  yield takeLatest([chatActionTypes.CHAT_TYPING_START, chatActionTypes.CHAT_TYPING_STOP], typingIndicatorSaga);
}