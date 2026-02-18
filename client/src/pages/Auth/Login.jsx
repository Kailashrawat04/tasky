import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import AuthLayout from '../../components/layouts/AuthLayout'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import { useUserContext } from '../../context/UserContext.jsx'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const { login } = useUserContext();
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

        const result = await login(email, password);

        if (result.success) {
            // Redirect based on role
            if (result.user.role === 'admin') {
                navigate("/admin/dashboard");
            } else {
                navigate("/user/user-dashboard");
            }
        } else {
            setError(result.message);
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-full md:h-full flex flex-col justify-center ">
                <h3 className=" text-2xl font-bold text-black mb-1"> Welcome Back</h3>
                <p className="text-sm text-slate-700 mb-8">
                    Please enter your details to login
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-1">
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