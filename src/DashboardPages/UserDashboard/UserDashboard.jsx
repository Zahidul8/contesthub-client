import React from "react";
import {
  FaMoneyBillWave,
  FaTrophy,
  FaClock,
  FaStar,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UserDashboard = () => {

  const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

  const { data: winner = {}, isLoading } = useQuery({
    queryKey: ["winner", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/win-user?email=${user?.email}`);
      return data;
    },
  });


   if (isLoading) {
    return (
      <Loading></Loading>
    );
  }
  return (
    <section className="min-h-screen  py-10 px-6">
      
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-600">
          Welcome Back, User!
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Track your contests, winnings & participation progress
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        {/* Participated */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaTasks className="text-purple-600 text-4xl" />
          <div>
            <p className="text-gray-600">Participated</p>
            <h2 className="text-2xl text-black font-bold">{winner.participatedCount}</h2>
          </div>
        </div>

        {/* Prize Money Won */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaMoneyBillWave className="text-green-600 text-4xl" />
          <div>
            <p className="text-gray-600">Prize Money Won</p>
            <h2 className="text-2xl text-black font-bold">${winner.totalPrize}</h2>
          </div>
        </div>

        {/* Wins */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaTrophy className="text-yellow-500 text-4xl" />
          <div>
            <p className="text-gray-600">Wins</p>
            <h2 className="text-2xl text-black font-bold">{winner.totalWins}</h2>
          </div>
        </div>

        {/* Pending Results */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaClock className="text-blue-600 text-4xl" />
          <div>
            <p className="text-gray-600">Pending Results</p>
            <h2 className="text-2xl text-black font-bold">{winner.participatedCount - winner.totalWins}</h2>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Contests Joined */}
        <div className="bg-white p-6 shadow-xl rounded-2xl col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Recent Contests Joined
          </h2>

          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold text-black">Logo Design Challenge</span>
              <span className="text-sm text-purple-600">Submitted</span>
            </li>
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold text-black">Photography Contest</span>
              <span className="text-sm text-yellow-600">Pending Result</span>
            </li>
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold text-black">Mobile UI/UX Challenge</span>
              <span className="text-sm text-green-600">Won 🎉</span>
            </li>
          </ul>
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
          <div className="flex flex-col items-center">
            <FaUserCircle className="text-7xl mb-4" />
            <h2 className="text-2xl font-bold">Your Profile</h2>
            <p className="text-sm mt-2 opacity-90 text-center">
              View and manage your personal details & achievements
            </p>

            <Link to={'/dashboard/my-profile'} className="mt-6 bg-white text-indigo-600 px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition">
              View Profile
            </Link>
          </div>
        </div>
        
      </div>

      {/* Footer */}
      <p className="text-center mt-12 text-gray-500 text-sm">
        © 2025 ContestHub — User Dashboard
      </p>

    </section>
  );
};

export default UserDashboard;
