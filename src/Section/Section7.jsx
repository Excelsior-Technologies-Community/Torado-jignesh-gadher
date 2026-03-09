import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCurrency } from "../context/CurrencyContext";

const Section7 = () => {
    const [sections, setSections] = React.useState([
        { title: "Special Offer", products: [] },
        { title: "Popular Products", products: [] },
        { title: "Top Rated Products", products: [] }
    ]);
    const { formatPrice } = useCurrency();
    const [loading, setLoading] = React.useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            const formattedProducts = res.data.map(p => ({
                ...p,
                image: p.image?.startsWith('http')
                    ? p.image
                    : `https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/${p.image || 'product-1.webp'}`
            }));

            // Just splitting for demonstration since we don't have explicit flags for these categories in the current schema
            // In a real app, you'd filter by category or specific tags
            setSections([
                {
                    title: "Special Offer",
                    products: formattedProducts.slice(0, 3)
                },
                {
                    title: "Popular Products",
                    products: formattedProducts.slice(3, 6)
                },
                {
                    title: "Top Rated Products",
                    products: formattedProducts.slice(6, 9)
                }
            ]);
        } catch (err) {
            console.error("Failed to fetch products for section 7", err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

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

                            <Link to="/shop-grid" className="relative group/btn overflow-hidden w-fit">
                                <button className="bg-white dark:bg-[#f17840] group-hover/btn:bg-[#f17840] dark:group-hover/btn:bg-[#e06b35] group-hover/btn:text-white text-[#253d4e] dark:text-white px-8 py-2.5 rounded-[4px] font-bold text-sm shadow-sm transition-all duration-700">
                                    Shop Now
                                </button>
                                <div className="absolute top-10 -right-20 rounded-[4px] w-full h-full bg-[#f17840] opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 flex items-center justify-center font-bold text-white text-sm">
                                    Shop Now
                                </div>
                            </Link>
                        </div>

                        <img
                            src={card.image}
                            alt={card.title}
                            className="absolute right-0 bottom-2 w-[45%] md:w-[52%] lg:w-[45%] object-contain transition-transform duration-500 group-hover:scale-105"
                        />

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
                                        <div className="w-full sm:w-36 h-56 sm:h-36 flex-shrink-0 bg-white rounded-lg p-4 flex items-center justify-center overflow-hidden transition-colors duration-300">
                                            <img
                                                src={product.image}
                                                alt={product.title}
                                                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        <div className="flex flex-col w-full">
                                            <div className="flex items-center gap-3 mb-2 sm:mb-1.5 mt-3 sm:mt-0">
                                                <span className="text-[#f17840] font-black text-xl">{formatPrice(product.price)}</span>
                                                <span className="text-gray-400 dark:text-gray-500 line-through text-lg">{formatPrice(product.oldPrice)}</span>
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
