// src/components/Layout.tsx
import React from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/register"  || location.pathname === "/verified"  || location.pathname === "/verification/failed";

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar />}
      <main className="flex-grow">
        <Toaster />
        <ToastContainer />
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default MainLayout;
