import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiEye } from "react-icons/fi";
import { Link } from 'react-router';

const SubmittedTasks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: submissions = [] } = useQuery({
        queryKey: ['submissions', user.email],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/creator/submission?email=${user.email}`);
            return data;
        }
    });

    return (
        <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Submitted Tasks</h1>

            {/* Table Wrapper */}
            <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm md:text-base">
                            <th className="p-3 border-b">Submission ID</th>
                            <th className="p-3 border-b">Contest Name</th>
                            <th className="p-3 border-b">Participant Email</th>
                            <th className="p-3 border-b">Submitted Date</th>
                            <th className="p-3 border-b text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {submissions.map((sub) => (
                            <tr
                                key={sub._id}
                                className="hover:bg-gray-50 transition text-sm md:text-base"
                            >
                                <td className="p-3 border-b">{sub._id}</td>
                                <td className="p-3 border-b">{sub.name}</td>
                                <td className="p-3 border-b">{sub.user_email}</td>
                                <td className="p-3 border-b">
                                    {new Date(sub.created_at).toLocaleDateString()}
                                </td>

                                <td className="p-3 border-b text-center">
                                    <Link to={`/dashboard/submission-details/${sub._id}`}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
                                        
                                    >
                                        <FiEye size={18} />
                                        Submission
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {submissions.length === 0 && (
                    <p className="text-center p-6 text-gray-500 font-medium">
                        No submissions found
                    </p>
                )}
            </div>
        </div>
    );
};

export default SubmittedTasks;
