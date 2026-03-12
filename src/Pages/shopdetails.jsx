import axios from "axios";
import { Facebook, GitCompare, Heart, Instagram, Minus, Plus, ShoppingCart, Star, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import { useCurrency } from "../context/CurrencyContext";
import { useWishlist } from "../context/WishlistContext";
import React from "react";

const ShopDetails = () => {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const { addToWishlist, isInWishlist } = useWishlist();
    const { addToCompare, isInCompare } = useCompare();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    const dummyProduct = {
        id: id || 101,
        name: "Cordless Drill Professional Combo Drill And Screwdriver",
        price: 200,
        old_price: 300,
        description: "Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut.",
        image: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/shop-6.webp",
        category_id: 1,
        stock_quantity: 10,
        reviews_count: "1k+",
        tags: ["Drill", "Machine", "Tools"]
    };

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) {
                setProduct(dummyProduct);
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`http://localhost:5000/api/products/${id}`);
                const p = res.data;
                setProduct({
                    ...p,
                    name: p.title,
                    image: p.image?.startsWith('http')
                        ? p.image
                        : `https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/${p.image || 'product-1.webp'}`
                });
            } catch (err) {
                console.error("Failed to fetch product", err);
                setProduct(dummyProduct);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-white dark:bg-[#0b0c0d]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#f17840]"></div>
            </div>
        );
    }

    if (!product) return null;

    const isWishlisted = isInWishlist(product.id);
    const isCompared = isInCompare(product.id);

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section */}
            <div className="relative h-[250px] md:h-[300px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/page-title-bg/page-title-bg-1.webp')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#411151]/85"></div>

                <div className="relative z-10">
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Shop Details</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/shop-grid" className="hover:text-[#f17840] transition-colors">Shop</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Shop Details</span>
                    </div>
                </div>
            </div>

            {/* Product Content Container */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* Left Column: Product Image Gallery */}
                    <div className="w-full lg:w-1/2">
                        <div className="sticky top-24">
                            <div className="relative bg-[#f8f9fa] dark:bg-white rounded-2xl p-10 md:p-16 flex items-center justify-center shadow-sm overflow-hidden group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full max-h-[500px] object-contain drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                                    onError={(e) => { e.target.src = "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/shop/product-1.webp"; }}
                                />

                                {/* Floating Badges often found in premium designs */}
                                {product.stock_quantity > 0 && (
                                    <div className="absolute top-6 left-6 bg-[#21bf73] text-white text-xs font-black px-4 py-2 rounded-full shadow-lg uppercase tracking-wider">
                                        Sale
                                    </div>
                                )}
                            </div>

                            {/* Sub-images / Thumbnails */}
                            <div className="grid grid-cols-4 gap-4 mt-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-[#f8f9fa] dark:bg-white rounded-xl p-3 border-2 border-transparent hover:border-[#f17840] cursor-pointer transition-all shadow-sm">
                                        <img src={product.image} alt="Thumbnail" className="w-full h-20 object-contain opacity-70 hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="w-full lg:w-1/2">
                        <div className="flex flex-col">
                            {/* Category & Price */}
                            <div className="flex flex-wrap items-center gap-4 mb-4">
                                <span className="text-[#f17840] text-[13px] font-black uppercase tracking-widest bg-orange-50 dark:bg-orange-950/20 px-4 py-1.5 rounded-full">
                                    {product.category_id == 1 ? "Machine Tools" : product.category_id == 2 ? "Hand Tools" : "Power Tools"}
                                </span>
                            </div>

                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-4xl md:text-5xl font-black text-[#f17840]">{formatPrice(product.price)}</span>
                                {product.old_price && (
                                    <span className="text-2xl md:text-3xl text-gray-400 line-through font-bold opacity-60">{formatPrice(product.old_price)}</span>
                                )}
                            </div>

                            <h2 className="text-3xl md:text-[40px] font-black text-[#253d4e] dark:text-white mb-6 leading-[1.1] tracking-tight">
                                {product.name}
                            </h2>

                            {/* Ratings */}
                            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-gray-800">
                                <div className="flex items-center text-[#ffc107]">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={18} fill={i < 4 ? "currentColor" : "none"} strokeWidth={i < 4 ? 0 : 2} />
                                    ))}
                                </div>
                                <span className="text-gray-500 dark:text-gray-400 text-base font-bold">
                                    ({product.reviews_count || '1k+'}) Customer Reviews
                                </span>
                            </div>

                            <p className="text-gray-500 dark:text-gray-300 text-lg leading-relaxed mb-10 font-medium">
                                {product.description}
                            </p>

                            {/* Info Table */}
                            <div className="space-y-4 mb-10 bg-[#f8f9fa] dark:bg-[#151618] p-6 rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#253d4e] dark:text-white font-black text-[15px] uppercase w-40">Availability :</span>
                                    <span className={`${product.stock_quantity === 0 ? "text-red-500" : "text-[#21bf73]"} font-bold text-base`}>
                                        {product.stock_quantity === 0 ? "Out of Stock" : "In Stock"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#253d4e] dark:text-white font-black text-[15px] uppercase w-40">Category :</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-bold text-base">{product.category_id == 1 ? "Machine" : "Tools"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#253d4e] dark:text-white font-black text-[15px] uppercase w-40">Tags :</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-bold text-base">{product.tags?.join(", ") || "Drill"}</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-wrap items-center gap-5 mb-10">
                                <div className="flex items-center bg-[#f1f2f6] dark:bg-[#1a1c1e] rounded-xl overflow-hidden p-1.5 border border-gray-100 dark:border-gray-800 shadow-inner">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#f17840] transition-all bg-white dark:bg-[#25282c] rounded-lg shadow-sm"
                                    >
                                        <Minus size={20} strokeWidth={3} />
                                    </button>
                                    <span className="w-16 text-center font-black text-xl dark:text-white">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#f17840] transition-all bg-white dark:bg-[#25282c] rounded-lg shadow-sm"
                                    >
                                        <Plus size={20} strokeWidth={3} />
                                    </button>
                                </div>

                                <button
                                    onClick={() => addToCart({ ...product, quantity })}
                                    disabled={product.stock_quantity === 0}
                                    className={`flex-1 min-w-[200px] ${product.stock_quantity !== 0 ? "bg-[#f17840] hover:bg-[#e06b35] shadow-xl shadow-orange-500/10 active:scale-[0.98]" : "bg-gray-300 dark:bg-gray-700 cursor-not-allowed"} text-white h-16 rounded-xl font-black flex items-center justify-center gap-3 transition-all text-lg uppercase tracking-tight`}
                                >
                                    <ShoppingCart size={24} strokeWidth={2.5} />
                                    {product.stock_quantity === 0 ? "Out of Stock" : "Add To Cart"}
                                </button>
                            </div>

                            {/* Wishlist & Compare & Share */}
                            <div className="flex flex-wrap items-center gap-6 pt-10 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={() => addToWishlist(product)}
                                    className={`flex items-center gap-2 font-bold text-sm transition-colors ${isWishlisted ? "text-[#f17840]" : "text-gray-500 hover:text-[#f17840]"}`}
                                >
                                    <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                                    Add To Wishlist
                                </button>
                                <button
                                    onClick={() => addToCompare(product)}
                                    className={`flex items-center gap-2 font-bold text-sm transition-colors ${isCompared ? "text-[#f17840]" : "text-gray-500 hover:text-[#f17840]"}`}
                                >
                                    <GitCompare size={18} />
                                    Compare
                                </button>

                                <div className="flex items-center gap-4 ml-auto">
                                    <span className="text-gray-500 font-bold text-sm uppercase tracking-widest">Share:</span>
                                    <div className="flex gap-3">
                                        {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                                            <div key={idx} className="w-10 h-10 border border-gray-100 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-[#f17840] hover:border-[#f17840] transition-all cursor-pointer bg-[#f8f9fa] dark:bg-[#1a1c1e]">
                                                <Icon size={16} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Tabs (Description, Specifications, Reviews) */}
                <div className="mt-32">
                    <div className="flex items-center gap-8 md:gap-12 border-b border-gray-100 dark:border-gray-800 mb-10 overflow-x-auto whitespace-nowrap pb-1">
                        {["Description", "Product Details", "Reviews (15)"].map((tab, idx) => (
                            <button
                                key={idx}
                                className={`text-lg md:text-xl font-black pb-4 relative transition-colors ${idx === 0 ? "text-[#f17840]" : "text-gray-400 hover:text-[#253d4e] dark:hover:text-white"}`}
                            >
                                {tab}
                                {idx === 0 && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#f17840] rounded-full"></span>}
                            </button>
                        ))}
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-500 dark:text-gray-400">
                        <p className="mb-6 font-medium leading-relaxed">
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                            {[
                                "Superior quality components",
                                "Long-lasting battery life (4.0Ah)",
                                "Ergonomic design for comfort",
                                "Variable speed control",
                                "Fast charging technology",
                                "Sturdy carrying case included"
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-center gap-3 font-bold text-[#253d4e] dark:text-white">
                                    <span className="w-2 h-2 rounded-full bg-[#f17840]"></span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <Footer />
            <StickyActions />
        </div>
    );
};

export default ShopDetails;
