import axios from "axios";
import { Calendar, CheckCircle2, Facebook, Instagram, Quote, Twitter, User } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import StickyActions from "../Components/StickyActions";
import Footer from "../Componet/Footer";
import Navbar from "../Componet/Navbar";

const BlogDetails = () => {
    const [commentForm, setCommentForm] = useState({
        name: "",
        email: "",
        comment: "",
        blog_id: 1 // Default blog ID
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/blog-comments/approved");
            setComments(res.data);
        } catch (err) {
            console.error("Error fetching comments:", err);
        }
    };

    React.useEffect(() => {
        fetchComments();
    }, []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!commentForm.name || !commentForm.email || !commentForm.comment) {
            alert("Please fill all required fields");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post("http://localhost:5000/api/blog-comments", commentForm);
            alert(res.data.message || "Comment posted successfully!");
            setCommentForm({ ...commentForm, comment: "" }); // Reset comment field
        } catch (err) {
            console.error("Comment submission error:", err);
            alert("Failed to post comment. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
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
                    <h1 className="text-[32px] md:text-[42px] font-black text-white mb-4 uppercase tracking-tight">Blog Details</h1>
                    <div className="flex items-center justify-center gap-2 text-base font-bold text-white">
                        <Link to="/" className="hover:text-[#f17840] transition-colors">Home</Link>
                        <span className="text-gray-400">/</span>
                        <Link to="/blog-grid" className="hover:text-[#f17840] transition-colors">Blog</Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-[#f17840]">Blog Details</span>
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="max-w-[1000px] mx-auto px-6 py-20">
                {/* Featured Image */}
                <div className="relative rounded-2xl overflow-hidden mb-10 shadow-xl">
                    <img
                        src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-3.webp"
                        alt="Blog Post"
                        className="w-full h-auto object-cover"
                    />
                    {/* Date Badge */}
                    <div className="absolute top-6 left-6 bg-white dark:bg-[#1a1c1e] px-5 py-3 rounded-xl text-center shadow-2xl border border-orange-50 dark:border-gray-800">
                        <p className="text-[24px] font-black text-[#f17840] leading-none mb-1">15</p>
                        <p className="text-[14px] font-bold text-gray-500 uppercase tracking-widest">June</p>
                    </div>
                </div>

                {/* Post Meta */}
                <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-2 text-[#7e7e7e] dark:text-gray-400 font-bold text-base">
                        <User size={18} className="text-[#f17840]" />
                        <span>Michel Jhon</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#7e7e7e] dark:text-gray-400 font-bold text-base">
                        <Calendar size={18} className="text-[#f17840]" />
                        <span>28 Jun, 2025</span>
                    </div>
                </div>

                {/* Post Title */}
                <h2 className="text-[28px] md:text-[40px] font-black text-[#253d4e] dark:text-white mb-8 leading-tight">
                    Powerful Drill Best Performance Cordless Screwdriver
                </h2>

                {/* Post Body */}
                <div className="prose prose-lg max-w-none text-[#7e7e7e] dark:text-gray-400 font-medium space-y-6">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem necessitatibus dolor placeat fuga deleniti doloremque? Ratione officia quia aliquam possimus
                    </p>
                    <p>
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium sed doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia.
                    </p>

                    {/* Blockquote */}
                    <div className="bg-[#f8f9fa] dark:bg-[#151618] p-10 rounded-2xl border-l-4 border-[#f17840] my-10 relative overflow-hidden group">
                        <div className="absolute right-6 top-6 opacity-10 text-[#f17840] group-hover:scale-110 transition-transform duration-500">
                            <Quote size={80} strokeWidth={1} />
                        </div>
                        <p className="text-[#253d4e] dark:text-white font-bold text-xl md:text-2xl leading-relaxed italic relative z-10">
                            " Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore quos est adipisci eum eligendi vel nisi mollitia libero "
                        </p>
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt labore et dolore sitor magna aliqua. Quis ipsum suspendisse ultrices <span className="text-black dark:text-white font-bold">gravida</span>. Risus commodo viverra manas accumsan lacus vel facilisis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>

                    <p>
                        No sea takimata sanctus est Lorem <span className="text-[#f17840]">Ipsum</span> dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore consect etur adicing elit.
                    </p>

                    <h3 className="text-[24px] md:text-[28px] font-black text-[#253d4e] dark:text-white mt-10 mb-6">
                        Pre-Sale Functional Service Requirements
                    </h3>
                    <ol className="list-decimal pl-6 space-y-4">
                        <li>Lacus sed viverra tellus in hac habitasse platea dictumst.</li>
                        <li>Gravida neque convallis a <span className="font-bold text-black dark:text-white">cras</span> semper auctor neque vitae.</li>
                        <li>Lacus sed turpis tincidunt id aliquet risus feugiat in.</li>
                        <li>Risus commodo viverra manas accumsan lacus vel facilisis</li>
                    </ol>

                    {/* Image Gallery */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-7.webp"
                            alt="Tool 1"
                            className="w-full h-64 object-cover rounded-2xl shadow-lg"
                        />
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/blog/blog-8.webp"
                            alt="Tool 2"
                            className="w-full h-64 object-cover rounded-2xl shadow-lg"
                        />
                    </div>

                    <h3 className="text-[24px] md:text-[28px] font-black text-[#253d4e] dark:text-white mt-10 mb-6">
                        After Sale Service Requirements
                    </h3>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore dolore magna aliquyam erat, sed diam voluptua at vero amet dolor sit consect.Consectetur adipisicing elit. Laboriosam in culpa dolorem. Eos sint aut suscipit.
                    </p>

                    {/* Checkmark List */}
                    <div className="space-y-4 my-8">
                        {[
                            "Lorem ipsum dolor, sit amet.",
                            "Amet consectetur adipisicing elit Officia.",
                            "Aquaerat ipsa quis possimus.",
                            "Lorem aquaerat ipsa quis possimus.",
                            "Consectetur Amet adipisicing elit Officia."
                        ].map((item, index) => (
                            <div key={index} className="flex items-center gap-4 text-[#253d4e] dark:text-white font-bold">
                                <CheckCircle2 size={20} className="text-[#f17840] flex-shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    <p>
                        Lorem ipsum dolor sit amet <span className="font-black text-black dark:text-white">adipisicing</span> elit, sed do eiusmod tempor quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in <span className="text-[#f17840]">sed</span> uia non numquam eius modi tempora incidunt ut labore dolor.
                    </p>
                </div>

                {/* Tags and Share Section */}
                <div className="flex flex-col md:flex-row items-center justify-between border border-gray-100 dark:border-gray-800 rounded-xl p-5 mt-12 bg-white dark:bg-[#1a1c1e] shadow-sm">
                    <div className="flex items-center gap-3 mb-4 md:mb-0">
                        <div className="w-10 h-10 bg-orange-50 dark:bg-orange-950/20 rounded-full flex items-center justify-center text-[#f17840]">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.893 19.107a3.001 3.001 0 1 1-1.786-1.786l-2.732-2.732c-.524.26-.115.411-.375.411a3.001 3.001 0 1 1 0-3l2.732-2.732a3 3 0 1 1 2.161 2.161l-2.732 2.732c.26.524.411.115.411.375l2.732 2.733c.244-.121.503-.21.78-.261a3 3 0 1 1-1.786 1.786l-2.732-2.732c-.524.26-.115.411-.375.411a3 3 0 1 1 0-3l2.732-2.732a3 3 0 1 1 2.161 2.161l-2.732 2.732c.26.524.411.115.411.375l2.732 2.732z" /></svg>
                        </div>
                        <div className="text-[#253d4e] dark:text-white font-bold">
                            <Link to="/blog-grid" className="hover:text-[#f17840] transition-colors cursor-pointer">Power Tools</Link>, Machine
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-gray-500 font-bold">Share</span>
                        <div className="flex gap-2">
                            {[
                                { Icon: Facebook, name: 'facebook' },
                                { Icon: Twitter, name: 'twitter' },
                                { Icon: Instagram, name: 'instagram' }
                            ].map((item, idx) => (
                                <div key={idx} className="w-8 h-8 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-[#f17840] hover:border-[#f17840] transition-colors cursor-pointer">
                                    <item.Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Author Box */}
                <div className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-[#1a1c1e] p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm mt-10">
                    <div className="w-32 h-32 flex-shrink-0 cursor-pointer overflow-hidden rounded-full border-4 border-orange-50 dark:border-orange-950/20">
                        <img
                            src="https://torado.envytheme.com/machine-tools-parts-shop/default/assets/img/clients/client-4.webp"
                            alt="Riyan Roman"
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-[22px] font-black text-[#253d4e] dark:text-white mb-3 hover:text-[#f17840] transition-colors cursor-pointer">Riyan Roman</h4>
                        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed mb-6">
                            Claritas est etiam amet sinicus, qui sequitur lorem ipsum semet coui lectorum. Lorem ipsum dolor voluptatem corporis blanditiis sadipscing elitr sed diam nonumy eirmod amet sit lorem dolore magna aliqua labore.
                        </p>
                        <div className="flex justify-center md:justify-start gap-3">
                            {[
                                { Icon: Facebook, name: 'facebook' },
                                { Icon: Twitter, name: 'twitter' },
                                { Icon: Instagram, name: 'instagram' }
                            ].map((item, idx) => (
                                <div key={idx} className="w-8 h-8 border border-gray-200 dark:border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-[#f17840] hover:border-[#f17840] transition-colors cursor-pointer">
                                    <item.Icon size={14} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-16">
                    <h3 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-10">
                        {comments.length} Comments
                    </h3>

                    <div className="space-y-6">
                        {comments.map((comment, idx) => (
                            <div key={comment.id} className="bg-white dark:bg-[#1a1c1e] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col md:flex-row gap-6">
                                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full text-[#f17840] font-black text-2xl uppercase">
                                    {comment.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <div>
                                            <h5 className="text-[17px] font-black text-[#253d4e] dark:text-white hover:text-[#f17840] cursor-pointer transition-colors">
                                                {comment.name}
                                            </h5>
                                            <p className="text-xs text-gray-400 font-bold">
                                                {new Date(comment.created_at).toLocaleString()}
                                            </p>
                                        </div>
                                        <button className="text-[13px] font-black text-[#253d4e] dark:text-white hover:text-[#f17840] transition-colors">Reply</button>
                                    </div>
                                    <p className="text-[#7e7e7e] dark:text-gray-400 font-medium leading-relaxed">
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Comment Form */}
                <div className="mt-16 bg-white dark:bg-[#1a1c1e] p-10 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                    <h3 className="text-[28px] font-black text-[#253d4e] dark:text-white mb-3">Leave A Comment</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-medium mb-10 text-[14px]">Your email address will not be published. Required fields are marked.</p>

                    <form onSubmit={handleCommentSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input
                                type="text"
                                name="name"
                                value={commentForm.name}
                                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                placeholder="Name*"
                                className="w-full bg-[#f8f9fa] dark:bg-[#151618] border border-gray-100 dark:border-gray-800 rounded-lg px-6 py-4 outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                value={commentForm.email}
                                onChange={(e) => setCommentForm({ ...commentForm, email: e.target.value })}
                                placeholder="Email Address*"
                                className="w-full bg-[#f8f9fa] dark:bg-[#151618] border border-gray-100 dark:border-gray-800 rounded-lg px-6 py-4 outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium"
                                required
                            />
                        </div>
                        <textarea
                            rows="6"
                            name="comment"
                            value={commentForm.comment}
                            onChange={(e) => setCommentForm({ ...commentForm, comment: e.target.value })}
                            placeholder="Your Comment Here"
                            className="w-full bg-[#f8f9fa] dark:bg-[#151618] border border-gray-100 dark:border-gray-800 rounded-lg px-6 py-4 outline-none focus:border-[#f17840] transition-colors dark:text-white font-medium resize-none"
                            required
                        ></textarea>

                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="saveInfo" className="w-4 h-4 accent-[#f17840]" />
                            <label htmlFor="saveInfo" className="text-gray-500 dark:text-gray-400 font-medium text-[14px] cursor-pointer">Save my info for the next time I commnet.</label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-[#f17840] hover:bg-[#e06b35] text-white px-10 py-4 rounded-lg font-black text-[15px] transition-all duration-300 shadow-md uppercase tracking-tight ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? "Posting..." : "Post A Comment"}
                        </button>
                    </form>
                </div>
            </div>

            <Footer />
            <StickyActions />
        </div>
    );
};

export default BlogDetails;
