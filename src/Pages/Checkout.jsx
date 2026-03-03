import axios from "axios";
import {
    ChevronDown, CreditCard, Info, Lock, MapPin, ShieldCheck, Truck
} from "lucide-react";
import { useState } from "react";
import React from "react";      
import { Link, useNavigate } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import { useCart } from "../context/CartContext";

const Checkout = () => {
    const { cartItems, clearCart } = useCart();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form States
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        country: "India",
        state: "Gujarat",
        city: "",
        street: "",
        zip: "",
        shipDifferent: false,
        orderNote: "",
        acceptTerms: false
    });

    const [paymentMethod, setPaymentMethod] = useState("bank");

    // Calculations
    const subtotal = cartItems.reduce((acc, item) => {
        let itemTotal = item.price * item.quantity;
        if (item.badge) {
            const match = item.badge.match(/(\d+)%/);
            if (match) {
                const percent = parseInt(match[1]);
                itemTotal -= (itemTotal * percent) / 100;
            }
        }
        return acc + itemTotal;
    }, 0);

    const shipping = subtotal > 500 ? 0 : 50;
    const discount = 0;
    const total = subtotal + shipping - discount;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        if (!formData.firstName || !formData.email || !formData.street) {
            alert("Please fill in first name, email and address.");
            return;
        }

        if (!formData.acceptTerms) {
            alert("Please accept the Terms & Conditions to place your order.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        setLoading(true);

        try {
            const orderPayload = {
                customer_name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                phone: formData.phone,
                address: formData.street,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                total_amount: total,
                payment_method: paymentMethod,
                order_note: formData.orderNote,
                items: cartItems
            };

            const response = await axios.post("http://localhost:5000/api/orders", orderPayload);

            if (response.data.orderId) {
                alert("🎉 Order Placed Successfully! Your Order ID: " + response.data.orderId);
                clearCart();
                navigate("/");
            }
        } catch (err) {
            console.error("Order error:", err);
            alert("❌ Failed to place order: " + (err.response?.data?.error || err.message));
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
                    <h1 className="text-[36px] md:text-[48px] font-black text-white mb-4 uppercase tracking-tight">Checkout</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link href="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/cart" className="hover:text-[#f17840] transition-colors">Cart</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Checkout</span>
                    </div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-6 py-16">

                {/* Top Notices */}
                <div className="space-y-4 mb-10">
                    <div className="bg-[#f8f9fa] dark:bg-[#151618] p-5 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f17840]"></div>
                        <p className="text-[15px] font-medium text-gray-600 dark:text-gray-400">
                            Returning Customer? <Link to="/my-account" className="text-[#f17840] font-black hover:underline">Click Here To Login</Link>
                        </p>
                    </div>
                    <div className="bg-[#f8f9fa] dark:bg-[#151618] p-5 rounded-lg border border-gray-100 dark:border-gray-800 flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#f17840]"></div>
                        <p className="text-[15px] font-medium text-gray-600 dark:text-gray-400">
                            Have A Coupon Code? <button className="text-[#f17840] font-black hover:underline">Click Here To Enter Coupon Code</button>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    {/* Left Column: Billing Details */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-white dark:bg-[#151618] p-8 md:p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-[24px] font-black text-[#253d4e] dark:text-white mb-8 pb-4 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3">
                                <MapPin className="text-[#f17840]" />
                                Billing Details
                            </h2>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">First Name</label>
                                        <input
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="e.g. Jignesh"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Last Name</label>
                                        <input
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="e.g. Gadher"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            type="email"
                                            placeholder="example@gmail.com"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="+91 00000 00000"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Company Name (Optional)</label>
                                    <input
                                        name="company"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                        type="text"
                                        placeholder="Company Name"
                                        className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2 relative">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Country</label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none appearance-none"
                                        >
                                            <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 bottom-5 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="space-y-2 relative">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">State</label>
                                        <select
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none appearance-none"
                                        >
                                            <option value="Gujarat">Gujarat</option>
                                            <option value="Maharashtra">Maharashtra</option>
                                            <option value="Rajasthan">Rajasthan</option>
                                        </select>
                                        <ChevronDown size={16} className="absolute right-4 bottom-5 text-gray-400 pointer-events-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">City</label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Your City"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Street Address</label>
                                        <input
                                            name="street"
                                            value={formData.street}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="House number and street name"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">ZIP Code</label>
                                        <input
                                            name="zip"
                                            value={formData.zip}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="123456"
                                            className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-bold text-gray-700 dark:text-white transition-all outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 pt-4">
                                    <input
                                        type="checkbox"
                                        id="shipDifferent"
                                        name="shipDifferent"
                                        checked={formData.shipDifferent}
                                        onChange={handleInputChange}
                                        className="w-5 h-5 accent-[#f17840] cursor-pointer"
                                    />
                                    <label htmlFor="shipDifferent" className="text-[15px] font-black text-[#253d4e] dark:text-white cursor-pointer">
                                        Ship To A Different Address?
                                    </label>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[14px] font-black text-gray-500 uppercase tracking-widest ml-1">Order Note (Optional)</label>
                                    <textarea
                                        name="orderNote"
                                        value={formData.orderNote}
                                        onChange={handleInputChange}
                                        rows="4"
                                        placeholder="Notes about your order, e.g. special notes for delivery."
                                        className="w-full bg-[#f8f9fa] dark:bg-[#0b0c0d] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-xl text-[15px] font-medium text-gray-700 dark:text-white transition-all outline-none resize-none"
                                    ></textarea>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 accent-[#f17840] cursor-pointer"
                                        />
                                        <label htmlFor="acceptTerms" className="text-[14px] font-bold text-gray-600 dark:text-gray-400 cursor-pointer">
                                            I have read And Accept the <Link to="/terms-of-service" className="text-[#f17840] hover:underline">Terms of Service</Link> *
                                        </label>
                                    </div>
                                    <button
                                        type="button"
                                        className="bg-[#f17840] hover:bg-[#e06b35] text-white px-10 py-4 rounded-xl font-black transition-all shadow-lg active:scale-95"
                                    >
                                        Save Information
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Right Column: Widgets */}
                    <div className="lg:col-span-4 space-y-8 sticky top-24">

                        {/* Summary Widget */}
                        <div className="bg-white dark:bg-[#151618] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-[20px] font-black text-[#253d4e] dark:text-white mb-6 flex items-center gap-3">
                                <Info className="text-[#f17840]" />
                                Checkout Summary
                            </h2>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 font-bold">
                                    <span>Subtotal</span>
                                    <span className="text-[#253d4e] dark:text-white">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 font-bold">
                                    <span>Shipping</span>
                                    <span className="text-[#253d4e] dark:text-white">₹{shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600 dark:text-gray-400 font-bold">
                                    <span>Discount</span>
                                    <span className="text-green-500">-₹{discount.toFixed(2)}</span>
                                </div>

                                <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                                    <span className="text-[18px] font-black text-[#253d4e] dark:text-white uppercase">Total</span>
                                    <span className="text-[22px] font-black text-[#f17840]">₹{total.toFixed(2)}</span>
                                </div>

                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={loading}
                                    className={`w-full bg-[#f17840] hover:bg-[#e06b35] text-white py-4 rounded-xl font-black text-[15px] uppercase tracking-wider shadow-lg shadow-[#f17840]/20 transition-all active:scale-95 mt-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Processing...
                                        </div>
                                    ) : "Proceed To Checkout"}
                                </button>
                            </div>
                        </div>

                        {/* Payment Widget */}
                        <div className="bg-white dark:bg-[#151618] p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h2 className="text-[20px] font-black text-[#253d4e] dark:text-white mb-6 flex items-center gap-3">
                                <CreditCard className="text-[#f17840]" />
                                Payment Method
                            </h2>

                            <div className="space-y-5">
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="radio"
                                            id="bank"
                                            name="payment"
                                            checked={paymentMethod === "bank"}
                                            onChange={() => setPaymentMethod("bank")}
                                            className="mt-1.5 w-4 h-4 accent-[#f17840]"
                                        />
                                        <div className="flex-1">
                                            <label htmlFor="bank" className="text-[15px] font-black text-[#253d4e] dark:text-white cursor-pointer">Direct Bank Transfer</label>
                                            {paymentMethod === "bank" && (
                                                <p className="text-[13px] text-gray-500 dark:text-gray-400 mt-2 bg-gray-50 dark:bg-[#0b0c0d] p-3 rounded-lg leading-relaxed">
                                                    Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won't be shipped until the funds have cleared in our account.
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            id="check"
                                            name="payment"
                                            checked={paymentMethod === "check"}
                                            onChange={() => setPaymentMethod("check")}
                                            className="w-4 h-4 accent-[#f17840]"
                                        />
                                        <label htmlFor="check" className="text-[15px] font-black text-[#253d4e] dark:text-white cursor-pointer">Check Payment</label>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="radio"
                                            id="cod"
                                            name="payment"
                                            checked={paymentMethod === "cod"}
                                            onChange={() => setPaymentMethod("cod")}
                                            className="w-4 h-4 accent-[#f17840]"
                                        />
                                        <label htmlFor="cod" className="text-[15px] font-black text-[#253d4e] dark:text-white cursor-pointer">Cash On Delivery</label>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="paymentTerms"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                                            className="mt-1 w-4 h-4 accent-[#f17840]"
                                        />
                                        <label htmlFor="paymentTerms" className="text-[13px] font-bold text-gray-600 dark:text-gray-400 cursor-pointer">
                                            I've read & accept the <Link to="/terms-of-service" className="text-[#f17840] hover:underline">Terms of Service</Link> *
                                        </label>
                                    </div>

                                    <button
                                        onClick={handlePlaceOrder}
                                        disabled={loading}
                                        className={`w-full bg-[#f17840] hover:bg-[#e06b35] text-white py-4 rounded-xl font-black text-[15px] uppercase tracking-wider shadow-lg transition-all active:scale-95 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                Processing...
                                            </div>
                                        ) : "Place Order"}
                                    </button>
                                </div>

                                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                                    <ShieldCheck size={24} className="text-green-500" />
                                    <p className="text-[12px] font-bold text-gray-500 uppercase tracking-widest text-center">
                                        Secure Checkout <br /> Guaranteed
                                    </p>
                                    <Lock size={20} className="text-[#f17840]" />
                                </div>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white dark:bg-[#151618] p-5 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                                <Truck size={24} className="mx-auto text-[#f17840]" />
                                <p className="text-[11px] font-black uppercase text-gray-500">Fast Delivery</p>
                            </div>
                            <div className="bg-white dark:bg-[#151618] p-5 rounded-xl border border-gray-100 dark:border-gray-800 text-center space-y-2">
                                <CreditCard size={24} className="mx-auto text-[#f17840]" />
                                <p className="text-[11px] font-black uppercase text-gray-500">Secure Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default Checkout;
