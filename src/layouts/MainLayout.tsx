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
  const path = location.pathname;

  const routesWithoutNavbarFooter = [
    "/login",
    "/register",
    "/verified",
    "/verification/failed",
    "/admin/dashboard",
    "/admin/create/role",
    "/admin/create/permission",
    "/admin/edit/role/",
    "/admin/delete/permission",
    "/admin/assign/role"
  ];

  const isExcludedRoute = routesWithoutNavbarFooter.some(route => path.startsWith(route)) || 
                          /\/admin\/assign\/permission\/\d+$/.test(path);

  return (
    <div className="flex flex-col min-h-screen">
      {!isExcludedRoute && <Navbar />}
      <main className="flex-grow">
        <Toaster /> 
        <ToastContainer />
        <Outlet />
      </main>
      {!isExcludedRoute && <Footer />}
    </div>
  );
};

export default MainLayout;
