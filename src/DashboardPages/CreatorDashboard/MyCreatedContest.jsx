import React from "react";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaTrash, FaEdit, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["contests", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/contests/creator?email=${user?.email}`
      );
      return data;
    },
  });

  // DELETE HANDLER
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete this contest?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.delete(`/contests/${id}`);
        refetch();
        Swal.fire("Deleted!", "Contest removed successfully.", "success");
      }
    });
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        My Created Contests ({contests.length})
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="w-full table-auto">
          <thead className="bg-gray-100 text-gray-700 text-sm md:text-base">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Contest Name</th>
              <th className="p-3 text-left">Type</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest) => (
              <tr
                key={contest._id}
                className="border-b hover:bg-blue-50 transition"
              >
                {/* IMAGE */}
                <td className="p-3">
                  <img
                    src={contest.image}
                    alt="contest"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </td>

                {/* NAME */}
                <td className="p-3 font-semibold text-gray-800">
                  {contest.name}
                </td>

                {/* TYPE */}
                <td className="p-3 text-gray-600">{contest.contestType}</td>

                {/* PRICE */}
                <td className="p-3 text-gray-600">${contest.price}</td>

                {/* STATUS */}
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-xs md:text-sm ${
                      contest.status === "pending"
                        ? "bg-yellow-500"
                        : contest.status === "approved"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    {contest.status}
                  </span>
                </td>

                {/* ACTIONS */}
                <td className="p-3">
                  <div className="flex flex-wrap gap-2">
                    {/* SUBMISSION */}
                    <button
                      className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700"
                    >
                      Submission <FaArrowRight />
                    </button>

                    {/* SHOW ONLY IF STATUS IS PENDING */}
                    {contest.status === "pending" && (
                      <>
                        {/* EDIT BUTTON */}
                        <Link
                          to={`/dashboard/contest/${contest._id}`}
                          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
                        >
                          <FaEdit /> Edit
                        </Link>

                        {/* DELETE BUTTON */}
                        <button
                          onClick={() => handleDelete(contest._id)}
                          className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
                        >
                          <FaTrash /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContest;
