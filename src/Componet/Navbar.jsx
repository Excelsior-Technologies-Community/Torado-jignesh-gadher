import { ChevronDown, ChevronRight, GitCompare, Headphones, Heart, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { FaBars, FaEnvelope, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import React from "react";

const Navbar = () => {

    const menuItems = [
        {
            name: "Home",
            submenu: [
                "Home One",
                "Home Two",
                "Home Three",
            ],
        },
        {
            name: "Pages",
            submenu: [
                "Store Locations",
                "FAQ",
                "Terms of Service",
                "Privacy Policy",
                "404 Error Page",
            ],
        },
        {
            name: "Shop",
            submenu: [
                {
                    name: "Shop Layout",
                    submenu: ["Shop Grid", "Shop Left sidebar", "Shop Right sidebar"]
                },
                "Shop Details",
                "Cart",
                "Wishlist",
                "Compare Products",
                "Checkout",
                "Track Orders",
                "My Account",
            ],
        },
        {
            name: "Blog",
            submenu: [
                "Blog Layout",
                "Blog Details",
            ],
        },
        {
            name: "Contact Us",
            submenu: [],
        },
    ];

    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [currencyOpen, setCurrencyOpen] = useState(false);
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [locationOpen, setLocationOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("Select a category");
    const [selectedLocation, setSelectedLocation] = useState("Georgia");
    const categories = ["Machine Tools", "Hand Tools"];
    const locations = ["New York", "Florida", "Georgia"];
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmenuClick = (sub) => {
        if (sub === "Store Locations") {
            navigate("/storelocation");
            setMobileOpen(false);
        } else if (sub === "Home One") {
            navigate("/");
            setMobileOpen(false);
        } else if (sub === "FAQ") {
            navigate("/faq");
            setMobileOpen(false);
        } else if (sub === "Terms of Service") {
            navigate("/terms-of-service");
            setMobileOpen(false);
        } else if (sub === "Privacy Policy") {
            navigate("/privacy-policy");
            setMobileOpen(false);
        } else if (sub === "404 Error Page") {
            navigate("/404");
            setMobileOpen(false);
        } else if (sub === "Shop Grid") {
            navigate("/shop-grid");
            setMobileOpen(false);
        } else if (sub === "Cart") {
            navigate("/cart");
            setMobileOpen(false);
        } else if (sub === "My Account") {
            navigate("/my-account");
            setMobileOpen(false);
        }
    };


    return (
        <>
            {/* 1. Top Bar (Responsive Center for Mobile) */}
            <div className="bg-[#512da8] text-white text-[13px] w-full relative z-[100] border-b border-white/10">
                <div className="w-full px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">

                    <div className="flex items-center justify-center md:justify-start gap-4 sm:gap-6">
                        <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
                            <FaPhoneAlt size={14} />
                            <span className="text-[15px]">+11 222 3333</span>
                        </div>
                        <div className="flex items-center gap-2 hover:text-orange-300 transition-colors cursor-pointer">
                            <FaEnvelope size={14} />
                            <span className="text-[15px]">hello@torado.com</span>
                        </div>
                    </div>

                    <div className="font-medium text-[15px] animate-pulse-slow">
                        Save up to <span className="text-lg text-orange-400 font-bold">50%</span> off on your first order
                    </div>

                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                        <div className="relative group">
                            <button
                                onClick={() => {
                                    setLangOpen(!langOpen);
                                    setCurrencyOpen(false);
                                }}
                                className="flex items-center gap-2 hover:text-orange-300 transition-colors"
                            >
                                <HiOutlineGlobeAlt className="text-lg" />
                                <span>English</span>
                                <IoIosArrowDown
                                    className={`transition-transform duration-300 ${langOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            <div className={`absolute right-0 mt-3 w-40 bg-white text-gray-800 rounded-md shadow-2xl overflow-hidden transform transition-all duration-300 origin-top z-[110] ${langOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                <div className="p-1">
                                    {["English", "简体中文", "العربية"].map(l => (
                                        <div key={l} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition rounded-sm">{l}</div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="relative group">
                            <button
                                onClick={() => {
                                    setCurrencyOpen(!currencyOpen);
                                    setLangOpen(false);
                                }}
                                className="flex items-center gap-2 hover:text-orange-300 transition-colors"
                            >
                                <MdAttachMoney className="text-lg" />
                                <span>USD</span>
                                <IoIosArrowDown
                                    className={`transition-transform duration-300 ${currencyOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            <div className={`absolute right-0 mt-3 w-32 bg-white text-gray-800 rounded-md shadow-2xl overflow-hidden transform transition-all duration-300 origin-top z-[110] ${currencyOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                <div className="p-1">
                                    {["USD", "EUR", "INR"].map(c => (
                                        <div key={c} className="px-4 py-2 hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition rounded-sm">{c}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Mobile Action Row (Visible only on lg down) */}
            <div className="lg:hidden w-full bg-white dark:bg-[#151618] border-b py-3 px-4 flex items-center justify-center gap-6 sm:gap-10 transition-colors duration-300">
                <Search
                    size={24}
                    className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#f17840] transition-colors"
                    onClick={() => setSearchModalOpen(true)}
                />

                <div className="relative cursor-pointer group">
                    <GitCompare size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
                </div>

                <div className="relative cursor-pointer group">
                    <Heart size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
                </div>

                <div className="relative cursor-pointer group">
                    <ShoppingCart size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">5</span>
                </div>

                <User size={24} className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#f17840]" strokeWidth={1.5} />
            </div>

            {/* Mobile Search Modal (Triggered by FaBars in Action Row) */}
            <div className={`fixed inset-0 bg-black/60 z-[300] flex items-center justify-center px-4 transition-all duration-300 ${searchModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className={`bg-white dark:bg-[#1a1c1e] w-full max-w-[500px] rounded-[10px] p-6 shadow-2xl transform transition-all duration-300 ${searchModalOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-4"}`}>

                    <div className="flex justify-end mb-4">
                        <FaTimes
                            size={20}
                            className="text-gray-600 dark:text-gray-400 cursor-pointer hover:text-black dark:hover:text-white"
                            onClick={() => setSearchModalOpen(false)}
                        />
                    </div>

                    <div className="border border-gray-200 rounded-[5px] mb-6 shadow-sm overflow-hidden">
                        <div className="relative">
                            <button
                                onClick={() => setCategoryOpen(!categoryOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 border-b border-gray-100"
                            >
                                {selectedCategory}
                                <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full w-full bg-white dark:bg-[#1a1c1e] border border-gray-100 rounded-b shadow-lg z-50">
                                    {categories.map(cat => (
                                        <div
                                            key={cat}
                                            onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                                            className="px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-[#f17840] cursor-pointer text-sm dark:text-gray-300"
                                        >
                                            {cat}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <input
                            type="text"
                            placeholder="Search Products"
                            className="w-full px-4 py-3 text-sm focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-400 border-b border-gray-100 font-medium bg-transparent dark:text-white"
                        />
                        <button className="w-[calc(100%-32px)] m-4 bg-[#f17840] hover:bg-[#e06b35] text-white py-3.5 rounded-[5px] flex items-center justify-center gap-3 text-base font-bold transition-all shadow-md">
                            <Search size={22} strokeWidth={2.5} />
                            Search
                        </button>
                    </div>

                    <div className="relative mb-8">
                        <button
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="w-full flex items-center gap-3 border border-gray-200 rounded-[5px] px-4 py-3.5 text-sm text-gray-600 dark:text-gray-400 hover:border-[#f17840] transition-colors bg-white dark:bg-transparent shadow-sm"
                        >
                            <MapPin size={20} className="text-[#f17840]/60" strokeWidth={1.5} />
                            <span className="font-medium">{selectedLocation ? selectedLocation : "Your location"}</span>
                        </button>
                        {locationOpen && (
                            <div className="absolute left-0 top-full mt-1 w-full bg-white dark:bg-[#1a1c1e] border border-gray-100 rounded-md shadow-xl z-50">
                                {locations.map(loc => (
                                    <div
                                        key={loc}
                                        onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                                        className="px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-[#f17840] cursor-pointer text-sm font-medium border-b last:border-0 dark:text-gray-300"
                                    >
                                        {loc}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-5 pt-4 border-t border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 dark:bg-[#151618] rounded-full flex items-center justify-center border ">
                            <Headphones className="text-gray-900 dark:text-white" size={32} strokeWidth={1} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#f17840] font-extrabold text-2xl leading-tight">+ 0020 500</span>
                            <span className="text-gray-500 dark:text-white text-sm font-medium">24/7 Support Center</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Logo & Main Header Row */}
            <div className="w-full bg-white dark:bg-[#0b0c0d] transition-colors duration-300 border-b lg:border-none">
                <div className="w-full py-4 px-4 flex items-center justify-between gap-4">

                    <div className="flex items-center flex-shrink-0">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/logo.webp"
                            alt="logo"
                            className="h-10 sm:h-12 dark:brightness-0 dark:invert"
                        />
                    </div>

                    <div className="hidden lg:flex flex-1 items-center max-w-[700px] h-12 bg-white dark:bg-[#151618] border border-gray-200 rounded-[5px] transition-colors duration-300 overflow-hidden">
                        <div className="relative">
                            <button onClick={() => setCategoryOpen(!categoryOpen)} className="flex items-center gap-2 px-4 h-full text-sm font-medium whitespace-nowrap text-[#253d4e] dark:!text-white">
                                {selectedCategory} <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full mt-1 w-48 bg-white dark:bg-[#1a1c1e] border rounded-md shadow-lg z-50 py-1">
                                    {categories.map(cat => (
                                        <div key={cat} onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }} className="px-4 py-2 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 cursor-pointer text-sm dark:!text-white">{cat}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
                        <input type="text" placeholder="Search Products" className="flex-1 px-4 h-full text-sm focus:outline-none bg-transparent dark:text-white dark:placeholder:text-gray-400" />
                        <button className="bg-[#f17840] text-white px-5 h-[calc(100%-8px)] mr-1 rounded-[4px] flex items-center gap-2 text-sm font-semibold">
                            <Search size={18} strokeWidth={2.5} /> Search
                        </button>
                    </div>

                    <div className="hidden lg:block relative min-w-[160px]">
                        <button onClick={() => setLocationOpen(!locationOpen)} className="w-full flex items-center justify-between border border-gray-200 rounded-[5px] px-4 py-3 text-sm dark:!text-white">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-[#f17840]" strokeWidth={2} />
                                <span className="font-medium">{selectedLocation}</span>
                            </div>
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {locationOpen && (
                            <div className="absolute right-0 top-full mt-1 w-full bg-white dark:bg-[#1a1c1e] border rounded-md shadow-lg z-50 py-1">
                                {locations.map(loc => (
                                    <div key={loc} onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }} className="px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 cursor-pointer text-sm font-medium border-b last:border-0 dark:text-gray-300">{loc}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="hidden lg:flex items-center gap-3 ml-4">
                        <Headphones className="text-gray-900 dark:text-white" size={36} strokeWidth={1} />
                        <div className="flex flex-col">
                            <span className="text-[#f17840] font-bold text-xl leading-none">+ 0020 500</span>
                            <span className="text-gray-500 dark:text-white text-xs font-medium mt-1">24/7 Support Center</span>
                        </div>
                    </div>

                    <button
                        className="lg:hidden w-11 h-11 border border-gray-200 flex items-center justify-center rounded-full text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#151618] focus:outline-none transition-colors"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>

                </div>
            </div>

            {/* 4. Desktop Bottom Nav row (Premium Refined) */}
            <div className="w-full bg-white dark:bg-[#0b0c0d] hidden lg:block border-b border-gray-100 dark:border-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
                <div className="max-w-[1400px] mx-auto px-4 lg:px-6 flex items-center justify-between">

                    <div className="relative py-2 flex-shrink-0">
                        <button className="bg-[#f17840] hover:bg-[#e06b35] text-white px-7 py-3.5 rounded-[5px] flex items-center gap-3 text-sm font-bold lg:min-w-[220px] xl:min-w-[280px] transition-all duration-300 shadow-md">
                            <FaBars size={16} />
                            <span className="tracking-wide">Browse All Categories</span>
                            <ChevronDown size={18} className="ml-auto hidden xl:block" />
                        </button>
                    </div>

                    <nav className="flex items-center gap-4 xl:gap-10 mx-2 xl:mx-8">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative group py-6 cursor-pointer">
                                <div className="flex items-center gap-1.5 group-hover:text-[#f17840] transition-colors duration-300">
                                    <span className="text-[15px] font-extrabold text-[#253d4e] dark:!text-white group-hover:text-[#f17840]">
                                        {item.name}
                                    </span>
                                    {item.submenu.length > 0 && (
                                        <ChevronDown
                                            size={14}
                                            className="text-gray-400 group-hover:text-[#f17840] transition-all duration-300 group-hover:rotate-180"
                                        />
                                    )}
                                </div>

                                {item.submenu.length > 0 && (
                                    <div className="absolute left-0 top-full mt-0 w-64 bg-white dark:bg-[#1a1c1e] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 border-t-2 border-[#f17840]">
                                        <ul className="py-2">
                                            {item.submenu.map((sub, i) => {
                                                const hasNested = typeof sub === "object" && sub.submenu;
                                                const subName = hasNested ? sub.name : sub;

                                                return (
                                                    <li
                                                        key={i}
                                                        onClick={() => !hasNested && handleSubmenuClick(subName)}
                                                        className="group/sub relative flex justify-between items-center px-6 py-3.5 text-[14px] font-bold text-[#253d4e] dark:!text-white hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-[#f17840] transition-all cursor-pointer border-b border-gray-50 last:border-0"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {(subName === "FAQ" || hasNested) && (
                                                                <span className="w-1.5 h-1.5 rounded-full bg-[#f17840]"></span>
                                                            )}
                                                            <span className={(subName === "FAQ" || hasNested) ? "text-[#f17840]" : ""}>{subName}</span>
                                                        </div>
                                                        <ChevronRight size={14} className={`transition-all duration-300 ${hasNested ? "text-[#f17840]" : "text-gray-300"}`} />

                                                        {hasNested && (
                                                            <div className="absolute right-full top-0 w-60 bg-white dark:bg-[#1a1c1e] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-lg opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible -translate-x-2 group-hover/sub:translate-x-0 transition-all duration-300 z-[60] overflow-hidden">
                                                                <ul className="py-2">
                                                                    {sub.submenu.map((nested, j) => (
                                                                        <li
                                                                            key={j}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                handleSubmenuClick(nested);
                                                                            }}
                                                                            className="flex justify-between items-center px-6 py-3.5 text-[14px] font-bold text-[#253d4e] dark:!text-white hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-[#f17840] transition-all cursor-pointer border-b border-gray-50 last:border-0"
                                                                        >
                                                                            <div className="flex items-center gap-2">
                                                                                {nested === "Shop Grid" && (
                                                                                    <span className="w-1.5 h-1.5 rounded-full bg-[#f17840]"></span>
                                                                                )}
                                                                                <span className={nested === "Shop Grid" ? "text-[#f17840]" : ""}>{nested}</span>
                                                                            </div>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3 xl:gap-7 ml-auto">
                        <div className="flex items-center gap-2.5 cursor-pointer group">
                            <div className="relative bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <GitCompare size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#f17840] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm transition-transform group-hover:scale-110">1</span>
                            </div>
                            <span className="hidden xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Compare</span>
                        </div>

                        <div className="flex items-center gap-2.5 cursor-pointer group">
                            <div className="relative bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <Heart size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#f17840] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm transition-transform group-hover:scale-110">3</span>
                            </div>
                            <span className="hidden xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Wishlist</span>
                        </div>

                        <div
                            className="flex items-center gap-2.5 cursor-pointer group"
                            onClick={() => navigate("/cart")}
                        >
                            <div className="relative bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <ShoppingCart size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#f17840] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm transition-transform group-hover:scale-110">5</span>
                            </div>
                            <span className="hidden xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Cart</span>
                        </div>

                        <div className="flex items-center gap-2.5 cursor-pointer group pr-2" onClick={() => navigate("/my-account")}>
                            <div className="bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <User size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                            </div>
                            <span className="hidden xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Account</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay Drawer */}
            <div className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMobileOpen(false)}>
                <div className={`absolute right-0 top-0 h-full w-64 bg-white dark:bg-[#0b0c0d] shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-xl text-purple-900 dark:text-white">Torado</span>
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full cursor-pointer" onClick={() => setMobileOpen(false)}><FaTimes size={18} className="text-gray-600 dark:text-gray-400" /></div>
                        </div>
                        <div className="space-y-4 text-gray-700 dark:text-white font-medium">
                            <div className="flex items-center gap-3 py-2 border-b"><FaPhoneAlt className="text-[#f17840]" /> +11 222 3333</div>
                            <div className="flex items-center gap-3 py-2 border-b"><FaEnvelope className="text-[#f17840]" /> hello@torado.com</div>
                            {['Home', 'Shop', 'Pages', 'Blogs', 'Contact'].map(link => (
                                <div
                                    key={link}
                                    className="py-2 border-b flex justify-between items-center cursor-pointer"
                                    onClick={() => {
                                        if (link === 'Pages') {
                                            // Optional: If you want clicking 'Pages' itself to navigate
                                            // navigate("/storelocation");
                                            // setMobileOpen(false);
                                        }
                                    }}
                                >
                                    {link} <ChevronDown size={14} className="text-gray-400 dark:text-white" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
