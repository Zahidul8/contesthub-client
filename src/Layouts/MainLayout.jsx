import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = () => {
    return (
        <div>
            <div className='max-w-11/12 mx-auto'>
            <ScrollToTop></ScrollToTop>
            <Navbar></Navbar>
            <main className='min-h-[calc(100vh-329px)]'>

           <Outlet></Outlet>
            </main>
            </div>
           <Footer></Footer>
        </div>
    );
};

export default MainLayout;