import { Link, useLocation, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import GoogleSignIn from "../components/GoogleSignIn/GoogleSignIn";
import { saveOrUpdateUser } from "../Uitls";

export default function Register() {
    const { createUser, updateUserProfile, logOut } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleRegister = (data) => {

        const { name, email, password, photo } = data;
        const profileImage = photo[0];

        createUser(email, password)
            .then(result => {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "User created successfully",
                    showConfirmButton: false,
                    timer: 1500
                });

                const formData = new FormData();
                formData.append('file', profileImage);
                formData.append('upload_preset',
                    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
                axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, formData)
                    .then(res => {
                        const photoURL = res.data.secure_url;

                        // save in  db 
                        saveOrUpdateUser({ name, email, image: photoURL });

                        updateUserProfile(name, photoURL)
                            .then(() => {
                                console.log('profile updated successfully');

                            })
                            .catch(error => {
                                console.log(error.message);

                            })
                        logOut()
                            .then()
                            .catch(error => {
                                console.log(error);

                            })

                    })



                navigate('/login');

                console.log(result.user);

            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {

                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "User is already registered.!",
                    });
                }

            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 rounded-xl">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(handleRegister)}>

                    {/* Name */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            className="input input-bordered w-full"
                            {...register('name', { required: true })}
                        />
                        {
                            errors.name?.type === 'required' && <p className='text-red-500 text-sm'>Name is required</p>
                        }
                    </div>

                    {/* Photo */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Photo</span>
                        </label>
                        <input
                            type="file"
                            placeholder="Chose a photo"
                            className="file-input input-bordered w-full"
                            {...register('photo', { required: true })}
                        />
                        {
                            errors.photo?.type === 'required' && <p className='text-red-500 text-sm'>Photo is required</p>
                        }
                    </div>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="input input-bordered w-full"
                            {...register('email', { required: true })}
                        />
                        {
                            errors.email?.type === 'required' && <p className='text-red-500 text-sm'>Email is required</p>
                        }
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                className="input input-bordered w-full"
                                {...register('password',
                                    {
                                        required: true, minLength: 6,
                                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/
                                    })}
                            />
                            <span onClick={() => setShowPassword(!showPassword)} className='absolute top-3 right-6 z-10 cursor-pointer'>
                                {
                                    showPassword ? <FaEyeSlash /> : <FaEye />
                                }

                            </span>
                        </div>
                        {
                            errors.password?.type === 'required' && <p className='text-red-500 text-sm'>Password is required</p>
                        }
                        {
                            errors.password?.type === 'minLength' && <p className='text-red-500 text-sm'>Password must be 6 character or longer</p>
                        }
                        {
                            errors.password?.type === 'pattern' && <p className='text-red-500 text-sm'>Password must have at least one uppercase, one lowercase and a special character</p>
                        }
                    </div>

                    {/* Register Button */}
                    <button className="btn btn-primary w-full mt-2">
                        Register
                    </button>

                </form>

                {/* Divider */}
                <div className="divider">or</div>

                {/* Google Login */}
                <GoogleSignIn></GoogleSignIn>

                {/* Login Link */}
                <p className="text-center mt-4">
                    Already have an account?{" "}
                    <Link to="/login" className="link link-primary font-medium">
                        Login here
                    </Link>
                </p>

            </div>
        </div>
    );
}
