import React, { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiAward, FiDollarSign, FiTag } from "react-icons/fi";
import Countdown from "../components/Countdown/Countdown";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../components/Loading/Loading";

const ContestDetails = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const [timeLeft, setTimeLeft] = useState({});

  const { data: contest = {}, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contest/${id}`);
      return data;
    },
  });

  const { data: payment = {} } = useQuery({
    queryKey: ['paymentStatus', contest._id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/payment-status?contestId=${contest._id}&email=${user.email}`);
      return data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      contestId: contest._id,
      name: contest.name,
      price: contest.price,
      description: contest.description,
      image: contest.image || "",
      email: user.email,
    };
    try {
      const { data } = await axiosSecure.post('/create-checkout-session', paymentInfo);
      window.location.assign(data.url);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error.response?.data?.error || "Payment Failed",
        text: "Something went wrong. Try again!",
      });
    }
  };

  const handleSubmitTask = (data) => {
    const taskInfo = {
      contestId: contest._id,
      name: contest.name,
      user_name: user.displayName,
      user_email: user.email,
      user_image: user.photoURL,
      creator_email: contest.email,
      submissionTask: data.task,
    }

    axiosSecure.post('/submission', taskInfo)
      .then(res => {
        modalRef.current.close();
        reset();
        if (res.data.insertedId) {
          Swal.fire({ icon: "success", title: "Task submitted!", timer: 1500, showConfirmButton: false });
        } else {
          Swal.fire({ icon: "info", title: "You already submitted this task" });
        }
      });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-12">

      {/* ===== Left-Right Split ===== */}
      <div className="flex flex-col lg:flex-row gap-8">

        {/* Left: Contest Image */}
        <div className="lg:w-1/2 flex-shrink-0 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={contest.image}
            alt={contest.name}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Right: Contest Info */}
        <div className="lg:w-1/2 space-y-6">

          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-500">
            {contest.name}
          </h1>
          <p className="text-gray-700 text-lg">{contest.contestType}</p>

          {/* Countdown */}
          <div className="bg-gradient-to-r from-primary to-secondary text-white p-4 rounded-xl text-center font-semibold">
            <span>⏳ Time Left: </span>
            <Countdown deadline={contest.deadline} setTimeLeft={setTimeLeft} timeLeft={timeLeft} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard icon={<FiUsers />} label="Participants" value={contest.count || 0} />
            <StatCard icon={<FiDollarSign />} label="Prize" value={`$${contest.prizeMoney}`} />
            <StatCard icon={<FiTag />} label="Entry Fee" value={`$${contest.price}`} />
            <StatCard icon={<FiAward />} label="Winner" value={contest.winnerName || "TBD"} />
          </div>

          {/* Description */}
          <div className="bg-white p-5 rounded-2xl shadow-lg text-gray-800">
            <h2 className="font-semibold text-xl mb-2">📄 Contest Description</h2>
            <p>{contest.description}</p>
          </div>

          {/* Task Instructions */}
          <div className="bg-white p-5 rounded-2xl shadow-lg text-gray-800">
            <h2 className="font-semibold text-xl mb-2">📝 Task Instructions</h2>
            <p>{contest.taskInstruction}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {!payment?.paymentStatus && (
              <button
                onClick={handlePayment}
                disabled={timeLeft.expired || !user}
                className="flex-1 bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
              >
                🚀 Register & Pay
              </button>
            )}

            {payment?.paymentStatus && (
              <button
                onClick={() => modalRef.current.showModal()}
                disabled={contest?.winnerName}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
              >
                📤 Submit Task
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ===== Submission Modal ===== */}
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box rounded-3xl">
          <form onSubmit={handleSubmit(handleSubmitTask)} className="space-y-4">
            <h3 className="text-2xl font-bold">Submit Your Task</h3>
            <textarea
              className="w-full h-40 p-4 rounded-xl border bg-gray-50 focus:ring-2 focus:ring-primary"
              placeholder="Write your task submission here..."
              {...register("task", { required: true })}
            />
            {errors.task && <p className="text-red-500 text-sm">Task is required</p>}
            <div className="flex justify-between">
              <button type="button" onClick={() => modalRef.current.close()}
                className="px-6 py-2 bg-gray-300 rounded-lg">
                Close
              </button>
              <button className="px-8 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

// ===== Reusable Components =====
const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/30 backdrop-blur-xl p-4 rounded-xl shadow flex items-center gap-3 hover:scale-105 transition">
    <div className="text-2xl text-primary">{icon}</div>
    <div>
      <p className="text-sm text-gray-800">{label}</p>
      <p className="font-bold text-lg">{value}</p>
    </div>
  </div>
);

export default ContestDetails;
