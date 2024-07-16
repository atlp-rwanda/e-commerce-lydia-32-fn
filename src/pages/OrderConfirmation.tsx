import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { usePaymentSuccessQuery } from '../slices/paymentSlice/paymentApiSlice';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation: React.FC = () => {
    //const [searchParams] = useSearchParams();
    // const orderId = searchParams.get('orderId');
    // const sessionId = searchParams.get('sessionId');
    const sessionOrderId = sessionStorage.getItem('paymentOrderId');
    const sessionId = sessionStorage.getItem('paymentSessionId')
    const [loading, setLoading] = useState<boolean>(true);
    let orderId;
    if (sessionOrderId) {
        orderId = Number(sessionOrderId);
    }
    const navigate = useNavigate();
    const { data, error} = usePaymentSuccessQuery({ sessionId, orderId}, {
        skip: !orderId || !sessionId,
    });
   
  useEffect(() => {
    console.log("Response data: ", data);
    // if (data && data.status===200) {
    //   setLoading(false);
    //   setTimeout(() => {
    //     navigate('/payment-success'); 
    //   }, 2000); 
      // } else
      if (error) {
      console.log('Error',error)
      setLoading(false);
      setTimeout(() => {
        navigate('/payment-error'); 
      }, 2000);
    }
    else {
        navigate('/payment-success');
    }
  }, [data, error, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        {loading && (
          <motion.div
            className="flex items-center justify-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-teal-500"></div>
            <p className="text-xl font-semibold">Please wait while checking your payment status...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PaymentConfirmation;
