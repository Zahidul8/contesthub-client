import React from 'react';
import PopularContest from '../components/PopularContest/PopularContest';
import { Link } from 'react-router';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Banner from '../components/Banner/Banner';
import WinnerAdd from '../components/WinnerAdd/WinnerAdd';

const HomePage = () => {
    return (
        <div>
            {/* banner section  */}
            <section>
                <Banner></Banner>
            </section>

            {/* popular cntests sections  */}
            <section className='my-10'>
                <h2 className='section-heading font-bold text-center my-5'>Popular Contests</h2>
                <PopularContest></PopularContest>

                <div className='flex justify-center my-8'>
                <Link className='btn btn-primary' to={'/all-contests'}>All Contests </Link>
                </div>
            </section>

            {/* winner advertisement section  */}
            <section>
                <WinnerAdd></WinnerAdd>
            </section>

            {/* extra section  */}
            <section>
                <HowItWorks></HowItWorks>
            </section>
        </div>
    );
};

export default HomePage;