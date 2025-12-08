import React, { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import { FiUsers, FiAward, FiDollarSign } from "react-icons/fi";
import Countdown from "../components/Countdown/Countdown";
import useAuth from "../hooks/useAuth";

const ContestDetails = () => {
  const { id } = useParams();
  const {user} = useAuth();
  const axiosInstance = useAxios();
  const [timeLeft, setTimeLeft] = useState({});

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/contest/${id}`);
      return data;
    },
  });

const handlePayment = async () => {
  if (!user?.email) {
    return alert("You must be logged in to register.");
  }

  const paymentInfo = {
    contestId: contest._id,
    name: contest.name,
    price: contest.price,
    description: contest.description,
    image: contest.image || "",
    quantity: 1,
    email: user.email,  
  };

  const { data } = await axiosInstance.post('/create-checkout-session', paymentInfo);

  window.location.assign(data.url);
};


 



  if (isLoading)
    return (
      <p className="text-center py-20 text-xl text-gray-500">Loading...</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-5 md:p-10 space-y-10">
        <div className=" text-2xl my-6">
  <h3 className="text-3xl font-semibold text-gray-700 mb-2">Deadline:</h3>
  <Countdown deadline={contest.deadline} setTimeLeft={setTimeLeft} timeLeft = {timeLeft} />
</div>

      {/* Banner */}
      <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary">
        <img
          src={contest.image}
          alt="Contest Banner"
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 rounded-3xl">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            {contest.name}
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Participants */}
        <div className="flex items-center bg-white/30 backdrop-blur-md shadow-xl p-5 rounded-2xl border border-gray-200 hover:scale-105 transition transform">
          <FiUsers className="w-10 h-10 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Participants</p>
            <p className="text-xl md:text-2xl font-bold">{contest.count || 0}</p>
          </div>
        </div>

        {/* Prize Money */}
        <div className="flex items-center bg-white/30 backdrop-blur-md shadow-xl p-5 rounded-2xl border border-gray-200 hover:scale-105 transition transform">
          <FiDollarSign className="w-10 h-10 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Prize Money</p>
            <p className="text-xl md:text-2xl font-bold">${contest.prizeMoney}</p>
          </div>
        </div>

        {/* Winner */}
        <div className="flex items-center bg-white/30 backdrop-blur-md shadow-xl p-5 rounded-2xl border border-gray-200 hover:scale-105 transition transform">
          <FiAward className="w-10 h-10 text-yellow-400 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Winner</p>
            <p className="text-xl md:text-2xl font-semibold">{contest.winnerName || "TBD"}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-7 shadow-2xl border border-gray-100 hover:shadow-3xl transition">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Contest Description</h2>
        <p className="text-gray-700 leading-relaxed">{contest.description}</p>
      </div>

      {/* Task Instructions */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-7 shadow-2xl border border-gray-100 hover:shadow-3xl transition">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Task Instructions</h2>
        <p className="text-gray-700 leading-relaxed">{contest.taskInstruction}</p>
      </div>

      {/* Register / Pay Button */}
      <div className="text-center">
        <button onClick={handlePayment} disabled={timeLeft.expired? true : false} className="btn bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 text-lg md:text-xl rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1">
          Register / Pay
        </button>
      </div>
    </div>
  );
};

export default ContestDetails;
