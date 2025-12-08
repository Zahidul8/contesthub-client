import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

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

      if (data.result.modifiedCount) {
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
    return <p className="text-center py-10">Loading...</p>;
  }

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 text-center">
        Manage Users
      </h2>

      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg">
          <thead className="bg-gray-100 text-gray-700">
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
              <tr key={user._id} className="hover">
                <td>{index + 1}</td>

                {/* User Image + Name */}
                <td>
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image}
                      alt="user"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <p className="font-semibold">{user.name}</p>
                  </div>
                </td>

                <td>{user.email}</td>

                <td className="font-bold text-blue-600">{user.role}</td>

                {/* Role Update Buttons */}
                <td className="flex flex-col md:flex-row gap-2 items-center justify-center">

                  <button
                    className="btn btn-sm btn-outline"
                    disabled={user.role === "user"}
                    onClick={() => handleRoleUpdate(user.email, "user")}
                  >
                    Make User
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-info"
                    disabled={user.role === "creator"}
                    onClick={() => handleRoleUpdate(user.email, "creator")}
                  >
                    Make Creator
                  </button>

                  <button
                    className="btn btn-sm btn-outline btn-success"
                    disabled={user.role === "admin"}
                    onClick={() => handleRoleUpdate(user.email, "admin")}
                  >
                    Make Admin
                  </button>

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
