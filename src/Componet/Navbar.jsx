import { ChevronDown, ChevronRight, GitCompare, Headphones, Heart, MapPin, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { FaBars, FaEnvelope, FaPhoneAlt, FaTimes } from "react-icons/fa";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useCompare } from "../context/CompareContext.jsx";
import { useCurrency } from "../context/CurrencyContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import React from "react";
const Navbar = () => {
    const { cartItems, removeItem } = useCart();
    const { wishlistItems } = useWishlist();
    const { compareItems } = useCompare();
    const { currency, setCurrency, formatPrice, getSymbol } = useCurrency();
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    const wishlistCount = wishlistItems.length;
    const compareCount = compareItems.length;

    const menuItems = [
        {
            name: "Home",
            submenu: ["Home One", "Home Two", "Home Three"],
        },
        {
            name: "About",
            submenu: [],
        },
        {
            name: "Pages",
            submenu: ["Store Locations", "FAQ", "Terms of Service", "Privacy Policy", "404 Error Page"],
        },
        {
            name: "Shop",
            submenu: [
                {
                    name: "Shop Layout",
                    submenu: ["Shop Grid", "Shop Left sidebar", "Shop Right sidebar"]
                },
                "Shop Details", "Cart", "Wishlist", "Compare Products", "Checkout", "Track Orders", "My Account",
            ],
        },
        {
            name: "Blog",
            submenu: [
                {
                    name: "Blog Layout",
                    submenu: ["Blog Standard", "Blog Left Sidebar", "Blog Right Sidebar"]
                },
                {
                    name: "Single Blog",
                    submenu: ["Blog Details", "Blog Details Left Sidebar"]
                },
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
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);
    const [activeMobileNestedSubmenu, setActiveMobileNestedSubmenu] = useState(null);
    const navigate = useNavigate();

    const handleSubmenuClick = (sub) => {
        const routes = {
            "Home": "/",
            "Home One": "/",
            "Home Two": "/",
            "Home Three": "/",
            "About": "/about",
            "About Us": "/about",
            "Store Locations": "/store-location",
            "FAQ": "/faq",
            "Terms of Service": "/terms-of-service",
            "Privacy Policy": "/privacy-policy",
            "404 Error Page": "/404",
            "Shop": "/shop-grid",
            "Shop Layout": "/shop-grid",
            "Shop Grid": "/shop-grid",
            "Shop Left sidebar": "/shop-grid",
            "Shop Right sidebar": "/shop-grid",
            "Shop Details": "/shop-details",
            "Cart": "/cart",
            "Wishlist": "/wishlist",
            "Compare Products": "/compare",
            "Compare": "/compare",
            "Checkout": "/checkout",
            "Track Orders": "/track-order",
            "My Account": "/my-account",
            "Blog": "/blog-standard",
            "Blog Standard": "/blog-standard",
            "Blog Left Sidebar": "/blog-left-sidebar",
            "Blog Right Sidebar": "/blog-right-sidebar",
            "Blog Details": "/blog-details",
            "Blog Details Left Sidebar": "/blog-details-left-sidebar",
            "Contact Us": "/contact-us"
        };

        if (routes[sub]) {
            navigate(routes[sub]);
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
                                <span className="font-bold">{getSymbol()}</span>
                                <span>{currency}</span>
                                <IoIosArrowDown
                                    className={`transition-transform duration-300 ${currencyOpen ? "rotate-180" : ""}`}
                                />
                            </button>
                            <div className={`absolute right-0 mt-3 w-32 bg-white text-gray-800 rounded-md shadow-2xl overflow-hidden transform transition-all duration-300 origin-top z-[110] ${currencyOpen ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
                                <div className="p-1">
                                    {["USD", "EUR", "INR"].map(c => (
                                        <div
                                            key={c}
                                            onClick={() => {
                                                setCurrency(c);
                                                setCurrencyOpen(false);
                                            }}
                                            className={`px-4 py-2 hover:bg-purple-50 hover:text-purple-700 cursor-pointer transition rounded-sm ${currency === c ? 'bg-purple-50 text-purple-700 font-bold' : ''}`}
                                        >
                                            {c}
                                        </div>
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

                <div
                    className="relative cursor-pointer group"
                    onClick={() => navigate("/compare")}
                >
                    <GitCompare size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{compareCount}</span>
                </div>

                <div
                    className="relative cursor-pointer group"
                    onClick={() => navigate("/wishlist")}
                >
                    <Heart size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{wishlistCount}</span>
                </div>

                <div
                    className="relative cursor-pointer group"
                    onClick={() => navigate("/cart")}
                >
                    <ShoppingCart size={24} className="text-gray-700 dark:text-gray-300 group-hover:text-[#f17840]" strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#f17840] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartCount}</span>
                </div>

                <User 
                    size={24} 
                    className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-[#f17840]" 
                    strokeWidth={1.5} 
                    onClick={() => navigate("/my-account")}
                />
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

                    <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/logo.webp"
                            alt="logo"
                            className="h-10 sm:h-12 dark:brightness-0 dark:invert"
                        />
                    </div>

                    <div className="hidden lg:flex flex-1 items-center max-w-[700px] h-12 bg-white dark:bg-[#151618] border border-gray-200 rounded-[5px] transition-colors duration-300 overflow-hidden">
                        <div
                            className="relative"
                            onMouseEnter={() => setCategoryOpen(true)}
                            onMouseLeave={() => setCategoryOpen(false)}
                        >
                            <button className="flex items-center gap-2 px-4 h-full text-sm font-medium whitespace-nowrap text-[#253d4e] dark:!text-white">
                                {selectedCategory} <ChevronDown size={14} className="text-gray-400" />
                            </button>
                            {categoryOpen && (
                                <div className="absolute left-0 top-full mt-0 w-48 bg-white dark:bg-[#1a1c1e] shadow-2xl z-[110] py-1 text-gray-800 dark:text-white rounded-lg pt-2">
                                    {categories.map(cat => (
                                        <div key={cat} onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }} className="px-4 py-2 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 cursor-pointer text-sm">{cat}</div>
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

                    <div
                        className="hidden lg:block relative min-w-[160px]"
                        onMouseEnter={() => setLocationOpen(true)}
                        onMouseLeave={() => setLocationOpen(false)}
                    >
                        <button className="w-full flex items-center justify-between border border-gray-200 rounded-[5px] px-4 py-3 text-sm dark:!text-white">
                            <div className="flex items-center gap-2">
                                <MapPin size={18} className="text-[#f17840]" strokeWidth={2} />
                                <span className="font-medium">{selectedLocation}</span>
                            </div>
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                        {locationOpen && (
                            <div className="absolute right-0 top-full mt-0 w-full bg-white dark:bg-[#1a1c1e] shadow-2xl z-[110] py-1 text-gray-800 dark:text-white rounded-lg pt-2">
                                {locations.map(loc => (
                                    <div key={loc} onClick={() => { setSelectedLocation(loc); setLocationOpen(false); }} className="px-4 py-3 hover:bg-orange-50 dark:hover:bg-orange-950/20 hover:text-orange-600 cursor-pointer text-sm font-medium border-b last:border-0 border-gray-50 dark:border-gray-800">{loc}</div>
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

                    <nav className="hidden xl:flex items-center gap-4 xl:gap-8 mx-2 xl:mx-8">
                        {menuItems.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => item.submenu.length === 0 && handleSubmenuClick(item.name)}
                                className="relative group py-6 cursor-pointer"
                            >
                                <div className="flex items-center gap-1.5 group-hover:text-[#f17840] transition-colors duration-300">
                                    <span className={`text-[15px] font-extrabold whitespace-nowrap transition-colors duration-300 ${item.name === "Contact Us" ? "" : "text-[#253d4e] dark:!text-white group-hover:text-[#f17840]"}`}>
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
                                    <div className="absolute left-0 top-full mt-0 w-64 bg-white dark:bg-[#1a1c1e] shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[100] border-t-2 border-[#f17840]">
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
                                                            <span>{subName}</span>
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
                                                                                <span>{nested}</span>
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

                    <div className="flex items-center gap-2 xl:gap-5 ml-auto">
                        <div
                            className="flex items-center gap-2.5 cursor-pointer group"
                            onClick={() => navigate("/compare")}
                        >
                            <div className="relative bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <GitCompare size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#f17840] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm transition-transform group-hover:scale-110">{compareCount}</span>
                            </div>
                            <span className="hidden 2xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Compare</span>
                        </div>

                        <div
                            className="flex items-center gap-2.5 cursor-pointer group"
                            onClick={() => navigate("/wishlist")}
                        >
                            <div className="relative bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <Heart size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#f17840] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm transition-transform group-hover:scale-110">{wishlistCount}</span>
                            </div>
                            <span className="hidden 2xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Wishlist</span>
                        </div>

                        <div
                            className="relative flex items-center gap-2.5 cursor-pointer group"
                            onClick={() => navigate("/cart")}
                        >
                            <div className="relative bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <ShoppingCart size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                                <span className="absolute -top-1.5 -right-1.5 bg-[#f17840] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm transition-transform group-hover:scale-110">{cartCount}</span>
                            </div>
                            <span className="hidden 2xl:block text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">Cart</span>

                            {/* HOVER DROPDOWN - EXACTLY AS IN PHOTO */}
                            <div className="absolute right-0 top-full mt-0 w-[350px] bg-white dark:bg-[#1a1c1e] shadow-[0_10px_40px_rgba(0,0,0,0.15)] rounded-b-lg border-t-2 border-[#f17840] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] cursor-default">
                                <div className="max-h-[400px] overflow-y-auto">
                                    {cartItems.length > 0 ? (
                                        cartItems.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 p-4 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group/item relative">
                                                <div
                                                    className="absolute left-3 p-1.5 text-gray-300 hover:text-red-500 cursor-pointer transition-colors bg-white dark:bg-[#151618] rounded-full border border-gray-100 dark:border-gray-800 shadow-sm z-10"
                                                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                                                >
                                                    <X size={14} strokeWidth={3} />
                                                </div>
                                                <div className="w-20 h-20 bg-gray-50 dark:bg-white rounded-[5px] p-2 flex items-center justify-center ml-6">
                                                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-[15px] font-black text-[#253d4e] dark:text-white line-clamp-1 hover:text-[#f17840] transition-colors">{item.name}</h4>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <span className="text-[14px] text-gray-400 font-bold">{item.quantity} x</span>
                                                        <span className="text-[14px] text-[#f17840] font-black">{formatPrice(item.price)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="p-10 text-center text-gray-500 font-bold">Your cart is empty</div>
                                    )}
                                </div>

                                {cartItems.length > 0 && (
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <span className="text-[15px] font-black text-[#253d4e] dark:text-white uppercase tracking-tight">Payable Total</span>
                                            <span className="text-[18px] font-black text-[#f17840]">
                                                {formatPrice(cartItems.reduce((acc, item) => {
                                                    let itemTotal = item.price * item.quantity;
                                                    if (item.badge) {
                                                        const match = item.badge.match(/(\d+)%/);
                                                        if (match) {
                                                            const percent = parseInt(match[1]);
                                                            itemTotal -= (itemTotal * percent) / 100;
                                                        }
                                                    }
                                                    return acc + itemTotal;
                                                }, 0))}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate("/cart"); }}
                                                className="w-full py-3.5 bg-[#151618] text-white rounded-[5px] font-black text-[13px] hover:bg-black transition-colors uppercase tracking-wider"
                                            >
                                                View Cart
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); navigate("/checkout"); }}
                                                className="w-full py-3.5 bg-[#f17840] text-white rounded-[5px] font-black text-[13px] hover:bg-[#e06b35] transition-colors shadow-md uppercase tracking-wider"
                                            >
                                                Checkout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-2.5 cursor-pointer group pr-2" onClick={() => navigate("/my-account")}>
                            <div className="bg-gray-50 dark:bg-[#151618] p-2.5 rounded-full group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20 transition-colors duration-300">
                                <User size={24} className="text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors" strokeWidth={1.5} />
                            </div>
                            <div className="hidden 2xl:flex flex-col">
                                <span className="text-[14px] font-bold text-[#253d4e] dark:!text-white group-hover:text-[#f17840] transition-colors">
                                    {localStorage.getItem("token") ? JSON.parse(localStorage.getItem("user") || "{}").name || "Account" : "Account"}
                                </span>
                                {localStorage.getItem("token") && (
                                    <span
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            localStorage.removeItem("token");
                                            localStorage.removeItem("user");
                                            navigate("/my-account");
                                        }}
                                        className="text-[11px] text-[#f17840] hover:underline font-black uppercase tracking-widest"
                                    >
                                        Logout
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Overlay Drawer */}
            <div
                className={`fixed inset-0 bg-black/50 z-[200] transition-opacity duration-300 lg:hidden ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setMobileOpen(false)}
            >
                <div
                    className={`absolute right-0 top-0 h-full w-[300px] bg-white dark:bg-[#0b0c0d] shadow-2xl transform transition-transform duration-300 overflow-y-auto ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-8">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/logo.webp"
                            alt="logo"
                            className="h-8 dark:brightness-0 dark:invert cursor-pointer"
                            onClick={() => { navigate("/"); setMobileOpen(false); }}
                        />
                            <div
                                className="w-10 h-10 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-950/20 group transition-colors"
                                onClick={() => setMobileOpen(false)}
                            >
                                <FaTimes size={18} className="text-gray-500 group-hover:text-[#f17840]" />
                            </div>
                        </div>

                        <div className="space-y-1">
                            {menuItems.map((item) => {
                                const isExpanded = activeMobileSubmenu === item.name;
                                const hasSubmenu = item.submenu.length > 0;

                                return (
                                    <div key={item.name} className="border-b border-gray-50 dark:border-gray-800/50 last:border-0">
                                        <div
                                            className={`flex items-center justify-between py-4 cursor-pointer transition-colors ${isExpanded ? "text-[#f17840]" : "text-[#253d4e] dark:text-white"}`}
                                            onClick={() => {
                                                if (hasSubmenu) {
                                                    setActiveMobileSubmenu(isExpanded ? null : item.name);
                                                } else {
                                                    handleSubmenuClick(item.name);
                                                    setMobileOpen(false);
                                                }
                                            }}
                                        >
                                            <span className="text-[16px] font-black">{item.name}</span>
                                            {hasSubmenu && (
                                                <ChevronDown
                                                    size={16}
                                                    className={`transition-transform duration-300 text-gray-400 ${isExpanded ? "rotate-180 text-[#f17840]" : ""}`}
                                                />
                                            )}
                                        </div>

                                        {/* Submenu Level 1 */}
                                        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-[1000px] opacity-100 mb-4" : "max-h-0 opacity-0"}`}>
                                            <div className="pl-4 space-y-1">
                                                {item.submenu.map((sub, i) => {
                                                    const hasNested = typeof sub === "object" && sub.submenu;
                                                    const subName = hasNested ? sub.name : sub;
                                                    const isNestedExpanded = activeMobileNestedSubmenu === subName;

                                                    return (
                                                        <div key={i}>
                                                            <div
                                                                className={`flex items-center justify-between py-3 cursor-pointer text-[14px] font-bold ${isNestedExpanded ? "text-[#f17840]" : "text-gray-600 dark:text-gray-400 hover:text-[#f17840]"}`}
                                                                onClick={() => {
                                                                    if (hasNested) {
                                                                        setActiveMobileNestedSubmenu(isNestedExpanded ? null : subName);
                                                                    } else {
                                                                        handleSubmenuClick(subName);
                                                                        setMobileOpen(false);
                                                                    }
                                                                }}
                                                            >
                                                                <span>{subName}</span>
                                                                {hasNested && (
                                                                    <ChevronDown
                                                                        size={14}
                                                                        className={`transition-transform duration-300 ${isNestedExpanded ? "rotate-180" : ""}`}
                                                                    />
                                                                )}
                                                            </div>

                                                            {/* Nested Submenu Level 2 */}
                                                            {hasNested && (
                                                                <div className={`overflow-hidden transition-all duration-300 pl-4 border-l-2 border-orange-50 dark:border-orange-950/20 ${isNestedExpanded ? "max-h-[500px] opacity-100 mb-2 mt-1" : "max-h-0 opacity-0"}`}>
                                                                    {sub.submenu.map((nested, j) => (
                                                                        <div
                                                                            key={j}
                                                                            className="py-2.5 text-[13px] font-bold text-gray-500 dark:text-gray-500 hover:text-[#f17840] cursor-pointer"
                                                                            onClick={() => {
                                                                                handleSubmenuClick(nested);
                                                                                setMobileOpen(false);
                                                                            }}
                                                                        >
                                                                            {nested}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-10 pt-10 border-t border-gray-100 dark:border-gray-800 space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-[#151618] rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20">
                                    <FaPhoneAlt size={16} className="text-[#f17840]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Call Us</p>
                                    <p className="text-[17px] font-black text-[#253d4e] dark:text-white">+11 222 3333</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-[#151618] rounded-full flex items-center justify-center border border-gray-100 dark:border-gray-800 transition-colors group-hover:bg-orange-50 dark:group-hover:bg-orange-950/20">
                                    <FaEnvelope size={16} className="text-[#f17840]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Email Us</p>
                                    <p className="text-[17px] font-black text-[#253d4e] dark:text-white">hello@torado.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
