import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: {
    images: string[];
    productName: string;
    price: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    
    <Link to='/about' className="relative p-4 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out mt-10">
      <img src={product.images[0]} alt={product.productName} className="w-full h-48 object-cover mb-4 rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-xl  mb-2 text-gray-800 font-catamaran">{product.productName}</h3>
        <div className="flex items-center">
          <span className="text-l text-green-600 font-catamaran">Rwf {product.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
