import React from 'react';
import { FaTwitter, FaInstagram, FaFacebookF } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CUSTOMER SERVICE</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Help & Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Returns & Refunds</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Online Stores</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">What We Do</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Available Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Latest Posts</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">SOCIAL MEDIA</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Twitter</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Tumblr</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pinterest</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">PROFILE</h3>
            <ul className="space-y-2">
              <li><a href="/profile" className="text-gray-400 hover:text-white">My Account</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Checkout</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Order Tracking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Help & Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 Depot. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;