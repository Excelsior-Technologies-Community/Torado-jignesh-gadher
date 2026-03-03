import axios from "axios";
import { ChevronLeft, ChevronRight, GitCompare, Heart, Maximize, Star } from "lucide-react";
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product, addToWishlist, isInWishlist }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    return (
        <div className="group relative bg-white dark:bg-[#151618] rounded-[10px] p-5 hover:border-[#f17840]/30 hover:shadow-xl transition-all duration-500 flex flex-col h-full w-[300px]">
            <div className="absolute top-4 left-4 z-10">
                <span className={`${product.badge?.color || 'bg-[#f17840]'} text-white text-[12px] font-bold px-3 py-1 rounded-[5px]`}>
                    {product.badge?.text || product.badge || "Sale"}
                </span>
            </div>

            <div className="relative bg-[#f8f9fa] dark:bg-white rounded-[10px] p-8 mb-6 overflow-hidden flex items-center justify-center min-h-[250px] transition-colors duration-300">
                <img
                    src={product.image}
                    alt={product.name}
                    className="h-[180px] w-auto object-contain transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 right-[-60px] group-hover:right-4 transition-all duration-500 flex flex-col gap-2 z-20">
                    <button
                        onClick={() => addToWishlist(product)}
                        className={`w-10 h-10 shadow-sm rounded-full flex items-center justify-center transition-all duration-300 ${isInWishlist(product.id) ? 'bg-[#f17840] text-white' : 'bg-white dark:bg-[#1a1c1e] text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white'}`}
                    >
                        <Heart size={18} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
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
                    <span className="text-[#f17840] text-xl font-extrabold">₹{product.price}</span>
                    <span className="text-gray-400 dark:text-gray-500 line-through text-base font-medium">₹{product.oldPrice || product.old_price}</span>
                </div>

                <h3 className="text-[#253d4e] dark:text-white font-extrabold text-[17px] leading-tight mb-4 line-clamp-2 min-h-[42px]">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-6">
                    <div className="flex items-center text-[#ffc107]">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} strokeWidth={i < 4 ? 0 : 2} />
                        ))}
                    </div>
                    <span className="text-gray-400 dark:text-gray-500 text-sm font-medium ml-1">({product.reviews_count || '1k+'}) Ratings</span>
                </div>

                <div className="relative group/btn overflow-hidden w-full h-[50px]">
                    <button
                        onClick={() => { addToCart(product); navigate("/cart"); }}
                        className="w-full h-full bg-white dark:bg-transparent text-[#f17840] rounded-[5px] font-bold text-[15px] transition-all duration-700 border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-center gap-2"
                    >
                        Add To Cart
                    </button>
                    <div
                        onClick={() => { addToCart(product); navigate("/cart"); }}
                        className="absolute top-10 -right-20 rounded-[5px] w-full h-full bg-[#f17840] opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 text-center flex items-center justify-center font-bold text-white text-[15px] cursor-pointer"
                    >
                        Add To Cart
                    </div>
                </div>
            </div>
        </div>
    );
};

const Section6 = () => {
    const sliderRef = useRef(null);
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            const formattedProducts = res.data.map(p => ({
                ...p,
                name: p.title,
                image: p.image?.startsWith('http')
                    ? p.image
                    : `https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/${p.image || 'product-1.webp'}`
            }));
            setProducts(formattedProducts);
        } catch (err) {
            console.error("Failed to fetch products for section 6", err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const repeatedProducts = products.length > 0 ? [...products, ...products, ...products, ...products] : [];

    React.useEffect(() => {
        if (sliderRef.current && products.length > 0) {
            const { scrollWidth } = sliderRef.current;
            sliderRef.current.scrollLeft = scrollWidth / 2.5;
        }
    }, [products]);

    const handleScroll = () => {
        if (!sliderRef.current || products.length === 0) return;
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        const setWidth = scrollWidth / 4;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
            sliderRef.current.scrollLeft = scrollLeft - setWidth;
        } else if (scrollLeft <= 10) {
            sliderRef.current.scrollLeft = scrollLeft + setWidth;
        }
    };

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
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151618] flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white hover:border-[#f17840] transition"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151618] flex items-center justify-center text-[#253d4e] dark:text-white hover:bg-[#f17840] hover:text-white hover:border-[#f17840] transition"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div
                    ref={sliderRef}
                    onScroll={handleScroll}
                    className="flex gap-8 overflow-x-auto no-scrollbar whitespace-nowrap pb-4"
                >
                    {repeatedProducts.map((product, idx) => {
                        const { addToWishlist, isInWishlist } = useWishlist();
                        return (
                            <div key={idx} className="inline-block min-w-[300px]">
                                <ProductCard
                                    product={product}
                                    addToWishlist={addToWishlist}
                                    isInWishlist={isInWishlist}
                                />
                            </div>
                        );
                    })}
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

export default Section6;
