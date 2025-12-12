import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FiUser, FiMail, FiFileText, FiCalendar } from "react-icons/fi";
import Swal from "sweetalert2";

const SubmissionDetails = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: submission = {}, isLoading } = useQuery({
        queryKey: ['submission', id],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/submission/${id}`);
            return data;
        }
    });

    const handleDeclareWinner = async () => {
        const confirm = await Swal.fire({
            title: 'Declare Winner?',
            text: "Are you sure you want to declare this participant as the winner?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, declare winner!'
        });

        if (confirm.isConfirmed) {

            const { data } = await axiosSecure.patch(`/contest/declare-winner/${submission.contestId}`, {
                winnerName: submission.user_name,
                winnerEmail: submission.user_email,
                winnerImage: submission.user_image,
            });
            if (data.modifiedCount) {

                Swal.fire({
                    icon: 'success',
                    title: 'Winner Declared',
                    text: `${submission.user_name} has been declared the winner!`,
                    timer: 2000,
                    showConfirmButton: false
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "You have already declared a winner",
                });
            }


        }
    };

    if (isLoading) {
        return <p className="text-center py-10 text-gray-500">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 mt-10">
            <div className="bg-white/20 backdrop-blur-lg shadow-2xl border border-gray-200 rounded-3xl p-8 space-y-6">

                <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
                    Submission Details
                </h1>

                {/* Participant Info */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <FiUser className="text-primary w-6 h-6" />
                        <p className="text-lg font-semibold text-gray-700">
                            <span className="font-bold">Participant:</span> {submission.user_name}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiMail className="text-primary w-6 h-6" />
                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Email:</span> {submission.user_email}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <FiCalendar className="text-primary w-6 h-6" />
                        <p className="text-lg text-gray-700">
                            <span className="font-bold">Submitted:</span>{" "}
                            {new Date(submission.created_at).toLocaleString()}
                        </p>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-300"></div>

                {/* Task Content */}
                <div className="space-y-4">
                    <div className="flex items-center gap-4">
                        <FiFileText className="text-primary w-6 h-6" />
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Submitted Task
                        </h2>
                    </div>

                    <p className="bg-white/30 backdrop-blur-md p-5 rounded-xl shadow-md text-gray-700 leading-relaxed">
                        {submission.submissionTask}
                    </p>
                </div>

                {/* Declare Winner Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={handleDeclareWinner}
                        className="btn bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition transform hover:-translate-y-1"
                    >
                        Declare Winner
                    </button>
                </div>

                {/* Contest ID */}
                <div className="mt-6 text-center text-gray-600">
                    <p className="text-sm">
                        <span className="font-semibold">Contest ID:</span> {submission.contestId}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SubmissionDetails;
