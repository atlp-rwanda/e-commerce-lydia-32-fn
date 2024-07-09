import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} from '../slices/cartSlice/cartApiSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: numer;
  productId: number;
  images: string[];
  productName: string;
  price: number;
  description: string;
  productCategory: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { data: cart, isLoading, error, refetch } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [clearCart] = useClearCartMutation();
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const { data: products } = useGetProductsQuery();
  const navigate = useNavigate();
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
        navigate('/login');
    }
  useEffect(() => {
    if (cart && products?.products && Array.isArray(products.products)) {
      const cartItemsWithDetails = cart.items.map(item => {
        const productDetails = products.products.find(p => p.productId === item.productId);
        return { ...item,...productDetails,quantity: item.quantity };
      });
      setCartProducts(cartItemsWithDetails);
    }
  }, [cart, products]);

  useEffect(() => {
    refetch();
  }, [updateCartItem, deleteCartItem, clearCart]);

  if (isLoading || !products) return <div>Loading...</div>;
  if (error) return <div>Error loading cart</div>;

  return (
    <div className="container mx-auto mt-60 py-0 mb-10 px-10 flex flex-col lg:flex-row justify gap-20">
      {/* <div className="flex flex-col lg:flex-row justify-between"> */}
        <div className="w-full lg:w-2/3">
          <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
          {cartProducts.map(item => (
            <div key={item.productId} className="flex justify-between mb-4 p-4 border-b">
              <div className="flex items-center">
                <img src={item.images[0]} alt={item.productName} className="w-20 h-20 mr-4" />
                <div>
                          <h2 className="text-lg font-semibold">{item.productName}</h2>
                           <h3 className="text-lg ">Category:  { item.productCategory} </h3>
                </div>
              </div>
              <div className="flex items-center justify-start">
                <input
                  type="number"
                  min={1}
                  max={item.quantity}
                  value={item.quantity}
                  onChange={(e) => updateCartItem({ id: item.productId, quantity: parseInt(e.target.value, 10) })}
                  className="border rounded w-16 p-1 text-center mr-4"
                />
                <p className="text-lg font-semibold">Rwf {item.price}</p>
                <button
                  onClick={() => deleteCartItem(item.id)}
                  className="ml-4 text-red-600"
                >
                  &#10005;
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-full bg-gray lg:w-1/3 mt-8 lg:mt-0">
          <div className="border p-4">
            <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rwf {cart?.subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total</span>
              <span>Rwf {cart?.total}</span>
            </div>
            <button className="w-full py-2 bg-black text-white rounded">Proceed to Checkout</button>
          </div>
        </div>
      </div>
  );
};

export default Cart;
