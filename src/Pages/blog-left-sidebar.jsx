import { ChevronLeft, ChevronRight, MessageSquare, Search, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";

const BlogLeftSidebar = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Powerful Drill For Best Performance With Screwdriver",
            author: "Michel Jhon",
            comments: "03 Comment",
            date: "22",
            month: "June",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-1.webp",
        },
        {
            id: 2,
            title: "Why We Used One Of The Best Corded Drill Power Tools",
            author: "Dunaid Kim",
            comments: "05 Comment",
            date: "20",
            month: "June",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-2.webp",
        },
        {
            id: 3,
            title: "The Most Advanced Quality Tools For Welding Work",
            author: "Jhon Dow",
            comments: "01 Comment",
            date: "15",
            month: "June",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-3.webp",
        },
        {
            id: 4,
            title: "How To Buy High Quality Tools With Cheapest Rate?",
            author: "Michel Jhon",
            comments: "02 Comment",
            date: "13",
            month: "June",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-4.webp",
        },
        {
            id: 5,
            title: "Why We Use Best Store Hand Tools for work?",
            author: "Michel Shon",
            comments: "03 Comment",
            date: "10",
            month: "June",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-5.webp",
        },
        {
            id: 6,
            title: "Why You Need Any Popular Brand Tools for Your Future",
            author: "Tony Stark",
            comments: "01 Comment",
            date: "06",
            month: "June",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-6.webp",
        },
    ];

    const popularPosts = [
        {
            id: 1,
            title: "Powerful Drill Best Performance Cordless Screwdriver",
            date: "28 June, 2025",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-7.webp",
        },
        {
            id: 2,
            title: "Why We Used Best Hand Tools for used?",
            date: "15 June, 2025",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-8.webp",
        },
        {
            id: 3,
            title: "Best Thoughtful Gift Ideas For Your Girlfriend",
            date: "10 June, 2025",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-9.webp",
        },
    ];

    const categories = [
        "Machine Tools",
        "Hand Tools",
        "Abrasive",
        "Power Tools",
        "Measuring Tools",
    ];

    const tags = ["Power Tools", "Hand Tools", "Safety", "Cordless", "Gardening", "Machine"];

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section */}
            <div className="relative h-[300px] flex flex-col items-center justify-center text-center px-4 overflow-hidden leading-tight uppercase font-black tracking-tight text-white mb-4">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/page-title-bg/page-title-bg-1.webp')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#411151]/85"></div>

                <div className="relative z-10 flex flex-col items-center">
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4">Blog</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white normal-case">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Blog</span>
                    </div>
                </div>
            </div>

            {/* Blog Main Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Sidebar */}
                    <aside className="w-full lg:w-[32%] space-y-12 order-2 lg:order-1">
                        {/* Search Widget */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Search" 
                                    className="w-full px-5 py-4 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-lg text-sm focus:outline-none focus:border-[#f17840] font-medium"
                                />
                                <button className="absolute right-0 top-0 h-full px-5 bg-[#f17840] text-white rounded-r-lg hover:bg-[#e06b35] transition-colors">
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Popular Posts Widget */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-[22px] font-black text-[#253d4e] dark:text-white mb-6 flex flex-col relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-[#f17840]">
                                Popular Posts
                            </h3>
                            <div className="space-y-6">
                                {popularPosts.map(post => (
                                    <div key={post.id} className="flex gap-4 group cursor-pointer">
                                        <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-[13px] font-bold text-gray-400 mb-1">{post.date}</p>
                                            <h4 className="text-[15px] font-black text-[#253d4e] dark:text-white leading-tight group-hover:text-[#f17840] transition-colors line-clamp-2">
                                                {post.title}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Categories Widget */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-[22px] font-black text-[#253d4e] dark:text-white mb-6 flex flex-col relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-[#f17840]">
                                Categories
                            </h3>
                            <ul className="space-y-4">
                                {categories.map((cat, idx) => (
                                    <li key={idx} className="flex items-center gap-3 group cursor-pointer border-b border-gray-100 dark:border-gray-800 pb-3 last:border-0 last:pb-0">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#f17840]" />
                                        <span className="text-[15px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-[#f17840] transition-colors">
                                            {cat}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Popular Tags Widget */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-2xl border border-gray-100 dark:border-gray-800">
                            <h3 className="text-[22px] font-black text-[#253d4e] dark:text-white mb-6 flex flex-col relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-1 after:bg-[#f17840]">
                                Popular Tags
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {tags.map((tag, idx) => (
                                    <span key={idx} className="px-5 py-2.5 bg-white dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-md text-[13px] font-bold text-gray-500 dark:text-gray-400 hover:bg-[#f17840] hover:text-white hover:border-[#f17840] cursor-pointer transition-all">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Right Content Area */}
                    <div className="w-full lg:w-[68%] order-1 lg:order-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {blogPosts.map((post) => (
                                <div key={post.id} className="group">
                                    {/* Image Container */}
                                    <div className="relative rounded-2xl overflow-hidden mb-6">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-auto aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        {/* Date Badge */}
                                        <div className="absolute top-4 left-4 bg-white dark:bg-[#1a1c1e] px-4 py-2 rounded-lg text-center shadow-lg border border-orange-50 dark:border-gray-800">
                                            <p className="text-[20px] font-black text-[#f17840] leading-none mb-1">{post.date}</p>
                                            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">{post.month}</p>
                                        </div>
                                    </div>

                                    {/* Post Meta */}
                                    <div className="flex items-center gap-6 mb-4">
                                        <div className="flex items-center gap-2 text-[#7e7e7e] dark:text-gray-400 font-bold text-sm">
                                            <User size={16} className="text-[#f17840]" />
                                            <span className="hover:text-[#f17840] cursor-pointer transition-colors">{post.author}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#7e7e7e] dark:text-gray-400 font-bold text-sm">
                                            <MessageSquare size={16} className="text-[#f17840]" />
                                            <span className="hover:text-[#f17840] cursor-pointer transition-colors">{post.comments}</span>
                                        </div>
                                    </div>

                                    {/* Post Title */}
                                    <h3 className="text-[20px] md:text-[22px] font-black text-[#253d4e] dark:text-white mb-4 leading-tight group-hover:text-[#f17840] transition-colors duration-300 cursor-pointer">
                                        {post.title}
                                    </h3>

                                    {/* Read More Link */}
                                    <Link to="/blog-details" className="inline-block text-[15px] font-black text-[#253d4e] dark:text-white hover:text-[#f17840] transition-colors uppercase tracking-tight">
                                        Read More
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center gap-3 mt-16">
                            <button className="w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#f17840] hover:text-white hover:border-[#f17840] transition-all duration-300">
                                <ChevronLeft size={20} />
                            </button>
                            {[1, 2, 3].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-black transition-all duration-300 ${currentPage === page
                                            ? "bg-[#f17840] text-white"
                                            : "bg-gray-50 dark:bg-[#151618] text-gray-600 dark:text-gray-400 hover:bg-[#f17840] hover:text-white"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="w-10 h-10 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#f17840] hover:text-white hover:border-[#f17840] transition-all duration-300">
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
            <StickyActions />
        </div>
    );
};

export default BlogLeftSidebar;
