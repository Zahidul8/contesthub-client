import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaTrophy, FaDollarSign, FaUsers } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";


const WinnerAdd = () => {
    const axiosInstance = useAxios();

    const {data: recentWinners = []} = useQuery({
        queryKey: ['recentWinners'],
        queryFn : async () => {
            const {data} = await axiosInstance.get('/recent-winners');
            return data;
        }

    })
    const {data: totalWinners = []} = useQuery({
        queryKey: ['totalWinners'],
        queryFn : async () => {
            const {data} = await axiosInstance.get('/total-winners');
            return data;
        }

    })

    const totalPrizeMoney = totalWinners.reduce((sum, winner) => {
        return sum + Number(winner.prizeMoney)
    }, 0)
    console.log(totalPrizeMoney);
    

    
    

    
    

  return (
    <section className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 py-16">
      <div className="max-w-6xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Celebrate Our Champions!
        </h2>
        <p className="text-lg md:text-xl mb-12">
          Be inspired by our recent winners and their amazing prizes!
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
            <FaUsers className="text-white w-10 h-10 mb-2" />
            <p className="font-bold text-2xl">{totalWinners.length}+</p>
            <span>Total Winners</span>
          </div>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
            <FaDollarSign className="text-white w-10 h-10 mb-2" />
            <p className="font-bold text-2xl">${totalPrizeMoney}</p>
            <span>Total Prize Money</span>
          </div>
          <div className="flex flex-col items-center bg-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-lg">
            <FaTrophy className="text-white w-10 h-10 mb-2" />
            <p className="font-bold text-2xl">{totalWinners.length}+</p>
            <span>Contests Won</span>
          </div>
        </div>

        {/* Recent Winners */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {recentWinners.map((winner, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-xl p-6 rounded-3xl shadow-lg flex flex-col items-center hover:scale-105 transition"
            >
              <img
                src={winner.image}
                alt={winner.name}
                className="w-24 h-24 rounded-full mb-4 object-cover border-4 border-white"
              />
              <h3 className="font-bold text-xl">{winner.name}</h3>
              <p className="text-sm">{winner.contest}</p>
              <p className="text-yellow-300 font-semibold mt-2">${winner.prizeMoney} Prize</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xl md:text-2xl font-semibold">
          You could be next! <span className="underline">Join a contest today</span>.
        </p>
      </div>
    </section>
  );
};

export default WinnerAdd;
