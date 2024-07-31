import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetOrderByIdQuery, useCancelOrderMutation } from '../../slices/orderSlice/orderApiSlice';
import { setCurrentOrder } from '../../slices/orderSlice/orderSlice';
import { RootState } from '../../store';
import toast from "react-hot-toast";
import { useNewPaymentMutation } from '../../slices/paymentSlice/paymentApiSlice';


const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles = {
    pending: 'bg-yellow-400 text-yellow-900',
    processing: 'bg-blue-400 text-blue-900',
    completed: 'bg-green-400 text-green-900',
    cancelled: 'bg-red-400 text-red-900',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${statusStyles[status.toLowerCase()] || 'bg-gray-400 text-gray-900'}`}>
      {status}
    </span>
  );
};

const OrderDetailsComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data, isLoading, isError, refetch } = useGetOrderByIdQuery(id);
  const currentOrder = useSelector((state: RootState) => state.order.currentOrder);
  const [activeSection, setActiveSection] = useState('items');
  const [currentPage, setCurrentPage] = useState(1);
  const [initializingPayment, setInitializingPayment] = useState<boolean>(false);
  const [cancelOrder, { isLoading: isCancelling }] = useCancelOrderMutation();
  const [newPayment] = useNewPaymentMutation();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);

  const handleCancelOrder = async () => {
  try {
    const result = await cancelOrder(id).unwrap();
    dispatch(setCurrentOrder({ ...currentOrder, status: 'cancelled' }));
    toast.success("Order cancelled successfully!");
    setTimeout(() => navigate('/my-orders'), 2000);
  } catch (err) {
    console.error('Failed to cancel order:', err);
    setError('Failed to cancel order. Please try again.');
    toast.error("Failed to cancel order. Please try again.");
  }
};

useEffect(() => {
  const intervalId = setInterval(() => {
    refetch();
  }, 2000); 

  return () => clearInterval(intervalId); 
}, [refetch]);

  useEffect(() => {
    if (data) {
      dispatch(setCurrentOrder(data.order));
    }
  }, [data, dispatch]);

  if (isLoading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-500"></div></div>;
  if (isError) return <div className="text-center py-8 text-red-500 text-lg">Error loading order details. Please try again later.</div>;
  if (!currentOrder) return <div className="text-center py-8 text-gray-500 text-lg">No order found</div>;

  const itemsPerPage = 2;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentOrder.items ? currentOrder.items.slice(indexOfFirstItem, indexOfLastItem) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const calculatePricePerItem = () => {
    if (currentOrder.items && currentOrder.items.length > 0 && currentOrder.totalAmount) {
      const totalAmount = parseFloat(currentOrder.totalAmount);
      const totalQuantity = currentOrder.items.reduce((sum: any, item: { quantity: any; }) => sum + item.quantity, 0);
      return totalAmount / totalQuantity;
    }
    return 0;
  };

  const pricePerItem = calculatePricePerItem();

  const handlePayment = async () => {
    try {
      const paymentData = { orderId:id, currency: 'rwf' }
      setInitializingPayment(true);
      const paymentResponse = await newPayment(paymentData);
      const stripe_url = paymentResponse?.data?.sessionUrl;
      const sessionId = paymentResponse?.data?.sessionId;
      sessionStorage.setItem('paymentSessionId', sessionId);
      sessionStorage.setItem('paymentOrderId', String(id));
      if (stripe_url) { 
         // dispatch(setCurrentOrder({ ...currentOrder, status: 'paid' }));
          window.location.href=stripe_url;
      }
      else {
          toast.error("Initializing Payment Failed ");
      }
      setInitializingPayment(false);
    } catch (err) { 
      toast.error('Failed to finalize payment. Please try again.');
    }
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-800 to-gray-900 min-h-screen py-10 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl overflow-hidden shadow-xl">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-3 sm:mb-0">Order #{currentOrder.orderId}</h1>
              <StatusBadge status={currentOrder.status} />
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-400 mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-white">RWF {parseFloat(currentOrder.totalAmount).toFixed(2)}</p>
              </div>
              <div className="bg-gray-800 rounded-xl p-4">
                <p className="text-sm font-medium text-gray-400 mb-1">Payment Method</p>
                <p className="text-xl font-bold text-white capitalize">{currentOrder.payment}</p>
              </div>
            </div>

            <div className="mb-6">
            <div className="flex space-x-4 mb-4">
                <button
                  onClick={() => setActiveSection('items')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeSection === 'items' ? 'bg-pink-500 text-white' : 'bg-white bg-opacity-20 text-white'}`}
                >
                  Items
                </button>
                <button
                  onClick={() => setActiveSection('address')}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${activeSection === 'address' ? 'bg-pink-500 text-white' : 'bg-white bg-opacity-20 text-white'}`}
                >
                  Shipping Address
                </button>
              </div>

              {activeSection === 'items' && currentOrder.items && currentOrder.items.length > 0 && (
                <>
                  <div className="space-y-4 mb-4">
                    {currentItems.map((item: any) => (
                      <div key={item.id} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-xl">
                        {item.product?.images && item.product.images.length > 0 && (
                          <img src={item.product.images[0]} alt={item.product.productName || 'Product'} className="w-20 h-20 object-cover rounded-lg" />
                        )}
                        <div>
                          <p className="font-semibold text-lg text-white mb-1">{item.product?.productName || 'Unknown Product'}</p>
                          <p className="text-gray-300 text-sm">Quantity: {item.quantity}</p>
                          <p className="text-gray-300 text-sm">Price: ${(pricePerItem * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center space-x-2">
                    {Array.from({ length: Math.ceil(currentOrder.items.length / itemsPerPage) }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${
                          currentPage === i + 1 ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {activeSection === 'address' && currentOrder.address && currentOrder.address.length > 0 && (
                <div className="bg-gray-800 p-4 rounded-xl">
                  {currentOrder.address.map((addr: any, index: number) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <p className="font-medium text-white">{addr.street}</p>
                      <p className="text-gray-300 text-sm">{addr.city}, {addr.country}</p>
                      <p className="text-gray-300 text-sm">{addr.postalCode}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-800 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Order Timeline</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                  <p className="text-white text-sm">Order Placed: {new Date(currentOrder.createdAt).toLocaleString()}</p>
                </div>
                {currentOrder.status !== 'pending' && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                    <p className="text-white text-sm">Processing Started: {new Date(currentOrder.updatedAt).toLocaleString()}</p>
                  </div>
                )}
                {currentOrder.status === 'completed' && (
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                    <p className="text-white text-sm">Order Completed: {new Date(currentOrder.updatedAt).toLocaleString()}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <Link to="/customer-support" className="text-gray-300 hover:text-white transition-colors text-sm">
                Customer support?
              </Link>
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
  {currentOrder.status === 'pending' && (
    <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
      <button
      className="bg-green-600 text-white hover:bg-green-700 transition duration-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-full md:w-auto"
      onClick={handlePayment}
      disabled={initializingPayment}
    >
      {initializingPayment ? 'Initializing Payment...' : 'Complete Payment'}
    </button>
    <button
      className="bg-red-600 text-white hover:bg-red-700 transition duration-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-full md:w-auto"
      onClick={handleCancelOrder}
      disabled={isCancelling}
    >
      {isCancelling ? 'Cancelling...' : 'Cancel Order'}
    </button>
    </div>
  )}
  
  <Link to="/my-orders"  className="w-full md:w-auto">
    <button
      className="bg-gray-800 text-white hover:bg-gray-700 transition duration-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider w-full md:w-auto"
    >
      Back to orders
    </button>
  </Link>
</div>
            </div>
          </div>
          </div>
          <div className="bg-gray-800 px-6 py-4">
            <p className="text-xs text-gray-400">Order placed on: <span className="font-semibold text-white">
              {new Date(currentOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span></p>
            <p className="text-xs text-gray-400 mt-1">Estimated delivery: <span className="font-semibold text-white">
              {new Date(new Date(currentOrder.createdAt).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </span></p>
          </div>
        </div>
      </div>
   
  );
};

export default OrderDetailsComponent;