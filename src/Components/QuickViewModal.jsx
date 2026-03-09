import { Minus, Plus, ShoppingCart, Star, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useCurrency } from "../context/CurrencyContext";

const QuickViewModal = ({ product, isOpen, onClose }) => {
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [quantity, setQuantity] = useState(1);

    if (!isOpen || !product) return null;

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: quantity });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="bg-white dark:bg-[#151618] w-full max-w-[1000px] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white dark:bg-[#1a1c1e] text-gray-500 hover:text-red-500 rounded-full shadow-lg border border-gray-100 dark:border-gray-800 transition-all hover:rotate-90 duration-300"
                >
                    <X size={20} strokeWidth={3} />
                </button>

                {/* Left Side: Images */}
                <div className="w-full md:w-1/2 p-6 md:p-8 flex items-start gap-4 bg-[#f8f9fa] dark:bg-white relative">

                    {/* Thumbnail Sidebar */}
                    <div className="hidden md:flex flex-col gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-20 h-20 bg-white border-2 border-transparent hover:border-[#f17840] rounded-lg p-2 cursor-pointer transition-all">
                                <img src={product.image} alt="" className="w-full h-full object-contain" />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="flex-1 h-[300px] md:h-[450px] flex items-center justify-center">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-full max-w-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Right Side: Details */}
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                    <div className="flex flex-col h-full">
                        <div className="mb-2">
                            <span className="text-[12px] font-black text-[#f17840] uppercase tracking-widest bg-orange-50 dark:bg-orange-950/20 px-3 py-1 rounded-full">
                                {product.category_id == 1 ? "Machine Tools" : product.category_id == 2 ? "Hand Tools" : "Power Tools"}
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-black text-[#253d4e] dark:text-white mb-4 leading-tight">
                            {product.name}
                        </h2>

                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-black text-[#f17840]">{formatPrice(product.price)}</span>
                            {product.old_price && (
                                <span className="text-gray-400 line-through text-xl font-bold">{formatPrice(product.old_price)}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex items-center text-[#ffc107]">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={15} fill={i < 4 ? "currentColor" : "none"} strokeWidth={i < 4 ? 0 : 2} />
                                ))}
                            </div>
                            <span className="text-gray-500 text-sm font-bold">
                                ({product.reviews_count || '1k+'}) Customer Reviews
                            </span>
                        </div>

                        <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed mb-8">
                            {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center gap-2">
                                <span className="text-[#253d4e] dark:text-white font-black text-[15px] uppercase w-32">Availability :</span>
                                <span className={`${product.stock_quantity === 0 ? "text-red-500" : "text-[#21bf73]"} font-bold`}>
                                    {product.stock_quantity === 0 ? "Out of Stock" : "In Stock"}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[#253d4e] dark:text-white font-black text-[15px] uppercase w-32">Category :</span>
                                <span className="text-gray-500 dark:text-gray-400 font-bold">{product.category_id == 1 ? "Machine" : product.category_id == 2 ? "Hand Tools" : "Power Tool"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[#253d4e] dark:text-white font-black text-[15px] uppercase w-32">Tags :</span>
                                <span className="text-gray-500 dark:text-gray-400 font-bold">Drill, New, Tool</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 mt-auto">
                            <div className="flex items-center bg-[#f1f2f6] dark:bg-[#1a1c1e] rounded-xl overflow-hidden p-1">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#f17840] transition-colors"
                                >
                                    <Minus size={18} strokeWidth={3} />
                                </button>
                                <span className="w-12 text-center font-black text-lg dark:text-white">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-[#f17840] transition-colors"
                                >
                                    <Plus size={18} strokeWidth={3} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock_quantity === 0}
                                className={`flex-1 ${product.stock_quantity !== 0 ? "bg-[#f17840] hover:bg-[#e06b35] shadow-lg hover:shadow-orange-500/20 active:scale-95" : "bg-gray-400 cursor-not-allowed"} text-white h-14 rounded-xl font-black flex items-center justify-center gap-3 transition-all`}
                            >
                                <ShoppingCart size={22} strokeWidth={2.5} />
                                {product.stock_quantity === 0 ? "Out of Stock" : "Add To Cart"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;
