import React from 'react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  oldPrice?: number;
  isNew?: boolean;
  discount?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, price, oldPrice, isNew, discount }) => {
  return (
    <div className="relative p-4">
      {isNew && <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1">NEW</span>}
      {discount && <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1">-{discount}%</span>}
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="flex items-center">
        <span className="text-lg font-bold">${price}</span>
        {oldPrice && <span className="text-sm line-through ml-2">${oldPrice}</span>}
      </div>
    </div>
  );
};

export default ProductCard;
