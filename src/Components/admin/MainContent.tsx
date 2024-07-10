import React, { useState, useEffect } from 'react'
import RecentOrders from './RecentOrders';
import Statistics from './Statistics';
import Roles from './Roles';
import Users from './Users';
import Permissions from './Permissions';
import { useAdminGetAllOrdersQuery } from '../../slices/orderSlice/orderApiSlice';
import Spinner from '../Spinners';

const MainContent: React.FC = () => {
  const [loadStage, setLoadStage] = useState(0);
  //@ts-ignore
  const { data: AllOrders, isLoading: isLoadingOrders } = useAdminGetAllOrdersQuery()
  
  const paidOrders = AllOrders?.AllOrders?.filter((order: any) => order.status === 'Paid') || [];

  useEffect(() => {
    if (!isLoadingOrders && loadStage < 5) {
      const timer = setTimeout(() => setLoadStage(prev => prev + 1), 900); 
      return () => clearTimeout(timer);
    }
  }, [loadStage, isLoadingOrders]);

  if (isLoadingOrders) return <Spinner />;

  return (
    <div className="p-4 space-y-4 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 shadow rounded">Total sells: {paidOrders.length}</div>
        <div className="bg-white p-4 shadow rounded">Total Orders: {AllOrders?.AllOrders?.length || 0}</div>
      </div>
      
      {loadStage >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecentOrders />
          <Statistics />
        </div>
      )}
      
      {loadStage >= 2 && <Roles />}
      
      {loadStage >= 3 && <Users />}
      
      {loadStage >= 4 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Permissions />
        </div>
      )}
    </div>
  );
}

export default MainContent