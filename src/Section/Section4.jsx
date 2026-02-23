import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import {
    FiHeart, FiMaximize, FiRefreshCw,
} from "react-icons/fi";


const products = [
    {
        id: 1,
        title: "High Power Carbon Steel Hammer Multifunctional Drill",
        price: 300,
        oldPrice: 400,
        tag: "Sale",
        tagColor: "bg-red-500",
        image:
            "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-7.webp",
        ratings: "2k+ Ratings",
    },
    {
        id: 2,
        title: "Electric Hand Planner 4/3 Inch Drill Machine",
        price: 400,
        oldPrice: 500,
        tag: "New",
        tagColor: "bg-green-500",
        image:
            "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-4.webp",
        ratings: "7k+ Ratings",
    },
    {
        id: 3,
        title: "High Quality Electric Hand Planner 4/3 Inch Drill",
        price: 200,
        oldPrice: 300,
        tag: "10% Off",
        tagColor: "bg-red-400",
        image:
            "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-5.webp",
        ratings: "1k+ Ratings",
    },
    {
        id: 4,
        title: "Heavy Duty Professional Rotary Hammer Drill",
        price: 350,
        oldPrice: 450,
        tag: "Sale",
        tagColor: "bg-red-500",
        image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-12.webp",
        ratings: "3k+ Ratings",
    },
    {
        id: 5,
        title: "Compact Cordless Driver Drill with Case",
        price: 150,
        oldPrice: 200,
        tag: "New",
        tagColor: "bg-green-500",
        image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-2.webp",
        ratings: "5k+ Ratings",
    },
    {
        id: 6,
        title: "Electric Bench Grinder with Eye Shields",
        price: 280,
        oldPrice: 350,
        tag: "15% Off",
        tagColor: "bg-red-400",
        image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-3.webp",
        ratings: "1.5k+ Ratings",
    }
];

const Section4 = () => {
    const sliderRef = useRef(null);

    const repeatedProducts = [
        ...products,
        ...products,
        ...products,
    ];

    // Set initial scroll position to the middle to allow bidirectional infinite scrolling
    React.useEffect(() => {
        if (sliderRef.current) {
            const { scrollWidth } = sliderRef.current;
            sliderRef.current.scrollLeft = scrollWidth / 3;
        }
    }, []);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth } = sliderRef.current;
        const setWidth = scrollWidth / 3;

        // Seamless teleportation
        if (scrollLeft <= 0) {
            // If we hit the absolute start, jump to the middle set's start
            sliderRef.current.scrollTo({ left: setWidth, behavior: 'auto' });
        } else if (scrollLeft >= setWidth * 2) {
            // If we hit the start of the third set, jump back to the start of the second set
            sliderRef.current.scrollTo({ left: setWidth, behavior: 'auto' });
        }
    };

    const scroll = (direction) => {
        if (sliderRef.current) {
            const cardWidth = 320;
            sliderRef.current.scrollBy({
                left: direction === "left" ? -cardWidth : cardWidth,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="bg-white dark:bg-[#0b0c0d] py-10 md:py-16 px-4 md:px-6 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-stretch">

                {/* ================= LEFT PRODUCTS SLIDER ================= */}
                <div className="md:col-span-3 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-[#253d4e] dark:text-white">
                            Featured Products
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-10 h-10 rounded-full border border-gray-200 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                            >
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div
                        ref={sliderRef}
                        onScroll={handleScroll}
                        className="flex gap-6 overflow-x-auto no-scrollbar pb-4 h-full"
                    >
                        {repeatedProducts.map((product, idx) => (
                            <div
                                key={idx}
                                className="min-w-[260px] md:min-w-[300px] group relative bg-white dark:bg-[#151618] rounded-xl p-5 md:p-6 shadow dark:shadow-none border transition duration-300 flex flex-col transition-colors"
                            >
                                {/* Tag */}
                                <span
                                    className={`absolute top-4 left-4 text-white text-[11px] font-bold px-3 py-1 rounded-[3px] uppercase tracking-wider z-20 ${product.tagColor}`}
                                >
                                    {product.tag}
                                </span>

                                {/* Hover Icons */}
                                <div className="absolute top-6 right-4 flex flex-col gap-3 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                                    <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1c1e] rounded-full shadow dark:text-white hover:bg-orange-500 hover:text-white transition">
                                        <FiHeart size={18} />
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1c1e] rounded-full shadow dark:text-white hover:bg-orange-500 hover:text-white transition">
                                        <FiRefreshCw size={18} />
                                    </button>
                                    <button className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1c1e] rounded-full shadow dark:text-white hover:bg-orange-500 hover:text-white transition">
                                        <FiMaximize size={18} />
                                    </button>
                                </div>

                                {/* Image */}
                                <div className="bg-[#f8f9fa] dark:bg-[#0b0c0d] rounded-lg p-6 mb-6 flex items-center justify-center h-[200px] overflow-hidden group-hover:bg-white dark:group-hover:bg-[#1a1c1e] transition-colors duration-500">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-40 object-contain transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Details Container */}
                                <div className="flex flex-col flex-grow">
                                    {/* Price */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-orange-500 font-extrabold text-[20px]">
                                            ${product.price}
                                        </span>
                                        <span className="line-through text-gray-400 dark:text-gray-500 text-sm font-medium">
                                            ${product.oldPrice}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-[#253d4e] dark:text-white font-bold text-[16px] leading-[1.3] mb-3 line-clamp-2 min-h-[42px] group-hover:text-orange-500 transition-colors">
                                        {product.title}
                                    </h3>

                                    {/* Rating */}
                                    <div className="flex items-center gap-1 mb-6">
                                        <div className="flex items-center text-yellow-500">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-[14px]">★</span>
                                            ))}
                                        </div>
                                        <span className="text-gray-400 dark:text-gray-500 text-[13px] font-medium ml-1">
                                            ({product.ratings})
                                        </span>
                                    </div>

                                    {/* Button */}
                                    <button className="mt-auto w-fit px-8 py-2.5 bg-white dark:bg-transparent text-orange-500 border border-gray-100 rounded-[5px] font-bold text-[14px] transition-all duration-300 hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-sm">
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ================= RIGHT TRENDING SECTION ================= */}
                <div className="md:col-span-1 bg-white md:bg-orange-50 dark:bg-[#151618] rounded-xl p-6 md:p-8 flex flex-col justify-between group h-auto shadow-sm md:shadow-none border transition-colors duration-300">
                    <div>
                        <p className="text-orange-500 uppercase text-xs font-bold tracking-widest mb-2">
                            Trending Product
                        </p>
                        <h3 className="text-2xl font-black text-[#253d4e] dark:text-white mt-2 mb-8 leading-tight">
                            Magnetic Impact Power
                        </h3>
                        <button className="bg-white dark:bg-[#f17840] text-[#253d4e] dark:text-white font-bold duration-500 px-8 py-3 rounded hover:bg-orange-500 dark:hover:bg-[#e06b35] hover:text-white transition shadow-sm border border-transparent">
                            Shop Now
                        </button>
                    </div>

                    <div className="mt-10 overflow-hidden flex-grow flex items-end justify-center">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-3.webp"
                            alt="Trending Product"
                            className="w-full h-auto max-h-[450px] object-contain object-bottom"
                        />
                    </div>
                </div>
            </div>

            {/* CSS to hide scrollbar */}
            <style dangerouslySetInnerHTML={{
                __html: `
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `
            }} />
        </div>
    );
};

export default Section4;
