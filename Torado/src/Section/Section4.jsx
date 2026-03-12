import axios from "axios";
import { ChevronLeft, ChevronRight, GitCompare } from "lucide-react";
import React, { useRef } from "react";
import {
    FiHeart, FiMaximize
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import QuickViewModal from "../Components/QuickViewModal";
import { useCart } from "../context/CartContext.jsx";
import { useCompare } from "../context/CompareContext";
import { useCurrency } from "../context/CurrencyContext";
import { useWishlist } from "../context/WishlistContext";


const Section4 = () => {
    const sliderRef = useRef(null);
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();
    const { addToCompare, isInCompare } = useCompare();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const fetchProducts = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/products");
            const formattedProducts = res.data.map(p => ({
                ...p,
                title: p.title,
                name: p.title,
                price: p.price,
                oldPrice: p.old_price || p.oldPrice || (p.price + 50),
                tag: p.badge || "Sale",
                tagColor: p.badge_type === 'new' ? 'bg-green-500' : 'bg-red-500',
                image: p.image?.startsWith('http')
                    ? p.image
                    : `https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/${p.image || 'product-1.webp'}`,
                ratings: p.reviews_count ? `${p.reviews_count} Ratings` : "1k+ Ratings"
            }));
            setProducts(formattedProducts);
        } catch (err) {
            console.error("Failed to fetch products for section 4", err);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchProducts();
    }, []);

    const repeatedProducts = products.length > 0 ? [...products, ...products, ...products] : [];

    React.useEffect(() => {
        if (sliderRef.current && products.length > 0) {
            const { scrollWidth } = sliderRef.current;
            sliderRef.current.scrollLeft = scrollWidth / 3;
        }
    }, [products]);

    const handleScroll = () => {
        if (!sliderRef.current || products.length === 0) return;
        const { scrollLeft, scrollWidth } = sliderRef.current;
        const setWidth = scrollWidth / 3;

        if (scrollLeft <= 0) {
            sliderRef.current.scrollTo({ left: setWidth, behavior: 'auto' });
        } else if (scrollLeft >= setWidth * 2) {
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

    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="bg-white dark:bg-[#0b0c0d] py-10 md:py-16 px-4 md:px-6 overflow-hidden transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-stretch">

                {/* ================= LEFT PRODUCTS SLIDER ================= */}
                <div className="md:col-span-3 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-[#253d4e] dark:text-white">
                            Best Seller
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll("left")}
                                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#151618] flex items-center justify-center text-gray-400 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300"
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
                        {repeatedProducts.map((product, idx) => {
                            const isWishlisted = isInWishlist(product.id);
                            const isCompared = isInCompare(product.id);
                            return (
                                <div
                                    key={idx}
                                    className="min-w-[260px] md:min-w-[300px] group relative bg-white dark:bg-[#151618] rounded-xl p-5 md:p-6 shadow dark:shadow-none transition duration-300 flex flex-col transition-colors"
                                >
                                    <span
                                        className={`absolute top-4 left-4 text-white text-[11px] font-bold px-3 py-1 rounded-[3px] uppercase tracking-wider z-20 ${product.stock_quantity === 0 ? 'bg-black dark:bg-gray-800' : product.tagColor}`}
                                    >
                                        {product.stock_quantity === 0 ? "Out of Stock" : product.tag}
                                    </span>
                                    <div className="absolute top-6 right-4 flex flex-col gap-3 opacity-0 translate-x-6 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-20">
                                        <button
                                            onClick={() => addToWishlist({ ...product, name: product.title })}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition-all duration-300 ${isWishlisted ? 'bg-orange-500 text-white' : 'bg-white dark:bg-[#1a1c1e] text-[#253d4e] dark:text-white hover:bg-orange-500 hover:text-white'}`}
                                        >
                                            <FiHeart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                                        </button>
                                        <button
                                            onClick={() => { addToCompare({ ...product, name: product.title }); navigate("/compare"); }}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full shadow transition-all duration-300 ${isCompared ? 'bg-orange-500 text-white' : 'bg-white dark:bg-[#1a1c1e] text-[#253d4e] dark:text-white hover:bg-orange-500 hover:text-white'}`}
                                        >
                                            <GitCompare size={18} />
                                        </button>
                                        <button
                                            onClick={() => handleQuickView(product)}
                                            className="w-10 h-10 flex items-center justify-center bg-white dark:bg-[#1a1c1e] rounded-full shadow dark:text-white hover:bg-orange-500 hover:text-white transition"
                                        >
                                            <FiMaximize size={18} />
                                        </button>
                                    </div>

                                    <div className="bg-[#f8f9fa] dark:bg-white rounded-lg p-6 mb-6 flex items-center justify-center h-[200px] overflow-hidden group-hover:bg-white transition-colors duration-500">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-40 object-contain transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>

                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-orange-500 font-extrabold text-[20px]">
                                                {formatPrice(product.price)}
                                            </span>
                                            <span className="line-through text-gray-400 dark:text-gray-500 text-sm font-medium">
                                                {formatPrice(product.oldPrice)}
                                            </span>
                                        </div>

                                        <h3 className="text-[#253d4e] dark:text-white font-bold text-[16px] leading-[1.3] mb-3 line-clamp-2 min-h-[42px] group-hover:text-orange-500 transition-colors">
                                            {product.title}
                                        </h3>

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

                                        <div className="relative group/btn overflow-hidden w-fit h-[40px] mt-auto">
                                            <button
                                                onClick={() => { if (product.stock_quantity !== 0) { addToCart({ ...product, name: product.title }); navigate("/cart"); } }}
                                                disabled={product.stock_quantity === 0}
                                                className={`w-full h-full px-8 ${product.stock_quantity !== 0 ? "bg-white dark:bg-transparent text-orange-500 hover:text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"} border border-gray-100 dark:border-gray-800 rounded-[5px] font-bold text-[14px] transition-all duration-700 shadow-sm flex items-center justify-center`}
                                            >
                                                {product.stock_quantity === 0 ? "Out of Stock" : "Add To Cart"}
                                            </button>
                                            {product.stock_quantity !== 0 && (
                                                <div
                                                    onClick={() => { addToCart({ ...product, name: product.title }); navigate("/cart"); }}
                                                    className="absolute top-10 -right-20 rounded-[5px] w-full h-full bg-orange-500 opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 text-center flex items-center justify-center font-bold text-white text-[14px] cursor-pointer"
                                                >
                                                    Add To Cart
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ================= RIGHT TRENDING SECTION ================= */}
                <div className="md:col-span-1 bg-white md:bg-orange-50 dark:bg-white rounded-xl p-6 md:p-8 flex flex-col justify-between group h-auto shadow-sm md:shadow-none transition-colors duration-300">
                    <div>
                        <p className="text-orange-500 uppercase text-xs font-bold tracking-widest mb-2">
                            Trending Product
                        </p>
                        <h3 className="text-2xl font-black text-[#253d4e] dark:text-[#253d4e] mt-2 mb-8 leading-tight">
                            Magnetic Impact Power
                        </h3>
                        <Link to="/shop-grid" className="relative group overflow-hidden w-fit">
                            <button className="bg-white dark:bg-[#f17840] group-hover:bg-[#f17840] group-hover:text-white 
                           text-[#253d4e] dark:text-white px-8 py-3  
                           rounded-[5px] font-bold text-sm shadow-sm 
                           transition-all duration-700 w-fit cursor-pointer">
                                <p>Shop Now</p>
                            </button>
                            <div className="absolute top-10 -right-20 rounded-[4px] w-full h-full bg-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-white text-sm cursor-pointer">
                                Shop Now
                            </div>
                        </Link>
                    </div>

                    <div className="mt-10 overflow-hidden flex-grow flex items-end justify-center">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/promo/promo-img-3.webp"
                            alt="Trending Product"
                            className="w-full h-auto max-h-[450px] object-contain object-bottom"
                        />
                    </div>
                </div>

                <QuickViewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                />
            </div>

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
