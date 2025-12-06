import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className='min-h-[calc(100vh-329px)]'>

           <Outlet></Outlet>
            </main>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;