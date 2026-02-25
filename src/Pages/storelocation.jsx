import StickyActions from '../Components/StickyActions';
import Footer from '../Componet/Footer';
import Navbar from '../Componet/Navbar';
import React from "react";      


const StoreLocation = () => {
    const stores = [
        {
            name: "Minneapolis Official Store",
            address: "1650 New Brighton Blvd",
            hours: "7:00 AM - 10:00 PM",
            mobile: "1650 New Brighton Blvd"
        },
        {
            name: "Milos Dinkytown Store",
            address: "1329 5th St SE, Minneapolis",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-612-355-3857"
        },
        {
            name: "Mpls Nicollet Mall",
            address: "900 Nicollet Mall, MN 55403",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-612-338-0085"
        },
        {
            name: "Lake Street Store",
            address: "2500 E Lake St, Minneapolis",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-612-721-5701"
        },
        {
            name: "Roseville T10 Tools Store",
            address: "515 County Road B W, Rosevila",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-651-631-0330"
        },
        {
            name: "Minneapolis Uptown Store",
            address: "1300 W Lake St, Minneapolis",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-612-607-5016"
        },
        {
            name: "St. Paul Highland Park",
            address: "2080 Ford Pkwy Saint Paul",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-651-605-3633"
        },
        {
            name: "Bloomington 79th and Penn",
            address: "2555 W 79th St, Bloomington",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-952-888-7701"
        },
        {
            name: "Brooklyn Park Store",
            address: "7535 W Broadway Ave",
            hours: "7:00 AM - 10:00 PM",
            mobile: "+00-763-425-5400"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-[#0b0c0d]">
            <Navbar />

            {/* Header Section */}
            <div className="relative h-[300px] flex flex-col items-center justify-center text-center px-4 bg-[#411151]">
                <div className="absolute inset-0 bg-black/20"></div>

                <div className="relative z-10">
                    <h1 className="text-[42px] font-black text-white mb-4">Store Locations</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <a href="/" className="hover:text-[#f17840] transition-colors">Home</a>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Store Locations</span>
                    </div>
                </div>
            </div>

            {/* Store Grid Section */}
            <div className="max-w-[1440px] mx-auto px-6 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {stores.map((store, index) => (
                        <div key={index} className="bg-[#f8f9fa] dark:bg-[#1a1c1e] p-10 rounded-[5px] transition-all duration-300 hover:shadow-xl group border border-transparent dark:border-gray-800">
                            <h3 className="text-[22px] font-black text-[#253d4e] dark:text-white mb-8 group-hover:text-[#f17840] transition-colors">
                                {store.name}
                            </h3>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <span className="font-extrabold text-[#253d4e] dark:text-gray-300 min-w-[70px]">Address:</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">{store.address}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-extrabold text-[#253d4e] dark:text-gray-300 min-w-[70px]">Hours:</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">{store.hours}</span>
                                </div>
                                <div className="flex gap-4">
                                    <span className="font-extrabold text-[#253d4e] dark:text-gray-300 min-w-[70px]">Mobile:</span>
                                    <span className="text-gray-500 dark:text-gray-400 font-medium">{store.mobile}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <StickyActions />
            <Footer />
        </div>
    );
};

export default StoreLocation;