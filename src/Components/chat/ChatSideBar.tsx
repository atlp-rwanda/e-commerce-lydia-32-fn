import React from 'react'
import { Link } from 'react-router-dom'
import { LogOut } from 'lucide-react';

const chatSideBar: React.FC = () => {
  return (
    <div className="w-1/4 bg-white border-r border-gray-200 flex flex-col">
    <div className="p-4 border-b border-gray-200">
      <h1 className="text-xl font-bold text-indigo-600">DEPOT Shop</h1>
      <p className="text-sm text-gray-500">Public Chat</p>
    </div>
    <div className="p-4 flex-grow">
      <h2 className="font-semibold mb-2">DEPOT CHAT</h2> 
    </div>
    <div className="p-4 border-t border-gray-200 space-y-2">
      <Link  to='/'
        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center hover:bg-red-600 transition-colors"
      >
        <LogOut className="w-4 h-4 mr-2" />
        Leave Chat
      </Link>
    </div>
  </div>
  )
}

export default chatSideBar
