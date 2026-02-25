import { FileText, Layers, Moon, ShoppingBag, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";  

const StickyActions = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="hidden lg:flex fixed right-0 top-[22%] z-[999] flex-col items-end gap-3 pr-1">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-11 h-11 bg-white dark:bg-[#1a1c1e] text-[#253d4e] dark:text-white rounded-full shadow-[0_0_15px_rgba(0,0,0,0.1)] flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100 dark:border-gray-800 mr-1"
            >
                {darkMode ? <Sun size={20} className="text-orange-500" /> : <Moon size={20} fill="currentColor" />}
            </button>

            <div className="flex flex-col gap-1.5">
                <button className="bg-white dark:bg-[#1a1c1e] w-[58px] h-[62px] rounded-l-[6px] shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center gap-1 transition-all hover:pr-2 border-y border-l border-gray-50 dark:border-gray-800 group">
                    <Layers size={20} className="text-[#253d4e] dark:text-gray-300 group-hover:text-[#f17840]" />
                    <span className="text-[10px] font-bold text-[#253d4e] dark:text-gray-300 uppercase tracking-tighter">Demos</span>
                </button>

                <button className="bg-white dark:bg-[#1a1c1e] w-[58px] h-[62px] rounded-l-[6px] shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center gap-1 transition-all hover:pr-2 border-y border-l border-gray-50 dark:border-gray-800 group">
                    <FileText size={20} className="text-[#253d4e] dark:text-gray-300 group-hover:text-[#f17840]" />
                    <span className="text-[10px] font-bold text-[#253d4e] dark:text-gray-300 uppercase tracking-tighter">Docs</span>
                </button>

                <button className="bg-white dark:bg-[#1a1c1e] w-[58px] h-[62px] rounded-l-[6px] shadow-[0_0_15px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center gap-1 transition-all hover:pr-2 border-y border-l border-gray-50 dark:border-gray-800 group">
                    <ShoppingBag size={20} className="text-[#253d4e] dark:text-gray-300 group-hover:text-[#f17840]" />
                    <span className="text-[10px] font-bold text-[#253d4e] dark:text-gray-300 text-center uppercase tracking-tighter leading-none">Buy Now</span>
                </button>
            </div>
        </div>
    );
};

export default StickyActions;
