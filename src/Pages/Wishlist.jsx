import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext";
import React from "react";  

const Wishlist = () => {
    const navigate = useNavigate();
    const { wishlistItems, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

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

                <div className="relative z-10 text-center">
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Wishlist</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Wishlist</span>
                    </div>
                </div>
            </div>

            {/* Wishlist Table Content */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                {wishlistItems.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-100 dark:border-gray-800">
                            <thead className="bg-gray-50 dark:bg-[#151618]">
                                <tr className="text-[#253d4e] dark:text-white font-black text-base">
                                    <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Trash</th>
                                    <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Image</th>
                                    <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Product Name</th>
                                    <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Price</th>
                                    <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">In Stock</th>
                                    <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Add To Cart</th>
                                </tr>
                            </thead>
                            <tbody>
                                {wishlistItems.map((item) => (
                                    <tr key={item.id} className="text-center group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                        <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                            <button
                                                onClick={() => removeFromWishlist(item.id)}
                                                className="text-[#f17840] hover:text-red-600 transition-colors p-2"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </td>
                                        <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                            <div className="w-16 h-16 mx-auto bg-gray-50 dark:bg-white rounded-[5px] flex items-center justify-center p-2">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                        </td>
                                        <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                            <span className="text-[#253d4e] dark:text-white font-bold text-base hover:text-[#f17840] transition-colors cursor-pointer">
                                                {item.name}
                                            </span>
                                        </td>
                                        <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold">₹{item.price}</span>
                                        </td>
                                        <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                            <span className="text-gray-500 dark:text-gray-400 font-bold">
                                                In Stock
                                            </span>
                                        </td>
                                        <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                            <button
                                                onClick={() => { addToCart(item); navigate("/cart"); }}
                                                className="text-[#f17840] hover:text-[#e06b35] font-black text-base transition-colors cursor-pointer"
                                            >
                                                Add To Cart
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-bold text-gray-500">Your wishlist is empty</h2>
                        <a href="/shop-grid" className="inline-block mt-4 text-[#f17840] hover:underline">Go Shopping</a>
                    </div>
                )}
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default Wishlist;