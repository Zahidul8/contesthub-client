import React from "react";
import {
  FaUsers,
  FaCrown,
  FaTrophy,
  FaMoneyBill,
  FaChartLine,
  FaTasks,
} from "react-icons/fa";

const AdminDashboard = () => {
  return (
    <section className="min-h-screen py-10 px-6">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-500">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-lg mt-2">
          Manage contests, users & monitor performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        {/* Users */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaUsers className="text-blue-600 text-4xl" />
          <div>
            <p className="text-gray-600">Total Users</p>
            <h2 className="text-2xl text-black font-bold">1,240</h2>
          </div>
        </div>

        {/* Contests */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaTasks className="text-purple-600 text-4xl" />
          <div>
            <p className="text-gray-600">Total Contests</p>
            <h2 className="text-2xl text-black font-bold">320</h2>
          </div>
        </div>

        {/* Prize Money */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaMoneyBill className="text-green-600 text-4xl" />
          <div>
            <p className="text-gray-600">Prize Money Given</p>
            <h2 className="text-2xl text-black font-bold">$18,500</h2>
          </div>
        </div>

        {/* Winners */}
        <div className="bg-white shadow-lg p-6 rounded-2xl flex items-center gap-4 hover:scale-105 transition">
          <FaCrown className="text-yellow-500 text-4xl" />
          <div>
            <p className="text-gray-600">Total Winners</p>
            <h2 className="text-2xl text-black font-bold">186</h2>
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="bg-white p-6 shadow-xl rounded-2xl col-span-2">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Recent Activity
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold text-black">New contest approved</span>
              <span className="text-gray-600 text-sm">2 hours ago</span>
            </li>
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold text-black">User Kamal registered</span>
              <span className="text-gray-600 text-sm">5 hours ago</span>
            </li>
            <li className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
              <span className="font-semibold text-black">Winner declared in Logo Contest</span>
              <span className="text-gray-600 text-sm">1 day ago</span>
            </li>
          </ul>
        </div>

        {/* Performance Box */}
        <div className="bg-gradient-to-br from-purple-600 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Platform Performance</h2>
          <div className="flex flex-col items-center">
            <FaChartLine className="text-6xl mb-4" />
            <p className="text-lg">Monthly Growth</p>
            <h3 className="text-4xl font-extrabold mt-2">+42%</h3>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <p className="text-center mt-12 text-gray-500 text-sm">
        © 2025 ContestHub Admin Panel — All Rights Reserved
      </p>
    </section>
  );
};

export default AdminDashboard;
