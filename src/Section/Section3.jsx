import { ChevronLeft, ChevronRight, GitCompare, Heart, Maximize, Star } from "lucide-react";
import React, { useRef } from "react";
// Product Card Component
const ProductCard = ({ product }) => (
    <div className="group relative bg-white dark:bg-[#151618] rounded-[10px] p-5 border border-gray-100 dark:border-none hover:border-[#f17840]/30 transition-all duration-500 flex flex-col h-full">
        <div className="absolute top-4 left-4 z-10">
            <span className="bg-[#21bf73] text-white text-[12px] font-bold px-3 py-1 rounded-[5px]">
                {product.discount}% Off
            </span>
        </div>

        <div className="relative bg-[#f8f9fa] dark:bg-white rounded-[10px] p-8 mb-6 overflow-hidden flex items-center justify-center min-h-[250px] transition-colors duration-300">
            <img
                src={product.image}
                alt={product.name}
                className="h-[180px] w-auto object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-[-60px] group-hover:right-4 transition-all duration-500 flex flex-col gap-2 z-20">
                <button className="w-10 h-10 bg-white dark:bg-[#1a1c1e] shadow-sm rounded-full flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white transition-all duration-300">
                    <Heart size={18} />
                </button>
                <button className="w-10 h-10 bg-white dark:bg-[#1a1c1e] shadow-sm rounded-full flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white transition-all duration-300">
                    <GitCompare size={18} />
                </button>
                <button className="w-10 h-10 bg-white dark:bg-[#1a1c1e] shadow-sm rounded-full flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white transition-all duration-300">
                    <Maximize size={18} />
                </button>
            </div>
        </div>

        <div className="flex flex-col flex-grow">
            <div className="flex items-center gap-3 mb-3">
                <span className="text-[#f17840] text-xl font-extrabold">${product.price}</span>
                <span className="text-gray-400 dark:text-gray-500 line-through text-base font-medium">${product.oldPrice}</span>
            </div>

            <h3 className="text-[#253d4e] dark:text-white font-extrabold text-[17px] leading-tight mb-4 line-clamp-2">
                {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-[#ffc107]">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                    ))}
                </div>
                <span className="text-gray-400 dark:text-gray-500 text-sm font-medium">({product.reviews} Ratings)</span>
            </div>

            <div className="relative group/btn overflow-hidden w-full h-[50px]">
                <button className="w-full h-full bg-white dark:bg-transparent text-[#f17840] rounded-[5px] font-bold text-[15px] transition-all duration-700 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center gap-2">
                    Add To Cart
                </button>
                <div className="absolute top-10 -right-20 rounded-[5px] w-full h-full bg-[#f17840] opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 text-center flex items-center justify-center font-bold text-white text-[15px] cursor-pointer">
                    Add To Cart
                </div>
            </div>
        </div>
    </div>
);

// Continuous Infinite Slider Section
const Section3 = () => {
    const sliderRef = useRef(null);

    const products = [
        {
            id: 1,
            name: "High Quality Electric Hand Planner 4/3 Inch Drill",
            price: 100,
            oldPrice: 120,
            discount: 15,
            rating: 5,
            reviews: "5k+",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-12.webp",
        },
        {
            id: 2,
            name: "Professional Cordless Drill Machine with Extra Battery",
            price: 150,
            oldPrice: 180,
            discount: 20,
            rating: 4.8,
            reviews: "3k+",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-4.webp",
        },
        {
            id: 3,
            name: "Handheld Power Sander with Dust Collection Bag",
            price: 85,
            oldPrice: 110,
            discount: 25,
            rating: 4.5,
            reviews: "2k+",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-2.webp",
        },
        {
            id: 4,
            name: "Electric Bench Grinder with Eye Shields & Tool Rest",
            price: 200,
            oldPrice: 240,
            discount: 16,
            rating: 4.9,
            reviews: "1k+",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-3.webp",
        },
    ];

    // Repeat products for seamless scroll
    const repeatedProducts = [...products, ...products, ...products,];

    // Initialize scroll position to the middle copy for seamless start
    React.useEffect(() => {
        if (sliderRef.current) {
            const { scrollWidth } = sliderRef.current;
            sliderRef.current.scrollLeft = scrollWidth / 3;
        }
    }, []);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const setWidth = scrollWidth / 3;

        // Seamess loop: Jump back/forward by exactly one set width when approaching ends
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            // Hit right end, shift back by one set width
            sliderRef.current.scrollLeft = scrollLeft - setWidth;
        } else if (scrollLeft <= 10) {
            // Hit left end, shift forward by one set width
            sliderRef.current.scrollLeft = scrollLeft + setWidth;
        }
    };

    // Manual scroll with buttons
    const scroll = (direction) => {
        if (sliderRef.current) {
            const cardWidth = 332; // card width + gap
            sliderRef.current.scrollBy({
                left: direction === "left" ? -cardWidth : cardWidth,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="w-full bg-white dark:bg-[#0b0c0d] py-16 px-4 md:px-6 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto">
                {/* Header with navigation */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-[32px] font-black text-[#253d4e] dark:text-white">New Arrivals</h2>
                    <div className="flex gap-3">
                        <button
                            onClick={() => scroll("left")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white hover:border-[#f17840] transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white hover:border-[#f17840] transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Slider - Updated with onScroll and removed scroll-smooth from container */}
                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex gap-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-4"
                >
                    {repeatedProducts.map((product, idx) => (
                        <div key={idx} className="inline-block min-w-[300px]">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>

                {/* Promo Cards Section */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Card 1 */}
                    <div className="relative overflow-hidden bg-[#f3f4f9] dark:bg-white rounded-[15px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between group min-h-[300px] transition-colors duration-300">
                        <div className="z-10 text-center md:text-left relative">
                            <span className="text-[#f17840] font-bold text-xs md:text-sm tracking-[2px] uppercase mb-4 block">New Arrivals</span>
                            <h3 className="text-[#253d4e] dark:text-[#253d4e] font-black text-2xl md:text-2xl lg:text-3xl mb-4 leading-tight max-w-[200px]">
                                Wall Polishing Square Box
                            </h3>
                            <p className="text-gray-500 dark:text-gray-600 text-sm md:text-base mb-8">In accessories At Best Price</p>
                            <div className="relative group overflow-hidden w-fit">
                                <button className="bg-white dark:bg-[#f17840] group-hover:bg-[#f17840] group-hover:text-white 
                               text-[#253d4e] px-8 py-3  
                               rounded-[5px] font-bold text-sm shadow-sm 
                               transition-all duration-700 w-fit cursor-pointer uppercase">
                                    <p>Shop Now</p>
                                </button>
                                <div className="absolute top-10 -right-20 rounded-[5px] w-full h-full bg-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-white text-sm cursor-pointer uppercase">
                                    Shop Now
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-8 md:mt-0 flex items-center justify-center">
                            <img
                                src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-1.webp"
                                alt="Wall Polishing Square Box"
                                className="h-[180px] md:h-[220px] lg:h-[260px] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute -bottom-2 -left-2 md:bottom-10 md:left-14 bg-[#ff4b4b] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center font-black text-[14px] md:text-[16px] leading-tight shadow-xl ring-4 ring-white transition-transform duration-500 group-hover:rotate-[360deg]">
                                <span>10%</span>
                                <span>Off</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="relative overflow-hidden bg-[#edf4f3] dark:bg-white rounded-[15px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between group min-h-[300px] transition-colors duration-300">
                        <div className="z-10 text-center md:text-left relative">
                            <span className="text-[#f17840] font-bold text-xs md:text-sm tracking-[2px] uppercase mb-4 block">Flash Deals</span>
                            <h3 className="text-[#253d4e] dark:text-[#253d4e] font-black text-2xl md:text-2xl lg:text-3xl mb-4 leading-tight max-w-[250px]">
                                Adjustable Hand Rubber Tools
                            </h3>
                            <p className="text-gray-500 dark:text-gray-600 text-sm md:text-base mb-8">In accessories At Best Price</p>
                            <div className="relative group overflow-hidden w-fit">
                                <button className="bg-[#f17840] group-hover:bg-white dark:group-hover:bg-white text-white group-hover:text-[#f17840] dark:group-hover:text-[#253d4e] px-8 py-3 rounded-[5px] font-extrabold text-sm transition-all duration-700 w-fit cursor-pointer shadow-sm border border-transparent uppercase">
                                    <p>Shop Now</p>
                                </button>
                                <div className="absolute top-10 -right-20 rounded-[5px] w-full h-full bg-[#f17840] group-hover:bg-white dark:group-hover:bg-white opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-white group-hover:text-[#f17840] dark:group-hover:text-[#253d4e] text-sm cursor-pointer uppercase">
                                    Shop Now
                                </div>
                            </div>
                        </div>
                        <div className="relative mt-8 md:mt-0 flex items-center justify-center">
                            <img
                                src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-2.webp"
                                alt="Adjustable Hand Rubber Tools"
                                className="h-[180px] md:h-[220px] lg:h-[260px] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-[#ff4b4b] text-white w-14 h-14 md:w-16 md:h-16 rounded-full flex flex-col items-center justify-center font-black text-[14px] md:text-[16px] leading-tight shadow-xl ring-4 ring-white transition-transform duration-500 group-hover:rotate-[360deg]">
                                <span>20%</span>
                                <span>Off</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hide scrollbar */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        `
            }} />
        </section>
    );
};

export default Section3;
