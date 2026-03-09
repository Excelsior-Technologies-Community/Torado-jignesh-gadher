import { ArrowLeft, ShoppingCart, Star, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import { useCart } from "../context/CartContext";
import { useCompare } from "../context/CompareContext";
import { useCurrency } from "../context/CurrencyContext";
import React from "react";

const Compare = () => {
    const { compareItems, removeFromCompare } = useCompare();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Hero Section */}
            <div className="bg-[#4a1d64] py-16 text-center text-white">
                <h1 className="text-4xl font-black mb-4 uppercase tracking-wider">Compare</h1>
                <div className="flex items-center justify-center gap-2 text-sm font-medium">
                    <Link to="/" className="hover:text-orange-400 transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-orange-400">Compare</span>
                </div>
            </div>

            {/* Compare Table Section */}
            <div className="max-w-[1440px] mx-auto py-20 px-4 md:px-6">
                {compareItems.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 dark:bg-[#151618] rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800">
                        <div className="max-w-md mx-auto">
                            <h2 className="text-2xl font-black text-[#253d4e] dark:text-white mb-4">Your Comparison List is Empty</h2>
                            <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">Add products to compare their features and find the best fit for your needs.</p>
                            <Link to="/shop-grid" className="inline-flex items-center gap-2 bg-[#f17840] hover:bg-[#e06b35] text-white px-8 py-3.5 rounded-xl font-black transition-all shadow-lg hover:shadow-orange-500/20">
                                <ArrowLeft size={20} />
                                Back To Shop
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto border border-gray-100 dark:border-gray-800 rounded-lg shadow-sm">
                        <table className="w-full border-collapse min-w-[800px]">
                            <tbody>
                                {/* Preview Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400 w-1/4">Preview</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center">
                                            <div className="w-full h-48 bg-gray-50 dark:bg-white rounded-lg p-6 flex items-center justify-center">
                                                <img src={product.image} alt={product.name} className="max-h-full max-w-full object-contain" />
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Name Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Name</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center font-black text-[#253d4e] dark:text-white text-lg">
                                            {product.name}
                                        </td>
                                    ))}
                                </tr>

                                {/* Price Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Price</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center font-black text-[#253d4e] dark:text-white text-lg">
                                            {formatPrice(product.price)}
                                        </td>
                                    ))}
                                </tr>

                                {/* Ratings Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Ratings</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="flex text-yellow-400">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star key={i} size={16} fill={i < 4 ? "currentColor" : "none"} strokeWidth={i < 4 ? 0 : 2} />
                                                    ))}
                                                </div>
                                                <span className="text-gray-400 dark:text-gray-500 text-[13px] font-semibold">({product.reviews_count || '1k+'})</span>
                                            </div>
                                        </td>
                                    ))}
                                </tr>

                                {/* Category Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Category</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center text-gray-500 dark:text-gray-300 font-medium">
                                            {product.category_id == 1 ? "Machine Tools" : product.category_id == 2 ? "Hand Tools" : "Power Tools"}
                                        </td>
                                    ))}
                                </tr>

                                {/* Stock Status Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Stock Status</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center">
                                            <span className={`${product.stock_quantity === 0 ? "bg-red-50 text-red-500" : "bg-[#e8fbf1] text-[#21bf73]"} px-4 py-1.5 rounded-[5px] font-bold text-sm`}>
                                                {product.stock_quantity === 0 ? "Out of Stock" : "In Stock"}
                                            </span>
                                        </td>
                                    ))}
                                </tr>

                                {/* Weight/Dimensions (Placeholder for dynamic data) */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Weight</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center text-gray-500 dark:text-gray-300 font-medium">
                                            {product.weight || "340gm"}
                                        </td>
                                    ))}
                                </tr>

                                {/* Buy Now Row */}
                                <tr className="border-b border-gray-100 dark:border-gray-800">
                                    <td className="p-6 text-center font-bold text-[#253d4e] dark:text-gray-400">Buy Now</td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center">
                                            <button
                                                onClick={() => { if (product.stock_quantity !== 0) { addToCart(product); navigate("/cart"); } }}
                                                disabled={product.stock_quantity === 0}
                                                className={`${product.stock_quantity !== 0 ? "bg-[#21bf73] hover:bg-[#199d5d] cursor-pointer" : "bg-gray-400 cursor-not-allowed"} text-white px-6 py-3 rounded-[5px] font-black text-sm transition-all flex items-center gap-2 mx-auto`}
                                            >
                                                <ShoppingCart size={18} /> {product.stock_quantity === 0 ? "Out of Stock" : "Add To Cart"}
                                            </button>
                                        </td>
                                    ))}
                                </tr>

                                {/* Remove Row */}
                                <tr>
                                    <td className="p-6 text-center"></td>
                                    {compareItems.map((product) => (
                                        <td key={product.id} className="p-6 text-center">
                                            <button
                                                onClick={() => removeFromCompare(product.id)}
                                                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors mx-auto font-bold text-sm"
                                            >
                                                <Trash2 size={16} /> Remove
                                            </button>
                                        </td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Compare;
