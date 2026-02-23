import { ChevronRight } from "lucide-react";
import React from "react";


const Section1 = () => {
    return (
        <section className="w-full bg-white dark:bg-[#0b0c0d] py-8 px-4 md:px-6 transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT CATEGORY MENU */}
                <div className="lg:col-span-2 bg-[#f8f9fa] dark:bg-[#151618] rounded-sm overflow-hidden hidden lg:block self-start transition-colors duration-300">
                    <ul className="flex flex-col">
                        {[
                            "Measuring Tools",
                            "Roofing Tools",
                            "Cordless Tools",
                            "Welding & Soldering",
                            "Gardening Tools",
                            "Air and Gas Powered Tools",
                            "Safety Tools",
                            "Site lighting Tools",
                            "Tools Accessories",
                            "Air and Gas Powered Tools",
                        ].map((item, index) => (
                            <li
                                key={index}
                                className="group border-b border-gray-100 dark:border-gray-800 last:border-0"
                            >
                                <div className="px-6 py-4 flex items-center justify-between text-[#253d4e] dark:text-gray-300 hover:text-[#f17840] cursor-pointer transition-all duration-300 font-medium">
                                    <span className="text-[15px]">{item}</span>
                                    <ChevronRight size={14} className="text-gray-300 group-hover:text-[#f17840] dark:group-hover:text-[#f17840] group-hover:translate-x-1 transition-all" />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CENTER HERO SECTION */}
                <div className="lg:col-span-7 bg-[#f1efe6] dark:bg-[#1f2022] rounded-[10px] relative overflow-hidden 
                min-h-[500px] sm:min-h-[450px] md:min-h-[500px] lg:min-h-[520px] 
                flex flex-col lg:flex-row lg:items-center px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 lg:py-16 transition-colors duration-300">

                    {/* TEXT CONTENT */}
                    <div className="z-10 w-full lg:max-w-md text-left">
                        <p className="text-[#f17840] font-bold text-[12px] sm:text-sm tracking-[.2em] uppercase mb-4">
                            NEW IN STOCK
                        </p>

                        <h1 className="text-[28px] sm:text-4xl lg:text-5xl font-black text-[#253d4e] dark:text-white
                       mb-4 sm:mb-6 leading-[1.1] sm:leading-[1.2]">
                            All Types Of Premium <br className="hidden sm:block" />
                            Quality Tools
                        </h1>

                        <p className="text-[#7e7e7e] dark:text-gray-400 text-sm sm:text-base lg:text-lg 
                      mb-8 sm:mb-10 font-medium">
                            Free shipping & discount 50% on products
                        </p>

                        <div className="flex items-center gap-4 sm:gap-8">
                            <div className="relative group overflow-hidden w-fit">
                                <button className="bg-[#f17840] group-hover:bg-white dark:group-hover:bg-[#1a1c1e] text-white group-hover:text-[#f17840] px-10 py-4 rounded-[5px] font-bold text-base transition-all duration-700 w-fit cursor-pointer shadow-lg outline-none border-none">
                                    <p>Shop Now</p>
                                </button>
                                <div className="absolute top-14 -right-20 rounded-[5px] w-full h-full bg-white dark:bg-[#1a1c1e] text-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-base cursor-pointer">
                                    Shop Now
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <span className="text-[#7e7e7e] dark:text-gray-400 text-sm sm:text-base">From</span>
                                <span className="text-[#253d4e] dark:text-white font-extrabold 
                                 text-xl sm:text-3xl">
                                    $20.14
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* HERO IMAGE (Responsive: Bottom for mobile, Right for desktop) */}
                    <div className="absolute left-0 -bottom-8 w-full lg:left-auto lg:right-0 lg:w-[60%] h-[300px] sm:h-[350px] md:h-[400px] lg:h-full pointer-events-none">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/hero/hero-img-1.webp"
                            alt="Professional Worker"
                            className="absolute left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-0 bottom-0 
                               max-h-full w-auto object-contain object-bottom sm:object-right-bottom"
                        />
                    </div>

                    {/* DISCOUNT BADGE */}
                    <div className="absolute 
                    right-[5%] sm:right-[8%] lg:right-[5%] 
                    top-[60%] sm:top-[42%] lg:top-[39%] 
                    z-20">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 
                        rounded-full bg-[#f17840] text-white 
                        flex flex-col items-center justify-center 
                        shadow-xl">
                            <span className="text-lg sm:text-xl lg:text-2xl font-black leading-none">
                                10%
                            </span>
                            <span className="text-xs sm:text-sm font-bold mt-1">
                                Off
                            </span>
                        </div>
                    </div>

                </div>

                {/* RIGHT PROMO CARDS */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">

                    {/* TOP CARD */}
                    <div className="bg-[#def1ff] dark:bg-white rounded-[10px] p-6 sm:p-8 relative flex-1 min-h-[220px] sm:min-h-[240px] flex flex-col justify-center overflow-hidden transition-colors">
                        <div className="z-10 relative">
                            <p className="text-[#f17840] font-bold text-[13px] tracking-widest uppercase mb-3">SPECIAL OFFER</p>
                            <h3 className="text-2xl font-extrabold text-[#253d4e] dark:text-[#253d4e] mb-6 leading-tight">
                                New Lower <br /> Prices
                            </h3>
                            <div className="relative group overflow-hidden w-fit">
                                <button className="bg-white group-hover:bg-[#f17840] group-hover:text-white 
                               text-[#253d4e] px-6 py-2  
                               rounded-[4px] font-bold text-sm shadow-sm 
                               transition-all duration-700 w-fit cursor-pointer">
                                    <p>Shop Now</p>
                                </button>
                                <div className="absolute top-10 -right-20 rounded-[4px] w-full h-full bg-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-white text-sm cursor-pointer"> Shop Now</div>
                            </div>
                        </div>
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/hero/hero-img-2.webp"
                            alt="Promo Tool 1"
                            className="absolute right-0 bottom-2 w-3/6 object-contain pointer-events-none transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                    {/* BOTTOM CARD */}
                    <div className="bg-[#e9eff4] dark:bg-white rounded-[10px] p-6 sm:p-8 relative overflow-hidden flex-1 min-h-[220px] sm:min-h-[240px] flex flex-col justify-center transition-colors">
                        <div className="z-10 relative">
                            <p className="text-[#f17840] font-bold text-[13px] tracking-widest uppercase mb-3">BEST DEALS</p>
                            <h3 className="text-2xl font-extrabold text-[#253d4e] dark:text-[#253d4e] mb-6 leading-tight">
                                Socket <br /> Wrenches
                            </h3>
                            <div className="relative group overflow-hidden w-fit">
                                <button className="bg-white group-hover:bg-[#f17840] group-hover:text-white 
                               text-[#253d4e] px-6 py-2  
                               rounded-[4px] font-bold text-sm shadow-sm 
                               transition-all duration-700 w-fit cursor-pointer">
                                    <p>Shop Now</p>
                                </button>
                                <div className="absolute top-10 -right-20 rounded-[4px] w-full h-full bg-[#f17840] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:top-0 group-hover:right-0 text-center flex items-center justify-center font-bold text-white text-sm cursor-pointer"> Shop Now</div>
                            </div>
                        </div>
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/hero/hero-img-3.webp"
                            alt="Promo Tool 2"
                            className="absolute right-0 bottom-0 w-3/5 object-contain pointer-events-none transform group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>

                </div>



            </div>
        </section>



    );
};

export default Section1;