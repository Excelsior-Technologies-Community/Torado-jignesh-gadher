import { useNavigate } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";      

const Error = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            <div className="flex-grow flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="max-w-[1200px] mx-auto">
                    {/* 404 Image */}
                    <div className="mb-10 animate-bounce-slow">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/404.webp"
                            alt="404 Error"
                            className="max-w-full h-auto mx-auto"
                        />
                    </div>

                    {/* Error Text */}
                    <h2 className="text-[28px] md:text-[42px] font-black text-[#253d4e] dark:text-white mb-4">
                        Error 404 : Page Not Found
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-10 max-w-[600px] mx-auto leading-relaxed">
                        The page you are looking for might have been removed had its name changed or is temporarily unavailable.
                    </p>

                    {/* Back to Home Button */}
                    <div className="relative group overflow-hidden w-fit mx-auto">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#f17840] group-hover:bg-white dark:group-hover:bg-[#1a1c1e] text-white group-hover:text-[#f17840] px-10 py-4 rounded-[5px] font-bold text-base transition-all duration-700 w-fit cursor-pointer shadow-lg outline-none border-none"
                        >
                            <p>Back to Home</p>
                        </button>
                        <div
                            onClick={() => navigate("/")}
                            className="absolute top-14 -right-20 rounded-[5px] w-full h-full bg-white dark:bg-[#1a1c1e] text-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-base cursor-pointer"
                        >
                            Back to Home
                        </div>
                    </div>
                </div>
            </div>

            <StickyActions />
            <Footer />

            <style jsx>{`
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
};

export default Error;
