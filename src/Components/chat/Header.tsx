import React from 'react'
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="text-indigo-600 mr-2" />
            <h1 className="text-xl font-semibold text-indigo-600">DEPOT Public Chat</h1>
          </div>
        </header>
  )
}

export default Header
