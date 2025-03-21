
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
    <div className="flex flex-col h-[calc(100vh-8rem)] page-transition relative">
      {/* AI Assistant Character Image */}
      <div className="absolute right-4 top-14 w-24 h-24 opacity-20 pointer-events-none z-0">
        <div className="w-full h-full rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 24 24" className="w-16 h-16 text-teal-600 dark:text-teal-400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 8.1 19.33 6.66 18.12C6.25 17.78 6 17.28 6 16.74C6 14.97 7.56 13.5 9.5 13.5H14.5C16.44 13.5 18 14.97 18 16.74C18 17.28 17.75 17.78 17.34 18.12C15.9 19.33 14.03 20 12 20Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <div className="px-4 py-5 border-b border-gray-100 dark:border-gray-700 z-10">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">AI</h1>
        <div className="flex items-center mt-2">
          <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center">
            <span className="text-white text-xs font-medium">AI</span>
          </div>
          <p className="ml-2 text-gray-700 dark:text-gray-200 font-medium">My Agent</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10">
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
      
      <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 z-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="w-full px-4 py-3 pr-24 bg-gray-100 dark:bg-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 dark:text-white"
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
                  : "bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500"
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
