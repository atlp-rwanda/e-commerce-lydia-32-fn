import React, { useState, useEffect, useRef } from 'react';
import { Send, ShoppingBag, User, Image, LogOut, MessageCircle } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', content: 'Welcome to DEPOT Public Chat! Discuss products, share experiences, and connect with other shoppers.' },
    { id: 2, type: 'system', content: 'AudioFan joined the chat.' },
    { id: 3, type: 'other', content: 'Hey everyone! Has anyone tried the new XYZ Wireless Headphones?', username: 'AudioFan' },
    { id: 4, type: 'system', content: 'MusicLover joined the chat.' },
    { id: 5, type: 'other', content: "I just got them last week! The sound quality is amazing, and the battery life is impressive.", username: 'MusicLover' },
    { id: 6, type: 'other', content: "That's great to hear! How about the new ABC Smart Home System? I'm thinking of getting one.", username: 'AudioFan' },
    { id: 7, type: 'system', content: 'TechGuru joined the chat.' },
    { id: 8, type: 'other', content: "I've been using the ABC Smart Home System for a month now. It's really convenient, but there's a bit of a learning curve.", username: 'TechGuru' },
    { id: 9, type: 'system', content: 'MusicLover left the chat.' },
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      setMessages([...messages, { id: messages.length + 1, type: 'user', content: inputMessage, username: 'You' }]);
      setInputMessage('');
      setIsTyping(false);
    }
  };

  const handleLeaveChat = () => {
    setMessages([...messages, { id: messages.length + 1, type: 'system', content: 'You left the chat.' }]);
    // Here you would implement the logic to actually leave the chat
    alert("You have left the chat.");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-indigo-600">DEPOT Shop</h1>
          <p className="text-sm text-gray-500">Public Chat</p>
        </div>
        <div className="p-4 flex-grow">
          <h2 className="font-semibold mb-2">Hot Topics</h2>
          <ul className="space-y-2">
            <li className="text-sm text-indigo-600 cursor-pointer hover:underline">#XYZHeadphones</li>
            <li className="text-sm text-indigo-600 cursor-pointer hover:underline">#ABCSmartHome</li>
            <li className="text-sm text-indigo-600 cursor-pointer hover:underline">#SummerSale</li>
            <li className="text-sm text-indigo-600 cursor-pointer hover:underline">#TechTrends</li>
          </ul>
        </div>
        <div className="p-4 border-t border-gray-200 space-y-2">
          <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center hover:bg-indigo-700 transition-colors">
            <ShoppingBag className="w-4 h-4 mr-2" />
            View Shop
          </button>
          <button 
            onClick={handleLeaveChat}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Leave Chat
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow">
        {/* Chat Header */}
        <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="text-indigo-600 mr-2" />
            <h1 className="text-xl font-semibold text-indigo-600">DEPOT Public Chat</h1>
          </div>
          <p className="text-sm text-gray-500">103 shoppers online</p>
        </header>

        {/* Messages */}
        <main className="flex-grow p-4 overflow-y-auto bg-gray-100">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-indigo-500 text-white'
                      : message.type === 'other'
                      ? 'bg-white text-gray-800'
                      : 'bg-yellow-100 text-yellow-800 self-center'
                  }`}
                >
                  {message.type !== 'system' && (
                    <div className="flex items-center mb-1">
                      <User size={14} className="mr-1" />
                      <span className="text-xs font-semibold">
                        {message.username}
                      </span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-gray-200 text-gray-500 p-3 rounded-lg">
                  <p className="text-sm">You are typing...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Input Area */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <Image size={20} />
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              placeholder="Type your message here..."
              className="flex-grow p-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
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