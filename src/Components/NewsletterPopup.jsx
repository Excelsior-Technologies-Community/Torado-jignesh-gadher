import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import React from "react";   

const NewsletterPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const location = useLocation();

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
        <div className="fixed inset-0 z-[1000] flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
            <div className="relative bg-white dark:bg-[#1a1c1e] w-full max-w-[850px] flex flex-col md:flex-row rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 z-50 p-1.5 bg-black text-white rounded-md hover:bg-[#f17840] transition-colors shadow-lg"
                >
                    <X size={20} strokeWidth={3} />
                </button>

                <div className="md:w-1/2 h-[250px] md:h-auto overflow-hidden">
                    <img
                        src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-1.webp"
                        alt="Newsletter"
                        className="w-full h-full"
                    />
                </div>

                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-[28px] md:text-[32px] font-black text-[#253d4e] dark:text-white leading-tight mb-4">
                            Subscribe To Our Newsletter
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                            Subscribe Our Newsletter To Get Our Update News
                        </p>
                    </div>

                    <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                        <div className="relative">
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 bg-[#f8f9fa] dark:bg-[#151618] border border-gray-100 dark:border-gray-800 rounded-md focus:outline-none focus:border-[#f17840] dark:text-white font-medium transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#f17840] hover:bg-[#e06b35] text-white font-bold py-4 rounded-md transition-all shadow-lg shadow-orange-500/20 uppercase tracking-wide"
                        >
                            Subscribe
                        </button>

                        <div className="flex items-center gap-2 group cursor-pointer">
                            <input
                                type="checkbox"
                                id="dontShow"
                                onChange={handleDontShowAgain}
                                className="w-4 h-4 cursor-pointer accent-[#f17840]"
                            />
                            <label htmlFor="dontShow" className="text-sm font-bold text-gray-500 dark:text-gray-400 cursor-pointer group-hover:text-[#253d4e] dark:group-hover:text-white transition-colors">
                                Don't Show This Message Again
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default NewsletterPopup;
