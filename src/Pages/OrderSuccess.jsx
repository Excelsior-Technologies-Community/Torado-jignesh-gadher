import { CheckCircle, Home, Mail, ShoppingBag } from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";


const OrderSuccess = () => {
    const { orderId } = useParams();
    const location = useLocation();
    const { email } = location.state || {};

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b0c0d] transition-colors duration-300 font-sans">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle size={64} className="text-green-500" />
                    </div>
                </div>

                <h1 className="text-[36px] md:text-[48px] font-black text-[#253d4e] dark:text-white mb-4 uppercase tracking-tight">
                    Order Placed Successfully!
                </h1>

                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                    Thank you for your purchase. Your order has been received and is being processed.
                    You will receive an email shortly with your order details.
                </p>

                <div className="bg-white dark:bg-[#151618] p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 mb-12 transform transition-all hover:scale-[1.01]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
                        <div className="space-y-4 text-center md:text-left md:pr-4">
                            <h3 className="text-gray-500 font-black uppercase tracking-widest text-sm">Order ID</h3>
                            <p className="text-[32px] font-black text-[#f17840]">#TRD-{1000 + parseInt(orderId)}</p>
                        </div>
                        <div className="space-y-4 text-center md:text-left pt-8 md:pt-0 md:pl-8">
                            <h3 className="text-gray-500 font-black uppercase tracking-widest text-sm">Confirmation Email Sent to</h3>
                            <div className="flex items-center justify-center md:justify-start gap-2">
                                <Mail size={20} className="text-[#f17840]" />
                                <p className="text-xl font-black text-[#253d4e] dark:text-white">{email || "your email address"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto bg-[#f17840] hover:bg-[#e06b35] text-white px-10 py-5 rounded-xl font-black transition-all shadow-lg shadow-[#f17840]/30 flex items-center justify-center gap-2 active:scale-95 group"
                    >
                        <Home size={20} className="group-hover:-translate-y-1 transition-transform" />
                        Back To Home
                    </Link>
                    <Link
                        to="/shop-grid"
                        className="w-full sm:w-auto bg-[#253d4e] hover:bg-[#1a2d3a] text-white px-10 py-5 rounded-xl font-black transition-all shadow-lg flex items-center justify-center gap-2 active:scale-95 group"
                    >
                        <ShoppingBag size={20} className="group-hover:rotate-12 transition-transform" />
                        Continue Shopping
                    </Link>
                </div>

                <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Need Help?</p>
                    <Link to="/contact-us" className="text-[#f17840] font-black hover:underline">Contact Customer Support</Link>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default OrderSuccess;
