import { Facebook, Headset, Instagram, Linkedin, Package, Quote, RotateCcw, Twitter, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FaPinterestP } from "react-icons/fa";
import { Link } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";
import React from "react";  

const About = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [isPartnerHovered, setIsPartnerHovered] = useState(false);
    const teamSliderRef = useRef(null);
    const partnerSliderRef = useRef(null);

    const team = [
        { name: "Michel Jhon", role: "Founder", img: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/team/team-4.webp" },
        { name: "Mshila Jhon", role: "Manager", img: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/team/team-2.webp" },
        { name: "Michel Jhon", role: "CEO", img: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/team/team-3.webp" },
        { name: "Michel Jhon", role: "Director", img: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/team/team-1.webp" },
        { name: "Michel Jhon", role: "Specialist", img: "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/about-img.webp" }
    ];

    const repeatedTeam = [...team, ...team, ...team, ...team];

    const partners = [
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-1.webp",
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-2.webp",
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-3.webp",
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-4.webp",
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-5.webp",
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-6.webp",
        "https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/partner/partner-7.webp"
    ];

    const repeatedPartners = [...partners, ...partners, ...partners];

    // Team Auto-Scroll (One by One)
    useEffect(() => {
        let interval;
        if (!isHovered && teamSliderRef.current) {
            interval = setInterval(() => {
                const slider = teamSliderRef.current;
                if (slider) {
                    const scrollAmount = 332; // 300px width + 32px gap
                    const maxScroll = slider.scrollWidth - slider.clientWidth;

                    if (slider.scrollLeft >= maxScroll - 10) {
                        slider.scrollTo({ left: 0, behavior: 'instant' });
                    } else {
                        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    // Partner Auto-Scroll (One by One)
    useEffect(() => {
        let interval;
        if (!isPartnerHovered && partnerSliderRef.current) {
            interval = setInterval(() => {
                const slider = partnerSliderRef.current;
                if (slider) {
                    const scrollAmount = 224; // 160px (w-40) + 64px (gap-16)
                    const maxScroll = slider.scrollWidth - slider.clientWidth;

                    if (slider.scrollLeft >= maxScroll - 10) {
                        slider.scrollTo({ left: 0, behavior: 'instant' });
                    } else {
                        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                }
            }, 3000);
        }
        return () => clearInterval(interval);
    }, [isPartnerHovered]);

    const features = [
        {
            icon: <Package size={40} className="text-[#f17840]" />,
            title: "Worldwide Shipping",
            desc: "Order Above ₹100",
        },
        {
            icon: <RotateCcw size={40} className="text-[#f17840]" />,
            title: "Easy 30 Days Return",
            desc: "Return Back In 7 Days",
        },
        {
            icon: <Wallet size={40} className="text-[#f17840]" />,
            title: "Money Back Guarantee",
            desc: "Guarantee With In 30 Days",
        },
        {
            icon: <Headset size={40} className="text-[#f17840]" />,
            title: "Easy Online Support",
            desc: "24/2 Support",
        },
    ];

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
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">About Us</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">About Us</span>
                    </div>
                </div>
            </div>

            {/* Our Story Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/about-img.webp"
                                alt="Our Story"
                                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                            />
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="max-w-[600px]">
                            <h2 className="text-[28px] md:text-[32px] font-black text-[#253d4e] dark:text-white mb-6">
                                Our Story
                            </h2>
                            <p className="text-[#7e7e7e] dark:text-gray-400 text-base leading-relaxed mb-6">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p className="text-[#7e7e7e] dark:text-gray-400 text-base leading-relaxed mb-8">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>

                            <div className="flex gap-6 items-start bg-[#f8f9fa] dark:bg-[#151618] p-8 rounded-2xl border-l-4 border-[#f17840]">
                                <div className="text-[#f17840] flex-shrink-0">
                                    <Quote size={40} strokeWidth={1} />
                                </div>
                                <p className="text-[#253d4e] dark:text-white font-bold text-lg leading-snug">
                                    Create stunning images with as much or as little control as you like thanks to a choice of Basic and Creative modes.
                                </p>
                            </div>

                            <div className="mt-8">
                                <h4 className="text-[#253d4e] dark:text-white font-black text-xl">Michel Jhon</h4>
                                <p className="text-[#7e7e7e] dark:text-gray-500 font-bold">Founder</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-[#f8f9fa] dark:bg-[#151618] py-20 px-6 transition-colors duration-300">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="text-[28px] md:text-[32px] font-black text-[#253d4e] dark:text-white mb-12 text-center md:text-left">
                        Why Choose Us
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-[#0b0c0d] p-10 rounded-2xl text-center flex flex-col items-center justify-center shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-orange-100 dark:hover:border-orange-900/30"
                            >
                                <div className="mb-6 transform transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 bg-[#fffcf5] dark:bg-white p-6 rounded-full">
                                    {feature.icon}
                                </div>
                                <h3 className="text-[#253d4e] dark:text-white font-black text-lg mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-[#7e7e7e] dark:text-gray-400 font-bold text-sm">
                                    {feature.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Our Team Section */}
            <div className="bg-white dark:bg-[#0b0c0d] py-24 px-6 overflow-hidden">
                <div className="max-w-[1440px] mx-auto">
                    <h2 className="text-[28px] md:text-[32px] font-black text-[#253d4e] dark:text-white mb-12 text-center md:text-left">
                        Our Team
                    </h2>

                    <div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        className="relative group flex overflow-hidden"
                    >
                        <div
                            className="flex gap-8"
                            style={{
                                animation: 'marquee 25s linear infinite',
                                animationPlayState: isHovered ? 'paused' : 'running',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {repeatedTeam.map((member, idx) => (
                                <div key={idx} className="flex-shrink-0 w-[300px] group/card cursor-pointer inline-block whitespace-normal">
                                    <div className="relative overflow-hidden rounded-2xl aspect-[1/1.1] mb-6 shadow-sm">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                        />

                                        {/* Social Icons - Stacked vertically on left */}
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                            {[
                                                { Icon: Facebook, color: '#1877F2' },
                                                { Icon: Twitter, color: '#1DA1F2' },
                                                { Icon: Linkedin, color: '#0A66C2' },
                                                { Icon: Instagram, color: '#E4405F' },
                                                { Icon: FaPinterestP, color: '#BD081C' }
                                            ].map((social, i) => (
                                                <div
                                                    key={i}
                                                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md translate-x-[-100px] group-hover/card:translate-x-0 transition-all duration-500 hover:bg-[#f17840] hover:text-white group/icon"
                                                    style={{ transitionDelay: `${i * 100}ms` }}
                                                >
                                                    <social.Icon size={18} style={{ color: social.color }} className="group-hover/icon:!text-white transition-colors" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-[#253d4e] dark:text-white font-black text-xl mb-1 group-hover/card:text-[#f17840] transition-all duration-300">
                                            {member.name}
                                        </h3>
                                        <p className="text-[#7e7e7e] dark:text-gray-500 font-bold uppercase text-[12px] tracking-widest">
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Partner Brands Section */}
            <div className="bg-[#f8f9fa] dark:bg-[#151618] py-16 px-6 overflow-hidden border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-[1440px] mx-auto">
                    <div className="relative flex overflow-hidden group">
                        <div
                            onMouseEnter={() => setIsPartnerHovered(true)}
                            onMouseLeave={() => setIsPartnerHovered(false)}
                            className="flex gap-16 items-center"
                            style={{
                                animation: 'partner-marquee 30s linear infinite',
                                animationPlayState: isPartnerHovered ? 'paused' : 'running',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {repeatedPartners.map((url, idx) => (
                                <div key={idx} className="flex-shrink-0 w-40 h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-500 cursor-pointer">
                                    <img src={url} alt={`Partner ${idx}`} className="max-w-full max-h-full object-contain" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-300px * 5 - 32px * 5)); }
                }
                @keyframes partner-marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-160px * 7 - 64px * 7)); }
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />

            <Footer />
            <StickyActions />
        </div>
    );
};

export default About;
