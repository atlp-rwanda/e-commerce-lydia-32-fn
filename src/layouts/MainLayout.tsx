import React, { useState } from 'react';
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar onSearchToggle={toggleSearch} />}
      <main className="flex-grow">
        <Toaster />
        <ToastContainer />
        <Outlet context={{ isSearchVisible, setIsSearchVisible }} />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default MainLayout;