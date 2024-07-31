import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetSellerStatsQuery } from '../../slices/orderSlice/orderApiSlice';
import { setSellerStats } from '../../slices/orderSlice/orderSlice';
import { RootState, AppDispatch } from '../../store';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import { X } from 'lucide-react';

const SellerStats = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, isError } = useGetSellerStatsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { sellerStats, sellerTotalAmount } = useSelector((state: RootState) => state.order);
  const [activeProduct, setActiveProduct] = useState(null);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      dispatch(setSellerStats(data));
    }
  }, [data, dispatch]);

  if (isLoading) return <LoadingSpinner />;
  if (!data || isError) return <ErrorMessage />;

  const totalQuantity = sellerStats.reduce((sum, item) => sum + item.quantity, 0);
  const totalRevenue = sellerTotalAmount * 100;   
  const averagePrice = totalRevenue / totalQuantity;

  const doughnutData = {
    labels: sellerStats.slice(0, 5).map(item => item.product.productName),
    datasets: [{
      data: sellerStats.slice(0, 5).map(item => item.quantity),
      backgroundColor: sellerStats.slice(0, 5).map(() => `hsl(${Math.random() * 360}, 70%, 50%)`),
    }]
  };

  const lineData = {
    labels: sellerStats.slice(0, 5).map(item => item.product.productName),
    datasets: [{
      label: 'Sales',
      data: sellerStats.slice(0, 5).map(item => item.quantity * item.product.price),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  };

  const duplicatedProducts = [...sellerStats, ...sellerStats];

  return (
    <div className="p-4 max-w-6xl mx-auto bg-gradient-to-br from-purple-100 to-blue-200 rounded-xl shadow-2xl">
      <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <StatCard title="Total Revenue" value={`RWF ${Math.round(totalRevenue).toLocaleString()}`} />
        <StatCard title="Items Sold" value={totalQuantity} />
        <StatCard title="Avg Price" value={`RWF ${Math.round(averagePrice).toLocaleString()}`} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <ChartCard title="Top 5 Products">
          <div className="h-48">
            <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
          </div>
        </ChartCard>
        <ChartCard title="Sales Trend (Top 5)">
          <div className="h-48">
            <Line data={lineData} options={{ maintainAspectRatio: false }} />
          </div>
        </ChartCard>
      </div>
      
      <div className="bg-white p-4 rounded-xl shadow-lg overflow-hidden">
        <h3 className="text-xl font-semibold mb-3">Products</h3>
        <div className="relative overflow-hidden">
          <div className="flex animate-slide">
            {duplicatedProducts.map((item, index) => (
              <ProductCard 
                key={`${item.id}-${index}`}
                item={item}
                setActiveProduct={setActiveProduct}
              />
            ))}
          </div>
        </div>
      </div>
      
      {activeProduct && (
        <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      )}
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <motion.div 
    whileHover={{ scale: 1.03 }}
    className="bg-white p-4 rounded-xl shadow-lg text-center"
  >
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </motion.div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white p-4 rounded-xl shadow-lg">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);

const ProductCard = ({ item, setActiveProduct }) => (
  <motion.div 
    whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
    className="bg-white p-2 rounded-lg shadow cursor-pointer mx-1 flex-shrink-0 w-40 overflow-hidden relative group"
    onClick={() => setActiveProduct(item)}
  >
    <div className="relative mb-2">
      <img 
        src={item.product.images[0] || "/placeholder.jpg"} 
        alt={item.product.productName} 
        className="w-full h-28 object-cover rounded-md transition-transform duration-300 group-hover:scale-105" 
      />
      <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
        RWF{item.product.price.toLocaleString()}
      </div>
    </div>
    <h4 className="font-semibold text-xs text-gray-800 mb-0.5 truncate">{item.product.productName}</h4>
    <p className="text-xs text-gray-500">Sold: {item.quantity}</p>
  </motion.div>
);

const ProductModal = ({ product, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-xl"
    >
      <div className="relative">
        <img 
          src={product.product.images[0] || "/placeholder.jpg"} 
          alt={product.product.productName} 
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 bg-white rounded-full p-1 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-3 text-gray-800">{product.product.productName}</h3>
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="bg-blue-50 p-2 rounded-lg">
            <p className="text-blue-800 font-semibold">Price</p>
            <p className="text-blue-600 font-bold">RWF{product.product.price.toLocaleString()}</p>
          </div>
          <div className="bg-green-50 p-2 rounded-lg">
            <p className="text-green-800 font-semibold">Quantity Sold</p>
            <p className="text-green-600 font-bold">{product.quantity}</p>
          </div>
        </div>
        <div className="bg-purple-50 p-2 rounded-lg mb-4">
          <p className="text-purple-800 font-semibold">Total Revenue</p>
          <p className="text-purple-600 font-bold">RWF{(product.product.price * product.quantity).toLocaleString()}</p>
        </div>
        <button 
          onClick={onClose} 
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg text-sm font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Close
        </button>
      </div>
    </motion.div>
  </motion.div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="loader">Loading...</div>
  </div>
);

const ErrorMessage = () => (
  <div className="text-center text-red-500">
    Error loading data. Please try again.
  </div>
);

export default SellerStats;