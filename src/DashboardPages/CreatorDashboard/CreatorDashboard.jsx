import React from "react";
import {
  FaTasks,
  FaPlusCircle,
  FaDollarSign,
  FaClipboardCheck,
  FaUsers,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";

const CreatorDashboard = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-10 px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Creator Dashboard
        </h1>
        <p className="text-gray-600 text-lg mt-2">
          Manage your contests & track submissions
        </p>
      </div>

      {/* Stats Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        
        {/* Total Contests */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaTasks className="text-blue-600 text-4xl" />
          <div>
            <p className="text-gray-600">Your Contests</p>
            <h2 className="text-2xl font-bold">24</h2>
          </div>
        </div>

        {/* Pending Contests */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaClipboardCheck className="text-yellow-500 text-4xl" />
          <div>
            <p className="text-gray-600">Pending Approval</p>
            <h2 className="text-2xl font-bold">5</h2>
          </div>
        </div>

        {/* Total Submissions */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaUsers className="text-purple-600 text-4xl" />
          <div>
            <p className="text-gray-600">Total Participants</p>
            <h2 className="text-2xl font-bold">380</h2>
          </div>
        </div>

        {/* Prize Money Given */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaDollarSign className="text-green-600 text-4xl" />
          <div>
            <p className="text-gray-600">Prize Money Given</p>
            <h2 className="text-2xl font-bold">$4,200</h2>
          </div>
        </div>
      </div>

      {/* Middle Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Your Latest Contests */}
        <div className="bg-white p-6 shadow-xl rounded-2xl col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Your Latest Contests
          </h2>

          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold">Logo Design Challenge</span>
              <span className="text-sm text-blue-600">35 submissions</span>
            </li>
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold">UI/UX Mobile App Contest</span>
              <span className="text-sm text-blue-600">22 submissions</span>
            </li>
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold">Photography Creative Shot</span>
              <span className="text-sm text-blue-600">18 submissions</span>
            </li>
          </ul>
        </div>

        {/* Create New Contest Box */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-2xl text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Create a New Contest</h2>
          <div className="flex flex-col items-center">
            <FaPlusCircle className="text-6xl mb-4" />
            <p className="text-lg">Start a new creative challenge</p>
            <Link to={'/dashboard/add-contest'}  className="mt-4 bg-white text-orange-600 px-6 py-2 rounded-full font-bold shadow-md hover:scale-105 transition">
              Create Now
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <p className="text-center mt-12 text-gray-500 text-sm">
        © 2025 ContestHub Creator Panel — All Rights Reserved
      </p>
    </section>
  );
};

export default CreatorDashboard;
