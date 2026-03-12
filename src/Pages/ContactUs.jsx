import axios from "axios";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        agree: false
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Please enter your name";
        if (!formData.email.trim()) {
            newErrors.email = "Please enter your email";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }
        if (!formData.message.trim()) newErrors.message = "Please enter your message";
        if (!formData.agree) newErrors.agree = "You must agree to the terms";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus({ loading: true, success: false, error: null });

        try {
            const response = await axios.post("http://localhost:5000/api/contact", formData);
            if (response.data) {
                setStatus({ loading: false, success: true, error: null });
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                    agree: false
                });
                setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
            }
        } catch (err) {
            console.error("Submission Error:", err);
            setStatus({
                loading: false,
                success: false,
                error: err.response?.data?.error || "Something went wrong. Please try again later."
            });
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d] transition-colors duration-300">
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
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Contact Us</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Contact</span>
                    </div>
                </div>
            </div>

            {/* Contact Info & Map Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Contact Info Column */}
                    <div className="space-y-6">
                        {/* Location */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-[10px] flex items-start gap-6 border border-transparent hover:border-[#f17840]/30 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-white dark:bg-[#1a1c1e] rounded-full shadow-sm flex items-center justify-center flex-shrink-0 text-[#f17840] group-hover:bg-[#f17840] group-hover:text-white transition-all duration-300">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-[#253d4e] dark:text-white font-black text-xl mb-3">Our Location</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                                    125/CA 560 bush, st & 20th ave,<br />
                                    apt 5, San Francisco, USA
                                </p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-[10px] flex items-start gap-6 border border-transparent hover:border-[#f17840]/30 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-white dark:bg-[#1a1c1e] rounded-full shadow-sm flex items-center justify-center flex-shrink-0 text-[#f17840] group-hover:bg-[#f17840] group-hover:text-white transition-all duration-300">
                                <Mail size={24} />
                            </div>
                            <div>
                                <h3 className="text-[#253d4e] dark:text-white font-black text-xl mb-3">Email Us</h3>
                                <div className="space-y-1">
                                    <p className="text-gray-500 dark:text-gray-400 font-medium hover:text-[#f17840] cursor-pointer transition-colors">hello@torado.com</p>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium hover:text-[#f17840] cursor-pointer transition-colors">support@torado.com</p>
                                </div>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-[10px] flex items-start gap-6 border border-transparent hover:border-[#f17840]/30 transition-all duration-300 group">
                            <div className="w-14 h-14 bg-white dark:bg-[#1a1c1e] rounded-full shadow-sm flex items-center justify-center flex-shrink-0 text-[#f17840] group-hover:bg-[#f17840] group-hover:text-white transition-all duration-300">
                                <Phone size={24} />
                            </div>
                            <div>
                                <h3 className="text-[#253d4e] dark:text-white font-black text-xl mb-3">Phone Number</h3>
                                <div className="space-y-1">
                                    <p className="text-gray-500 dark:text-gray-400 font-medium hover:text-[#f17840] cursor-pointer transition-colors">+44 587 154756</p>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium hover:text-[#f17840] cursor-pointer transition-colors">+55 5555 14574</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map Column */}
                    <div className="lg:col-span-2 rounded-[10px] overflow-hidden min-h-[400px] shadow-sm border border-gray-100 dark:border-gray-800">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.83543450937!2d144.9537363153167!3d-37.81720997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sau!4v1605634688176!5m2!1sen!2sau"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            aria-hidden="false"
                            tabIndex="0"
                            title="Location Map"
                            className="grayscale contrast-125 dark:invert dark:opacity-80 transition-all duration-500"
                        ></iframe>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="mt-20 bg-[#f8f9fa] dark:bg-[#151618] p-8 md:p-12 rounded-[15px] shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-300">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-10">Leave A Message</h2>

                    {/* Status Messages */}
                    {status.success && (
                        <div className="mb-8 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center gap-3 text-green-600 font-bold animate-in fade-in slide-in-from-top-4 duration-500">
                            <CheckCircle2 size={24} />
                            <span>Success! Your message has been sent. We'll get back to you soon.</span>
                        </div>
                    )}
                    {status.error && (
                        <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-600 font-bold animate-in fade-in slide-in-from-top-4 duration-500">
                            <AlertCircle size={24} />
                            <span>{status.error}</span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name*"
                                    className={`w-full bg-white dark:bg-[#1a1c1e] border ${errors.name ? 'border-red-500' : 'border-transparent'} focus:border-[#f17840]/50 px-6 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white outline-none transition-all shadow-sm`}
                                />
                                {errors.name && <p className="text-red-500 text-[13px] font-bold mt-1 px-1">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email*"
                                    className={`w-full bg-white dark:bg-[#1a1c1e] border ${errors.email ? 'border-red-500' : 'border-transparent'} focus:border-[#f17840]/50 px-6 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white outline-none transition-all shadow-sm`}
                                />
                                {errors.email && <p className="text-red-500 text-[13px] font-bold mt-1 px-1">{errors.email}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full bg-white dark:bg-[#1a1c1e] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white outline-none transition-all shadow-sm"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Subject"
                                    className="w-full bg-white dark:bg-[#1a1c1e] border border-transparent focus:border-[#f17840]/50 px-6 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white outline-none transition-all shadow-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Your Messages..*"
                                rows="6"
                                className={`w-full bg-white dark:bg-[#1a1c1e] border ${errors.message ? 'border-red-500' : 'border-transparent'} focus:border-[#f17840]/50 px-6 py-4 rounded-[8px] text-[15px] font-medium text-gray-700 dark:text-white outline-none transition-all shadow-sm resize-none`}
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-[13px] font-bold mt-1 px-1">{errors.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    id="terms"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="w-4 h-4 accent-[#f17840] cursor-pointer"
                                />
                                <label htmlFor="terms" className="text-gray-500 dark:text-gray-400 text-[14px] font-medium cursor-pointer">
                                    I agree to the <span className="text-[#f17840] hover:underline transition-all font-bold">terms & conditions</span> and <span className="text-[#f17840] hover:underline transition-all font-bold">privacy policy</span>
                                </label>
                            </div>
                            {errors.agree && <p className="text-red-500 text-[13px] font-bold px-1">{errors.agree}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={status.loading}
                            className={`group bg-[#f17840] text-white px-10 py-4 rounded-[5px] font-black text-base transition-all duration-300 shadow-md transform hover:-translate-y-1 flex items-center justify-center gap-3 disabled:opacity-70 disabled:transform-none disabled:cursor-not-allowed min-w-[200px] overflow-hidden relative`}
                        >
                            {status.loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={20} />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send Message</span>
                                    <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default ContactUs;
