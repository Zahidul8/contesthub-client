import React from 'react';
import PopularContest from '../components/PopularContest/PopularContest';
import { Link } from 'react-router';
import HowItWorks from '../components/HowItWorks/HowItWorks';
import Banner from '../components/Banner/Banner';
import WinnerAdd from '../components/WinnerAdd/WinnerAdd';
import WhyChooseUs from '../components/WhychooseUs/WhyChooseUs';
import ContestCategories from '../components/ContestCategories/ContestCategories';
import PlatformFeatures from '../components/PlatformFeatures/PlatformFeatures';
import StatisticsSection from '../components/StatisticsSection/StatisticsSection';
import TopCreators from '../components/TopCreators/TopCreators';
import Testimonials from '../components/Testimonials/Testimonials';
import CallToAction from '../components/CallToAction/CallToAction';

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
                <Link className='btn btn-primary' to={'/all-contests'}>Show All</Link>
                </div>
            </section>

            {/* winner advertisement section  */}
            <section className='my-10'>
                <WinnerAdd></WinnerAdd>
            </section>

            {/* extra section  */}
            <section className='my-10'>
                <HowItWorks></HowItWorks>
            </section>

            <section className='my-10'>
                <WhyChooseUs></WhyChooseUs>
            </section>

            <section className='my-10'>
                <ContestCategories></ContestCategories>
            </section>

            <section className='my-10'>
               <PlatformFeatures></PlatformFeatures>
            </section>

            <section className='my-10'>
                <StatisticsSection></StatisticsSection>
            </section>

            <section className='my-10'>
                <TopCreators></TopCreators>
            </section>

            <section className='my-10'>
                <Testimonials></Testimonials>
            </section>

            <section className='my-10'>
                <CallToAction></CallToAction>
            </section>
        </div>
    );
};

export default HomePage;