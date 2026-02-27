import { Minus, Plus, Trash2 } from "lucide-react";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import { useCart } from "../context/CartContext.jsx";
import React from "react";      

const Cart = () => {
    const { cartItems, updateQuantity, removeItem } = useCart();



    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    // Automatically calculate discount from badge (e.g., "10% off")
    const calculatedDiscount = cartItems.reduce((acc, item) => {
        if (item.badge) {
            const match = item.badge.match(/(\d+)%/);
            if (match) {
                const percent = parseInt(match[1]);
                return acc + (item.price * item.quantity * percent) / 100;
            }
        }
        return acc;
    }, 0);

    const shipping = 0;
    const discount = Math.round(calculatedDiscount);
    const total = subtotal - discount + shipping;

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
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Shopping Cart</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Shopping Cart</span>
                    </div>
                </div>
            </div>

            {/* Cart Table Content */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-100 dark:border-gray-800">
                        <thead className="bg-gray-50 dark:bg-[#151618]">
                            <tr className="text-[#253d4e] dark:text-white font-black text-base">
                                <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Trash</th>
                                <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Image</th>
                                <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Product Name</th>
                                <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Price</th>
                                <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Quantity</th>
                                <th className="border border-gray-100 dark:border-gray-800 px-6 py-5 text-center">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.id} className="text-center group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                                    <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                        <button
                                            onClick={() => removeItem(item.id)}
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
                                        <div className="flex items-center justify-center">
                                            <div className="flex items-center border border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent rounded-[5px] overflow-hidden">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="px-3 py-2 text-gray-400 hover:text-[#f17840] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-r dark:border-gray-700 h-[45px]"
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>
                                                <input
                                                    type="text"
                                                    value={item.quantity}
                                                    readOnly
                                                    className="w-12 text-center text-[#253d4e] dark:text-white font-black text-sm outline-none bg-transparent"
                                                />
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="px-3 py-2 text-gray-400 hover:text-[#f17840] hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-l dark:border-gray-700 h-[45px]"
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="border border-gray-100 dark:border-gray-800 px-6 py-4">
                                        <span className="text-gray-500 dark:text-gray-400 font-bold">₹{(item.price * item.quantity)}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Coupon & Update Cart */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
                    <div className="flex items-center gap-0 w-full md:w-auto overflow-hidden rounded-[5px] border border-gray-200 dark:border-gray-800 max-w-[500px]">
                        <input
                            type="text"
                            placeholder="Coupon Code"
                            className="px-6 py-4 outline-none text-sm font-medium w-full bg-transparent dark:text-white"
                        />
                        <button className="bg-[#f17840] hover:bg-[#e06b35] text-white px-8 py-4 font-black text-base whitespace-nowrap transition-colors cursor-pointer">
                            Apply Coupon
                        </button>
                    </div>
                    <button className="bg-[#f17840] hover:bg-[#e06b35] text-white px-10 py-4 rounded-[5px] font-black text-base transition-colors cursor-pointer w-full md:w-auto shadow-md">
                        Update Cart
                    </button>
                </div>

                {/* Checkout Summary Section - EXACTLY AS IN PHOTO */}
                <div className="flex justify-center mt-20">
                    <div className="w-full max-w-[500px] border border-gray-100 dark:border-gray-800 rounded-[8px] p-8 md:p-12 shadow-sm bg-white dark:bg-[#151618]">
                        <h3 className="text-[#253d4e] dark:text-white font-black text-[24px] mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
                            Checkout Summary
                        </h3>

                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[17px] text-[#253d4e] dark:text-gray-300">Subtotal</span>
                                <span className="font-black text-[17px] text-[#253d4e] dark:text-white">₹{subtotal}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[17px] text-[#253d4e] dark:text-gray-300">Shipping</span>
                                <span className="font-black text-[17px] text-[#253d4e] dark:text-white">₹{shipping}</span>
                            </div>
                            <div className="flex items-center justify-between pb-8 border-b border-gray-100 dark:border-gray-800">
                                <span className="font-bold text-[17px] text-[#253d4e] dark:text-gray-300">Discount</span>
                                <span className="font-black text-[17px] text-[#253d4e] dark:text-white">₹{discount}</span>
                            </div>
                            <div className="flex items-center justify-between pt-2">
                                <span className="text-[#253d4e] dark:text-white font-black text-[20px]">Payable Total</span>
                                <span className="text-[#253d4e] dark:text-white font-black text-[22px]">₹{total}</span>
                            </div>
                        </div>

                        <button className="w-full bg-[#f17840] hover:bg-[#e06b35] text-white py-5 rounded-[5px] font-black text-[18px] mt-10 transition-all shadow-lg active:scale-[0.98] cursor-pointer uppercase tracking-tight">
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default Cart;
