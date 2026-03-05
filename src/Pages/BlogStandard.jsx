import { ChevronLeft, ChevronRight, MessageSquare, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";      

const BlogStandard = () => {
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

    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section */}
            <div className="relative h-[300px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/page-title-bg/page-title-bg-1.webp')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#411151]/85"></div>

                <div className="relative z-10">
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Blog</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Blog</span>
                    </div>
                </div>
            </div>

            {/* Blog Grid Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <div key={post.id} className="group">
                            {/* Image Container */}
                            <div className="relative rounded-2xl overflow-hidden mb-6">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
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

            <Footer />
            <StickyActions />
        </div>
    );
};

export default BlogStandard;