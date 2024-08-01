import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOrderInfo } from '../../slices/orderSlice/orderSlice';
import { useAdminGetAllOrdersQuery } from '../../slices/orderSlice/orderApiSlice';
import Spinner from '../Spinners';

const RecentOrders: React.FC = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const { data: AdminAllOrders, isLoading, error, refetch } = useAdminGetAllOrdersQuery();

  useEffect(() => {
    if (AdminAllOrders) {
      dispatch(setOrderInfo(AdminAllOrders));
    }
  }, [AdminAllOrders, dispatch]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading || !AdminAllOrders) return <Spinner />;
  if (error) return <div>Error: {JSON.stringify(error)}</div>;

  const orders = AdminAllOrders.AllOrders || [];
  const totalPages = Math.ceil(orders.length / ordersPerPage);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="col-span-1 md:col-span-2 bg-white p-4 shadow rounded">
      <h2 className="text-lg font-bold mb-4 p-2 sm:p-4">Recent Orders</h2>
      <table className="w-full table-auto text-xs sm:text-sm">
        <thead>
          <tr>
            <th className="text-left p-2">Buyer Id</th>
            <th className="text-left p-2">Orders Id</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order: any) => (
            <tr key={order.orderId}>
              <td className="p-2">{order.buyerId}</td>
              <td className="p-2">{order.orderId}</td>
              <td className="p-2 text-blue-500">{order.status}</td>
              <td className="p-2">{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, paginate }) => {
  const pageNumbers = [];
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, currentPage + 1);

  if (startPage > 2) {
    pageNumbers.push(1, '...');
  } else if (startPage === 2) {
    pageNumbers.push(1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  if (endPage < totalPages - 1) {
    pageNumbers.push('...', totalPages);
  } else if (endPage === totalPages - 1) {
    pageNumbers.push(totalPages);
  }

  return (
    <div className="flex justify-center items-center mt-6 space-x-2">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        &laquo;
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => typeof number === 'number' && paginate(number)}
          className={`px-3 py-1 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 ${
            currentPage === number
              ? 'bg-blue-500 text-white'
              : typeof number === 'number'
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-transparent text-gray-500 cursor-default'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1"
      >
        &raquo;
      </button>
    </div>
  );
};

export default RecentOrders;