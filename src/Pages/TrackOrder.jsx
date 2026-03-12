import axios from "axios";
import { Search, ShoppingBag, Truck } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";

const TrackOrder = () => {
    const [formData, setFormData] = useState({
        orderNumber: "",
        email: ""
    });
    const [loading, setLoading] = useState(false);
    const [trackingData, setTrackingData] = useState(null);
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleTrack = async (e) => {
        e.preventDefault();
        if (!formData.orderNumber || !formData.email) {
            setError("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        setTrackingData(null);
        try {
            const res = await axios.get(`http://localhost:5000/api/orders/track/${encodeURIComponent(formData.orderNumber)}?email=${encodeURIComponent(formData.email)}`);
            setTrackingData(res.data);
        } catch (err) {
            setError(err.response?.data?.error || "Failed to find order. Please check your details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0b0c0d] transition-colors duration-300 font-sans">
            <Navbar />

            {/* Header / Breadcrumb */}
            <div className="relative h-[250px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/page-title-bg/page-title-bg-1.webp')`,
                    }}
                ></div>
                <div className="absolute inset-0 bg-[#411151]/85"></div>

                <div className="relative z-10 text-center">
                    <h1 className="text-[36px] md:text-[48px] font-black text-white mb-4 uppercase tracking-tight">Track Order</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Track Order</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-16">
                <div className="bg-white dark:bg-[#151618] p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
                    <div className="text-center mb-10">
                        <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white uppercase tracking-tight">Track Your Order</h2>
                        <div className="w-16 h-1 bg-[#f17840] mx-auto mt-4 rounded-full"></div>
                    </div>

                    <form onSubmit={handleTrack} className="space-y-8 max-w-2xl mx-auto">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">
                                    Email Address<span className="text-[#f17840] ml-1">(required)</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email"
                                    className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none shadow-sm"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">
                                    Order Number / Track ID<span className="text-[#f17840] ml-1">(required)</span>
                                </label>
                                <input
                                    type="text"
                                    name="orderNumber"
                                    value={formData.orderNumber}
                                    onChange={handleInputChange}
                                    placeholder="Enter Order No. or Tracking ID"
                                    className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none shadow-sm"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 text-red-600 dark:text-red-400 rounded-xl font-bold text-center">
                                ⚠️ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#f17840] hover:bg-[#e06b35] text-white py-5 rounded-xl font-black text-[16px] uppercase tracking-wider shadow-lg shadow-[#f17840]/20 transition-all active:scale-95 flex items-center justify-center gap-3 group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    <Search size={20} className="group-hover:scale-110 transition-transform" />
                                    Track Order
                                </>
                            )}
                        </button>

                        <p className="text-center text-[13px] font-bold text-gray-400">
                            See Our <Link to="/privacy-policy" className="text-[#f17840] hover:underline">Privacy Policy</Link>
                        </p>
                    </form>

                    {/* Results Section */}
                    {trackingData && (
                        <div className="mt-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
                            <div className="p-8 bg-gray-50 dark:bg-[#0b0c0d] rounded-2xl border border-gray-100 dark:border-gray-800">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
                                    <div>
                                        <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Status For Order</h3>
                                        <p className="text-2xl font-black text-[#253d4e] dark:text-white">#TRD-{1000 + parseInt(trackingData.id)}</p>
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm ${trackingData.order_status === 'processing' ? 'bg-blue-500 text-white' :
                                            trackingData.order_status === 'shipped' ? 'bg-[#f17840] text-white' :
                                                'bg-green-500 text-white'
                                            }`}>
                                            {trackingData.order_status}
                                        </span>
                                        <p className="text-[11px] font-bold text-gray-400 mt-2 uppercase tracking-tight">Placed on {new Date(trackingData.created_at).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                    <div className="bg-white dark:bg-[#151618] p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                                        <Truck className="mx-auto text-[#f17840]" size={28} />
                                        <p className="text-[11px] font-black uppercase text-gray-400">Shipping Mode</p>
                                        <p className="text-sm font-black text-[#253d4e] dark:text-white tracking-wide">Standard Delivery</p>
                                    </div>
                                    <div className="bg-white dark:bg-[#151618] p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                                        <ShoppingBag className="mx-auto text-[#f17840]" size={28} />
                                        <p className="text-[11px] font-black uppercase text-gray-400">Total Items</p>
                                        <p className="text-sm font-black text-[#253d4e] dark:text-white tracking-wide">{trackingData.items.length} Products</p>
                                    </div>
                                    <div className="bg-white dark:bg-[#151618] p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2 text-[#f17840]">
                                        <p className="text-[11px] font-black uppercase text-gray-400">Total Amount</p>
                                        <p className="text-xl font-black uppercase tracking-tighter">{trackingData.currency || 'INR'} {trackingData.total_amount}</p>
                                    </div>
                                    <div className="bg-white dark:bg-[#151618] p-6 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 mx-auto"></div>
                                        <p className="text-[11px] font-black uppercase text-gray-400">Payment</p>
                                        <p className="text-sm font-black text-[#253d4e] dark:text-white tracking-wide uppercase">{trackingData.payment_status}</p>
                                    </div>
                                </div>

                                {trackingData.order_status === 'shipped' && trackingData.courier_name && (
                                    <div className="mb-10 p-6 bg-purple-500/5 dark:bg-purple-500/10 border-2 border-purple-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in zoom-in-95 duration-500">
                                        <div className="flex items-center gap-5">
                                            <div className="w-14 h-14 bg-purple-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                                <Truck size={28} />
                                            </div>
                                            <div>
                                                <h4 className="text-[12px] font-black text-purple-500 uppercase tracking-[0.2em] mb-1">In Transit via</h4>
                                                <p className="text-xl font-black text-[#253d4e] dark:text-white truncate">{trackingData.courier_name}</p>
                                            </div>
                                        </div>
                                        <div className="w-full md:w-auto text-center md:text-right">
                                            <h4 className="text-[12px] font-black text-gray-400 uppercase tracking-widest mb-1">Tracking Number</h4>
                                            <div className="flex items-center justify-center md:justify-end gap-3">
                                                <span className="text-lg font-black text-[#f17840] tracking-wider uppercase select-all">{trackingData.tracking_number}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-[#253d4e] dark:text-white uppercase tracking-widest pl-1">Items in this order</h4>
                                    <div className="bg-white dark:bg-[#151618] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                                        {trackingData.items.map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center p-4 border-b border-gray-50 dark:border-gray-800 last:border-0">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#f17840]"></div>
                                                    <p className="font-bold text-[#253d4e] dark:text-white text-sm">{item.name}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-xs font-black text-gray-400 tracking-tight">Qty: {item.qty}</p>
                                                    <p className="text-sm font-black text-[#f17840]">{trackingData.currency || 'INR'} {item.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default TrackOrder;
