

import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IoBagCheckOutline } from "react-icons/io5"; 
import useAxios from '../hooks/useAxios';

const PaymentSuccess = () => {
    // useSearchParams is used to get (?)query parameter from the url
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosInstance = useAxios();
    
    const calledRef = useRef(false);

    useEffect(() => {

         if (calledRef.current) return;
  calledRef.current = true;
        if (sessionId) {
            // fetch
            axiosInstance.post(`/payment-success`, {sessionId})
            
        }
    },[sessionId,axiosInstance])
    
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
                <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    Payment Successful!
                </h1>
                <p className='text-gray-600 mb-6'>Thank you for your purchase. Your order is being processed.</p>
            <Link to='/dashboard/my-orders' className='inline-block bg-lime-500 text-white font-semibold py-2 px-4 rounded-2xl'>
            Go to My Orders
            </Link>
            </div>
           
        </div>
    );
};

export default PaymentSuccess;