import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setOrderInfo } from '../../slices/orderSlice/orderSlice';
import { useAdminGetAllOrdersQuery } from '../../slices/orderSlice/orderApiSlice';
import Spinner from '../Spinners';

const RecentOrders: React.FC = () => {
  const dispatch = useDispatch()
//@ts-ignore
  const { data: AdminAllOrders, isLoading, error, refetch } = useAdminGetAllOrdersQuery()

  useEffect(() => {
    if (AdminAllOrders) {
      dispatch(setOrderInfo(AdminAllOrders))
    }
  }, [AdminAllOrders, dispatch])

  useEffect(() => {
    refetch()
  }, [refetch])

  if (isLoading || !AdminAllOrders) return <Spinner />
  if (error) return <div>Error: {JSON.stringify(error)}</div>

  return (
    <div className="col-span-1 md:col-span-2 bg-white p-4 shadow rounded ">
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
          {AdminAllOrders.AllOrders && AdminAllOrders.AllOrders.map((order: any) => (
            <tr key={order.orderId}>
              <td className="p-2">{order.buyerId}</td>
              <td className="p-2">{order.orderId}</td>
              <td className="p-2 text-blue-500">{order.status}</td>
              <td className="p-2">{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecentOrders