import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';

const NewsletterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const location = useLocation();

    useEffect(() => {
        // Reset popup state on route change
        setIsOpen(false);

        const token = localStorage.getItem("token");
        const adminToken = localStorage.getItem("adminToken");
        const isHidden = localStorage.getItem('hideNewsletterPopup');
        const isDashboard = location.pathname === '/admin/dashboard';

        // Check conditions
        const isUserLoggedIn = !!token;
        const isAdminLoggedIn = !!adminToken;
        const isPopupDismissed = !!isHidden;

        // Log for debugging
        console.log("Newsletter Status Check:", {
            isUserLoggedIn,
            isAdminLoggedIn,
            isPopupDismissed,
            isDashboard,
            path: location.pathname
        });

        // DO NOT show if any login exists or if dismissed or on dashboard
        if (isUserLoggedIn || isAdminLoggedIn || isPopupDismissed || isDashboard) {
            console.log("Popup will NOT show because one of the conditions above is true.");
            return;
        }

        // Show popup after 2 seconds
        const timer = setTimeout(() => {
            console.log("Success! Showing Newsletter Popup now.");
            setIsOpen(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleDontShowAgain = (e) => {
        if (e.target.checked) {
            localStorage.setItem('hideNewsletterPopup', 'true');
        } else {
            localStorage.removeItem('hideNewsletterPopup');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm transition-all duration-300">
            <div className="relative bg-white dark:bg-[#1a1c1e] w-full max-w-[900px] flex flex-col md:flex-row rounded-0 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-in fade-in zoom-in duration-500 overflow-hidden mx-4 max-h-[95vh] overflow-y-auto no-scrollbar">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-0 right-0 z-[110] bg-black text-white p-2.5 hover:bg-[#f17840] transition-colors duration-300"
                    aria-label="Close"
                >
                    <X size={20} strokeWidth={3} />
                </button>

                {/* Image Section */}
                <div className="w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-auto overflow-hidden">
                    <img
                        src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-1.webp"
                        alt="Newsletter"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 p-6 sm:p-10 md:p-12 flex flex-col justify-center bg-white dark:bg-[#1a1c1e]">
                    <div className="mb-6 md:mb-8">
                        <h2 className="text-[24px] sm:text-[28px] md:text-[34px] font-black text-[#253d4e] dark:text-white leading-tight mb-3 md:mb-4">
                            Subscribe To Our Newsletter
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-[14px] md:text-[16px] leading-relaxed">
                            Subscribe Our Newsletter To Get Our Update News
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4 md:space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-[#f4f4f4] dark:bg-[#252729] border-none outline-none dark:text-white font-bold text-[15px]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#f17840] hover:bg-[#e06b35] text-white font-black py-4 rounded-none transition-all text-base md:text-lg shadow-md uppercase tracking-wide"
                        >
                            Subscribe
                        </button>

                        <div className="flex items-center gap-3 pt-4 cursor-pointer">
                            <label className="relative flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    id="dontShow"
                                    onChange={handleDontShowAgain}
                                    className="sr-only peer"
                                />
                                <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:bg-[#f17840] peer-checked:border-[#f17840] transition-all bg-white dark:bg-[#1a1c1e]"></div>
                            </label>
                            <label htmlFor="dontShow" className="text-[14px] md:text-[15px] font-bold text-gray-400 dark:text-gray-500 cursor-pointer hover:text-[#f17840] transition-colors">
                                Don't Show This Message Again
                            </label>
                        </div>
                    </form>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
};

export default NewsletterPopup;
