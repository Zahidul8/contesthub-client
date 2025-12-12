

import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import { IoBagCheckOutline } from "react-icons/io5"; 
import useAxiosSecure from '../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    // useSearchParams is used to get (?)query parameter from the url
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        if (sessionId) {
            axiosSecure.post(`/payment-success`, {sessionId})
            .then(res => {
                console.log(res.data);
                
            })
            
        }
    }, [axiosSecure, sessionId])

 
    
    
    return (
        <div className='flex flex-col items-center justify-center min-h-screen'>
            <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
                <IoBagCheckOutline className='w-16 h-16 text-green-500 mx-auto mb-4' />
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                    Payment Successful!
                </h1>
                <p className='text-gray-600 mb-6'>Thank you for your purchase. Your order is being processed.</p>
            <Link to='/dashboard/myParticipated-contest' className='inline-block bg-cyan-500 text-white font-semibold py-2 px-4 rounded-2xl'>
            Go to My participated contest
            </Link>
            </div>
           
        </div>
    );
};

export default PaymentSuccess;