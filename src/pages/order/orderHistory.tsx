import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetAllOrdersByBuyerQuery } from '../../slices/orderSlice/orderApiSlice';
import { setBuyerOrders } from '../../slices/orderSlice/orderSlice';
import { RootState } from '../../store';
import { Link, useLocation  } from 'react-router-dom';

const StatusIndicator = ({ status }: { status: string }) => {
  const statusStyles = {
    pending: 'bg-yellow-400',
    processing: 'bg-blue-400',
    completed: 'bg-green-400',
    cancelled: 'bg-red-400',
  };
  return (
    <div className="flex items-center">
      <span className={`w-2 h-2 rounded-full ${statusStyles[status.toLowerCase()] || 'bg-gray-400'} mr-2`}></span>
    </div>
  );
};

const BuyerOrdersComponent: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { data: buyerOrders, isLoading, isError, refetch } = useGetAllOrdersByBuyerQuery();
  const orders = useSelector((state: RootState) => state.order.buyerOrders.buyerOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 6;

  useEffect(() => {
    refetch();
  }, [location, refetch]);

  useEffect(() => {
    if (buyerOrders) {
      dispatch(setBuyerOrders(buyerOrders));
    }
  }, [buyerOrders, dispatch]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
    </div>
  );
 
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = Array.isArray(orders) ? orders.slice(indexOfFirstOrder, indexOfLastOrder) : [];

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-23/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-10 text-center mt-14">Your Orders</h2>
        {Array.isArray(orders) && orders.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 mt-20">
              {currentOrders.map((order) => (
                <Link key={order.orderId} to={`/order/${order.orderId}`} className="block">
                  <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-5">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-300">Order #{order.orderId}</span>
                        <StatusIndicator status={order.status} />
                      </div>
                      <p className="text-xl font-bold text-white mb-2">Rwf {parseFloat(order.totalAmount).toFixed(2)}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div className="bg-gray-700 px-4 py-2 flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-300">Items: {order.items.length}</span>
                      <span className="text-xs font-medium text-gray-300">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === i + 1 ? 'bg-gray-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  } transition-colors duration-200 text-sm`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg shadow-md max-w-md mx-auto border border-gray-700 mt-20">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="mt-2 text-xl font-medium text-white">No orders yet</h3>
            <p className="mt-1 text-gray-400">Start shopping to see your orders here!</p>
            <div className="mt-6">
              <Link to='/'>
                <button className="bg-gray-700 text-white hover:bg-gray-600 font-bold py-2 px-4 rounded transition duration-300 ease-in-out">
                  Explore Products
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerOrdersComponent;