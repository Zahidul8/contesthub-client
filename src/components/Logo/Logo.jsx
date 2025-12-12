import React from 'react';
import logo from '../../assets/logo.jpg'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
             <Link to='/' className=" font-bold text-2xl flex items-center gap-1">
    <img className='w-18 rounded-full ' src={logo} alt="" />
    ContestHub
    </Link>
        </div>
    );
};

export default Logo;