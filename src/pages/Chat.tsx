import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Image } from 'lucide-react';
import ChatSideBar from '../Components/chat/ChatSideBar';
import Header from '../Components/chat/Header';
import io from 'socket.io-client';

let socket: any;
interface Mymessages{
    username: string,
    text: string,
    time: string
}

const Chat: React.FC = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Mymessages[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isDebouncedTyping, setIsDebouncedTyping] = useState(false);
  const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket = io(ENDPOINT, { withCredentials: true });
    socket.emit('joinRoom');

    return () => {
      socket.disconnect();
      socket.off();
    }
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('message', (inputMessage: any) => {
      setMessages(messages => [...messages, inputMessage]);
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, inputMessage]);

  const debounce = (func: any, delay: any) => {
    let timeoutId: any;
    return (...args: any) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const debouncedStopTyping = debounce(() => {
    setIsDebouncedTyping(false);
  }, 1000);

  const handleInputChange = (e: any) => {
    setInputMessage(e.target.value);
    setIsTyping(true);
    setIsDebouncedTyping(true);
    debouncedStopTyping();
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      socket.emit('chatMessage', inputMessage);
      setInputMessage('');
      setIsTyping(false);
      setIsDebouncedTyping(false);
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      handleSendMessage(e);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <ChatSideBar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-4 overflow-y-auto bg-gray-100">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${
                  message.username === 'E-commerce Bot' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 rounded-lg ${
                    message.username !== 'E-commerce Bot' ? 'bg-white text-gray-800' : 'bg-yellow-100 text-yellow-800 self-center'
                  }`}
                >
                  {message && (
                    <div className="flex items-center mb-1">
                      <User size={14} className="mr-1" />
                      <span className="text-xs font-semibold">
                        {message.username}
                      </span>
                    </div>
                  )}
                 
                  <p className="text-sm">{message.text }</p>
                </div>
              </div>
            ))}
            {isDebouncedTyping && (
              <div className="flex justify-end">
                <div className="bg-gray-200 text-gray-500 p-3 rounded-lg">
                  <p className="text-sm">You are typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Image size={20} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-grow p-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />      
            <button
              onClick={handleSendMessage}
              className="bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Chat;