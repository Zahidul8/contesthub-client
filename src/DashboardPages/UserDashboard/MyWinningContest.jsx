import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FiDollarSign, FiAward } from 'react-icons/fi';

const MyWinningContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: winningContests = [], isLoading } = useQuery({
    queryKey: ['winningContest', user.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests-winner?email=${user.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <p className="text-center py-20 text-xl text-gray-500">
        Loading your winning contests...
      </p>
    );
  }

  if (winningContests.length === 0) {
    return (
      <p className="text-center py-20 text-xl text-gray-500">
        You haven't won any contests yet.
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-5 md:p-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary">
        My Winning Contests
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {winningContests.map((contest) => (
          <div
            key={contest._id}
            className="bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200 hover:shadow-3xl transition transform hover:-translate-y-2"
          >
            {/* Banner */}
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img
                src={contest.image}
                alt={contest.name}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 bg-yellow-400 text-white px-4 py-1 rounded-full flex items-center gap-2 shadow-lg font-semibold">
                <FiAward /> Winner
              </div>
            </div>

            {/* Contest Info */}
            <div className="p-5 space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">{contest.name}</h2>
              <p className="text-gray-600 text-sm">{contest.description}</p>

              {/* Prize Money */}
              <div className="flex items-center gap-3 mt-3 bg-yellow-100/50 text-yellow-800 px-4 py-2 rounded-xl shadow-md font-bold text-lg w-max">
                <FiDollarSign className="w-5 h-5" /> ${contest.prizeMoney}
              </div>

              {/* Contest Type */}
              <div className="mt-2 flex items-center gap-2">
                <span className="bg-primary/30 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {contest.contestType}
                </span>
              </div>

              {/* Winner Name */}
              <div className="mt-4 flex items-center gap-2 text-gray-800 font-semibold text-lg">
                <FiAward className="text-yellow-400 w-5 h-5" />
                Winner: {contest.winnerName}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWinningContest;
