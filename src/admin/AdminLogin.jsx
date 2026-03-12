import axios from "axios";
import { Eye, EyeOff, Lock, LogIn, Mail, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";

const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const res = await axios.post("http://localhost:5000/api/admin/login", {
                email,
                password
            });

            if (res.data.success) {
                localStorage.setItem("adminToken", res.data.token);
                localStorage.setItem("adminData", JSON.stringify(res.data.admin));
                navigate("/admin/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0b0c0d] flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white dark:bg-[#151618] rounded-[24px] shadow-2xl border border-gray-100 dark:border-gray-800 p-8 md:p-12 animate-in fade-in zoom-in duration-500">

                {/* Logo & Header */}
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-[#f17840] rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-[#f17840]/20">
                        <ShieldCheck size={32} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-black text-[#253d4e] dark:text-white mb-2 uppercase tracking-tight">Admin Portal</h1>
                    <p className="text-gray-500 dark:text-gray-400 font-bold">Secure access to Torado Dashboard</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-red-600 dark:text-red-400 rounded-xl text-sm font-bold flex items-center gap-2 animate-shake">
                        <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black text-gray-500 uppercase px-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f17840] transition-colors" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold text-[#253d4e] dark:text-white"
                                placeholder="admin@torado.com"
                                required
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="text-[13px] font-black text-gray-500 uppercase px-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f17840] transition-colors" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold text-[#253d4e] dark:text-white"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f17840] transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 accent-[#f17840] rounded border-gray-300" />
                            <span className="text-sm font-bold text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">Remember me</span>
                        </label>
                        <button type="button" className="text-sm font-bold text-[#f17840] hover:underline decoration-2 underline-offset-4">Forgot Password?</button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#f17840] hover:bg-[#e06b38] text-white py-4 rounded-xl font-black transition-all shadow-lg shadow-[#f17840]/20 active:scale-[0.98] flex items-center justify-center gap-3 text-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <>
                                <span>Sign In to Dashboard</span>
                                <LogIn size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm font-bold text-gray-500">
                    Don't have an account?{" "}
                    <Link to="/admin/register" className="text-[#f17840] hover:underline decoration-2 underline-offset-4">Sign Up</Link>
                </div>

                <p className="mt-10 text-center text-sm font-bold text-gray-400">
                    Trusted by Torado Global Team
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
