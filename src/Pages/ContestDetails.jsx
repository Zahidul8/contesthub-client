import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';

const ContestDetails = () => {
    const {id} = useParams();
    const axiosSecure = useAxiosSecure();
    
    const {data: contest = {}} = useQuery({
        queryKey: ['contest', id],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/contest/${id}`)
            return data;
        }
    })
    console.log(contest);
    
    
    return (
        <div>
            <h1>Contest details</h1>
        </div>
    );
};

export default ContestDetails;