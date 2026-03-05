import axios from "axios";
import {
  Bell, Box, Calendar, Edit, LayoutDashboard, Mail, Package, Plus, Search, Settings, ShieldCheck, ShoppingCart, Trash2, TrendingUp, Users, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

/* Temporarily disabling recharts due to install delay
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
*/

// Custom CSS-based Bar Chart for immediate display
const CustomBarChart = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.sales));
  return (
    <div className="w-full h-full flex items-end justify-between gap-2 px-2 pb-6 pt-4">
      {data.map((item, i) => (
        <div key={i} className="flex-1 flex flex-col items-center group relative h-full justify-end">
          <div
            className="w-full bg-[#f17840] hover:bg-[#253d4e] transition-all duration-500 rounded-t-lg relative group"
            style={{ height: `${(item.sales / maxVal) * 100}%` }}
          >
            {/* Tooltip on hover */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-[#253d4e] text-white text-[10px] py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black shadow-xl z-10">
              ₹{item.sales.toLocaleString()}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#253d4e] rotate-45"></div>
            </div>
          </div>
          <span className="text-[11px] font-bold text-gray-400 mt-3 uppercase tracking-tighter">{item.name}</span>
        </div>
      ))}
    </div>
  );
};

// Custom CSS-based Progress Circle (Pie Chart Replacement)
const CustomPieChart = ({ categories }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="relative w-48 h-48 mb-8 group">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-[12px] border-gray-50 dark:border-gray-800/10 shadow-inner"></div>
        {/* Dynamic Segments (Visual representation) */}
        <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-t-[#f17840] rotate-45 group-hover:rotate-[225deg] transition-all duration-1000 ease-in-out"></div>
        <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-r-[#253d4e] -rotate-12 group-hover:rotate-[168deg] transition-all duration-1000 ease-in-out"></div>
        <div className="absolute inset-0 rounded-full border-[12px] border-transparent border-l-[#10b981] rotate-[180deg] group-hover:rotate-[360deg] transition-all duration-1000 ease-in-out"></div>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-black text-[#253d4e] dark:text-white leading-none">1,000</span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Total Stock</span>
        </div>
      </div>

      {/* Legend */}
      <div className="w-full space-y-3">
        {categories.map((cat, i) => (
          <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-[#0b0c0d] p-3 rounded-xl border border-gray-100 dark:border-gray-800 group hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
              <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{cat.name}</span>
            </div>
            <span className="font-black text-sm">{cat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main placeholders replaced with our custom versions
const ResponsiveContainer = ({ children }) => <div className="w-full h-full">{children}</div>;
const BarChart = ({ data }) => <CustomBarChart data={data} />;
const PieChart = ({ children }) => <div className="w-full h-full">{children}</div>;
const Bar = () => null;
const XAxis = () => null;
const YAxis = () => null;
const CartesianGrid = () => null;
const Tooltip = () => null;
const Legend = () => null;
const Pie = () => null;
const Cell = () => null;

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dash");
  const [blogComments, setBlogComments] = useState([]);
  const [messages, setMessages] = useState([]); // Restored state

  // Mock data for charts
  const salesHistory = [
    { name: "Mon", sales: 4000 },
    { name: "Tue", sales: 3000 },
    { name: "Wed", sales: 2000 },
    { name: "Thu", sales: 2780 },
    { name: "Fri", sales: 1890 },
    { name: "Sat", sales: 2390 },
    { name: "Sun", sales: 3490 },
  ];

  const categoryShare = [
    { name: "Machine Tools", value: 400, color: "#f17840" },
    { name: "Hand Tools", value: 300, color: "#253d4e" },
    { name: "Power Tools", value: 300, color: "#10b981" },
  ];
  const [orders, setOrders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [errorStatus, setErrorStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem("adminData") || "{}");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    badge: "10% Off",
    badge_type: "discount",
    old_price: "",
    category_id: 3 // Default to Power Tools
  });

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products", err);
      setErrorStatus("Failed to fetch products: " + err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
      setErrorStatus("Failed to fetch users: " + err.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchBlogComments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog-comments");
      setBlogComments(res.data);
    } catch (err) {
      console.error("Failed to fetch blog comments", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchMessages();
    fetchOrders();
    fetchBlogComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/products/${isEditing}`, form);
        alert("Product updated successfully!");
      } else {
        await axios.post("http://localhost:5000/api/products", form);
        alert("Product added successfully!");
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error("Action failed", err);
      alert("Error: " + (err.response?.data?.message || err.message));
      setErrorStatus("Action failed: " + (err.response?.data?.message || err.message));
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      price: "",
      description: "",
      image: "",
      badge: "10% Off",
      badge_type: "discount",
      old_price: "",
      category_id: 3
    });
    setShowAddForm(false);
    setIsEditing(null);
  };

  const handleEdit = (product) => {
    setIsEditing(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
      badge: product.badge || "",
      badge_type: product.badge_type || "new",
      old_price: product.old_price || "",
      category_id: product.category_id || 3
    });
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const totalSales = orders.reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  const stats = [
    { title: "Total Sales", value: `₹${totalSales.toLocaleString()}`, icon: TrendingUp, color: "bg-blue-600" },
    { title: "Total Orders", value: orders.length, icon: Package, color: "bg-[#f17840]" },
    { title: "Active Customers", value: users.length, icon: Users, color: "bg-green-500" },
    { title: "New Inquiries", value: unreadMessagesCount, icon: Mail, color: "bg-purple-500" },
  ];

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/contact/${id}`);
      fetchMessages();
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const approveComment = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blog-comments/${id}/approve`);
      fetchBlogComments();
    } catch (err) {
      console.error("Failed to approve comment", err);
    }
  };

  const deleteComment = async (id) => {
    if (window.confirm("Delete this comment permanently?")) {
      try {
        await axios.delete(`http://localhost:5000/api/blog-comments/${id}`);
        fetchBlogComments();
      } catch (err) {
        console.error("Failed to delete comment", err);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0b0c0d] font-sans text-[#253d4e] dark:text-gray-200 transition-colors duration-300">

      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-[#151618] border-r border-gray-100 dark:border-gray-800 flex flex-col transition-all duration-300 fixed h-full z-40">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#f17840] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#f17840]/20">
            <Box size={24} />
          </div>
          <span className="text-xl font-black tracking-tight text-[#f17840]">TORADO</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "dash"} onClick={() => setActiveTab("dash")} />
          <NavItem icon={Package} label="Products" active={activeTab === "products"} onClick={() => setActiveTab("products")} />
          <NavItem icon={ShoppingCart} label="Orders" active={activeTab === "orders"} onClick={() => setActiveTab("orders")} />
          <NavItem icon={Users} label="Customers" active={activeTab === "users"} onClick={() => setActiveTab("users")} />
          <NavItem icon={Mail} label="Messages" active={activeTab === "messages"} onClick={() => setActiveTab("messages")} />
          <NavItem icon={Edit} label="Blog Comments" active={activeTab === "blog_comments"} onClick={() => setActiveTab("blog_comments")} />
        </nav>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-1">
          <NavItem icon={Settings} label="Settings" />
          <div
            onClick={handleLogout}
            className="p-3 flex items-center gap-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg cursor-pointer transition-all font-bold group"
          >
            <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 overflow-y-auto pb-20">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-[#151618]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-8 border-b border-gray-100 dark:border-gray-800">
          <div className="relative w-full max-w-xl group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f17840] transition-colors" size={20} strokeWidth={2.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${activeTab === 'dash' ? 'everything' : activeTab === 'users' ? 'customers' : activeTab === 'orders' ? 'orders' : activeTab === 'messages' ? 'messages' : activeTab === 'blog_comments' ? 'blog comments' : 'products'}...`}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 focus:border-[#f17840]/50 rounded-[12px] focus:outline-none transition-all text-sm font-bold shadow-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 rounded-full bg-gray-50 dark:bg-[#0b0c0d] text-gray-500 hover:text-[#f17840] transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#151618]"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-100 dark:border-gray-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black">{adminData.username || 'Admin User'}</p>
                <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#f17840] to-orange-300 flex items-center justify-center text-white font-black text-sm shadow-inner overflow-hidden border-2 border-white dark:border-gray-800">
                <img src={`https://ui-avatars.com/api/?name=${adminData.username || 'Admin'}&background=f17840&color=fff`} alt="Avatar" />
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {errorStatus && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold animate-pulse">
              ⚠️ {errorStatus}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#151618] p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group hover:shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="flex items-center gap-1 text-[13px] font-bold text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                    <TrendingUp size={14} /> +12%
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-bold mb-1">{stat.title}</h3>
                <p className="text-2xl font-black tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "users" ? (
            /* Users Table Area */
            <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[#253d4e] dark:text-white">
                <div>
                  <h2 className="text-2xl font-black">Customer Directory</h2>
                  <p className="text-gray-500 font-bold">Manage registered users and account roles</p>
                </div>
                <div className="px-5 py-2.5 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-xl font-black border border-green-100 dark:border-green-500/20">
                  {users.length} Active Users
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[13px] text-gray-400 font-black uppercase tracking-widest">
                      <th className="px-8 py-5">User Profile</th>
                      <th className="px-8 py-5">Email Address</th>
                      <th className="px-8 py-5">Role</th>
                      <th className="px-8 py-5">Joined Date</th>
                      <th className="px-8 py-5 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {users.length > 0 ? (
                      users
                        .filter(user =>
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                        .map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors group">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=f17840&color=fff`} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div>
                                  <p className="font-black text-[16px] text-[#253d4e] dark:text-white group-hover:text-[#f17840] transition-colors">
                                    {user.name}
                                  </p>
                                  <div className="flex items-center gap-1.5 text-gray-400 text-[12px] font-bold">
                                    <ShieldCheck size={12} className="text-green-500" /> Verified Account
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-[#253d4e] dark:text-white font-bold">
                                <Mail size={16} className="text-gray-400" />
                                {user.email}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-4 py-1.5 rounded-full text-[12px] font-black uppercase tracking-wider ${user.role === 'admin'
                                ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600"
                                : "bg-blue-50 dark:bg-blue-500/10 text-blue-600"
                                }`}>
                                {user.role || 'customer'}
                              </span>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-2 text-gray-500 font-bold">
                                <Calendar size={16} className="text-gray-400" />
                                {new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center justify-center gap-3">
                                <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-all shadow-sm">
                                  <Edit size={18} />
                                </button>
                                <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all shadow-sm">
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr><td colSpan="5" className="px-8 py-32 text-center text-gray-400 font-black">No users registered yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "orders" ? (
            /* Orders Table Area */
            <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center text-[#253d4e] dark:text-white">
                <div>
                  <h2 className="text-2xl font-black">Order Management</h2>
                  <p className="text-gray-500 font-bold">Track and manage customer purchases</p>
                </div>
              </div>

              <div className="overflow-x-auto text-[#253d4e] dark:text-white">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[13px] text-gray-400 font-black uppercase tracking-widest">
                      <th className="px-8 py-5">Order ID</th>
                      <th className="px-8 py-5">Customer</th>
                      <th className="px-8 py-5">Items</th>
                      <th className="px-8 py-5">Total</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {orders.length > 0 ? (
                      orders
                        .filter(order =>
                          order.id.toString().includes(searchQuery) ||
                          order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors group">
                            <td className="px-8 py-6 font-black text-[#f17840]">#ORD-{order.id}</td>
   

export default Dashboard;