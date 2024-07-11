import React, {useEffect} from 'react'
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { useAdminGetAllOrdersQuery } from '../../slices/orderSlice/orderApiSlice';
import Spinner from '../Spinners';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const Statistics: React.FC = () => {
    //@ts-ignore
    const {data: AllOrders, isLoading, error, refetch} = useAdminGetAllOrdersQuery()
    const paidOrders: any = AllOrders?.AllOrders?.filter((order: any) => order.status === 'Paid') || [];
    const pendingOrders: any = AllOrders?.AllOrders?.filter((order: any) => order.status === 'pending') || [];
    const completeOrders: any = AllOrders?.AllOrders?.filter((order: any) => order.status === 'Completed') || [];
   
      useEffect(() => {
        refetch()
      }, [refetch])
      
      if(isLoading || !AllOrders) return <Spinner/>
      if(error) return <div>Error: {JSON.stringify(error)}</div>

    const data = {
        labels: ['Completed', 'Pending', 'Paid'],
        datasets: [
          {
            label: '# of Orders',
            data: [completeOrders.length, pendingOrders.length, paidOrders.length],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      };
    
      return (
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-4">Statistics</h2>
          <Pie data={data} />
        </div>
      );
}

export default Statistics
