import React, { useState } from "react";
import { FaSearch, FaDollarSign, FaClock } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../Loading/Loading";

const Banner = () => {
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); 
  const axiosInstance = useAxios();


  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const { data } = await axiosInstance.get(
        `/contest-search?search=${searchQuery}`
      );
      return data;
    },
    enabled: !!searchQuery, 
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(query); 
    e.target.reset();
  };

  return (
    <div>
      {/* ===== Banner Section ===== */}
      <div className="relative w-full h-[50vh] md:h-[70vh] flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            Discover Amazing{" "}
            <span className="text-yellow-300">Contests</span>
          </h1>
          <p className="text-gray-200 mt-4 text-base sm:text-lg md:text-xl">
            Explore, participate, and win exciting rewards!
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3 sm:gap-0 bg-white/20 backdrop-blur-xl p-2 sm:p-0 rounded-3xl border border-white/40 shadow-lg sm:justify-between"
          >
            <input
              type="text"
              name="searchText"
              placeholder="Search contest by type..."
              className="flex-1 bg-transparent text-white placeholder-gray-300 px-4 py-3 sm:py-2 focus:outline-none text-base sm:text-lg rounded-3xl sm:rounded-l-3xl"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              className="mt-2 sm:mt-0 sm:ml-2 bg-yellow-400 text-gray-900 px-5 py-3 rounded-2xl font-bold hover:bg-yellow-500 transition flex items-center justify-center gap-2"
            >
              <FaSearch size={16} /> Search
            </button>
          </form>
        </div>
      </div>

      {/* ===== Search Results ===== */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {isLoading && <p className="text-center text-gray-500"><Loading></Loading></p>}

        {!isLoading && searchQuery && contests.length === 0 && (
          <p className="text-center text-gray-500">No contests found.</p>
        )}

        {!isLoading && contests.length > 0 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center sm:text-left">
              Search Results:
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contests.map((contest) => (
                <div
                  key={contest._id}
                  className="bg-white/30 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white/20 hover:scale-105 transition transform"
                >
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-full h-36 sm:h-40 md:h-44 object-cover rounded-2xl"
                  />
                  <h3 className="text-lg font-bold mt-3 text-gray-800">
                    {contest.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{contest.contestType}</p>
                  <p className="text-gray-700 mt-2 line-clamp-2">
                    {contest.description}
                  </p>

                  <div className="mt-3 flex justify-between items-center text-gray-700">
                    <div className="flex items-center gap-1">
                      
                      Prize Money:<span className="font-semibold flex items-center"> <FaDollarSign className="text-yellow-500" />{" "}{contest.prizeMoney}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaClock className="text-primary" />{" "}
                      <span>{new Date(contest.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Banner;
