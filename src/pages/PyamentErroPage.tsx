import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const PaymentErrorPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="bg-white shadow-md rounded-lg p-8 max-w-lg text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
        <p className="text-lg mb-4">An unexpected error occurred while processing your payment.</p>
        <p className="text-lg mb-4">Please check your order details and try again.</p>
        <div className="mt-6">
          <Link 
            to="/my-orders" 
            className="text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 transition duration-300"
          >
            Go to Orders
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentErrorPage;
