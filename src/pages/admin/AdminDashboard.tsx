import React, { useState } from 'react';
import Sidebar from '../../Components/admin/Sidebar';
import Header from '../../Components/admin/Header';
import MainContent from '../../Components/admin/MainContent';

const Dashboard: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <MainContent />
      </div>
    </div>
  );
};

export default Dashboard;