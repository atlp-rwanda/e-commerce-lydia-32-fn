import React from 'react';
import { Link } from 'react-router-dom';

interface SellerProductCardProps {
  product: {
    productId: number;
    images: string[];
    productName: string;
    description: string;
    price: number;
    quantity: number;
  };
}

const SellerProductCard: React.FC<SellerProductCardProps> = ({ product }) => {
  return (

    <Link to={`/seller/product/${product.productId}`} className="flex p-4 justify-between items-center border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-10">

      <div>{product.productName}</div>
      <div className='w-[400px]'>{product.description}</div>
      <img src={product.images[0]} alt={product.productName} className="h-20 w-20 object-cover mb-4 rounded-t-lg" />
      <div>{product.price}</div>
      <div>{product.quantity}</div>
      <div className='flex gap-5 items-center'>
        <button
          type="submit"
          className="w-[100px] bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Edit
        </button>

        <button
          type="submit"
          className="w-[100px] bg-black text-white p-3 rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete
        </button>
      </div>
      {/* <img src={product.images[0]} alt={product.productName} className="w-full h-48 object-cover mb-4 rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl  mb-2 text-gray-800 font-catamaran">{product.productName}</h3>
        <div className="flex items-center">
          <span className="text-l text-green-600 font-catamaran">Rwf {product.price}</span>
        </div>
      </div> */}
    </Link>
  );
};

export default SellerProductCard;
