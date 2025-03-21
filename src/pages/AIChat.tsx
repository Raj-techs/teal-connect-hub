import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { cn } from '../lib/utils';
import connectDB from '../mongodb'; // Import MongoDB connection
import admin from '../firebase'; // Import Firebase initialization


const checkVoices = () => {
  const voices = speechSynthesis.getVoices();
  voices.forEach(voice => {
    console.log(`${voice.name} - ${voice.lang}`);
  });
};

useEffect(() => {
  checkVoices();
  connectDB(); // Connect to MongoDB when the component mounts
}, []);


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
  "support": "I’m here to assist you with any questions about jobs, business, or rural empowerment.",
  "sell products": "You can easily list your homemade products (like pickles, handicrafts, or snacks) on the platform and reach more customers.",
  "delivery services": "You can hire local transporters for product delivery or offer your own delivery services to earn income.",
  "financial literacy": "We offer courses on money management, saving strategies, and financial independence for rural communities.",
  "microfinance": "Learn about small loans and financial aid options for rural businesses.",
  "connect": "Connect with nearby farmers, sellers, and delivery agents to expand your network and market reach."
};

const AIChat = () => {
  const speechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = speechRecognition ? new speechRecognition() : null;
  const speechSynthesis = window.speechSynthesis;

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
    }, 1000);

    // Speech synthesis for AI response
    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(aiResponseText);
      const voices = speechSynthesis.getVoices();
      const teluguVoice = voices.find(voice => voice.lang === 'te-IN');
      if (teluguVoice) {
        utterance.voice = teluguVoice;
      }

      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    setIsRecording((prev) => !prev);

    if (!recognition) return;

    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setInputText(transcript);
      recognition.stop();
      handleSendMessage();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event);
      setIsRecording(false);
    };
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] page-transition">
      <div className="px-4 py-5 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">AI Assistant</h1>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-white text-xs font-medium">AI</span>
          </div>
          <p className="ml-2 text-gray-700 font-medium">Rural Helper</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                  : "bg-gray-200 text-gray-800"
              )}
            >
              <p>{message.text}</p>
              <p className={cn(
                "text-xs mt-1 text-right",
                message.sender === 'user' ? "text-teal-100" : "text-gray-500"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-100 bg-white">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me about jobs, business, or rural support..."
            className="w-full px-4 py-3 pr-24 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <div className="absolute right-2 flex space-x-1">
            <button
              onClick={toggleRecording}
              className={cn(
                "p-2 rounded-full transition-colors focus-ring",
                isRecording 
                  ? "bg-red-500 text-white animate-pulse" 
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
              )}
              aria-label="Voice input"
            >
              <Mic size={20} />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="p-2 rounded-full bg-teal-500 text-white hover:bg-teal-600"
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
