import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div>
            <div className='max-w-11/12 mx-auto'>

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