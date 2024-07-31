import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: {
    productId: number;
    images: string[];
    productName: string;
    price: number;
    description: string; 
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link 
      to={`/singleProduct/${product.productId}`} 
        className="group relative bg-white overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out h-[250px] hover:-translate-y-1"
    >
      <div className="flex h-full">
        <div className="w-2/5 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.productName} 
            className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:brightness-90"
          />
        </div>
        <div className="w-3/5 p-4 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 font-catamaran line-clamp-2">{product.productName}</h3>
            <p className="text-sm text-gray-600 mb-4 font-catamaran line-clamp-3 transition-all duration-300 group-hover:line-clamp-none">
  {product.description || "No description available."}
</p>
          </div>
          <div className="flex items-center justify-between">
          <span className="text-xl text-green-600 font-catamaran font-medium transition-all duration-300 group-hover:scale-105">Rwf {product.price.toLocaleString()}</span>
            <div className="flex items-center space-x-2">
            <ShoppingBag className="text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:rotate-12" size={20} />
            <ArrowRight className="text-gray-400 group-hover:text-gray-600 transition-all duration-300 group-hover:translate-x-1" size={20} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 text-xs font-semibold rounded-br-lg animate-pulse">
  NEW
</div>
    </Link>
  );
};

export default ProductCard;