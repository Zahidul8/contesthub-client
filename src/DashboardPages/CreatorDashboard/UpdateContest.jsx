import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

const UpdateContest = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [deadline, setDeadline] = useState(null);

  // Load contest data
  const { data: contest = {}, refetch, isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/contest/${id}`);
      setDeadline(new Date(data.deadline));
      return data;
    },
  });

  const isEditable = contest?.status === "pending";

  // React Hook Form Setup
  const { register, handleSubmit, control, formState: { errors } } = useForm();

  // UPDATE HANDLER
  const handleUpdateContest = async (data) => {
    console.log('update');
    
    const updatedContest = {
      name: data.contestName,
      description: data.description,
      price: data.price,
      prizeMoney: data.prizeMoney,
      taskInstruction: data.instructions,
      contestType: data.contestType,
      deadline: data.deadline,
    };

    console.log(updatedContest);
    

    try {
      const res = await axiosSecure.patch(`/contest/${id}`, updatedContest);

      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Contest Updated Successfully!",
          timer: 1500,
          showConfirmButton: false,
        });
        refetch();
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Something went wrong!",
      });
    }
  };

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Update Contest: {contest.name}
      </h1>

      <form onSubmit={handleSubmit(handleUpdateContest)} className="space-y-5">

        <div>
          <label className="font-semibold">Contest Name</label>
          <input
            {...register("contestName", { required: true })}
            disabled={!isEditable}
            defaultValue={contest.name}
            className="w-full mt-2 p-3 border rounded-md"
            placeholder="Enter contest name"
          />
          {errors.contestName && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea
            {...register("description", { required: true })}
            defaultValue={contest.description}
            rows="4"
            className="w-full mt-2 p-3 border rounded-md"
            placeholder="Enter contest description"
          ></textarea>
          {errors.description && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Price (Entry Fee)</label>
          <input
            type="number"
            {...register("price", { required: true })}
            disabled={!isEditable}
            defaultValue={contest.price}
            className="w-full mt-2 p-3 border rounded-md"
            placeholder="Price"
          />
          {errors.price && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Prize Money</label>
          <input
            type="number"
            {...register("prizeMoney", { required: true })}
            defaultValue={contest.prizeMoney}
            className="w-full mt-2 p-3 border rounded-md"
            placeholder="Prize money"
          />
          {errors.prizeMoney && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Task Instructions</label>
          <textarea
            {...register("instructions", { required: true })}
            defaultValue={contest.taskInstruction}
            rows="4"
            className="w-full mt-2 p-3 border rounded-md"
            placeholder="Task instructions"
          ></textarea>
          {errors.instructions && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <div>
          <label className="font-semibold">Contest Type</label>
          <select
            {...register("contestType", { required: true })}
            defaultValue={contest.contestType}
            disabled={!isEditable}
            className="w-full mt-2 p-3 border rounded-md"
          >
            <option value="">Select type</option>
            <option value="Drawing">Drawing</option>
            <option value="Writing">Writing</option>
            <option value="Coding">Coding</option>
            <option value="Design">Design</option>
            <option value="Photography">Photography</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Deadline</label>
          <Controller
            name="deadline"
            control={control}
            rules={{ required: true }}
            defaultValue={contest.deadline ? new Date(contest.deadline) : null}
            render={({ field }) => (
              <DatePicker
                {...field}
                selected={field.value}
                disabled={!isEditable}
                className="w-full mt-2 p-3 border rounded-md"
              />
            )}
          />
          {errors.deadline && <p className="text-red-600 text-sm">Required</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-md mt-4"
        >
          Update Contest
        </button>
      </form>
    </div>
  );
};

export default UpdateContest;
