import axios from "axios";
import { CheckCircle, Lock, RefreshCw, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";

const VerifyOTP = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(60); // Increased to 60s
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Get user data passed from Login/Register page
    const { pendingUser, pendingToken, email } = location.state || {};

    // If somehow accessed directly without login data, send back to login
    useEffect(() => {
        if (!pendingUser || !pendingToken) {
            navigate("/my-account");
        }
    }, [pendingUser, pendingToken, navigate]);

    // Timer logic
    useEffect(() => {
        if (timer > 0 && !success) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer, success]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Move to next input
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const fullOtp = otp.join("");

        if (fullOtp.length < 6) {
            setError("Please enter the full 6-digit code.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            // REAL API Call
            const res = await axios.post("http://localhost:5000/api/auth/verify-otp", {
                email: email,
                otp: fullOtp
            });

            if (res.data.success) {
                // FINALIZE LOGIN: Only save to storage AFTER verification
                localStorage.setItem('token', pendingToken);
                localStorage.setItem('user', JSON.stringify(pendingUser));

                setSuccess(true);
                setTimeout(() => navigate("/my-account"), 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (timer === 0) {
            setLoading(true);
            try {
                await axios.post("http://localhost:5000/api/auth/resend-otp", { email });
                setTimer(60);
                setOtp(["", "", "", "", "", ""]);
                inputRefs.current[0].focus();
                setError("");
                alert("New OTP sent to your email!");
            } catch (err) {
                setError("Failed to resend OTP.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b0c0d] transition-colors duration-300 font-sans">
            <Navbar />

            <div className="max-w-xl mx-auto px-6 py-24">
                <div className="bg-white dark:bg-[#151618] p-8 md:p-12 rounded-[32px] shadow-2xl border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden">

                    {/* Decorative Background Element */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#f17840]/5 rounded-full blur-3xl"></div>

                    {!success ? (
                        <>
                            <div className="flex justify-center mb-8">
                                <div className="w-20 h-20 bg-[#f17840]/10 rounded-2xl flex items-center justify-center text-[#f17840] animate-pulse">
                                    <ShieldCheck size={40} />
                                </div>
                            </div>

                            <h1 className="text-[32px] font-black text-[#253d4e] dark:text-white mb-3 uppercase tracking-tight">Verify OTP</h1>
                            <p className="text-gray-500 dark:text-gray-400 font-bold mb-10">
                                We've sent a 6-digit verification code to your email. Enter it below to continue.
                            </p>

                            <form onSubmit={handleVerify} className="space-y-8">
                                <div className="flex justify-center gap-3 sm:gap-4">
                                    {otp.map((digit, idx) => (
                                        <input
                                            key={idx}
                                            ref={(el) => (inputRefs.current[idx] = el)}
                                            type="text"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(idx, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(idx, e)}
                                            className="w-10 h-14 sm:w-14 sm:h-16 text-center text-2xl font-black bg-gray-50 dark:bg-[#0b0c0d] border-2 border-gray-100 dark:border-gray-800 rounded-2xl focus:border-[#f17840] focus:ring-4 focus:ring-[#f17840]/10 outline-none transition-all text-[#253d4e] dark:text-white"
                                        />
                                    ))}
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm">
                                        ⚠️ {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#f17840] hover:bg-[#e06b35] text-white py-5 rounded-2xl font-black text-[16px] uppercase tracking-wider shadow-xl shadow-[#f17840]/20 transition-all active:scale-95 flex items-center justify-center gap-3 group disabled:opacity-70"
                                >
                                    {loading ? (
                                        <RefreshCw size={24} className="animate-spin" />
                                    ) : (
                                        <>
                                            <Lock size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                                            Verify & Proceed
                                        </>
                                    )}
                                </button>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                                    <p className="text-gray-400 font-bold text-sm">
                                        Didn't receive the code?{" "}
                                        {timer > 0 ? (
                                            <span className="text-[#f17840]">Resend in {timer}s</span>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={handleResend}
                                                className="text-[#f17840] hover:underline cursor-pointer"
                                            >
                                                Resend Now
                                            </button>
                                        )}
                                    </p>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="py-10 animate-in zoom-in-95 duration-500">
                            <div className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle size={60} className="text-green-500" />
                            </div>
                            <h2 className="text-3xl font-black text-[#253d4e] dark:text-white mb-2 uppercase">Verified!</h2>
                            <p className="text-gray-500 font-bold">Your account has been successfully verified.</p>
                            <div className="mt-8 flex justify-center">
                                <div className="w-12 h-1 bg-green-500 rounded-full animate-progress"></div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center">
                    <Link to="/contact-us" className="text-sm font-bold text-gray-400 hover:text-[#f17840] transition-colors uppercase tracking-widest">
                        Need help? Contact Support
                    </Link>
                </div>
            </div>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes progress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
                .animate-progress {
                    animation: progress 2s linear forwards;
                }
            `}} />
        </div>
    );
};

export default VerifyOTP;
