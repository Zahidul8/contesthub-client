import React, { useRef, useState } from "react";
import { useParams} from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FiUsers, FiAward, FiDollarSign } from "react-icons/fi";
import Countdown from "../components/Countdown/Countdown";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ContestDetails = () => {

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const { id } = useParams();
  const { user } = useAuth();
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

  })







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
      // if success, redirect to Stripe
      window.location.assign(data.url);
    } catch (error) {
      // if user already paid
      if (error.response && error.response.data?.error) {
        Swal.fire({
          icon: "info",
          title: "Payment Already Done",
          text: error.response.data.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: "Something went wrong, please try again.",
        });
      }
    }
  };


  const handleSubmitTask = (data) => {

    const taskInfo = {
      contestId: contest._id,
      user_name: user.displayName,
      user_email: user.email,
      submissionTask: data.task,
    }

    axiosSecure.post('/submission', taskInfo)
      .then(res => {

        if (res.data.insertedId) {
          modalRef.current.close();
          reset();
          console.log(res.data);
          
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Task has been sent",
            showConfirmButton: false,
            timer: 1500
          });
        } else {
          modalRef.current.close();
          reset();
          Swal.fire({
          icon: "info",
          title: "You have already sent your task",
        });
        }

      })


  }


  if (isLoading)
    return (
      <p className="text-center py-20 text-xl text-gray-500">Loading...</p>
    );

  return (
    <div className="max-w-6xl mx-auto p-5 md:p-10 space-y-10">
      <div className=" text-2xl my-6">
        <h3 className="text-3xl font-semibold text-gray-700 mb-2">Deadline:</h3>
        <Countdown deadline={contest.deadline} setTimeLeft={setTimeLeft} timeLeft={timeLeft} />
      </div>

      {/* Banner */}
      <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-2xl border-2 border-primary">
        <img
          src={contest.image}
          alt="Contest Banner"
          className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 rounded-3xl">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold drop-shadow-lg">
            {contest.name}
          </h1>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Participants */}
        <div className="flex items-center bg-white/30 backdrop-blur-md shadow-xl p-5 rounded-2xl border border-gray-200 hover:scale-105 transition transform">
          <FiUsers className="w-10 h-10 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Participants</p>
            <p className="text-xl md:text-2xl font-bold">{contest.count || 0}</p>
          </div>
        </div>

        {/* Prize Money */}
        <div className="flex items-center bg-white/30 backdrop-blur-md shadow-xl p-5 rounded-2xl border border-gray-200 hover:scale-105 transition transform">
          <FiDollarSign className="w-10 h-10 text-primary mr-4" />
          <div>
            <p className="text-sm text-gray-500">Prize Money</p>
            <p className="text-xl md:text-2xl font-bold">${contest.prizeMoney}</p>
          </div>
        </div>

        {/* Winner */}
        <div className="flex items-center bg-white/30 backdrop-blur-md shadow-xl p-5 rounded-2xl border border-gray-200 hover:scale-105 transition transform">
          <FiAward className="w-10 h-10 text-yellow-400 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Winner</p>
            <p className="text-xl md:text-2xl font-semibold">{contest.winnerName || "TBD"}</p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-7 shadow-2xl border border-gray-100 hover:shadow-3xl transition">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Contest Description</h2>
        <p className="text-gray-700 leading-relaxed">{contest.description}</p>
      </div>

      {/* Task Instructions */}
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-7 shadow-2xl border border-gray-100 hover:shadow-3xl transition">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Task Instructions</h2>
        <p className="text-gray-700 leading-relaxed">{contest.taskInstruction}</p>
      </div>

      {/* Register / Pay Button */}
      <div className="text-center space-y-4">

        {/* Register / Pay Button (Visible only if NOT paid) */}
        {!payment?.paymentStatus && (
          <button
            onClick={handlePayment}
            disabled={timeLeft.expired}
            className="btn bg-gradient-to-r from-primary to-secondary text-white px-12 py-4 text-lg md:text-xl rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1"
          >
            Register / Pay
          </button>
        )}

        {/* Submit Task Button (Visible only if paid) */}
        {payment?.paymentStatus && (
          <button onClick={() => { modalRef.current.showModal(); }}
            className="btn bg-green-600 text-white px-12 py-4 text-lg md:text-xl rounded-2xl shadow-xl hover:bg-green-700 transition"
          >
            Submit Task
          </button>
        )}

        <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">

          <div className="modal-box space-y-4">
            <form onSubmit={handleSubmit(handleSubmitTask)}>

              <h3 className="font-bold text-2xl text-gray-800">Submit Your Task</h3>
              <p className="text-gray-500">
                Write your submission below and click Submit when you're ready.
              </p>

              {/* Textarea */}


              <div>
                <textarea
                  className="w-full h-40 p-4 rounded-xl border border-gray-300 bg-gray-50 
                 focus:outline-none focus:ring-2 focus:ring-primary/60 
                 transition-all shadow-sm"
                  placeholder="Write your task submission here..."
                  {...register('task', { required: true })}
                ></textarea>
                {
                  errors.task?.type === 'required' && <p className='text-red-500 text-sm'>Task is required</p>
                }
              </div>


              <div className="modal-action flex justify-between">

                {/* Close Button */}
                <form method="dialog">
                  <button className="btn bg-gray-300 hover:bg-gray-400 text-gray-800 
                           border-none px-6 rounded-lg shadow">
                    Close
                  </button>
                </form>

                {/* Submit Button */}
                <button

                  className="btn bg-gradient-to-r from-green-500 to-green-600 
                   hover:from-green-600 hover:to-green-700 text-white 
                   px-8 rounded-lg shadow-lg transition-all"
                >
                  Submit
                </button>

              </div>
            </form>

          </div>
        </dialog>


      </div>

    </div>
  );
};

export default ContestDetails;
