import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h1>Payment cancelled</h1>
            <Link to='/'>
            <button className='btn btn-primary text-black'>Try again</button>
            </Link>
        </div>
    );
};

export default PaymentCancelled;