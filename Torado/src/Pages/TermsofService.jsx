import StickyActions from '../Components/StickyActions';
import Footer from '../Componet/Footer';
import Navbar from '../Componet/Navbar';
import React from "react";

const TermsofService = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section */}
            <div className="relative h-[300px] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/page-title-bg/page-title-bg-1.webp')`,
                    }}
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[#411151]/85"></div>

                <div className="relative z-10">
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Terms of Service</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Terms of Service</span>
                    </div>
                </div>
            </div>            {/* Content Section */}
            <div className="max-w-[1200px] mx-auto px-6 py-20">
                {/* Legal Disclaimer */}
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Legal Disclaimer:</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, subscribe to the newsletter, fill out a form, and in connection with other <span className="font-bold">activities</span>, services, features or resources we make available on our Site. Users may be asked for, as appropriate, name, email address, mailing address, phone number, <span className="text-[#f17840]">company name</span>. We will collect personal identification information from Users only if they voluntarily consent such information to us. Users can always refuse to supply personally identification information, except that it may prevent them from engaging in certain Site related activities.
                    </p>
                </div>

                {/* Credit Reporting Terms of Service */}
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Credit Reporting Terms of Service</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-8">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, quod. Ratione ex delectus quis tenetur odio non alias numquam official ipsum dolor sit, amet consectetur adipisicing elit. Accusamus, laborum.
                    </p>
                    <ul className="space-y-4 text-gray-500 dark:text-gray-400 font-medium text-[16px] list-none">
                        {/* Numbered List as per screenshot */}
                        <li className="flex gap-4">
                            <span>1.</span>
                            <span>Mauris ut in vestibulum hasellus ultrices fusce nibh justo, venenatis, amet. Lectus quam in lobortis.</span>
                        </li>
                        <li className="flex gap-4">
                            <span>2.</span>
                            <span>Consectetur phasellus <span className="font-bold">ultrices</span> fusce nibh justo, venenatis, amet. Lectus quam in lobortis justo venenatis amet.</span>
                        </li>
                        <li className="flex gap-4">
                            <span>3.</span>
                            <span>Lectus quam there are two thing is very important in Consectetur phasellus ultrices fusce nibh justo, venenatis, amet in lobortis.</span>
                        </li>
                        <li className="flex gap-4">
                            <span>4.</span>
                            <span>Web Development very creative to do something , mauris ut in vestibulum. Consectetur phasellus ultrices fusce nibh justo, venenatis, amet to all design.</span>
                        </li>
                    </ul>
                </div>

                {/* Ownership of Site Agreement */}
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Ownership of Site Agreement to Terms of Use</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-6">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserun, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non fuga ipsam.
                    </p>
                </div>

                {/* Provision of Services */}
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Provision of Services</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-8">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserun, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam. Earum eius similique sapiente. Iure, sit non fuga ipsam.
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
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

                {/* Limitation of Liability */}
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Limitation of Liability</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                </div>

                {/* Accounts, Passwords and Security */}
                <div className="mb-12">
                    <h2 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-6">Accounts, Passwords and Security</h2>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px] mb-6">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime nulla minus quasi. Voluptatem, facilis saepe ullam autem magni quod sint tempore, eius molestias aliquam debitis. Neque saepe dignissimos repudiandae fuga.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 leading-[1.8] text-[16px]">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eveniet quas dignissimos doloribus ea pariatur corrupti rerum deserun, ipsum, ipsa eos veniam aspernatur fuga, optio soluta? Libero neque reiciendis cupiditate dolores nam.
                    </p>
                </div>
            </div>
            <StickyActions />
            <Footer />
        </div>
    );
};

export default TermsofService;