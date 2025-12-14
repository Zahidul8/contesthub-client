import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEllipsisV } from "react-icons/fa";
import Loading from "../../components/Loading/Loading";
import Swal from "sweetalert2";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const [openDropdown, setOpenDropdown] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["contests", page],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contests-all?page=${page}&limit=${limit}`);
      return data;
    },
    keepPreviousData: true,
  });

  // const handleAction = async (id, action) => {
  //   try {
  //     await axiosSecure.patch(`/contests/action/${id}`, { action });
  //     refetch();
  //     setOpenDropdown(null);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleAction = async (id, action) => {
  let title = "";
  let text = "";
  let confirmBtn = "";
  let successMsg = "";

  if (action === "confirm") {
    title = "Approve Contest?";
    text = "This contest will be approved and visible to users.";
    confirmBtn = "Yes, approve it!";
    successMsg = "Contest approved successfully!";
  } 
  else if (action === "reject") {
    title = "Reject Contest?";
    text = "This contest will be rejected.";
    confirmBtn = "Yes, reject it!";
    successMsg = "Contest rejected successfully!";
  } 
  else if (action === "delete") {
    title = "Delete Contest?";
    text = "This action cannot be undone!";
    confirmBtn = "Yes, delete it!";
    successMsg = "Contest deleted successfully!";
  }

  const result = await Swal.fire({
    title,
    text,
    icon: action === "delete" ? "warning" : "question",
    showCancelButton: true,
    confirmButtonText: confirmBtn,
    cancelButtonText: "Cancel",
    confirmButtonColor: action === "delete" ? "#dc2626" : "#2563eb",
  });

  if (!result.isConfirmed) return;

  try {
    await axiosSecure.patch(`/contests/action/${id}`, { action });
    refetch();
    setOpenDropdown(null);

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: successMsg,
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "Something went wrong. Please try again.",
    });
    console.log(err);
  }
};

  if (isLoading) return <Loading />;

  const { contests = [], totalPages } = data || {};

  return (
    <div className="p-5 w-full">
      <h1 className="text-2xl md:text-3xl font-bold mb-5">Manage Contests</h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg shadow-lg bg-white">
          <thead className="bg-gradient-to-r from-blue-100 to-blue-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Contest Name</th>
              <th className="p-3 text-left">Creator</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{(page - 1) * limit + index + 1}</td>
                <td className="p-3">
                  <img
                    src={contest.image}
                    alt={contest.name}
                    className="w-14 h-14 rounded-lg object-cover border"
                  />
                </td>
                <td className="p-3 font-medium text-gray-800">{contest.name}</td>
                <td className="p-3 text-gray-600">{contest.creator}</td>
                <td
                  className={`p-3 font-semibold ${
                    contest.status === "pending"
                      ? "text-yellow-500"
                      : contest.status === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {contest.status}
                </td>
                <td className="p-3 relative">
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === contest._id ? null : contest._id)
                    }
                    className="p-2 rounded hover:bg-gray-100"
                  >
                    <FaEllipsisV className="text-black"/>
                  </button>

                  {openDropdown === contest._id && (
                    <div className="absolute right-6 top-8 w-40 bg-white border rounded-lg shadow-xl z-30">
                      <button
                        onClick={() => handleAction(contest._id, "confirm")}
                        className="block w-full text-black px-4 py-2 text-left hover:bg-green-50 hover:text-green-600"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => handleAction(contest._id, "reject")}
                        className="block w-full px-4 py-2 text-black text-left hover:bg-yellow-50 hover:text-yellow-600"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleAction(contest._id, "delete")}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-50"
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

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1 border rounded ${
              page === num ? "bg-blue-500 text-white" : "hover:bg-gray-100"
            }`}
          >
            {num}
          </button>
        ))}

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-3 py-1 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageContests;
