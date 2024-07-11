import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const WebsiteStatistics: React.FC = () => {
    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Website Traffic',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      };
    
      return (
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-4">Website Statistics</h2>
          <Line data={lineData} />
        </div>
      );
}

export default WebsiteStatistics
