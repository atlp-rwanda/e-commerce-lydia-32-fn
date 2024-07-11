import React from 'react';
import { Link } from 'react-router-dom';

interface UserInfo {
  user: {
      firstname: string;
      email: string;
  };
}

const EmptyCart: React.FC = () => {

  const userInfo: UserInfo | null =localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
 return (
    <div className="flex mx-auto mt-60 mb-40 justify-center items-center h-full">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center transition-all duration-300 transform hover:scale-105">
        <h2 className="text-3xl font-bold mb-6">Your Cart is Empty</h2>
        <p className="text-lg mb-4">Dear <span className='font-bold'>{userInfo?.user.firstname}</span>, currently your shopping cart is empty.
        You can visit our <Link to="/" className="text-black-500 font-bold">Home Page</Link> to add products.</p>
      </div>
    </div>
  );
};

export default EmptyCart;
