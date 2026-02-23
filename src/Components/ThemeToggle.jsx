import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import React from "react";  

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check local storage or system preference
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
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="fixed right-6 bottom-32 z-[100] w-12 h-12 bg-white dark:bg-[#1a1c1e] text-black dark:text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 border border-gray-200 cursor-pointer"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}

            {/* Ripple effect background */}
            <span className="absolute inset-0 rounded-full bg-orange-500/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        </button>
    );
};

export default ThemeToggle;
