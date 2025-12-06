import React from 'react';
import PopularContest from '../components/PopularContest/PopularContest';
import { Link } from 'react-router';

const HomePage = () => {
    return (
        <div>
            {/* banner section  */}
            <section></section>

            {/* popular cntests sections  */}
            <section className='my-10'>
                <h2 className='text-4xl font-bold text-center my-5'>Popular Contests</h2>
                <PopularContest></PopularContest>

                <div className='flex justify-center my-8'>
                <Link className='btn btn-primary' to={'/all-contests'}>All Contests </Link>
                </div>
            </section>
        </div>
    );
};

export default HomePage;