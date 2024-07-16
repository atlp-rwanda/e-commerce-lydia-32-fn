import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-teal-600 mb-4">Payment Successful!</h1>
        <p className="text-lg mb-4">Your payment was successful and your order is being processed.</p>
        <p className="text-lg mb-4">Shipping details have been sent to your email.</p>
        <a 
          href="https://mail.google.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-teal-600 font-semibold hover:underline"
        >
          Open Gmail to check your email
        </a>
        <div className="mt-6">
          <Link 
            to="/orders" 
            className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-500 transition duration-300"
          >
            Go to Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
