import { useState, useEffect } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onstart = () => {
        setIsListening(true);
        toast.info('Listening... Speak now!');
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onSearch(transcript);
        toast.success(`Searching for: "${transcript}"`);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        setIsListening(false);
        toast.error('Voice search failed. Please try again.');
      };

      setRecognition(recognitionInstance);
    }
  }, [onSearch]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Voice search not supported in this browser');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  if (!recognition) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleListening}
      className={`${isListening ? 'text-red-500 animate-pulse' : 'text-gray-500'}`}
      title="Voice Search"
    >
      {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </Button>
  );
};

export default VoiceSearch;