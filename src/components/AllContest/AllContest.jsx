import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import ContestCard from '../ContestCard/ContestCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AllContest = () => {
  const axiosInstance = useAxios();
  const [type, setType] = useState(' ');

  const { data: contests = [] } = useQuery({
    queryKey: ['contests', type],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/contests_all?type=${type}`);
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-10">
        Explore All Contests
      </h1>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg">
        Filter contests by category and find the perfect one to participate in!
      </p>

      {/* Tabs */}
      <Tabs>
        <TabList className="flex flex-wrap gap-4 justify-center mb-10">
          {['Drawing', 'Writing', 'Coding', 'Design', 'Photography'].map((item) => (
            <Tab
              key={item}
              onClick={() => setType(item)}
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
            {contests.length === 0 ? (
              <p className="text-center text-gray-600 text-lg mt-10">
                No contests found in this category.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {contests.map((contest) => (
                  <div className="transform hover:scale-[1.03] transition">
                    <ContestCard key={contest._id} contest={contest} />
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
