
import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi I'm My Agent. How can I help you?",
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
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages([...messages, newMessage]);
    setInputText('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm here to assist you with any questions about jobs, opportunities, or connections in your community.",
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };
  
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    
    // In a real app, you'd implement voice recording logic here
    if (!isRecording) {
      // Simulate voice recording and transcription
      setTimeout(() => {
        setInputText('I want to learn more about opportunities in my area');
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] page-transition">
      <div className="px-4 py-5 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-gray-900">AI</h1>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-white text-xs font-medium">AI</span>
          </div>
          <p className="ml-2 text-gray-700 font-medium">My Agent</p>
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
            style={{ animationDelay: '0.1s' }}
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
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300"
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
