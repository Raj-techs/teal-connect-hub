
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock image for AI assistant character
const AI_CHARACTER_IMAGE = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const responses: { [key: string]: string } = {
  "opportunities": "Here are some job opportunities for you, including local, remote, and skill-based options.",
  "jobs": "మీరు ఏమి చేస్తున్నారు",
  "women empowerment": "Women can showcase their skills like cooking, tailoring, or handicrafts through our platform and sell products online.",
  "education": "We offer online learning programs for financial literacy, farming techniques, and basic business skills.",
  "agriculture": "Get guidance on modern farming methods, market access, and sustainable practices.",
  "healthcare": "Access information about nearby clinics, health services, and telemedicine consultations.",
  "support": "I'm here to assist you with any questions about jobs, business, or rural empowerment.",
  "sell products": "You can easily list your homemade products (like pickles, handicrafts, or snacks) on the platform and reach more customers.",
  "delivery services": "You can hire local transporters for product delivery or offer your own delivery services to earn income.",
  "financial literacy": "We offer courses on money management, saving strategies, and financial independence for rural communities.",
  "microfinance": "Learn about small loans and financial aid options for rural businesses.",
  "connect": "Connect with nearby farmers, sellers, and delivery agents to expand your network and market reach."
};

const AIChat = () => {
  const speechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = speechRecognition ? new speechRecognition() : null;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [aiCharacterLoaded, setAiCharacterLoaded] = useState(false);

  // Check available voices on load
  useEffect(() => {
    const checkVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      console.log("Available voices:");
      voices.forEach(voice => {
        console.log(`${voice.name} - ${voice.lang}`);
      });
    };
    
    // Check voices when voices change or on initial load
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = checkVoices;
      checkVoices();
    }
    
    try {
      // Attempt to connect to MongoDB when component mounts
      if (typeof connectDB === 'function') {
        connectDB();
      }
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    }
    
    // Cancel any ongoing speech when component unmounts
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if (!window.speechSynthesis || muted) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a Telugu voice first
    const teluguVoice = voices.find(voice => voice.lang === 'te-IN');
    if (teluguVoice) {
      utterance.voice = teluguVoice;
    } else {
      // Fallback to a female voice if available
      const femaleVoice = voices.find(voice => 
        voice.name.includes('Female') || 
        voice.name.includes('Samantha') || 
        voice.name.includes('Zira')
      );
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
    }
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    const aiResponseText = responses[inputText.toLowerCase()] || 
      "I'm here to assist you with any questions about jobs, opportunities, or rural empowerment.";

    const aiResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: aiResponseText,
      sender: 'ai',
      timestamp: new Date()
    };

    setTimeout(() => {
      setMessages((prev) => [...prev, aiResponse]);
      // Speak the AI response
      speakText(aiResponseText);
    }, 1000);
  };

  const toggleRecording = () => {
    if (!recognition) return;
    
    setIsRecording((prev) => !prev);

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
      
      // Cancel any ongoing speech when starting to record
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      setIsRecording(false);
      
      // Automatically send message after recording
      setTimeout(() => {
        // We need to use this approach because the state might not be updated yet
        setMessages((prev) => {
          const userMessage: Message = {
            id: Date.now().toString(),
            text: transcript,
            sender: 'user',
            timestamp: new Date()
          };
          
          const aiResponseText = responses[transcript.toLowerCase()] || 
            "I'm here to assist you with any questions about jobs, opportunities, or rural empowerment.";
          
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            text: aiResponseText,
            sender: 'ai',
            timestamp: new Date()
          };
          
          setTimeout(() => {
            speakText(aiResponseText);
          }, 800);
          
          return [...prev, userMessage, aiResponse];
        });
        setInputText('');
      }, 300);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event);
      setIsRecording(false);
    };
  };
  
  const toggleMute = () => {
    setMuted(!muted);
    if (window.speechSynthesis && isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] page-transition relative">
      {/* Character background image */}
      <div className="absolute inset-0 z-0 opacity-10">
        {!aiCharacterLoaded && (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Loading background...</span>
          </div>
        )}
        <img 
          src={AI_CHARACTER_IMAGE}
          alt="AI Assistant Character"
          className={cn(
            "w-full h-full object-cover",
            aiCharacterLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setAiCharacterLoaded(true)}
          onError={() => setAiCharacterLoaded(false)}
        />
      </div>
      
      <div className="px-4 py-5 border-b border-gray-100 z-10 bg-white bg-opacity-90">
        <h1 className="text-2xl font-semibold text-gray-900">AI Assistant</h1>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
              <span className="text-white text-xs font-medium">AI</span>
            </div>
            <p className="ml-2 text-gray-700 font-medium">My Agent</p>
          </div>
          
          {/* Sound toggle button */}
          <button 
            onClick={toggleMute}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors focus-ring"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} className={isSpeaking ? "text-teal-600" : ""} />}
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 bg-white bg-opacity-75">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.sender === 'user' ? "justify-end" : "justify-start",
              "animate-slide-up"
            )}
          >
            <div
              className={cn(
                "max-w-[80%] rounded-2xl px-4 py-3",
                message.sender === 'user'
                  ? "bg-teal-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              )}
            >
              <p>{message.text}</p>
              <p className={cn(
                "text-xs mt-1 text-right",
                message.sender === 'user' ? "text-teal-100" : "text-gray-500 dark:text-gray-400"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-white z-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full px-4 py-3 pr-24 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="absolute right-2 flex space-x-1">
            <button
              onClick={toggleRecording}
              className={cn(
                "p-2 rounded-full transition-colors focus-ring",
                isRecording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500"
              )}
              aria-label="Voice input"
            >
              <Mic size={20} />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className={cn(
                "p-2 rounded-full transition-colors focus-ring",
                inputText.trim()
                  ? "bg-teal-500 text-white hover:bg-teal-600" 
                  : "bg-gray-200 text-gray-400"
              )}
              aria-label="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
