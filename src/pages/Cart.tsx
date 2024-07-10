import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useClearCartMutation,
} from '../slices/cartSlice/cartApiSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyCart from '../Components/EmptyCart';

interface CartItem {
  id: number;
  productId: number;
  images: string[];
  productName: string;
  price: number;
  description: string;
  productCategory: string;
  quantity: number;
  maxQuantity: number;
}

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { data: cart, isLoading, error, refetch } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [clearCart] = useClearCartMutation();
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const { data: products } = useGetProductsQuery();
  const [initialQuantities, setInitialQuantities] = useState<{ [key: number]: number }>({});
  const [changedItems, setChangedItems] = useState<{ [key: number]: number }>({});
  const [total, setTotal] = useState<number>(0);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [isLoadingCart, setIsLoadingCart] = useState<boolean>(true);
  const [clearingCart, setClearingCart] = useState<boolean>(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate]);
  useEffect(() => {
    setIsLoadingCart(true);
   
    try {
      if (cart && cart.items && products?.products && Array.isArray(products.products)) {
        const cartItemsWithDetails = cart.items.map(item => {
          const productDetails = products.products.find(p => p.productId === item.productId);
          return { ...item, ...productDetails, quantity: item.quantity, maxQuantity: productDetails?.quantity || item.quantity, };
        });
        setCartProducts(cartItemsWithDetails);
        const initialQuantities = cartItemsWithDetails.reduce((acc: { [key: number]: number }, item: CartItem) => {
          acc[item.productId] = item.quantity;
          return acc;
        }, {} as { [key: number]: number });
        setInitialQuantities(initialQuantities);
        calculateTotal(cartItemsWithDetails);
        setIsLoadingCart(false);
      }
      } catch (err: any) {
        console.log(err);
    }

  }, [cart, products]);

  useEffect(() => {
    refetch();
  }, [updateCartItem, deleteCartItem, clearCart]);

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    setChangedItems(prev => ({ ...prev, [productId]: newQuantity }));
  };

  const handleSaveChanges = async () => {
    for (const [productId, quantity] of Object.entries(changedItems)) {
      await updateCartItem({ id: parseInt(productId, 10), quantity });
    }
    setChangedItems({});
    refetch();
  };

   const handleDeleteItem = async (itemId: number) => {
     try {
      setDeletingItemId(itemId);
      await deleteCartItem(itemId);
      toast.success('Item deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete item');
     }
     finally {
      setDeletingItemId(null); 
    }
  };

   const handleClearCart = async () => {
     try {
      setClearingCart(true);
      //await clearCart();
      toast.success('Cart Cleared successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to clear cart');
     }
     finally {
      setClearingCart(false); 
    }
  };


  const calculateSubtotal = (item: CartItem) => {
    const quantity = changedItems[item.productId] ?? item.quantity;
    return quantity * item.price;
  };

    const calculateTotal = (items: CartItem[]) => {
    const newTotal = items.reduce((acc, item) => {
      const quantity = changedItems[item.productId] ?? item.quantity;
      return acc + (quantity * item.price);
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal(cartProducts);
  }, [changedItems, cartProducts]);

  const isSaveButtonDisabled = () => {
    return Object.keys(changedItems).length === 0 || Object.entries(changedItems).every(([productId, quantity]) => initialQuantities[parseInt(productId, 10)] === quantity);
  };

  if (isLoading || !products) return <div>Loading...</div>;
  if (error) return <div>Error loading cart</div>;
  const isEmpty = cartProducts.length === 0;

  return (
      <>
       {isEmpty ? (
        <EmptyCart/>
      ) : (
    <div className="container mx-auto mt-60 py-0 mb-10 px-10 flex flex-col lg:flex-row justify gap-20">
      {
        isLoadingCart || isLoading || !products && <h1 className='text-black font-semibold mt-60'>Wait while your cart is loading .....</h1>
      }
      {
        error && <h1 className='text-black font-semibold mt-60' >An expected error occurred While fetching your cart</h1>
      }
      <div className="w-full lg:w-2/3">
     <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
              <button onClick={()=>handleClearCart} className='bg-black px-10 py-2 font-size-large text-lg text-white rounded mt-4 hover:bg-gray-900 hover:text-gray-100 duration-300 transition-all transform'>{clearingCart ? 'Clearing Cart ....': 'Clear Cart'}</button>
          {cartProducts.map(item => (
            <div key={item.productId} className="relative flex flex-col lg:flex-row justify-between items-center mb-4 p-4 border-b">
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
                  max={item.maxQuantity}
                  value={changedItems[item.productId] ?? item.quantity}
                  onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value, 10))}
                  className="border rounded w-16 p-1 text-center mr-4"
                />
                <p className="text-lg font-semibold">Rwf {item.price}</p>
              </div>
              <div className="text-left">
                <p>Sub-Total:  <span className='font-bold'>Rwf {calculateSubtotal(item)}</span></p>
              </div>
                  {deletingItemId === item.id ? (
                <p className="absolute top-10 m-auto ml-20 w-400 px-40 h-10 flex rounded items-center justify-center bg-black font-bold text-white z-10">
                  Deleting Cart Item.... 
                </p>
              ) : (
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="ml-4 text-red-600"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
         <button
          onClick={handleSaveChanges}
          disabled={isSaveButtonDisabled()}
          className={`w-full py-2 ${isSaveButtonDisabled() ? 'bg-gray-500' : 'bg-black'} text-white rounded mt-4`}
        >
          Save Changes
        </button>
        </div>
        <div className="w-full bg-gray lg:w-1/3 lg:mt-20">
          <div className="border p-4">
            <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Grand Total</span>
              <span>Rwf {total}</span>
            </div>
            <button disabled={!isSaveButtonDisabled()} className={`w-full py-2 ${!isSaveButtonDisabled() ? 'bg-gray-500' : 'bg-black'} text-white rounded mt-4`}>Proceed to Checkout</button>
          </div>
          </div>
         </div>
     )
      }
      </>
  );
};

export default Cart;
