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
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast'
import 'react-toastify/dist/ReactToastify.css';
import EmptyCart from '../Components/EmptyCart';
import ConfirmationDialog from '../Components/ConfirmationDialog';


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
  const { data: cart, isLoading: cartLoading, error: cartError, refetch: refetchCart } = useGetCartQuery();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();
  const [clearCart] = useClearCartMutation();
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [initialQuantities, setInitialQuantities] = useState<{ [key: number]: number }>({});
  const [changedItems, setChangedItems] = useState<{ [key: number]: { quantity: number, cartItemId: number } }>({});
  const [total, setTotal] = useState<number>(0);
  const [deletingItemId, setDeletingItemId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [clearingCart, setClearingCart] = useState<boolean>(false);
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isSavingChanges, setIsSavingChanges] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (cart && cart.items && products?.products && Array.isArray(products.products)) {
      setIsEmpty(false);
      const cartItemsWithDetails = cart.items.map(item => {
        const productDetails = products.products.find(p => p.productId === item.productId);
        return { ...item, ...productDetails, quantity: item.quantity, maxQuantity: productDetails?.quantity || item.quantity };
      });
      setCartProducts(cartItemsWithDetails);
      const initialQuantities = cartItemsWithDetails.reduce((acc: { [key: number]: number }, item: CartItem) => {
        acc[item.productId] = item.quantity;
        return acc;
      }, {} as { [key: number]: number });
      setInitialQuantities(initialQuantities);
      calculateTotal(cartItemsWithDetails);
    }
  }, [cart, products]);

  useEffect(() => {
    refetchCart();
  }, [updateCartItem, deleteCartItem, clearCart]);

  const incrementQuantity = (productId: number, cartItemId: number) =>{
  setChangedItems(prev => {
    const currentQuantity = (prev[productId]?.quantity ?? initialQuantities[productId]) + 1;
    const maxQuantity = cartProducts.find(item => item.productId === productId)?.maxQuantity;

    if (currentQuantity <= (maxQuantity ?? Infinity)) {
      return {
        ...prev,
        [productId]: { quantity: currentQuantity, cartItemId: cartItemId }
      };
    }
    return prev;
  });
};

const decrementQuantity = (productId: number, cartItemId: number) => {
  setChangedItems(prev => {
    const currentQuantity = (prev[productId]?.quantity ?? initialQuantities[productId]) - 1;

    if (currentQuantity >= 1) {
      return {
        ...prev,
        [productId]: { quantity: currentQuantity, cartItemId: cartItemId }
      };
    }
    return prev;
  });
};

  const handleSaveChanges = async () => {
    try {
      setIsSavingChanges(true);
      for (const [productId, { quantity, cartItemId }] of Object.entries(changedItems)) {
        const res = await updateCartItem({ id: Number(cartItemId), quantity: Number(quantity) });
      }
      toast.success('Cart updated successfully');
      setChangedItems({});
      refetchCart();
    } catch (err) {
      toast.error('Failed to save changes');
    } finally {
      setIsSavingChanges(false);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    try {
      setDeletingItemId(itemId);
      await deleteCartItem(itemId);
      refetchCart();
      toast.success('Item deleted successfully');
    } catch (error) {
      toast.error('Failed to delete item');
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleClearCart = async () => {
    setShowConfirmation(true);
  };

  const confirmClearCart = async () => {
    try {
      setClearingCart(true);
      await clearCart({});
      refetchCart();
      toast.success('Cart Cleared successfully');
    } catch (error) {
      toast.error('Failed to clear cart');
    } finally {
      setClearingCart(false);
    }
    setShowConfirmation(false);
  };

  const cancelClearCart = () => {
    setShowConfirmation(false);
  };

  const calculateSubtotal = (item: CartItem) => {
    const quantity = changedItems[item.productId]?.quantity ?? Number(item.quantity);
    return Number(quantity * item.price);
  };

  const calculateTotal = (items: CartItem[]) => {
    const newTotal = items.reduce((acc, item) => {
      const quantity = changedItems[item.productId]?.quantity ?? Number(item.quantity);
      return acc + Number(quantity * item.price);
    }, 0);
    setTotal(newTotal);
  };

  useEffect(() => {
    calculateTotal(cartProducts);
  }, [changedItems, cartProducts]);

  const isSaveButtonDisabled = () => {
    return Object.keys(changedItems).length === 0 || Object.entries(changedItems).every(([productId, { quantity }]) => initialQuantities[parseInt(productId, 10)] === quantity);
  };

  if (cartLoading || productsLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-4">Please Wait ! Your Cart Is Loading ......</h1>
          <div className="animate-spin m-auto rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (cartError || !products) {
    return <h1 className='text-black font-bold text-3xl text-center m-auto'>An unexpected error occurred while fetching your cart</h1>;
  }

  if (!cart.items || isEmpty) {
    return <EmptyCart />;
  }
  return (
  <div className="container mx-auto mt-2 py-0 mb-10 px-10 sm:m-20 sm:py-10 mb-5 sm:mb-10 px-4 sm:px-10 flex flex-col lg:flex-row justify-between gap-10 lg:gap-20">
    <div className="w-full lg:w-2/3 ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">Shopping Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border py-2 px-3 sm:px-4">Product</th>
              <th className="border py-2 px-3 sm:px-4 hidden sm:table-cell">Category</th>
              <th className="border py-2 px-3 sm:px-4">Quantity</th>
              <th className="border py-2 px-3 sm:px-4">Unit Price</th>
              <th className="border py-2 px-3 sm:px-4 hidden sm:table-cell">Subtotal</th>
              <th className="border py-2 px-3 sm:px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts.map(item => (
              <tr key={item.productId} className={`relative ${deletingItemId === item.id ? 'opacity-50' : ''}`}>
                <td className="border px-3 sm:px-4 py-2">
                  <div className="flex flex-col items-center text-center">
                    <img src={item.images[0]} alt={item.productName} className="w-16 h-16 sm:w-20 sm:h-20 mb-2" />
                    <h2 className="text-sm sm:text-base font-semibold">{item.productName}</h2>
                  </div>
                </td>
                <td className="border px-3 sm:px-4 py-2 hidden sm:table-cell">{item.productCategory}</td>
                <td className="border px-3 sm:px-4 py-2">
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => decrementQuantity(item.productId, item.id)}
                      className="text-lg px-2 py-1 w-8 sm:w-10 bg-gray-200 justify-center items-center text-gray-700 rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="px-2 sm:px-4 py-1 text-sm sm:text-lg justify-center items-center">
                      {changedItems[item.productId]?.quantity ?? initialQuantities[item.productId] ?? item.quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(item.productId, item.id)}
                      className="text-lg px-2 py-1 w-8 sm:w-10 bg-gray-200 justify-center items-center text-gray-700 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="border px-3 sm:px-4 py-2 text-sm sm:text-base">Rwf {item.price}</td>
                <td className="border px-3 sm:px-4 py-2 hidden sm:table-cell">Rwf {calculateSubtotal(item)}</td>
                <td className="border px-3 sm:px-4 py-2">
                  <div className='group relative text-center'>
                    <button onClick={() => handleDeleteItem(item.id)} className="text-red-500 hover:text-red-700 transition-all transform">
                     <FaTrash />
                     </button>
                     <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap mb-2">
                      Delete Item
                    </span>
                  </div>
                </td>
                 {deletingItemId === item.id && 
                <div className="absolute inset-0 z-10 bg-black bg-opacity-75 flex items-center justify-center">
                   <span className="text-white font-bold">
                     Deleting Cart Item...
                    </span>
                </div>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col sm:flex-row justify-center align-middle gap-4 sm:gap-8 mt-4 sm:mt-6'>
        <button 
          onClick={() => handleClearCart()} 
          className='bg-black w-full sm:w-1/2 px-4 sm:px-10 py-2 text-sm sm:text-lg text-white rounded hover:bg-gray-900 hover:text-gray-100 duration-300 transition-all transform'
        >
          {clearingCart ? 'Clearing Cart .....' : 'Clear Cart'}
        </button>
        <button
          onClick={handleSaveChanges}
          disabled={isSaveButtonDisabled()}
          className={`w-full sm:w-1/2 py-2 text-sm sm:text-lg ${isSavingChanges ? 'bg-gray-500' : 'bg-black'} ${isSaveButtonDisabled() ? 'bg-gray-500' : 'bg-black'} text-white rounded`}
        >
          {isSavingChanges ? 'Saving Changes ....' : 'Save Changes'}
        </button>
      </div>
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to clear your cart ?"
          onConfirm={confirmClearCart}
          onCancel={cancelClearCart}
        />
      )}
    </div>
    <div className="w-full lg:w-1/3 mt-8 lg:mt-16">
      <div className="border p-4 sm:p-6 rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Cart Totals</h2>
        <div className="flex justify-between mb-2 text-sm sm:text-base">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between mb-4 text-sm sm:text-base">
          <span>Grand Total</span>
          <span className='text-lg sm:text-xl font-bold'>Rwf {total}</span>
        </div>
        <Link to='/checkout'>
        <button 
          disabled={!isSaveButtonDisabled()} 
          className={`w-full py-2 sm:py-3 text-sm sm:text-lg ${!isSaveButtonDisabled() ? 'bg-gray-500' : 'bg-black'} text-white rounded mt-4 transition-colors duration-300`}
        >
          Proceed to Checkout
        </button>
        </Link>
      </div>
    </div>
  </div>
);
};


export default Cart;
