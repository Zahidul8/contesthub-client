import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { FaTrophy } from "react-icons/fa";
import Loading from "../components/Loading/Loading";

const Leaderboard = () => {
  const axiosInstance = useAxios();

  const { data: winners = [], isLoading } = useQuery({
    queryKey: ["winners"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/win-users");
      return data;
    },
  });

  if (isLoading) {
    return (
      <Loading></Loading>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold flex justify-center items-center gap-3">
          <FaTrophy className="text-yellow-500" />
          Leaderboard
        </h1>
        <p className="text-gray-500 mt-2">
          Celebrating our top contest winners
        </p>
      </div>

      {/* Leaderboard Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {winners.map((user, index) => (
          <div
            key={user._id}
            className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6"
          >
            {/* Rank Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              #{index + 1}
            </div>

            {/* User Info */}
            <div className="flex flex-col items-center text-center">
              <img
                src={user.image}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400"
              />

              <h3 className="mt-4 text-xl font-semibold">
                {user.name}
              </h3>

              <p className="text-sm text-gray-500">{user.email}</p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-sm text-gray-500">Total Wins</p>
                  <p className="text-lg font-bold text-gray-800">
                    {user.totalWins}
                  </p>
                </div>

                <div className="bg-gray-100 rounded-xl p-3">
                  <p className="text-sm text-gray-500">Total Prize</p>
                  <p className="text-lg font-bold text-green-600">
                    ${user.totalPrize}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {winners.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No winners found yet.
        </p>
      )}
    </div>
  );
};

export default Leaderboard;
