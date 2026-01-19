import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import CardLoading from '../Loading/CardLoading';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { FaSearch } from 'react-icons/fa';

const AllContest = () => {
  const axiosInstance = useAxios();
  const [type, setType] = useState('');          // Current tab/category
  const [searchQuery, setSearchQuery] = useState(''); // Current search input

  // ==========================
  // Fetch Contests (Tabs OR Search)
  // ==========================
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ['contests', type, searchQuery],
    queryFn: async () => {
      if (!searchQuery) {
        // Filter by tab type
        const { data } = await axiosInstance.get(`/contests_all?type=${type}`);
        return data;
      } else {
        // Search endpoint
        const { data } = await axiosInstance.get(`/contest-search?search=${searchQuery}`);
        return data;
      }
    },
  });

  // ==========================
  // Handle Search Submit
  // ==========================
  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const value = form.search.value.trim();
    setSearchQuery(value); // triggers query
    form.reset();
  };

  return (
    <div className="min-h-screen py-12 px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-500">
        Explore All Contests
      </h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="mt-8 flex items-center bg-blue-950/50 backdrop-blur-xl border border-gray-500 rounded-full p-2 max-w-[400px] mx-auto my-10"
      >
        <input
          name="search"
          type="text"
          placeholder="Search contest by Name..."
          className="flex-1 bg-transparent px-4 py-3 text-white placeholder-gray-200 focus:outline-none "
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 transition px-6 py-3 rounded-full font-bold text-gray-900 flex items-center gap-2"
        >
          <FaSearch /> Search
        </button>
      </form>

      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
        Filter contests by category or search by type!
      </p>

      {/* Tabs */}
      <Tabs>
        <TabList className="flex flex-wrap gap-4 justify-center mb-10">
          {['Drawing', 'Writing', 'Coding', 'Design', 'Photography'].map((item) => (
            <Tab
              key={item}
              onClick={() => {
                setSearchQuery('');
                setType(item)
              }}
              className="px-6 py-2 bg-white rounded-full border border-gray-300 text-gray-700 cursor-pointer hover:bg-blue-600 hover:text-white transition shadow-md"
              selectedClassName="!bg-blue-600 !text-white !border-blue-600 shadow-lg"
            >
              {item}
            </Tab>
          ))}
        </TabList>

        {/* Panels */}
        {[1, 2, 3, 4, 5].map((_, index) => (
          <TabPanel key={index}>
            {isLoading ? (
              <CardLoading />
            ) : contests.length === 0 ? (
              <p className="text-center text-gray-600 text-lg mt-10">
                No contests found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {contests.map((contest) => (
                  <div key={contest._id} className="transform hover:scale-[1.03] transition">
                    <ContestCard contest={contest} />
                  </div>
                ))}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default AllContest;
