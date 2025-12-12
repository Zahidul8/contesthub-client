import React from 'react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router';
import Loading from '../../components/Loading/Loading';

const MyParticipatedContest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const navigate = useNavigate();

    const { data: myContests = [], isLoading } = useQuery({
        queryKey: ['myContest', user?.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/payments/participator?email=${user?.email}`);
            // Sort by upcoming deadline
            return data.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        }
    });

    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className=" p-5 md:p-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Participated Contests</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white/20 backdrop-blur-md rounded-xl shadow-xl border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100/50">
                            <th className="py-3 px-6 text-left font-medium text-gray-700">#</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Contest Name</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Prize Money</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Deadline</th>
                            <th className="py-3 px-6 text-left font-medium text-gray-700">Payment Status</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                        {myContests.map((contest, index) => (
                            <tr
                                key={contest._id}
                                className="border-b border-gray-200 hover:bg-gray-50 transition"
                            >
                                <td className="py-4 px-6">{index + 1}</td>
                                <td className="py-4 px-6 font-semibold">{contest.contestName}</td>
                                <td className="py-4 px-6">${contest.prizeMoney}</td>
                                <td className="py-4 px-6">
                                    {new Date(contest.deadline).toLocaleDateString()}{" "}
                                    {new Date(contest.deadline).toLocaleTimeString()}
                                </td>
                                <td className='py-4 px-6 font-semibold 
                                    text-green-600 
                                '>
                                    {contest.paymentStatus}
                                </td>
                              
                            </tr>
                        ))}
                        {myContests.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-500">
                                    You have not participated in any contests yet.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParticipatedContest;
