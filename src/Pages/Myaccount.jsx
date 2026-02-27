import React from 'react';
import axios from 'axios';
import { useState } from "react";
import { Link } from 'react-router-dom';
import StickyActions from '../Components/StickyActions';
import Footer from '../Componet/Footer';
import Navbar from '../Componet/Navbar';

const Myaccount = () => {
    // Login State
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Register State
    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', {
                email: loginData.email,
                password: loginData.password
            });
            if (res.data.success) {
                setMessage('Login successful!');
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                // Redirect or update UI as needed
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    const handleRegister = async (e) => {
        if (e) e.preventDefault();
        setError('');
        setMessage('');

        console.log("📤 Sending Registration Data:", {
            name: registerData.name,
            email: registerData.email,
            password: registerData.password
        });

        if (!registerData.name || !registerData.email || !registerData.password) {
            setError('Please fill all required fields');
            return;
        }

        if (registerData.password !== registerData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/auth/register', {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password
            });
            if (res.data.success) {
                setMessage('Registration successful! You can now log in.');
                setRegisterData({ name: '', email: '', password: '', confirmPassword: '' });
            }
        } catch (err) {
            console.error("❌ Registration Error:", err.response?.data);
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section */}
            <div className="relative h-[300px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/page-title-bg/page-title-bg-1.webp')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#411151]/85"></div>

                <div className="relative z-10">
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">My Account</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">My Account</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                {message && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded text-center font-bold">
                        {message}
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded text-center font-bold">
                        {error}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Login Form */}
                    <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 md:p-12 rounded-[10px] transition-colors duration-300">
                        <h2 className="text-[#253d4e] dark:text-white text-2xl md:text-3xl font-black mb-8">Log in To Your Account</h2>

                        <form className="space-y-5" onSubmit={handleLogin}>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    placeholder="Email"
                                    required
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-[5px] focus:outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    placeholder="Password"
                                    required
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-[5px] focus:outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                />
                            </div>

                            <div className="flex items-center justify-between py-2">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 rounded peer-checked:bg-[#f17840] peer-checked:border-[#f17840] transition-all"></div>
                                        <svg className="absolute top-1 left-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#253d4e] dark:text-gray-300 font-bold text-[15px]">Keep Me Logged In</span>
                                </label>
                                <Link to="/forgot-password" strokeWidth={1.5} className="text-[#253d4e] dark:text-gray-300 hover:text-[#f17840] font-bold text-[15px] transition-colors">Forgot Password?</Link>
                            </div>

                            <div className="relative group overflow-hidden w-full h-[60px]">
                                <button type="submit" className="w-full h-full bg-[#f17840] group-hover:bg-white dark:group-hover:bg-[#1a1c1e] text-white group-hover:text-[#f17840] py-4 rounded-[5px] text-lg font-bold transition-all duration-700 shadow-md outline-none border-none">
                                    Log In
                                </button>
                                <div onClick={handleLogin} className="absolute top-14 -right-20 rounded-[5px] w-full h-full bg-white dark:bg-[#1a1c1e] text-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-lg cursor-pointer">
                                    Log In
                                </div>
                            </div>

                            <div className="relative flex items-center justify-center py-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                                </div>
                                <span className="relative px-4 bg-[#f8f9fa] dark:bg-[#151618] text-gray-500 font-bold text-sm">Or</span>
                            </div>

                            <div className="space-y-4">
                                <button type="button" className="w-full bg-[#3b5998] hover:bg-[#344e86] text-white py-4 rounded-[5px] text-base font-bold transition-all flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                    Login With Facebook
                                </button>
                                <button type="button" className="w-full bg-[#ea4335] hover:bg-[#d93d2e] text-white py-4 rounded-[5px] text-base font-bold transition-all flex items-center justify-center gap-3">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C20.187 1.44 17.32 0 12.48 0 5.587 0 0 5.587 0 12.48s5.587 12.48 12.48 12.48c3.707 0 6.507-1.213 8.707-3.507 2.267-2.267 2.987-5.413 2.987-7.973 0-.773-.067-1.507-.187-2.187H12.48z" /></svg>
                                    Login With Google
                                </button>
                            </div>

                            <div className="text-center pt-4">
                                <p className="text-[#253d4e] dark:text-gray-300 font-bold">
                                    Don't have an Account? <Link to="/register" className="text-[#f17840] hover:underline underline-offset-4">Create One</Link>
                                </p>
                            </div>
                        </form>
                    </div>

                    {/* Register Form */}
                    <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 md:p-12 rounded-[10px] transition-colors duration-300 border-2 border-transparent hover:border-[#f17840]/10">
                        <h2 className="text-[#253d4e] dark:text-white text-2xl md:text-3xl font-black mb-8">Create A New Account</h2>

                        <form className="space-y-5" onSubmit={handleRegister}>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={registerData.name}
                                    onChange={handleRegisterChange}
                                    placeholder="Full Name"
                                    required
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-[5px] focus:outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    placeholder="Email"
                                    required
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-[5px] focus:outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="password"
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    placeholder="Password"
                                    required
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-[5px] focus:outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                />
                            </div>
                            <div>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    placeholder="Confirm Password"
                                    required
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-[5px] focus:outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                />
                            </div>

                            <div className="py-2">
                                <label className="flex items-start gap-2 cursor-pointer group">
                                    <div className="relative mt-1">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-700 rounded peer-checked:bg-[#f17840] peer-checked:border-[#f17840] transition-all"></div>
                                        <svg className="absolute top-1 left-1 w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#253d4e] dark:text-gray-300 font-bold text-[15px] leading-tight flex-1">
                                        I Agree with the <Link to="/terms" className="text-[#f17840] hover:underline">Terms & conditions</Link>
                                    </span>
                                </label>
                            </div>

                            <div className="relative group overflow-hidden w-full h-[60px]">
                                <button type="submit" className="w-full h-full bg-white dark:bg-transparent border-2 border-gray-200 dark:border-gray-800 text-[#f17840] py-4 rounded-[5px] text-lg font-bold transition-all duration-700 hover:text-white outline-none">
                                    Register Now
                                </button>
                                <div onClick={handleRegister} className="absolute top-14 -right-20 rounded-[5px] w-full h-full bg-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-lg text-white cursor-pointer">
                                    Register Now
                                </div>
                            </div>

                            <div className="text-center pt-8">
                                <p className="text-[#253d4e] dark:text-gray-300 font-bold">
                                    Have an Account? <Link to="/login" className="text-[#f17840] hover:underline underline-offset-4">Sign In</Link>
                                </p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default Myaccount;