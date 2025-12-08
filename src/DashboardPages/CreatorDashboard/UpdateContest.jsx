import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useParams } from 'react-router';

const UpdateContest = () => {
    const axiosSecure = useAxiosSecure();
    const {id} = useParams();
    console.log(id);
    
    return (
        <div>
            <h1>update contests </h1>
        </div>
    );
};

export default UpdateContest;