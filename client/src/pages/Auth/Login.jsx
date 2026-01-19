import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Handle Login form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Invalid email address');
            return;
        }
        if (!password) {
            setError('Password is required');
            return;
        }
        setError("");

        try {
            const response = await axiosInstance.post("/auth/login", {
                email,
                password,
            });

            if (response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                // Redirect based on role? For now detailed in plan as dashboard
                navigate("/admin/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-full md:h-full flex flex-col justify-center ">
                <h3 className=" text-xl font-semibold text-black"> Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Please enter your details to login
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="john@example.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="min. 8 characters"
                        type="password"
                    />
                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type='submit' className=" btn-primary">
                        LOGIN
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3">
                        Don't have an account? {" "}
                        <Link className='font-medium underline' to="/signup">
                            SignUp
                        </Link>
                    </p>

                </form>

            </div>

        </AuthLayout>
    )
}
export default Login