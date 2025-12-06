import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";

const AddContest = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    const { register, handleSubmit, formState: { errors }, control, reset } = useForm();

    const handleAddContest = (data) => {
        const contestImage = data.image[0];

        const formData = new FormData();
        formData.append('image',contestImage);
        reset();
         axios.post(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMAGE_HOST_KEY}`, formData)
         .then(res => {
            const image = res.data.data.display_url;

            const contestInfo = {
            name: data.contestName,
            image:image,
            description:data.description,
            price:data.price,
            prizeMoney:data.prizeMoney,
            taskInstruction:data.instructions,
            contestType:data.contestType,
            deadline: data.deadline,
            email: user.email,
            count: 0,
        }

        console.log(contestInfo);

        // add to db 
        axiosSecure.post('/contest', contestInfo)
        .then(res => {
            console.log(res.data);
            
        })

        
            
         })
        
        
     
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            {/* Title */}
            <h1 className="text-4xl font-bold text-center mb-8">
                Create a <span className="text-primary">Contest</span>
            </h1>

            <form
                onSubmit={handleSubmit(handleAddContest)}
                className="bg-base-200 p-7 rounded-2xl shadow-xl border border-base-300 space-y-5"
            >
                {/* Contest Name */}
                <div className="form-control">
                    <label className="label font-semibold">Contest Name</label>
                    <input
                        type="text"
                        placeholder="Enter contest name"
                        className="input input-bordered w-full focus:shadow-md transition"
                        {...register('contestName', { required: true })}
                    />
                    {
                        errors.contestName?.type === 'required' && <p className='text-red-500 text-sm'>Contest Name is required</p>
                    }                </div>

                {/* Image URL */}
                <div className="form-control">
                    <label className="label font-semibold">Image URL</label>
                    <input
                        type="file"
                        placeholder="https://image-url.com"
                        className="file-input input-bordered w-full focus:shadow-md transition"
                        {...register('image', { required: true })}
                    />
                    {
                        errors.image?.type === 'required' && <p className='text-red-500 text-sm'>Image is required</p>
                    }
                </div>

                {/* Price */}
                <div className="form-control">
                    <label className="label font-semibold">Price</label>
                    <input
                        type="number"
                        placeholder="Entry fee"
                        className="input input-bordered w-full focus:shadow-md transition"
                        {...register('price', { required: true })}


                    />
                    {
                        errors.price?.type === 'required' && <p className='text-red-500 text-sm'>Price is required</p>
                    }
                </div>

                {/* Prize */}
                <div className="form-control">
                    <label className="label font-semibold">Prize Money</label>
                    <input
                        type="number"
                        placeholder="Prize amount"
                        className="input input-bordered w-full focus:shadow-md transition"
                        {...register('prizeMoney', { required: true })}


                    />
                    {
                        errors.prizeMoney?.type === 'required' && <p className='text-red-500 text-sm'>Prize money is required</p>
                    }
                </div>

                {/* Type */}
                <div className="form-control">
                    <label className="label font-semibold">Contest Type</label>
                    <select className="select select-bordered w-full focus:shadow-md transition"
                        {...register('contestType', { required: true })}


                    >
                        <option disabled selected>
                            Select contest type
                        </option>
                        <option>Drawing</option>
                        <option>Writing</option>
                        <option>Coding</option>
                        <option>Design</option>
                        <option>Photography</option>
                    </select>
                    {
                        errors.emacontestTypeil?.type === 'required' && <p className='text-red-500 text-sm'>Contest Type is required</p>
                    }

                </div>

                {/* Deadline */}
                <div className="form-control">
                    <label className="label font-semibold">Deadline</label>

                    <Controller
                        name="deadline"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value}
                                onChange={(date) => field.onChange(date)}
                                placeholderText="Pick a deadline"
                                className="input input-bordered w-full"
                            />
                        )}
                    />

                    {errors.deadline?.type === "required" && (
                        <p className="text-red-500 text-sm">Deadline is required</p>
                    )}
                </div>


                {/* Description */}
                <div className="form-control">
                    <label className="label font-semibold">Description</label>
                    <textarea
                        placeholder="Enter contest description"
                        className="textarea textarea-bordered h-28 w-full focus:shadow-md transition"
                        {...register('description', { required: true })}

                    ></textarea>
                    {
                        errors.description?.type === 'required' && <p className='text-red-500 text-sm'>Description is required</p>
                    }
                </div>

                {/* Task Instructions */}
                <div className="form-control">
                    <label className="label font-semibold">Task Instruction</label>
                    <textarea
                        placeholder="Explain what participants must do"
                        className="textarea textarea-bordered h-28 w-full focus:shadow-md transition"
                        {...register('instructions', { required: true })}

                    ></textarea>
                    {
                        errors.instructions?.type === 'required' && <p className='text-red-500 text-sm'>Instructions is required</p>
                    }
                </div>

                {/* Submit Button */}
                <div className="text-center mt-4">
                    <button className="btn btn-primary px-10 py-2 text-lg rounded-xl shadow-md hover:shadow-lg transition">
                        Add Contest
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddContest;
