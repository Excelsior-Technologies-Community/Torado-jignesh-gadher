import {
    ChevronLeft,
    ChevronRight,
    Hammer,
    Layout,
    Power,
    Settings,
    Shield,
    Wrench
} from "lucide-react";
import { useEffect, useRef } from "react";
import React from "react";

const Section2 = () => {
    const scrollRef = useRef(null);

    const baseCategories = [
        { name: "Bull's Eye Level", items: 25, Icon: Shield },
        { name: "Drill Drivers", items: 9, Icon: Wrench },
        { name: "Compact", items: 9, Icon: Settings },
        { name: "Gasoline Generators", items: 8, Icon: Power },
        { name: "Hammer Drills", items: 13, Icon: Hammer },
        { name: "Grind Tools", items: 12, Icon: Layout },
    ];

    // Triple the items for infinite slider effect
    const categories = [...baseCategories, ...baseCategories, ...baseCategories];

    useEffect(() => {
        if (scrollRef.current) {
            const container = scrollRef.current;
            const singleSetWidth = container.scrollWidth / 3;
            container.scrollLeft = singleSetWidth;
        }
    }, []);

    const handleInfiniteScroll = () => {
        if (!scrollRef.current) return;
        const container = scrollRef.current;
        const singleSetWidth = container.scrollWidth / 3;

        if (container.scrollLeft >= singleSetWidth * 2) {
            container.scrollLeft -= singleSetWidth;
        } else if (container.scrollLeft <= 0) {
            container.scrollLeft += singleSetWidth;
        }
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth / 2;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: "smooth"
            });
        }
    };

    return (
        <section className="w-full bg-white py-14 px-4 md:px-10 lg:px-16 overflow-hidden">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-[28px] md:text-[32px] font-black text-black">
                        Trending Categories
                    </h2>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll('left')}
                            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#f8f9fa] text-black hover:bg-[#f17840] hover:text-white transition-all duration-300"
                        >
                            <ChevronLeft size={22} />
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            className="w-11 h-11 flex items-center justify-center rounded-full bg-[#f8f9fa] text-black hover:bg-[#f17840] hover:text-white transition-all duration-300"
                        >
                            <ChevronRight size={22} />
                        </button>
                    </div>
                </div>

                {/* Categories Slider */}
                <div
                    ref={scrollRef}
                    onScroll={handleInfiniteScroll}
                    className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth no-scrollbar"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {categories.map((category, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center group cursor-pointer min-w-[200px] flex-shrink-0"
                        >
                            {/* Card Box */}
                            <div className="w-full aspect-square bg-[#f8f9fa] rounded-[5px] flex items-center justify-center mb-5 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-lg group-hover:bg-white border border-transparent group-hover:border-gray-100">
                                <category.Icon
                                    strokeWidth={1.2}
                                    className="w-20 h-20 text-black group-hover:text-[#f17840] transition-colors duration-300"
                                />
                            </div>

                            {/* Text Info */}
                            <div className="text-center">
                                <h3 className="font-extrabold text-[17px] text-black mb-1 group-hover:text-[#f17840] transition-colors whitespace-nowrap">
                                    {category.name}
                                </h3>
                                <p className="text-[14px] text-gray-400 font-medium">
                                    ({category.items} Items)
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            ` }} />
        </section>
    );
};

export default Section2;

