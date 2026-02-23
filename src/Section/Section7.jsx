import React from 'react';

const Section7 = () => {

    const sections = [
        {
            title: "Special Offer",
            products: [
                {
                    id: 1,
                    title: "Cordless Drill Professional Combo Drill And Screwdriver",
                    price: 300,
                    oldPrice: 500,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-7.webp",
                },
                {
                    id: 2,
                    title: "DFMALB 20V Max XX Oscillating Multi Tool Variable Speed Tool",
                    price: 300,
                    oldPrice: 400,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-6.webp",
                },
                {
                    id: 3,
                    title: "Professional Cordless Drill Power Tools Set Competitive Price",
                    price: 250,
                    oldPrice: 400,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-1.webp",
                }
            ]
        },
        {
            title: "Popular Products",
            products: [
                {
                    id: 4,
                    title: "Professional Cordless Drill Power Tools Set Competitive Price",
                    price: 200,
                    oldPrice: 500,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-8.webp",
                },
                {
                    id: 5,
                    title: "Power Tools Set Chinese Drill Manufacturer Production",
                    price: 240,
                    oldPrice: 450,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-9.webp",
                },
                {
                    id: 6,
                    title: "High Quality Electric Hand Planer 4-3/8-Inch",
                    price: 320,
                    oldPrice: 400,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-5.webp",
                }
            ]
        },
        {
            title: "Top Rated Products",
            products: [
                {
                    id: 7,
                    title: "Good Quality Electric Cordless Drill Machine Tools",
                    price: 200,
                    oldPrice: 300,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-10.webp",
                },
                {
                    id: 8,
                    title: "High Quality Steel Clamp Tool Abrasive Steel",
                    price: 100,
                    oldPrice: 300,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-11.webp",
                },
                {
                    id: 9,
                    title: "90 Degree Angle Square Drill Combination Handle",
                    price: 120,
                    oldPrice: 200,
                    image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-12.webp",
                }
            ]
        }
    ];

    const promoCards = [
        {
            subtitle: "POWER TOOL",
            title: "Socket Wrenches Drill",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-5.webp",
            bgColor: "bg-[#fdeef3]",
            textColor: "text-[#f17840]",
            hasBadge: true,
        },
        {
            subtitle: "HAND TOOL",
            title: "Welding & Soldering",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-6.webp",
            bgColor: "bg-[#e8f6ff]",
            textColor: "text-[#f17840]",
            hasBadge: false,
        },
        {
            subtitle: "POPULAR NOW",
            title: "Premium Tools Sets",
            image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-7.webp",
            bgColor: "bg-[#f0edff]",
            textColor: "text-[#f17840]",
            hasBadge: false,
        }
    ];

    return (
        <section className="w-full py-12 px-4 md:px-6 bg-white dark:bg-[#0b0c0d] transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto flex flex-wrap justify-center lg:grid lg:grid-cols-3 gap-6">
                {promoCards.map((card, index) => (
                    <div
                        key={index}
                        className={`${card.bgColor} dark:bg-white rounded-[5px] p-8 relative flex flex-col justify-center min-h-[250px] w-full md:w-[calc(50%-12px)] lg:w-auto overflow-hidden group cursor-pointer transition-all duration-500`}
                    >
                        {/* Text Content */}
                        <div className="relative z-10 max-w-[60%]">
                            <p className={`${card.textColor} text-[13px] font-bold tracking-widest uppercase mb-3`}>
                                {card.subtitle}
                            </p>
                            <h3 className="text-2xl font-extrabold text-[#253d4e] dark:text-[#253d4e] mb-8 leading-tight">
                                {card.title.split(' ').map((word, i) => (
                                    <React.Fragment key={i}>
                                        {word} {i === 1 && <br />}
                                    </React.Fragment>
                                ))}
                            </h3>

                            {/* Shop Now Button with Hover Effect */}
                            <div className="relative group/btn overflow-hidden w-fit">
                                <button className="bg-white dark:bg-[#f17840] group-hover/btn:bg-[#f17840] dark:group-hover/btn:bg-[#e06b35] group-hover/btn:text-white text-[#253d4e] dark:text-white px-8 py-2.5 rounded-[4px] font-bold text-sm shadow-sm transition-all duration-700">
                                    Shop Now
                                </button>
                                <div className="absolute top-10 -right-20 rounded-[4px] w-full h-full bg-[#f17840] opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 flex items-center justify-center font-bold text-white text-sm">
                                    Shop Now
                                </div>
                            </div>
                        </div>

                        {/* Promo Image */}
                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute right-0 bottom-2 w-[45%] md:w-[52%] lg:w-[45%] object-contain transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Optional limited Offer Badge */}
                        {card.hasBadge && (
                            <div className="absolute right-[25%] bottom-[20%] z-20">
                                <div className="w-14 h-14 rounded-full bg-[#f4534d] text-white flex flex-col items-center justify-center shadow-lg transform -rotate-12 animate-pulse-slow">
                                    <span className="text-[10px] font-bold leading-none">limited</span>
                                    <span className="text-[10px] font-bold">Offer</span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <section className="w-full bg-white dark:bg-[#0b0c0d] py-14 px-4 md:px-6 overflow-hidden transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex flex-col">
                            <h2 className="text-2xl font-bold text-[#253d4e] dark:text-white mb-8 relative pb-4 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-16 after:h-px after:bg-orange-300">
                                {section.title}
                            </h2>

                            <div className="flex flex-col gap-6">
                                {section.products.map((product) => (
                                    <div key={product.id} className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-7 group cursor-pointer bg-[#f8f9fa] dark:bg-[#151618] p-5 sm:p-4 rounded-xl transition-all duration-300 border border-transparent dark:border-none hover:border-orange-100 dark:hover:border-orange-900/30">
                                        {/* Image Box with White Background */}
                                        <div className="w-full sm:w-36 h-56 sm:h-36 flex-shrink-0 bg-white rounded-lg p-4 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Info */}
                                        <div className="flex flex-col w-full">
                                            <div className="flex items-center gap-3 mb-2 sm:mb-1.5 mt-3 sm:mt-0">
                                                <span className="text-[#f17840] font-black text-xl">${product.price}</span>
                                                <span className="text-gray-400 dark:text-gray-500 line-through text-lg">${product.oldPrice}</span>
                                            </div>
                                            <h3 className="text-[#253d4e] dark:text-white font-bold text-[18px] sm:text-[19px] leading-snug mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-[#f17840]">
                                                {product.title}
                                            </h3>
                                            <div className="flex items-center gap-1.5">
                                                <div className="flex text-yellow-400 text-xl">
                                                    {"★★★★★".split("").map((star, i) => (
                                                        <span key={i}>{star}</span>
                                                    ))}
                                                </div>
                                                <span className="text-gray-400 dark:text-gray-500 text-[14px] font-semibold ml-1">(1k+ Ratings)</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </section>


    );
};

export default Section7;
