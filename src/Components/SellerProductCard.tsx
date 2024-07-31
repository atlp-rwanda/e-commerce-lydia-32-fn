import React from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash } from 'lucide-react';

interface SellerProductCardProps {
  product: {
    productId: number;
    images: string;
    productName: string;
    description: string;
    price: number;
    quantity: number;
  };
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

const SellerProductCard: React.FC<SellerProductCardProps> = ({ product, onDelete, isDeleting }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg mb-6">
      <Link to={`/seller/product/${product.productId}`} className="block">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/3">
            <img src={product.images} alt={product.productName} className="h-48 w-full object-cover" />
          </div>
          <div className="p-4 flex flex-col justify-between w-full ml-2 sm:ml-4 md:ml-10 lg:ml-8">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.productName}</h2>
              <p className="text-gray-600 line-clamp-2 mb-4">{product.description}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="ml-2 text-sm text-gray-600">Qty: {product.quantity}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  className="p-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onDelete(product.productId);
                  }}
                  disabled={isDeleting}
                  className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? '...' : <Trash size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SellerProductCard;