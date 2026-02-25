import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useRef } from "react";

const DealProductCard = ({ image, price, oldPrice, title, ratings }) => (
    <div className="snap-start flex flex-col md:flex-row gap-5 bg-white dark:bg-[#151618] p-5 md:p-3 transition-all duration-300 group rounded-xl md:border-transparent h-full w-full">
        <div className="w-full md:w-[165px] h-[240px] md:h-[190px] bg-[#f8f9fa] dark:bg-white rounded-[10px] flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-white border-transparent group-hover:border-gray-100">
            <img
                src={image}
                alt={title}
                className="w-[85%] h-[80%] object-contain transition-transform duration-500 group-hover:scale-110"
            />
        </div>

        <div className="flex flex-col justify-center py-2 flex-grow text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1.5">
                <span className="text-[#f17840] font-bold text-[22px] md:text-[23px]">${price}</span>
                <span className="text-gray-400 dark:text-gray-500 line-through text-[14px] md:text-[15px] font-medium">${oldPrice}</span>
            </div>

            <h3 className="text-[#253d4e] dark:text-white font-bold text-[16px] md:text-[17px] leading-tight mb-3 line-clamp-2 max-w-full md:max-w-[240px] group-hover:text-[#f17840] transition-colors">
                {title}
            </h3>

            <div className="flex items-center justify-center md:justify-start gap-1 mb-5">
                <div className="flex items-center text-[#ffc107]">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                    ))}
                </div>
                <span className="text-gray-500 dark:text-gray-500 text-[12px] md:text-[13px] font-medium ml-1">({ratings})</span>
            </div>

            <div className="relative group/btn overflow-hidden w-full md:w-fit h-[45px] mt-2">
                <button className="w-full h-full px-8 bg-white dark:bg-transparent text-[#f17840] border border-gray-100 dark:border-gray-800 rounded-[5px] font-bold text-[14px] transition-all duration-700 shadow-sm flex items-center justify-center">
                    Add To Cart
                </button>
                <div className="absolute top-10 -right-20 rounded-[5px] w-full h-full bg-[#f17840] opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 text-center flex items-center justify-center font-bold text-white text-[14px] cursor-pointer">
                    Add To Cart
                </div>
            </div>
        </div>
    </div>
);

const Section5 = () => {
    const sliderRef = useRef(null);

    const dealProducts = [
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-1.webp",
            price: 230,
            oldPrice: 300,
            title: "Wall Polishing Square Sander Electric Machine Drill",
            ratings: "1k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-7.webp",
            price: 320,
            oldPrice: 400,
            title: "Rubber Handle Hand Tools Drill 12 Inch Drill Machine",
            ratings: "2k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-11.webp",
            price: 450,
            oldPrice: 500,
            title: "Professional Straight Cutting Scissor Drill Machine Tool",
            ratings: "3k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-6.webp",
            price: 200,
            oldPrice: 300,
            title: "Hammer Drill Carbon Fiber Mutifuntional Service",
            ratings: "6k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-12.webp",
            price: 450,
            oldPrice: 500,
            title: "Professional Straight Cutting Scissor Drill Machine Tool",
            ratings: "3k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-13.webp",
            price: 450,
            oldPrice: 500,
            title: "Professional Straight Cutting Scissor Drill Machine Tool",
            ratings: "3k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-13.webp",
            price: 450,
            oldPrice: 500,
            title: "Professional Straight Cutting Scissor Drill Machine Tool",
            ratings: "3k+ Ratings"
        },
        {
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-13.webp",
            price: 450,
            oldPrice: 500,
            title: "Professional Straight Cutting Scissor Drill Machine Tool",
            ratings: "3k+ Ratings"
        }
    ];

    const repeatedProducts = [
        ...dealProducts,
        ...dealProducts,
        ...dealProducts,
    ];

    const scroll = (direction) => {
        if (!sliderRef.current) return;
        const scrollAmount = sliderRef.current.clientWidth;

        sliderRef.current.scrollBy({
            left: direction === "left" ? -scrollAmount : scrollAmount,
            behavior: "smooth"
        });
    };

    // Set initial scroll position to the middle to allow bidirectional infinite scrolling
    React.useEffect(() => {
        if (sliderRef.current) {
            const { scrollWidth } = sliderRef.current;
            sliderRef.current.scrollTo({ left: scrollWidth / 3, behavior: 'auto' });
        }
    }, []);

    const handleScroll = () => {
        if (!sliderRef.current) return;
        const { scrollLeft, scrollWidth } = sliderRef.current;
        const setWidth = scrollWidth / 3;

        if (scrollLeft <= 5) {
            sliderRef.current.scrollTo({ left: setWidth, behavior: 'auto' });
        } else if (scrollLeft >= (setWidth * 2) - 5) {
            sliderRef.current.scrollTo({ left: setWidth, behavior: 'auto' });
        }
    };

    return (
        <section className="bg-white dark:bg-[#0b0c0d] py-10 md:py-14 px-4 md:px-6 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-8 items-stretch">

                {/* Promo Banner */}
                <div className="w-full lg:w-[28%] bg-[#eaf5ff] dark:bg-white rounded-[20px] p-8 md:p-10 relative overflow-hidden flex flex-col group transition-colors duration-300">
                    <div className="relative z-20 text-center md:text-left">
                        <span className="text-[#f17840] font-bold text-[13px] tracking-[2px] uppercase mb-3 block">
                            Popular Now
                        </span>
                        <h3 className="text-black dark:text-black font-extrabold text-[26px] md:text-[30px] leading-tight mb-6">
                            Good Quality Tools
                        </h3>
                        <div className="relative group overflow-hidden w-fit">
                            <button className="bg-white dark:bg-[#f17840] group-hover:bg-[#f17840] group-hover:text-white 
                           text-black dark:text-white px-8 py-3  
                           rounded-[4px] font-bold text-sm shadow-sm 
                           transition-all duration-700 w-fit cursor-pointer">
                                <p>Shop Now</p>
                            </button>
                            <div className="absolute top-10 -right-20 rounded-[4px] w-full h-full bg-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-white text-sm cursor-pointer">
                                Shop Now
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-auto relative z-10 flex justify-center">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-4.webp"
                            alt="Woman Worker"
                            className="w-[75%] md:w-[80%] h-auto max-h-[250px] md:max-h-[300px] object-contain transition-transform origin-bottom translate-y-2"
                        />
                    </div>
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-[72%] flex flex-col">
                    <div>
                        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-5">
                            <div className="flex flex-col md:flex-row items-center gap-5 text-center md:text-left">
                                <h2 className="text-[26px] md:text-[30px] font-black text-[#1a123a] dark:text-white">Flash Deals</h2>

                                <div className="bg-[#1a123a] dark:bg-[#1a1c1e] text-white px-5 py-2.5 rounded-[5px] flex items-center gap-2 font-bold text-[13px] md:text-[14px] shadow-lg">
                                    <span className="text-gray-400 font-medium whitespace-nowrap">End In</span>
                                    <span className="tracking-wider whitespace-nowrap">0 d : 0 h : 00m : 00 s</span>
                                </div>
                            </div>

                            <div className="hidden md:flex gap-2">
                                <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-400 hover:bg-[#f17840] hover:text-white transition-all shadow-sm">
                                    <ChevronLeft size={20} />
                                </button>
                                <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-100 dark:border-gray-800 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-400 hover:bg-[#f17840] hover:text-white transition-all shadow-sm">
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>

                        <div
                            ref={sliderRef}
                            onScroll={handleScroll}
                            className="grid grid-rows-1 md:grid-rows-2 grid-flow-col auto-cols-[100%] md:auto-cols-[calc(50%-12px)] gap-x-0 md:gap-x-6 gap-y-8 overflow-x-auto no-scrollbar snap-x snap-mandatory"
                        >
                            {repeatedProducts.map((p, i) => (
                                <DealProductCard key={i} {...p} />
                            ))}
                        </div>

                        <div className="flex md:hidden items-center justify-center gap-4 mt-10">
                            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full border border-gray-200 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#f17840] hover:text-white transition-all shadow-md">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full border border-gray-200 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-[#f17840] hover:text-white transition-all shadow-md">
                                <ChevronRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `
            }} />
        </section>
    );
};

export default Section5;
