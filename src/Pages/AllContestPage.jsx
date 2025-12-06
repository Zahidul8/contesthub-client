import React from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../components/ContestCard/ContestCard';

const AllContestPage = () => {
       const axiosInstance = useAxios();

    const { data: contests = [] } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/contests/all')
            return data;
        }
    })

    
   return (
    <div className='my-10'>
        <h1 className='text-4xl font-bold text-center my-8'>All Contests</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
                contests.map(contest =>  <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    </div>
    );
};

export default AllContestPage;