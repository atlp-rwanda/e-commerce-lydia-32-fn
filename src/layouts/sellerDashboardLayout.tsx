import React, { useState, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import SellerDashboardNavbar from "../Components/seller/sellerDashboardNavbar";
import SellerSidebar from "../Components/seller/sellerSidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <SellerDashboardNavbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          {children}
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default Layout;
