import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBuyerPlaceOrderMutation } from '../slices/orderSlice/orderApiSlice';
import { useGetCartQuery } from '../slices/cartSlice/cartApiSlice';
import toast from 'react-hot-toast';
import { useNewPaymentMutation } from '../slices/paymentSlice/paymentApiSlice';
import { useGetProductsQuery } from '../slices/productSlice/productApiSlice';

export interface CartItem {
  id: number;
  productId: number;
  images: string[];
  productName: string;
  price: number;
  description: string;
  productCategory: string;
  quantity: number;
}

interface Address {
  street: string;
  city: string;
  country: string;
}

interface OrderData {
  payment: string;
  address: Address[];
}

interface ValidationErrors {
  payment: string;
  street: string;
  city: string;
  country: string;
}
const Checkout: React.FC = () => {
  const [orderData, setOrderData] = useState<OrderData>({
    payment: '',
    address: [{ street: '', city: '', country: '' }],
  });
  const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
  const { data: products, isLoading: productsLoading } = useGetProductsQuery();
  const [total, setTotal] = useState<number>(0);
  const [buyerPlaceOrder, { isLoading }] = useBuyerPlaceOrderMutation();
  const [newPayment] = useNewPaymentMutation();
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery();
    const [initializingPayment, setInitializingPayment] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({
    payment: '',
    street: '',
    city: '',
    country: '',
  });
  const [hasErrors, setHasErrors] = useState<boolean>(false);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate('/login');
    }
  }, [navigate]);
    
 useEffect(() => {
    if (!isCartLoading && (!cart || !cart.items || cart.items.length === 0)) {
      toast.error('Your cart is empty. Please add items before proceeding to checkout.');
      navigate('/cart');
    }
 }, [cart, isCartLoading, navigate]);
  
  useEffect(() => {
    if (cart && cart.items && products?.products && Array.isArray(products.products)) {
      const cartItemsWithDetails = cart.items.map(item => {
        const productDetails = products.products.find(p => p.productId === item.productId);
        return { ...item, ...productDetails, quantity: item.quantity, maxQuantity: productDetails?.quantity || item.quantity };
      });
      setCartProducts(cartItemsWithDetails);
    }
  }, [cart, products]);
    
  useEffect(() => {
  if (cart && cart.total !== undefined) {
    setTotal(cart.total);
   }
  }, [cart, cart.total]);
    
  useEffect(() => {
  const { payment, address } = orderData;
  const isAddressValid = !!(address[0].street && address[0].city && address[0].country);
  setIsFormValid(!!payment && isAddressValid);
  const hasAnyError = Object.values(errors).some(error => error !== '');
  setHasErrors(hasAnyError);
}, [orderData, errors]);
    
   const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'payment':
        return value ? '' : 'Please select a payment method';
      case 'street':
        return value.length >= 5 ? '' : 'Street address should be at least 5 characters long';
      case 'city':
        return value.length >= 2 ? '' : 'City name should be at least 2 characters long';
      case 'country':
        return value.length >= 2 ? '' : 'Country name should be at least 2 characters long';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const [_, field] = name.split('.');
      setOrderData(prev => ({
        ...prev,
        address: [{ ...prev.address[0], [field]: value }],
      }));
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    } else {
      setOrderData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };
  
 const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!isFormValid) return;
    e.preventDefault();
    try {
        const response = await buyerPlaceOrder(orderData).unwrap();
        // if (response?.status == 201) {
            const orderId = Number(response?.order?.orderId);
            const paymentData={orderId,currency:'rwf'}
            setInitializingPayment(true);
            const paymentResponse = await newPayment(paymentData);
            const stripe_url = paymentResponse?.data?.sessionUrl;
            const sessionId = paymentResponse?.data?.sessionId;
            sessionStorage.setItem('paymentSessionId', sessionId);
            sessionStorage.setItem('paymentOrderId', String(orderId));
            if (stripe_url) { 
                console.log(stripe_url);
                window.location.href=stripe_url;
            }
            else {
              toast.error("Initializing Payment Failed ");
              navigate('/cart');
            }
            setInitializingPayment(false);
        // }
        // else {
        //     toast.error(response?.message);
        // }
      //toast.success('Order placed successfully!');
    } catch (err) { 
      toast.error('Failed to place order. Please try again.');
    }
  };

  if (isCartLoading) {
    return <div className="text-center py-8">Loading cart information...</div>;
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      {/* <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1> */}
    <div className="flex flex-col justify-center md:flex-row gap-8">
     <div className="w-full md:w-1/3">
          <div className="bg-white mt-2 shadow-md rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-center">Order Summary</h2>
              <div className="space-y-4">
                 <table className="min-w-full bg-white border-collapse">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border text-left py-2 px-3 sm:px-4">Products</th>
                        <th className="border text-right py-2 px-3 sm:px-4 hidden sm:table-cell">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartProducts.map(item => (
                      <tr key={item.productId} className={`relative`}>
                         <td className="border px-3 sm:px-4 py-2">
                           <h3 className="text-sm sm:text-base font-semibold">{item.productName}</h3>      
                         </td>
                         <td className="border px-3 sm:px-4 py-2">
                           <h3 className="text-sm text-right sm:text-base font-semibold">Rwf {item.price}  (X{item.quantity})</h3>      
                         </td>
                       </tr>
                        ))}
                      </tbody>
                    </table>
                <div className="flex justify-between mx-1 items-center">
                  <span className="text-gray-600">Total Items:</span>
                  <span className="font-semibold">{cart?.items?.length || 0}</span>
                </div>
                <div className="flex justify-between mx-1 items-center">
                  <span className="text-gray-600">Order Cost:</span>
                  <span className="font-semibold">Rwf {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mx-1 items-center">
                  <span className="text-gray-600">Shipping Fee:</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-4 mt-4 mx-1">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Cost:</span>
                    <span className="text-xl font-bold text-green-600">Rwf {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    <div className="w-full md:w-1/2">
     <h2 className="text-2xl font-bold mb-6 text-center">Please Fill Out This Form To Continue</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-6">
          <label htmlFor="payment" className="block mb-2 font-semibold">Payment Method</label>
          <select
            data-testid='payment-method'
            id="payment"
            name="payment"
            value={orderData.payment}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            className={`w-full p-2 border rounded-md ${touchedFields.has('payment') && errors.payment ? 'border-red-500' : ''}`}
            required
          >
            <option value="">Select payment method</option>
            <option value="stripe">Stripe</option>
          </select>
           {touchedFields.has('payment') && errors.payment && (
            <p className="text-red-500 text-sm mt-1">{errors.payment}</p>
          )}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="street" className="block mb-1">Street</label>
              <input
                data-testid='street'
                type="text"
                id="street"
                name="address.street"
                value={orderData.address[0].street}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={`w-full p-2 border rounded-md ${touchedFields.has('address.street') && errors.street ? 'border-red-500' : ''}`}
                required
              />
              {touchedFields.has('address.street') && errors.street && (
                <p className="text-red-500 text-sm mt-1">{errors.street}</p>
              )}
            </div>
            <div>
              <label htmlFor="city" className="block mb-1">City</label>
              <input
                data-testid='city'
                type="text"
                id="city"
                name="address.city"
                value={orderData.address[0].city}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={`w-full p-2 border rounded-md ${touchedFields.has('address.city') && errors.city ? 'border-red-500' : ''}`}
                required
              />
              {touchedFields.has('address.city') && errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label htmlFor="country" className="block mb-1">Country</label>
              <input
                data-testid='country'
                type="text"
                id="country"
                name="address.country"
                value={orderData.address[0].country}
                onChange={handleInputChange}
                onBlur={handleBlur}
                onFocus={handleFocus}
                className={`w-full p-2 border rounded-md ${touchedFields.has('address.country') && errors.country ? 'border-red-500' : ''}`}
                required
              />
               {touchedFields.has('address.country') && errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 text-white rounded-md ${
            isLoading || !isFormValid || initializingPayment ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
          }`}
          disabled={!isFormValid || isLoading || hasErrors || initializingPayment}
        >
          {isLoading || initializingPayment ? 'Confirming an order....' : `Confirm Order`}
        </button>
      </form>
    </div>
   </div> 
   </div>
  );
};

export default Checkout;