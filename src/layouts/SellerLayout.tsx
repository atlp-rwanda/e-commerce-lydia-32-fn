import React from "react";
import Navbar from "../Components/navbar";
import Footer from "../Components/footer";
import { Toaster } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, useLocation } from "react-router-dom";
import ChatRoom from "../pages/Chat";

const SellerLayout: React.FC = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/verified" || location.pathname === "/verification/failed";

    return (
        <div className="flex flex-col min-h-screen">
            {!isLoginPage && <Navbar />}
            <main className="flex-grow mt-20">
                <Toaster />
                <ToastContainer />
                <Outlet />
            </main>
            <ChatRoom/>
            {!isLoginPage && <Footer />}
        </div>
    );
}

export default SellerLayout