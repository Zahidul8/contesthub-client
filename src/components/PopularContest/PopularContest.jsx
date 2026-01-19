import React from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import CardLoading from '../Loading/CardLoading';

const PopularContest = () => {
    const axiosInstance = useAxios();

    const { data: contests = [], isLoading } = useQuery({
        queryKey: ['contests'],
        queryFn: async () => {
            const { data } = await axiosInstance.get('/contests')
            return data;
        }
    })
    console.log(contests);


     if (isLoading) {
    return (
    <CardLoading></CardLoading>
    );
  }
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>

            {
            contests.map(contest => <ContestCard key={contest._id} contest={contest}></ContestCard>)
            }
           

        </div>
    );
};

export default PopularContest;