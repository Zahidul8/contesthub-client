import React from 'react';
import logo from '../../assets/logo.jpg'
import { Link } from 'react-router';

const Logo = () => {
    return (
        <div>
             <Link to='/' className=" font-bold text-2xl flex items-center">
    <img className='w-[80px]' src={logo} alt="" />
    ContestHub
    </Link>
        </div>
    );
};

export default Logo;