import React from 'react';
import { Link } from 'react-router-dom';

const CustomerSupportPage = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-purple-100 min-h-screen">
      <div className="container mx-auto px-10 py-20 mt-20">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
          How Can We Help You?
        </h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Quick Links */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:text-blue-800">Track Your Order</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">Return Policy</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">Shipping Information</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">Product FAQs</a></li>
            </ul>
          </div>
          
          {/* Contact Us */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="mb-4">We're here to help! Reach out to us through any of these channels:</p>
            <ul className="space-y-2">
              <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg> 1-800-123-4567</li>
              <li className="flex items-center"><svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> 
              atlp32tl@gmail.com</li>
            </ul>
          </div>
          
          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h2>
            <ul className="space-y-2">
              <li><a href="#" className="text-blue-600 hover:text-blue-800">How do I place an order?</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">What payment methods do you accept?</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">How can I track my package?</a></li>
              <li><a href="#" className="text-blue-600 hover:text-blue-800">What is your return policy?</a></li>
            </ul>
          </div>
        </div>
        
        {/* Back to Orders Button */}
        <div className="text-center">
        <Link to="/my-orders" className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition duration-300 inline-flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupportPage;