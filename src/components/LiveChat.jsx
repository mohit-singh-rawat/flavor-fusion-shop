import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import {
  connectChat,
  disconnectChat,
  createChatSession,
  sendChatMessage,
  startTyping,
  stopTyping,
  startVoiceRecording,
  stopVoiceRecording,
  sendVoiceMessage
} from '../redux/chat/actions';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const dispatch = useDispatch();
  
  // Get chat state from Redux
  const {
    sessionId,
    messages,
    isConnected,
    isTyping,
    isRecording,
    isLoading,
    error
  } = useSelector(state => state.chat);

  // Initialize speech recognition
  const recognitionRef = useRef(null);
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (sessionId) {
          dispatch(sendVoiceMessage(sessionId, transcript));
        }
        toast.success(`Voice message: "${transcript}"`);
      };

      recognitionRef.current.onerror = () => {
        toast.error('Voice recognition failed');
        dispatch(stopVoiceRecording());
      };
    }
  }, [dispatch, sessionId]);

  // Connect to socket when component mounts
  useEffect(() => {
    if (isOpen && !isConnected) {
      dispatch(connectChat());
    }
    
    return () => {
      if (isConnected) {
        dispatch(disconnectChat());
      }
    };
  }, [isOpen, isConnected, dispatch]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Create chat session
  const handleOpenChat = () => {
    setIsOpen(true);
    if (!sessionId) {
      const userId = localStorage.getItem('userId') || null;
      dispatch(createChatSession(userId));
    }
  };

  // Send message
  const handleSend = () => {
    if (!newMessage.trim() || !sessionId) return;
    
    dispatch(sendChatMessage(sessionId, newMessage));
    setNewMessage('');
    
    // Clear typing indicator
    clearTimeout(typingTimeoutRef.current);
    dispatch(stopTyping(sessionId));
  };

  // Handle typing
  const handleTyping = (e) => {
    setNewMessage(e.target.value);
    
    if (sessionId) {
      dispatch(startTyping(sessionId));
      
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => {
        dispatch(stopTyping(sessionId));
      }, 1000);
    }
  };

  // Voice recording
  const toggleRecording = () => {
    if (isRecording) {
      dispatch(stopVoiceRecording());
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    } else {
      dispatch(startVoiceRecording());
      if (recognitionRef.current) {
        recognitionRef.current.start();
        toast.info('Recording... Speak now!');
      } else {
        toast.error('Voice recognition not supported in this browser');
      }
    }
  };

  // Quick replies
  const quickReplies = [
    "What are your hours?",
    "Do you deliver?", 
    "Custom cake options",
    "Order status"
  ];

  const handleQuickReply = (reply) => {
    if (sessionId) {
      dispatch(sendChatMessage(sessionId, reply));
    }
  };

  // Format messages for display
  const formattedMessages = messages.length > 0 ? messages : [
    {
      id: 'welcome',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString()
    }
  ];

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => isOpen ? setIsOpen(false) : handleOpenChat()}
          className={`w-14 h-14 rounded-full shadow-lg transition-all ${
            isConnected 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
        {!isConnected && isOpen && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-t-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Live Support</h3>
                <p className="text-sm opacity-90">
                  {isConnected ? 'Online' : 'Connecting...'}
                </p>
              </div>
              <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {isLoading && (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            {formattedMessages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-orange-500 text-white' 
                    : msg.sender === 'bot'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <div className="flex items-center gap-2">
                    {msg.messageType === 'voice' && <Volume2 className="w-4 h-4" />}
                    <p className="text-sm">{msg.text}</p>
                  </div>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {formattedMessages.length <= 1 && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {quickReplies.map(reply => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuickReply(reply)}
                    disabled={!isConnected}
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t flex gap-2">
            <Input
              value={newMessage}
              onChange={handleTyping}
              placeholder="Type your message..."
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
              disabled={!isConnected}
            />
            <Button
              onClick={toggleRecording}
              size="sm"
              variant="outline"
              className={isRecording ? 'text-red-500 animate-pulse' : ''}
              disabled={!isConnected}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button 
              onClick={handleSend} 
              size="sm" 
              disabled={!isConnected || !newMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default LiveChat;