import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import StickyActions from '../Components/StickyActions';
import Footer from '../Componet/Footer';
import Navbar from '../Componet/Navbar';
import React from 'react';

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqs = [
        {
            question: "What Shipping Methods Are Available?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat ut wisi enim veniam lorem dolore magna aliqua."
        },
        {
            question: "Do You Ship Internationally?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat ut wisi enim veniam lorem dolore magna aliqua."
        },
        {
            question: "What Payment Methods Are Accepted?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat ut wisi enim veniam lorem dolore magna aliqua."
        },
        {
            question: "Can I Return The Product After Purchase?",
            answer: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat ut wisi enim veniam lorem dolore magna aliqua."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section (Same as Store Location for consistency) */}
            <div className="relative h-[300px] flex flex-col items-center justify-center text-center px-4 bg-[#411151]">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10">
                    <h1 className="text-[38px] font-black text-white mb-4 uppercase tracking-tight">Frequently Asked Questions</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">FAQ</span>
                    </div>
                </div>
            </div>

            {/* FAQ Main Content Area */}
            <div className="max-w-[1440px] mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row items-start gap-16 xl:gap-24">

                    {/* Left Side: Images Section */}
                    <div className="lg:w-1/2 relative">
                        {/* Shape Background with Rotation */}
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-shape.webp"
                            alt="shape"
                            className="absolute -top-10 -left-10 w-full h-full object-contain opacity-50 dark:opacity-20 pointer-events-none animate-spin-slow"
                        />

                        <div className="relative flex items-center">
                            {/* Main Image 1 */}
                            <div className="relative z-10 w-[65%] rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-1.webp"
                                    alt="faq-1"
                                    className="w-full h-auto"
                                />
                            </div>

                            {/* Overlapping Image 2 */}
                            <div className="absolute -bottom-12 -right-4 w-[60%] z-20 rounded-lg overflow-hidden shadow-2xl border-8 border-white dark:border-[#0b0c0d]">
                                <img
                                    src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/faq/faq-2.webp"
                                    alt="faq-2"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Accordion Section */}
                    <div className="lg:w-1/2 mt-20 lg:mt-0">
                        <div className="mb-10">
                            <span className="text-[#f17840] font-bold text-sm uppercase tracking-widest block mb-3">FAQ</span>
                            <h2 className="text-[36px] xl:text-[42px] font-black text-[#253d4e] dark:text-white leading-tight">
                                Need To Ask Some Questions Or Check Questions
                            </h2>
                        </div>

                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="border-b border-gray-100 dark:border-gray-800 pb-6 transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                        className="w-full flex items-center justify-between text-left group"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${activeIndex === index ? 'bg-[#f17840] border-[#f17840] text-white shadow-lg shadow-orange-500/30' : 'bg-white dark:bg-[#1a1c1e] border-gray-200 dark:border-gray-700 text-gray-500 group-hover:border-[#f17840] group-hover:text-[#f17840]'}`}>
                                                {activeIndex === index ? <Minus size={20} strokeWidth={2.5} /> : <Plus size={20} strokeWidth={2.5} />}
                                            </div>
                                            <span className={`text-[19px] font-bold transition-all duration-300 ${activeIndex === index ? 'text-[#f17840]' : 'text-[#253d4e] dark:text-white group-hover:text-[#f17840]'}`}>
                                                {faq.question}
                                            </span>
                                        </div>
                                    </button>

                                    <div className={`grid transition-all duration-500 ease-in-out ${activeIndex === index ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
                                        <div className="overflow-hidden">
                                            <div className="pl-16 text-gray-500 dark:text-gray-400 font-medium leading-relaxed max-w-[550px]">
                                                {faq.answer}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <StickyActions />
            <Footer />

        </div>
    );
};

export default Faq;