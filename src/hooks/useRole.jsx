import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: role = {}, isLoading: roleLoading} = useQuery({
        queryKey: ['user-role', user?.email],
        queryFn: async () => {
            const {data} = await axiosSecure.get(`/user/${user?.email}`);
            return data.role || 'user';
        }
    })
    return {role, roleLoading};
};

export default useRole;