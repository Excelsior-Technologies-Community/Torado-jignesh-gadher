import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react';


const NewsletterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const location = useLocation();

    if (location.pathname === '/dashboard') return null;

    useEffect(() => {
        const isHidden = localStorage.getItem('hideNewsletterPopup');
        if (!isHidden) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 2000);
            return () => clearTimeout(timer);
        }
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
            <div className="relative bg-white dark:bg-[#1a1c1e] w-full max-w-[850px] max-h-[95vh] flex flex-col md:flex-row rounded-[20px] shadow-[0_25px_70px_rgba(0,0,0,0.4)] animate-in fade-in zoom-in duration-500 overflow-hidden">

                {/* Close Button - Optimized for Mobile */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-[70] w-9 h-9 bg-white md:bg-black text-black md:text-white rounded-full flex items-center justify-center hover:bg-[#f17840] hover:text-white transition-all duration-300 shadow-xl border border-gray-100 md:border-none focus:outline-none"
                    aria-label="Close"
                >
                    <X size={20} strokeWidth={3} />
                </button>

                <div className="md:w-[45%] h-[250px] sm:h-[280px] md:h-auto overflow-hidden flex-shrink-0">
                    <img
                        src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-1.webp"
                        alt="Newsletter"
                        className="w-full h-full object-cover object-top transform hover:scale-110 transition-transform duration-1000"
                    />
                </div>

                <div className="md:w-[55%] p-6 md:p-10 flex flex-col justify-center overflow-y-auto no-scrollbar">
                    <div className="mb-6">
                        <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-extrabold text-[#253d4e] dark:text-white leading-[1.2] mb-3">
                            Subscribe To Our Newsletter
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-sm leading-relaxed">
                            Subscribe Our Newsletter To Get Our Update News
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3.5 bg-[#f8f9fa] dark:bg-[#151618] border border-gray-100 dark:border-gray-800 rounded-lg focus:outline-none focus:border-[#f17840] dark:text-white font-bold text-sm transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#f17840] hover:bg-[#e06b35] text-white font-black py-3.5 rounded-lg transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm"
                        >
                            Subscribe Now
                        </button>

                        <div className="flex items-center gap-3 pt-2 group cursor-pointer">
                            <div className="relative flex items-center h-5">
                                <input
                                    type="checkbox"
                                    id="dontShow"
                                    onChange={handleDontShowAgain}
                                    className="w-4 h-4 cursor-pointer accent-[#f17840] rounded border-gray-300 focus:ring-0"
                                />
                            </div>
                            <label htmlFor="dontShow" className="text-xs font-black text-gray-400 dark:text-gray-500 cursor-pointer group-hover:text-[#f17840] transition-colors uppercase tracking-tight">
                                Don't Show This Again
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
