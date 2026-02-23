import { Calendar, ChevronLeft, ChevronRight, Instagram, Package, RotateCcw, User, Wallet } from "lucide-react";
import React, { useRef } from "react";


const BlogCard = ({ blog }) => (
    <div className="group flex flex-col h-full">
        {/* Image Box */}
        <div className="relative overflow-hidden rounded-[10px] mb-6 aspect-[16/10]">
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
        </div>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
                <User size={16} className="text-[#f17840]" />
                <span className="text-[#7e7e7e] dark:text-gray-400 text-[14px] font-medium transition-colors group-hover:text-[#f17840] cursor-pointer">
                    {blog.author}
                </span>
            </div>
            <div className="w-px h-3 bg-gray-200" />
            <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#f17840]" />
                <span className="text-[#7e7e7e] dark:text-gray-400 text-[14px] font-medium">
                    {blog.date}
                </span>
            </div>
        </div>

        {/* Title */}
        <h3 className="text-[#253d4e] dark:text-white font-black text-[22px] leading-tight mb-6 line-clamp-2 cursor-pointer transition-colors hover:text-[#f17840]">
            {blog.title}
        </h3>

        {/* Read More Button */}
        <div className="mt-auto">
            <button className="bg-[#f8f9fa] dark:bg-[#151618] text-[#253d4e] dark:text-white font-extrabold py-3 px-10 rounded-[5px] transition-all duration-300 hover:bg-[#f17840] hover:text-white cursor-pointer text-[15px] border border-transparent">
                Read More
            </button>
        </div>
    </div>
);

const Section8 = () => {
    const sliderRef = useRef(null);

    const features = [
        {
            icon: <Package size={42} className="text-[#f17840]" />,
            title: "Worldwide Shipping",
            desc: "24/7 customer support available",
        },
        {
            icon: <RotateCcw size={42} className="text-[#f17840]" />,
            title: "Easy 30 Days Return",
            desc: "Pay with the world's top payment",
        },
        {
            icon: <Wallet size={42} className="text-[#f17840]" />,
            title: "Money Back Guarantee",
            desc: "Pay through most trusted method",
        },
    ];

    const blogs = [
        {
            id: 1,
            author: "Michel Jhon",
            date: "28 Jun, 2025",
            title: "Powerful Drill For Best Performance With Screwdriver",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-1.webp"
        },
        {
            id: 2,
            author: "Dunaid Kim",
            date: "22 Jun, 2025",
            title: "Why We Used One Of The Best Corded Drill Power Tools",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-2.webp"
        },
        {
            id: 3,
            author: "Jhon Dow",
            date: "17 Jun, 2025",
            title: "The Most Advanced Quality Tools For Welding Work",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-3.webp"
        },
        {
            id: 4,
            author: "S. Smith",
            date: "10 Jun, 2025",
            title: "How To Choose The Right Tools For Your Project",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-4.webp"
        }
    ];

    // Repeat blogs for seamless scroll
    const repeatedBlogs = [...blogs, ...blogs, ...blogs];

    // Initialize to middle copy
    React.useEffect(() => {
        if (sliderRef.current) {
            const { scrollWidth } = sliderRef.current;
            sliderRef.current.scrollLeft = scrollWidth / 3;
        }
    }, []);

    const handleInfiniteScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const setWidth = scrollWidth / 3;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            sliderRef.current.scrollLeft = scrollLeft - setWidth;
        } else if (scrollLeft <= 5) {
            sliderRef.current.scrollLeft = scrollLeft + setWidth;
        }
    };

    const scroll = (direction) => {
        if (!sliderRef.current) return;
        const width = sliderRef.current.clientWidth;
        let scrollAmount = width;
        if (window.innerWidth >= 1024) scrollAmount = width / 3;
        else if (window.innerWidth >= 768) scrollAmount = width / 2;

        sliderRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    return (
        <section className="w-full bg-white dark:bg-[#0b0c0d] py-16 px-4 md:px-6 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-[32px] font-black text-[#253d4e] dark:text-white">From The Blog</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-[#f17840] hover:text-white transition group"
                        >
                            <ChevronLeft size={20} className="text-gray-400 group-hover:text-white" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-[#f17840] hover:text-white transition group"
                        >
                            <ChevronRight size={20} className="text-gray-400 group-hover:text-white" />
                        </button>
                    </div>
                </div>

                {/* Horizontal Slider with Infinity Loop */}
                <div
                    ref={sliderRef}
                    onScroll={handleInfiniteScroll}
                    className="flex gap-8 overflow-x-auto no-scrollbar mb-16"
                >
                    {repeatedBlogs.map((blog, idx) => (
                        <div key={idx} className="min-w-full md:min-w-[calc(50%-16px)] lg:min-w-[calc(33.333%-22px)]">
                            <BlogCard blog={blog} />
                        </div>
                    ))}
                </div>

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16 px-2">
                    {features.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#f8f9fa] dark:bg-[#151618] rounded-xl p-8 flex items-center gap-6 hover:shadow-lg transition-all duration-300 border border-transparent dark:border-none hover:border-orange-100 dark:hover:border-orange-900/30"
                        >
                            <div className="flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-[#253d4e] dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-[14px] mt-1 font-medium">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Infinite Auto-Scrolling Image Gallery */}
                <div className="w-full relative overflow-hidden py-6">
                    <div className="flex animate-scroll whitespace-nowrap gap-3 hover:[animation-play-state:paused]">
                        {[...Array(3)].map((_, i) => (
                            <React.Fragment key={i}>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                                    <a
                                        key={`${i}-${num}`}
                                        href={`https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/instagram/insta-${num}.webp`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-shrink-0 w-[240px] h-[180px] rounded-[10px] overflow-hidden relative group/insta cursor-pointer block border border-transparent dark:border-none"
                                    >
                                        <img
                                            src={`https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/instagram/insta-${num}.webp`}
                                            alt={`Gallery ${num}`}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/insta:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/insta:opacity-100 transition-all duration-300 flex items-center justify-center">
                                            <div className="w-12 h-12 bg-[#f17840] rounded-full flex items-center justify-center text-white transform scale-50 group-hover/insta:scale-100 transition-transform duration-300 shadow-lg">
                                                <Instagram size={24} />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* Styles for scrollbars and infinite animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-240px * 8 - 0.75rem * 8)); }
                }
                .animate-scroll {
                    display: flex;
                    width: max-content;
                    animation: scroll 40s linear infinite;
                }
                `
            }} />
        </section>
    );
};

export default Section8;
