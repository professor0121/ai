
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from '../config/axios';
import { UserContext } from '../context/user.context'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const {setUser}=useContext(UserContext);

    const handleLogin = (e) => {
        axios.post('user/login', { email, password })
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('token',res.data.token);
                setUser(res.data.user)
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.data)
            })
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white px-8 py-10 rounded-xl shadow-lg">
                <h2 className="text-2xl font-semibold text-center ">Login</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Login
                    </button>
                </div>
                <p className="mt-6 text-center">Don't have any Account
                    <Link to="/register" className="ml-6 text-blue-500 hover:underline">
                        Register Here
                    </Link></p>
            </div>
        </div>
    );
};

export default Login;
