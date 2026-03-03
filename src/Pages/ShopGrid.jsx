import axios from "axios";
import { ChevronDown, ChevronLeft, ChevronRight, Eye, GitCompare, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuickViewModal from "../Components/QuickViewModal";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import { useCart } from "../context/CartContext.jsx";
import { useCompare } from "../context/CompareContext";
import { useWishlist } from "../context/WishlistContext";
import React from "react";  

const ProductCard = ({ product, onQuickView }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { addToWishlist, isInWishlist } = useWishlist();
    const { addToCompare, isInCompare } = useCompare();
    const isWishlisted = isInWishlist(product.id);
    const isCompared = isInCompare(product.id);
    return (
        <div className="group bg-white dark:bg-[#151618] rounded-[10px] p-4 border border-gray-100 dark:border-none hover:border-[#f17840]/30 transition-all duration-500 flex flex-col h-full shadow-sm hover:shadow-lg">
            {/* Image & Badge Container */}
            <div className="relative bg-[#f8f9fa] dark:bg-white rounded-[10px] p-6 mb-4 overflow-hidden flex items-center justify-center min-h-[240px]">
                {/* Dynamic Badge - Green for New, Orange for Discount, Red for Sale */}
                {product.badge && (
                    <div className="absolute top-3 left-3 z-30">
                        <span className={`text-white text-[13px] font-bold px-3 py-1.5 rounded-[5px] shadow-sm whitespace-nowrap ${product.badge_type === 'new' ? 'bg-[#10b981]' :
                            product.badge_type === 'discount' ? 'bg-[#f59e0b]' :
                                'bg-[#ef4444]'
                            }`}>
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Hover Actions - Right Side */}
                <div className="absolute top-4 right-[-50px] group-hover:right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col gap-2 z-20">
                    <button
                        onClick={() => addToWishlist(product)}
                        className={`w-10 h-10 shadow-md rounded-full flex items-center justify-center transition-all ${isWishlisted ? 'bg-[#f17840] text-white' : 'bg-white text-gray-400 hover:bg-[#f17840] hover:text-white'}`}
                    >
                        <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                    </button>
                    <button
                        onClick={() => { addToCompare(product); navigate("/compare"); }}
                        className={`w-10 h-10 shadow-md rounded-full flex items-center justify-center transition-all ${isCompared ? 'bg-[#f17840] text-white' : 'bg-white text-gray-400 hover:bg-[#f17840] hover:text-white'}`}
                    >
                        <GitCompare size={18} />
                    </button>
                    <button
                        onClick={() => onQuickView(product)}
                        className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-gray-400 hover:bg-[#f17840] hover:text-white transition-all"
                    >
                        <Eye size={18} />
                    </button>
                </div>

                <img
                    src={product.image}
                    alt={product.name}
                    className="h-[180px] w-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://premium-shop.envytheme.com/assets/img/products/product-1.webp"; }}
                />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow px-2">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#f17840] text-xl font-black">₹{product.price}</span>
                    {product.old_price && (
                        <span className="text-gray-400 line-through text-base font-bold">₹{product.old_price}</span>
                    )}
                </div>

                <div className="mb-2">
                    <span className="text-[12px] font-black text-gray-400 uppercase tracking-widest">
                        {product.category_id == 1 ? "Machine Tools" :
                            product.category_id == 2 ? "Hand Tools" :
                                "Power Tools"}
                    </span>
                </div>

                <h3 className="text-[#253d4e] dark:text-white font-black text-[17px] leading-tight mb-3 line-clamp-2 hover:text-[#f17840] transition-colors cursor-pointer">
                    {product.name}
                </h3>

                <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center text-[#ffc107]">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} size={15} fill={i < 4 ? "currentColor" : "none"} strokeWidth={i < 4 ? 0 : 2} />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm font-bold">
                        ({product.reviews_count || '1k+'}) Ratings
                    </span>
                </div>

                {/* Add To Cart Button with Section1 Effect */}
                <div
                    className="relative group/btn overflow-hidden w-full mt-auto cursor-pointer"
                    onClick={() => { addToCart(product); navigate("/cart"); }}
                >
                    <button className="w-full py-3.5 bg-white border-2 border-gray-100 text-[#f17840] group-hover/btn:bg-[#f17840] group-hover/btn:text-white group-hover/btn:border-[#f17840] rounded-xl font-black text-[15px] transition-all duration-700 pointer-events-none">
                        Add To Cart
                    </button>
                    <div className="absolute top-14 -right-20 rounded-xl w-full h-full bg-[#f17840] text-white opacity-0 group-hover/btn:opacity-100 transition-all duration-700 group-hover/btn:top-0 group-hover/btn:right-0 text-center flex items-center justify-center font-black text-[15px]">
                        Add To Cart
                    </div>
                </div>
            </div>
        </div>
    );
};

const ShopGrid = () => {
    const [showCount, setShowCount] = useState(50);
    const [sortBy, setSortBy] = useState("Featured");
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleQuickView = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

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
            console.error("Failed to fetch products", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const getSortedProducts = () => {
        let sorted = [...products];
        if (sortBy === "Price: Low to High") {
            sorted.sort((a, b) => a.price - b.price);
        } else if (sortBy === "Price: High to Low") {
            sorted.sort((a, b) => b.price - a.price);
        }
        return sorted.slice(0, showCount);
    };

    const sortedProducts = getSortedProducts();

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
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Shop List</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Shop List</span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                    <div className="text-gray-500 dark:text-gray-400 font-medium">
                        We found <span className="text-[#f17840] font-bold">{sortedProducts.length}</span> items for you!
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:flex-initial">
                            <select
                                className="w-full md:w-[150px] appearance-none bg-[#f1f2f6] dark:bg-[#1a1c1e] border border-transparent focus:border-[#f17840]/30 px-5 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white cursor-pointer focus:ring-0 transition-all"
                                value={showCount}
                                onChange={(e) => setShowCount(parseInt(e.target.value))}
                            >
                                <option value="50">Show: 50</option>
                                <option value="100">Show: 100</option>
                                <option value="150">Show: 150</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>

                        <div className="relative flex-1 md:flex-initial">
                            <select
                                className="w-full md:w-[200px] appearance-none bg-[#f1f2f6] dark:bg-[#1a1c1e] border border-transparent focus:border-[#f17840]/30 px-5 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white cursor-pointer focus:ring-0 transition-all"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option>Featured</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Release Date</option>
                                <option>Avg. Rating</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f17840]"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
                        ))}
                    </div>
                )}

                <QuickViewModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    product={selectedProduct}
                />

                {/* Pagination */}
                <div className="mt-20 flex justify-center items-center gap-3">
                    <button className="w-12 h-12 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#f17840] hover:text-white transition-all duration-300">
                        <ChevronLeft size={20} />
                    </button>
                    <button className="w-12 h-12 rounded-full bg-[#f17840] text-white flex items-center justify-center font-bold">1</button>
                    <button className="w-12 h-12 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#f17840] hover:text-white transition-all duration-300">2</button>
                    <button className="w-12 h-12 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#f17840] hover:text-white transition-all duration-300">3</button>
                    <button className="w-12 h-12 rounded-full border border-gray-100 dark:border-gray-800 flex items-center justify-center text-gray-500 hover:bg-[#f17840] hover:text-white transition-all duration-300">
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default ShopGrid;