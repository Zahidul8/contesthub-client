import { Link } from "react-router";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import GoogleSignIn from "../components/GoogleSignIn/GoogleSignIn";

export default function Login() {
    const { signIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleSignIn = (data) => {

        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);

            })
            .catch(error => {
                console.log(error.message);

            })

    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md shadow-xl bg-base-100 p-6 rounded-xl">

                {/* Title */}
                <h2 className="text-3xl font-bold text-center mb-6">Welcome back</h2>
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(handleSignIn)}>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text font-semibold">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                {...register('password', { required: true })}
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
                    </div>

                    {/* Login Button */}
                    <button className="btn btn-primary w-full mt-2">
                        Login
                    </button>

                </form>

                {/* Divider */}
                <div className="divider">or</div>

                {/* Google Login */}
                <GoogleSignIn></GoogleSignIn>

                {/* Register Link */}
                <p className="text-center mt-4">
                    Don't have an account?{" "}
                    <Link to="/register" className="link link-primary font-medium">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}
