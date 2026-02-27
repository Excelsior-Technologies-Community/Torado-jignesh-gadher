import StickyActions from '../Components/StickyActions';
import Footer from '../Componet/Footer';
import Navbar from '../Componet/Navbar';
import React from "react";      


const PrivacyPolicy = () => {
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
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Privacy Policy</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Privacy Policy</span>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-[1200px] mx-auto px-6 py-20">
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Information Collection</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-6">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, <span className="text-[#f17840] underline underline-offset-4 cursor-pointer">company name</span> saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos <span className="font-bold">activities</span> ea pariatur corrupti rerum deserun, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non fuga ipsam veniam.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">How We Use Cookies</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-8">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserun, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non fuga ipsam veniam.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Lorem ipsum dolor, sit amet.",
                            "Amet consectetur adipisicing elit. Officia, odit!",
                            "Aquaerat ipsa quis possimus.",
                            "Lorem, ipsum dolor sit amet consectetur adipi.",
                            "Consectetur adipisicing elit. Voluptatibus, dignissimos.",
                            "Highly professional administration."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3 text-gray-500 dark:text-gray-400 font-medium">
                                <svg className="w-4 h-4 text-[#f17840]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">The Collection, Process, and Use of Personal Data</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Data Protection</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-6">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, <span className="text-[#f17840] underline underline-offset-4 cursor-pointer">company name</span> saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos <span className="font-bold">aspernatur</span> ea pariatur corrupti rerum deserun, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non fuga ipsam veniam.
                    </p>
                </div>

                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">The Collection, Process, and Use of Personal Data</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-8">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum, quod. Ratione ex delectus quis tenetur odio non alias numquam official ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, laborum.
                    </p>
                    <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-medium text-[16px] list-none">
                        <li className="flex gap-4">
                            <span>1.</span>
                            <span>Mauris ut in vestibulum hasellus ultrices fusce nibh justo, venenatis, amet. Lectus quam in lobortis.</span>
                        </li>
                        <li className="flex gap-4">
                            <span>2.</span>
                            <span>Consectetur phasellus <span className="font-bold text-[#253d4e] dark:text-white">ultrices</span> fusce nibh justo, venenatis, amet. Lectus quam in lobortis justo venenatis amet.</span>
                        </li>
                        <li className="flex gap-4">
                            <span>3.</span>
                            <span>Lectus quam there are two thing is very important in Consectetur phasellus ultrices fusce nibh justo, venenatis, amet in lobortis.</span>
                        </li>
                        <li className="flex gap-4">
                            <span>4.</span>
                            <span>Web Development very creative to do something , mauris ut in vestibulum.</span>
                        </li>
                    </ul>
                </div>

                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Our Policy For Age Under 18</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;