import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";
import { useState } from "react";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const [openDropdown, setOpenDropdown] = useState(null);

  const { data: contests = [], refetch, isLoading } = useQuery({
    queryKey: ["contests"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/contests-all");
      return data;
    },
  });

 
 const handleAction = async (id, action) => {
  try {
    const { data } = await axiosSecure.patch(`/contests/action/${id}`, { action });
    console.log(data);
    refetch();
    setOpenDropdown(null);
  } catch (err) {
    console.log(err);
  }
};

  if (isLoading) return <p className="text-center mt-20">Loading...</p>;

  return (
   <div className="p-5 w-full">
  <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center md:text-left">
    Manage Contests
  </h1>

  <div className="overflow-x-auto">
    <table className="w-full border border-gray-200 rounded-lg shadow-lg bg-white">
      <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 uppercase text-sm md:text-base">
        <tr>
          <th className="p-3 text-left">#</th>
          <th className="p-3 text-left">Contest Name</th>
          <th className="p-3 text-left">Creator</th>
          <th className="p-3 text-left">Status</th>
          <th className="p-3 text-left">Actions</th>
        </tr>
      </thead>

      <tbody>
        {contests.map((contest, index) => (
          <tr
            key={contest._id}
            className="border-b border-gray-200 hover:bg-gray-50 transition duration-200"
          >
            <td className="p-3">{index + 1}</td>
            <td className="p-3 font-medium text-gray-800">{contest.name}</td>
            <td className="p-3 text-gray-600">{contest.creator}</td>
            <td
              className={`p-3 font-semibold ${
                contest.status === "pending"
                  ? "text-yellow-500"
                  : contest.status === "approved"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {contest.status}
            </td>

            {/* ACTION DROPDOWN */}
            <td className="p-3 relative">
              <button
                className="p-2 rounded hover:bg-gray-100 transition duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === contest._id ? null : contest._id
                  )
                }
              >
                <FaEllipsisV className="text-gray-600" />
              </button>

              {openDropdown === contest._id && (
                <div className="absolute left-12 -mt-10 w-44 bg-white border border-gray-200 rounded-lg shadow-xl z-30 overflow-hidden">
                  <button
                    onClick={() => handleAction(contest._id, "confirm")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-green-600 transition duration-150"
                  >
                    Confirm
                  </button>

                  <button
                    onClick={() => handleAction(contest._id, "reject")}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-yellow-50 hover:text-yellow-600 transition duration-150"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() => handleAction(contest._id, "delete")}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default ManageContests;
