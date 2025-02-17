import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User, Bot } from 'lucide-react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

interface Message {
    username: string,
    text: string,
    time: string
}

const ChatRoom: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [name, setName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any>(null);

  const ENDPOINT = import.meta.env.VITE_BACKEND_URL;
  const { userInfo } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(ENDPOINT, { withCredentials: true });
      setSocket(newSocket);
      const userName = userInfo.user.firstname || 'traveller';
      newSocket.emit('joinRoom', userName);
      setName(userName);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [ENDPOINT, userInfo]);

  useEffect(() => {
    if (socket) {
      socket.on('message', (inputMessage: Message) => {
        setMessages(prevMessages => [...prevMessages, inputMessage]);
      });

      return () => {
        socket.off('message');
      };
    }
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket) {
      socket.emit('chatMessage', inputMessage);
      setInputMessage('');
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        >
          <MessageCircle size={24} />
        </button>
      )}
      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-96 h-[32rem] flex flex-col overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 flex justify-between items-center">
            <h1 className="text-lg font-bold">Multi-User Chat Room</h1>
            <button onClick={toggleChat} className="text-white hover:text-gray-200 focus:outline-none">
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex ${message.username === name ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-end space-x-1 max-w-[80%]`}>
                  {message.username !== name && (
                    <div className={`rounded-full p-1.5 ${message.username === 'E-commerce Bot' ? 'bg-green-500' : 'bg-blue-500'}`}>
                      {message.username === 'E-commerce Bot' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
                    </div>
                  )}
                  <div
                    className={`rounded-lg p-2 text-sm ${
                      message.username === 'E-commerce Bot'
                        ? 'bg-green-100 text-green-800'
                        : message.username === name
                        ? 'bg-purple-500 text-white'
                        : 'bg-white text-gray-800'
                    } shadow-md`}
                  >
                    {message.username !== 'E-commerce Bot' && <div className="font-semibold text-xs mb-1">{message.username}</div>}
                    <div>{message.text}</div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-3 bg-white border-t">
            <form onSubmit={handleSendMessage} className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow-inner">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700 text-sm"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full p-2 mx-1 transition-all duration-300 hover:shadow-lg focus:outline-none"
              >
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;