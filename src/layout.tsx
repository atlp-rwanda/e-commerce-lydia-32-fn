// src/components/Layout.tsx
import React from 'react';
import Navbar from './Components/navbar';
import Footer from './Components/footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLoginPage && <Navbar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

export default Layout;