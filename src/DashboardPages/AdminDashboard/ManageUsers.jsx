import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUserEdit } from "react-icons/fa";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/users");
      return data;
    },
  });

  const handleRoleUpdate = async (email, role) => {
    try {
      const { data } = await axiosSecure.patch(`/users/role/${email}`, {
        role,
      });

      if (data?.result?.modifiedCount) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Role updated to ${role}!`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Failed to update role",
      });
    }
  };

  if (isLoading) {
    return <p className="text-center py-10 text-lg font-semibold">Loading...</p>;
  }

  return (
    <div className="p-4 md:p-8 lg:p-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
        Manage Users
      </h2>

      <div className="overflow-x-auto shadow-xl rounded-xl border">
        <table className="table w-full">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-base-200 transition-all duration-200"
              >
                <td className="font-semibold">{index + 1}</td>

                {/* User Image + Name */}
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover shadow-md"
                    />
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </td>

                <td className="text-sm md:text-base">{user.email}</td>

                <td>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold text-xs md:text-sm">
                    {user.role}
                  </span>
                </td>

                {/* Action Buttons */}
                <td>
                  <div className="flex flex-col md:flex-row gap-2 justify-center items-center">

                    <button
                      className="btn btn-sm border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white"
                      disabled={user.role === "user"}
                      onClick={() => handleRoleUpdate(user.email, "user")}
                    >
                      User
                    </button>

                    <button
                      className="btn btn-sm border-yellow-500 text-yellow-600 hover:bg-yellow-600 hover:text-white"
                      disabled={user.role === "creator"}
                      onClick={() => handleRoleUpdate(user.email, "creator")}
                    >
                      Creator
                    </button>

                    <button
                      className="btn btn-sm border-green-500 text-green-600 hover:bg-green-600 hover:text-white"
                      disabled={user.role === "admin"}
                      onClick={() => handleRoleUpdate(user.email, "admin")}
                    >
                      Admin
                    </button>

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

export default ManageUsers;
