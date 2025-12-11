import React from "react";
import { useForm } from "react-hook-form";
import WinPercentageChart from "./WinParcentageChart";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { updateUserProfile, user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleUpdateProfile = (data) => {
    const profileImage = data.photo[0];
    const formData = new FormData();
    formData.append("image", profileImage);

    axios
      .post(
        `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_HOST_KEY}`,
        formData
      )
      .then((res) => {
        const photoURL = res.data.data.display_url;

        updateUserProfile(data.name, photoURL)
          .then(() => {
            reset();
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Profile updated!",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
  };

  return (
    <div>

      <WinPercentageChart />

      {/* Profile + Form Container */}
      <div className="max-w-2xl mx-auto mt-14 mb-20 p-8 bg-white/30 backdrop-blur-2xl shadow-2xl rounded-3xl border border-white/40 relative">

        {/* Decorative gradient glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-yellow-200/20 to-black/10 pointer-events-none"></div>

        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10 relative z-10">

          {/* Large Profile Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-yellow-200 rounded-full blur-xl opacity-40"></div>
            <img
              src={user?.photoURL}
              alt="Profile"
              className="w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover relative z-10"
            />
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mt-5 text-center">
            {user?.displayName}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        {/* Update Form */}
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-6 relative z-10">

          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Update Name
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              placeholder="Enter your new name"
              className="w-full p-3 rounded-xl border border-gray-300 bg-white/90 shadow-sm focus:ring-2 focus:ring-yellow-400 transition"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Update Profile Photo
            </label>
            <input
              type="file"
              className="file-input w-full rounded-xl bg-white/90 border border-gray-300 shadow-sm"
              {...register("photo", { required: true })}
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">Photo is required</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold shadow-xl hover:shadow-2xl active:scale-95 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
