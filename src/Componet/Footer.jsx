import React from "react";
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaRegEnvelope, FaTwitter } from 'react-icons/fa';
import { FiArrowUp } from 'react-icons/fi';
import { IoLocationOutline } from 'react-icons/io5';


const Footer = () => {
    const [scrollProgress, setScrollProgress] = React.useState(0);
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = window.scrollY;
            const progress = (currentScroll / totalScroll) * 100;
            setScrollProgress(progress);

            if (currentScroll > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // SVG Circumference calculation (2 * PI * R)
    // R = 23 (radius of the circle)
    const radius = 23;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (scrollProgress / 100) * circumference;

    return (
        <footer className="bg-[#1a123a] dark:bg-[#151515] text-white pt-20 pb-10 relative transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1: Logo & Contact */}
                    <div className="flex flex-col gap-8">
                        <div className="flex items-center">
                            <img
                                src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/logo.webp"
                                alt="Torado"
                                className="h-10 invert-[1] hue-rotate-[180deg] brightness-[1.5]"
                            />
                        </div>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <IoLocationOutline className="text-[#f17840] text-3xl mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="font-black text-lg dark:text-white transition-colors">Location:</span>
                                    <span className="text-gray-300 dark:text-gray-400 text-[15px] leading-relaxed transition-colors">2976/A, Sunrise road, Las Vegas, USA</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <FaRegEnvelope className="text-[#f17840] text-2xl mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="font-black text-lg dark:text-white transition-colors">Email:</span>
                                    <span className="text-gray-300 dark:text-gray-400 text-[15px] transition-colors">helo@torado.com</span>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <FaPhoneAlt className="text-[#f17840] text-2xl mt-1 shrink-0" />
                                <div className="flex flex-col">
                                    <span className="font-black text-lg dark:text-white transition-colors">Phone:</span>
                                    <span className="text-gray-300 dark:text-gray-400 text-[15px] transition-colors">098765432150</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Useful Links */}
                    <div className="flex flex-col gap-8">
                        <div className="relative">
                            <h4 className="text-[22px] font-black">Useful Links</h4>
                            <div className="absolute -bottom-3 left-0 w-12 h-0.5 bg-[#f17840]"></div>
                        </div>

                        <ul className="space-y-4">
                            {[
                                { name: 'About', path: '#' },
                                { name: 'Order Tracking', path: '#' },
                                { name: 'Terms & Conditions', path: '/terms-of-service' },
                                { name: 'Store Location', path: '/storelocation' },
                                { name: 'Privacy Policy', path: '/privacy-policy' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a href={link.path} className="text-gray-300 hover:text-[#f17840] transition-colors text-[16px] font-medium">
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Information */}
                    <div className="flex flex-col gap-8">
                        <div className="relative">
                            <h4 className="text-[22px] font-black">Information</h4>
                            <div className="absolute -bottom-3 left-0 w-12 h-0.5 bg-[#f17840]"></div>
                        </div>

                        <ul className="space-y-4">
                            {['Delivery Information', 'Help Center', 'Products', 'Blog', 'Contact'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-300 hover:text-[#f17840] transition-colors text-[16px] font-medium">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="flex flex-col gap-8">
                        <div className="relative">
                            <h4 className="text-[22px] font-black">Newsletter</h4>
                            <div className="absolute -bottom-3 left-0 w-12 h-0.5 bg-[#f17840]"></div>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-300 text-[16px]">Subscribe Our Newsletter To get News</p>

                            <div className="relative flex items-center bg-white dark:bg-[#1a1c1e] rounded-[5px] overflow-hidden p-1.5 h-[60px] border border-transparent dark:border-gray-800 transition-colors">
                                <input
                                    type="email"
                                    placeholder="Enter Your Email"
                                    className="w-full bg-transparent text-[#253d4e] dark:text-white px-4 focus:outline-none font-medium placeholder:text-gray-400"
                                />
                                <button className="bg-[#f17840] hover:bg-[#e06b35] transition-colors w-[50px] h-full rounded-[4px] flex items-center justify-center text-white shrink-0">
                                    <FaRegEnvelope size={22} />
                                </button>
                            </div>

                            <div className="flex items-center gap-6 mt-8">
                                <h5 className="text-[20px] font-black whitespace-nowrap">Follow Us:</h5>
                                <div className="flex gap-4">
                                    {[
                                        { icon: <FaFacebookF /> },
                                        { icon: <FaTwitter /> },
                                        { icon: <FaInstagram /> }
                                    ].map((social, i) => (
                                        <a
                                            key={i}
                                            href="#"
                                            className="bg-white dark:bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group/social hover:bg-[#f17840] dark:hover:bg-[#f17840]"
                                        >
                                            <span className="text-[#f17840] dark:text-gray-300 group-hover/social:text-white text-xl flex items-center justify-center">
                                                {social.icon}
                                            </span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-20 pt-8 border-t border-white/10 dark:border-gray-800 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
                    <p className="text-gray-300 text-[15px]">
                        © <span className="text-[#f17840] font-bold">Torado</span> is proudly owned by <span className="text-[#f17840] font-bold">EnvyTheme</span>
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-300 text-[15px] font-medium mr-2">We accept payment via</span>
                        <div className="flex gap-3">
                            <img src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/payment/payment-1.webp" alt="Card" className="h-6 object-contain" />
                            <img src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/payment/payment-2.webp" alt="Card" className="h-6 object-contain" />
                            <img src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/payment/payment-3.webp" alt="Card" className="h-6 object-contain" />
                            <img src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/payment/payment-4.webp" alt="Card" className="h-6 object-contain" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Circular Scroll to Top Button */}
            <div
                className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'}`}
                onClick={scrollToTop}
            >
                <div className="relative w-14 h-14 cursor-pointer group">
                    <svg className="w-full h-full transform -rotate-90">
                        {/* Background Circle (Path) */}
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            stroke="rgba(255, 255, 255, 0.1)"
                            strokeWidth="3"
                            fill="transparent"
                        />
                        {/* Progress Circle (Orange) */}
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            stroke="#f17840"
                            strokeWidth="3"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={offset}
                            strokeLinecap="round"
                            className="transition-all duration-150 ease-out"
                        />
                    </svg>

                    {/* Arrow Icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-[#f17840] group-hover:text-white group-hover:bg-[#f17840] rounded-full transition-all duration-300 m-1">
                        <FiArrowUp size={22} className="group-hover:-translate-y-1 transition-transform" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
