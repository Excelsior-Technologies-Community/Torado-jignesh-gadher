import { ChevronDown, ChevronRight, GitCompare, Headphones, Heart, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { useState } from "react";
import { FaBars, FaEnvelope, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
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
            name: "About",
            submenu: [],
        },
        {
            name: "Pages",
            submenu: [
                "About Us",
                "FAQ",
                "Terms & Conditions",
                "Privacy Policy",
                "404 Error Page",
            ],
        },
        {
            name: "Shop",
            submenu: [
                "Shop Grid",
                "Shop List",
                "Shop Details",
                "Cart",
                "Checkout",
                "Wishlist",
            ],
        },
        {
            name: "Blog",
            submenu: [
                "Blog Layout",
                "Single Blog",
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


    return (
        <>
            {/* 1. Top Bar (Responsive Center for Mobile) */}
            <div className="bg-[#512da8] text-white text-[13px] w-full relative z-[100] border-b border-white/10">
                <div className="w-full px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">

                    {/* Contact Info */}
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

                    {/* Promo Text */}
                    <div className="font-medium text-[15px] animate-pulse-slow">
                        Save up to <span className="text-lg text-orange-400 font-bold">50%</span> off on your first order
                    </div>

                    {/* Language & Currency */}
                    <div className="flex items-center justify-center gap-6 sm:gap-8">
                        {/* Language */}
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

                        {/* Currency */}
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

            {/* 2. Mobile Action Row (Visible only on mobile/tablet) */}
            <div className="md:hidden w-full bg-white border-b py-3 px-4 flex items-center justify-center gap-6 sm:gap-10">
                <FaBars
                    className="text-gray-700 text-xl cursor-pointer hover:text-[#f17840] transition-colors"
                    onClick={() => setSearchModalOpen(true)}
                />

                {/* Icons with Badge style for mobile */}
                <div className="relative cursor-pointer group">
                    <GitCompare size={24} className="text-gray-700 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
                </div>

                <div className="relative cursor-pointer group">
                    <Heart size={24} className="text-gray-700 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
                </div>

                <div className="relative cursor-pointer group">
                    <ShoppingCart size={24} className="text-gray-700 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">5</span>
                </div>

                <User size={24} className="text-gray-700 cursor-pointer hover:text-[#f17840]" strokeWidth={1.5} />
            </div>

            {/* Mobile Search Modal (Triggered by FaBars in Action Row) */}
            <div className={`fixed inset-0 bg-black/60 z-[300] flex items-center justify-center px-4 transition-all duration-300 ${searchModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                <div className={`bg-white w-full max-w-[500px] rounded-[10px] p-6 shadow-2xl transform transition-all duration-300 ${searchModalOpen ? "scale-100 translate-y-0" : "scale-90 translate-y-4"}`}>

                    {/* Close Button */}
                    <div className="flex justify-end mb-4">
                        <FaTimes
                            size={20}
                            className="text-gray-600 cursor-pointer hover:text-black"
                            onClick={() => setSearchModalOpen(false)}
                        />
                    </div>

                    {/* Search Form Card */}
                    <div className="border border-gray-200 rounded-[5px] mb-6 shadow-sm">
                        <div className="relative">
                            <button
                                onClick={() => setCategoryOpen(!categoryOpen)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-100"
                            >
                                {selectedCategory}
                                <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full w-full bg-white border border-gray-100 rounded-b shadow-lg z-50">
                                    {categories.map(cat => (
                                        <div
                                            key={cat}
                                            onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                                            className="px-4 py-2.5 hover:bg-orange-50 hover:text-[#f17840] cursor-pointer text-sm"
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
                            className="w-full px-4 py-3 text-sm focus:outline-none placeholder:text-gray-400 border-b border-gray-100 font-medium"
                        />
                        <button className="w-[calc(100%-32px)] m-4 bg-[#f17840] hover:bg-[#e06b35] text-white py-3.5 rounded-[5px] flex items-center justify-center gap-3 text-base font-bold transition-all shadow-md">
                            <Search size={22} strokeWidth={2.5} />
                            Search
                        </button>
                    </div>

                    {/* Location Selection */}
                    <div className="relative mb-8">
                        <button
                            onClick={() => setLocationOpen(!locationOpen)}
                            className="w-full flex items-center gap-3 border border-gray-200 rounded-[5px] px-4 py-3.5 text-sm text-gray-600 hover:border-[#f17840] transition-colors bg-white shadow-sm"
                        >
                            <MapPin size={20} className="text-[#f17840]/60" strokeWidth={1.5} />
                            <span className="font-medium text-gray-500">{selectedLocation ? selectedLocation : "Your location"}</span>
                        </button>
                        {locationOpen && (
                            <div className="absolute left-0 top-full mt-1 w-full bg-white border border-gray-100 rounded-md shadow-xl z-50">
                                {locations.map(loc => (
                                    <div
                                        key={loc}
                                        onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }}
                                        className="px-4 py-3 hover:bg-orange-50 hover:text-[#f17840] cursor-pointer text-sm font-medium border-b last:border-0"
                                    >
                                        {loc}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Support Center */}
                    <div className="flex items-center gap-5 pt-4 border-t border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center">
                            <Headphones className="text-gray-900" size={32} strokeWidth={1} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[#f17840] font-extrabold text-2xl leading-tight">+ 0020 500</span>
                            <span className="text-gray-500 text-sm font-medium">24/7 Support Center</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Logo & Main Header Row */}
            <div className="w-full bg-white sticky top-0 z-40 ">
                <div className="w-full py-4 px-4 flex items-center justify-between gap-4">

                    {/* Logo (Centered on mobile if needed, but left in screenshot) */}
                    <div className="flex items-center flex-shrink-0">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/logo.webp"
                            alt="logo"
                            className="h-10 sm:h-12"
                        />
                    </div>

                    {/* Desktop Search Section (Hidden on Mobile) */}
                    <div className="hidden md:flex flex-1 items-center max-w-[700px] h-12 bg-white border border-gray-200 rounded-[5px]">
                        <div className="relative">
                            <button onClick={() => setCategoryOpen(!categoryOpen)} className="flex items-center gap-2 px-4 h-full text-sm font-medium whitespace-nowrap text-[#253d4e]">
                                {selectedCategory} <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full mt-1 w-48 bg-white border rounded-md shadow-lg z-50 py-1">
                                    {categories.map(cat => (
                                        <div key={cat} onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }} className="px-4 py-2 hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm">{cat}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="h-6 w-[1px] bg-gray-200 mx-1"></div>
                        <input type="text" placeholder="Search Products" className="flex-1 px-4 h-full text-sm focus:outline-none" />
                        <button className="bg-[#f17840] text-white px-5 h-[calc(100%-8px)] mr-1 rounded-[4px] flex items-center gap-2 text-sm font-semibold">
                            <Search size={18} strokeWidth={2.5} /> Search
                        </button>
                    </div>

                    {/* Desktop Location Selection (Hidden on Mobile) */}
                    <div className="hidden lg:block relative min-w-[160px]">
                        <button onClick={() => setLocationOpen(!locationOpen)} className="w-full flex items-center justify-between border border-gray-200 rounded-[5px] px-4 py-3 text-sm">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-[#f17840]" strokeWidth={2} />
                                <span className="font-medium text-[#253d4e]">{selectedLocation}</span>
                            </div>
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {locationOpen && (
                            <div className="absolute right-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg z-50 py-1">
                                {locations.map(loc => (
                                    <div key={loc} onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }} className="px-4 py-3 hover:bg-orange-50 hover:text-orange-600 cursor-pointer text-sm font-medium border-b last:border-0">{loc}</div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Desktop Support (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-3 ml-4">
                        <Headphones className="text-gray-900" size={36} strokeWidth={1} />
                        <div className="flex flex-col">
                            <span className="text-[#f17840] font-bold text-xl leading-none">+ 0020 500</span>
                            <span className="text-gray-500 text-xs font-medium mt-1">24/7 Support Center</span>
                        </div>
                    </div>

                    {/* Mobile Hamburger Menu Button (Styled as per screenshot) */}
                    <button
                        className="md:hidden w-11 h-11 border border-gray-200 flex items-center justify-center rounded-full text-gray-700 bg-gray-50 focus:outline-none"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>

                </div>
            </div>

            {/* 4. Desktop Bottom Nav row (Hidden on Mobile) */}
            <div className="w-full bg-white hidden md:block">
                <div className="w-full px-4 bg-gray-100 flex items-center justify-between">
                    <div className="relative py-2">
                        <button className="bg-[#f17840] text-white px-6 py-3 rounded-t-[5px] flex items-center gap-3 text-sm font-bold min-w-[280px]">
                            <FaBars size={14} /> Browse All Categories <ChevronDown size={16} className="ml-auto" />
                        </button>
                    </div>
                    <nav className="flex items-center gap-8 ml-8">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative group py-5 cursor-pointer">

                                {/* Main Menu */}
                                <div className="flex items-center gap-1">
                                    <span className="text-[15px] font-bold text-[#253d4e] group-hover:text-[#f17840] transition-colors">
                                        {item.name}
                                    </span>

                                    {item.submenu.length > 0 && (
                                        <ChevronDown
                                            size={14}
                                            className="text-gray-400 group-hover:text-[#f17840]
                           transition-all duration-300 group-hover:rotate-180"
                                        />
                                    )}
                                </div>

                                {/* Dropdown */}
                                {item.submenu.length > 0 && (
                                    <div
                                        className="absolute left-0 top-full mt-2 w-60
                         bg-white shadow-xl rounded-md
                         opacity-0 invisible
                         group-hover:opacity-100 group-hover:visible
                         transition-all duration-300 z-50"
                                    >
                                        <ul className="py-3">
                                            {item.submenu.map((sub, i) => (
                                                <li
                                                    key={i}
                                                    className="flex justify-between items-center px-5 py-3
                               text-[15px] font-semibold text-[#253d4e]
                               hover:bg-gray-100 hover:text-[#f17840]
                               transition cursor-pointer"
                                                >
                                                    {sub}
                                                    <ChevronRight size={14} className="text-gray-400" />
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                    <div className="flex items-center gap-6 ml-auto">
                        {/* Compare */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <GitCompare size={26} className="text-[#253d4e] group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">1</span>
                            </div>
                            <span className="text-[14px] font-bold text-[#253d4e] group-hover:text-[#f17840] transition-colors">Compare</span>
                        </div>
                        {/* Wishlist */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <Heart size={26} className="text-[#253d4e] group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">3</span>
                            </div>
                            <span className="text-[14px] font-bold text-[#253d4e] group-hover:text-[#f17840] transition-colors">Wishlist</span>
                        </div>
                        {/* Cart */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative">
                                <ShoppingCart size={26} className="text-[#253d4e] group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1 -right-1 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">5</span>
                            </div>
                            <span className="text-[14px] font-bold text-[#253d4e] group-hover:text-[#f17840] transition-colors">Cart</span>
                        </div>
                        {/* Account */}
                        <div className="flex items-center gap-2 cursor-pointer group">
                            <User size={26} className="text-[#253d4e] group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                            <span className="text-[14px] font-bold text-[#253d4e] group-hover:text-[#f17840] transition-colors">Account</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay Drawer */}
            <div className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 md:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`} onClick={() => setMobileOpen(false)}>
                <div className={`absolute right-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-xl text-purple-900">Torado</span>
                            <div className="p-2 bg-gray-100 rounded-full" onClick={() => setMobileOpen(false)}><FaTimes size={18} className="text-gray-600 cursor-pointer" /></div>
                        </div>
                        <div className="space-y-4 text-gray-700 font-medium">
                            <div className="flex items-center gap-3 py-2 border-b"><FaPhoneAlt className="text-[#f17840]" /> +11 222 3333</div>
                            <div className="flex items-center gap-3 py-2 border-b"><FaEnvelope className="text-[#f17840]" /> helo@torado.com</div>
                            {['Home', 'Shop', 'Pages', 'Blogs', 'Contact'].map(link => (
                                <div key={link} className="py-2 border-b flex justify-between items-center">{link} <ChevronDown size={14} className="text-gray-400" /></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
