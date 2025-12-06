import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AllContest = () => {
     const axiosInstance = useAxios();
     const [type, setType] = useState(' ')

    const { data: contests = [] } = useQuery({
        queryKey: ['contests', type],
        queryFn: async () => {
            const { data } = await axiosInstance.get(`/contests_all?type=${type}`)
            return data;
        }
    })

    console.log(type);
    
    return (
        <div>
             <h1 className='text-4xl font-bold text-center my-8'>All Contests</h1>

         <Tabs>
    <TabList className="flex gap-x-20 justify-center my-8 flex-wrap">
      <Tab  onClick={() => setType('Drawing')}>Drawing</Tab>
      <Tab  onClick={() => setType('Writing')}>Writing</Tab>
      <Tab  onClick={() => setType('Coding')}>Coding</Tab>
      <Tab  onClick={() => setType('Design')}>Design</Tab>
      <Tab  onClick={() => setType('Photography')}>Photography</Tab>
    </TabList>

    <TabPanel>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                contests.map(contest =>  <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    </TabPanel>

    <TabPanel>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                contests.map(contest =>  <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    </TabPanel>

    <TabPanel>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                contests.map(contest =>  <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    </TabPanel>

    <TabPanel>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                contests.map(contest =>  <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    </TabPanel>
    
    <TabPanel>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                contests.map(contest =>  <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    </TabPanel>
  </Tabs>



        

        </div>
    );
};

export default AllContest;