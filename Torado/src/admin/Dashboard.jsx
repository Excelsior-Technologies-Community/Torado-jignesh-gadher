import axios from "axios";
import {
  Bell, Box, Calendar, Check, Edit, LayoutDashboard, Mail, Package, Plus, Search, Settings, ShieldCheck, ShoppingCart, Trash2, TrendingUp, Truck, Users, X
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";


const CustomBarChart = ({ data }) => {
  if (!data || data.length === 0) return (
    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold">
      No data available
    </div>
  );

  const currencies = ['INR', 'EUR', 'USD'];
  const colors = {
    INR: { from: '#f17840', to: '#ff9d6c', label: 'INR (₹)', rate: 1 },
    EUR: { from: '#411151', to: '#6a1b8a', label: 'EUR (€)', rate: 91 }, // Conversion rate to INR
    USD: { from: '#10b981', to: '#34d399', label: 'USD ($)', rate: 83 }  // Conversion rate to INR
  };

  // Calculate normalized values for correct height comparison
  const getNormalized = (item) => ({
    INR: (item.INR || 0) * colors.INR.rate,
    EUR: (item.EUR || 0) * colors.EUR.rate,
    USD: (item.USD || 0) * colors.USD.rate
  });

  const allNormalized = data.map(getNormalized);
  const maxVal = Math.max(...allNormalized.flatMap(d => [d.INR, d.EUR, d.USD]), 1);

  return (
    <div className="w-full h-full flex flex-col overflow-hidden select-none">
      {/* Bars Scrolling Area */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar-hide">
        <div className="flex items-end justify-between h-full min-w-full gap-4 sm:gap-6 px-4 pb-6 pt-12" style={{ width: data.length > 7 ? `${data.length * 100}px` : '100%' }}>
          {data.map((item, i) => {
            const normalized = getNormalized(item);
            return (
              <div key={i} className="flex-1 flex flex-col items-center group/day relative h-full justify-end min-w-[70px]">
                
                {/* Grouped Bars Container */}
                <div className="flex items-end justify-center gap-1.5 w-full h-[85%] pb-2">
                  {currencies.map(curr => {
                    const val = item[curr] || 0;
                    const normVal = normalized[curr];
                    return (
                      <div key={curr} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                        {/* Tooltip */}
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[#253d4e] text-white text-[10px] py-2 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap font-black shadow-2xl z-40 scale-90 group-hover:scale-100 pointer-events-none mb-1">
                          <div className="flex flex-col items-center">
                            <span className="text-gray-400 text-[8px] uppercase tracking-widest mb-0.5">{curr} Sales</span>
                            <span>{curr === 'INR' ? '₹' : curr === 'EUR' ? '€' : '$'}{val.toLocaleString()}</span>
                          </div>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#253d4e] rotate-45"></div>
                        </div>

                        {/* Bar */}
                        <div
                          className="w-full max-w-[14px] sm:max-w-[18px] transition-all duration-500 rounded-t-lg relative group cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-0.5"
                          style={{ 
                            height: val > 0 ? `${(normVal / maxVal) * 100}%` : '2px',
                            background: val > 0 ? `linear-gradient(to top, ${colors[curr].from}, ${colors[curr].to})` : '#f3f4f6', 
                          }}
                        >
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X-Axis Label */}
                <div className="mt-2 flex flex-col items-center h-[15%]">
                  <span className="text-[10px] sm:text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-tighter group-hover/day:text-[#f17840] transition-colors leading-none">
                    {item.name}
                  </span>
                  <div className="w-1.5 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1.5 group-hover/day:bg-[#f17840] transition-colors"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend - Outside scrolling area */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 py-4 border-t border-gray-50 dark:border-gray-800/50 mt-2">
        {currencies.map(curr => (
          <div key={curr} className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: colors[curr].from }}></div>
            <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{colors[curr].label}</span>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar-hide::-webkit-scrollbar { display: none; }
        .custom-scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
};

// Custom CSS-based Progress Circle (Pie Chart Replacement)
const CustomPieChart = ({ categories, label = "Stock" }) => {
  const totalValue = categories.reduce((acc, cat) => acc + cat.value, 0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-2 sm:p-4">
      {/* Responsive Circular Chart */}
      <div className="relative w-40 h-40 sm:w-56 sm:h-56 mb-10 group flex-shrink-0">
        {/* Subtle Outer Glow & Ring */}
        <div className="absolute inset-[-10px] rounded-full bg-gradient-to-tr from-[#f17840]/5 to-[#253d4e]/5 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-700"></div>
        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] border-gray-50/50 dark:border-gray-800/20 shadow-inner"></div>

        {/* Dynamic Segments (Visual representation with rotation effects) */}
        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] border-transparent border-t-[#f17840] rotate-[30deg] group-hover:rotate-[210deg] transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"></div>
        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] border-transparent border-r-[#253d4e] rotate-[150deg] group-hover:rotate-[330deg] transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"></div>
        <div className="absolute inset-0 rounded-full border-[10px] sm:border-[15px] border-transparent border-l-[#10b981] rotate-[270deg] group-hover:rotate-[450deg] transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1)"></div>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="p-4 rounded-full bg-white/20 dark:bg-black/10 backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-500">
            <span className="text-2xl sm:text-4xl font-black text-[#253d4e] dark:text-white leading-none tracking-tighter">
              {totalValue.toLocaleString()}
            </span>
            <div className="w-10 h-0.5 bg-[#f17840] mx-auto my-1 rounded-full"></div>
            <span className="text-[9px] sm:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] block">{label}</span>
          </div>
        </div>
      </div>

      {/* Responsive Grid Legend */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 overflow-y-auto max-h-[180px] pr-2 custom-scrollbar">
        {categories.map((cat, i) => (
          <div key={i} className="flex justify-between items-center bg-white dark:bg-[#0b0c0d] p-3 sm:p-4 rounded-2xl border border-gray-100 dark:border-gray-800/50 group hover:border-[#f17840]/30 transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-default">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full z-10 relative" style={{ backgroundColor: cat.color }}></div>
                <div className="absolute inset-0 rounded-full scale-150 blur-md opacity-40 animate-pulse" style={{ backgroundColor: cat.color }}></div>
              </div>
              <span className="text-[11px] font-black text-gray-500/80 dark:text-gray-400 uppercase tracking-widest truncate max-w-[120px]">
                {cat.name}
              </span>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-black text-sm text-[#253d4e] dark:text-white">{cat.value}</span>
              <span className="text-[9px] font-bold text-gray-400">{((cat.value / totalValue) * 100).toFixed(0)}%</span>
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #1f2937; }
      `}} />
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
  const [messages, setMessages] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state

  const [orders, setOrders] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [errorStatus, setErrorStatus] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const adminData = (() => {
    try {
      return JSON.parse(localStorage.getItem("adminData") || "{}");
    } catch (e) {
      console.error("Failed to parse adminData:", e);
      return {};
    }
  })() || {};

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    navigate("/admin/login");
  };

  // Calculate dynamic sales history for the bar chart (last 7 days grouped by currency)
  const salesHistory = (() => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const history = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = days[date.getDay()];

      const dayOrders = (orders || []).filter(order => new Date(order.created_at).toDateString() === date.toDateString());

      // Helper to match currencies (ignoring symbols vs names)
      const getSumForCurrency = (currencyArray) => {
        return dayOrders
          .filter(o => currencyArray.includes(o.currency?.toUpperCase()))
          .reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);
      };

      const eurSales = getSumForCurrency(['EUR', '€']);
      const inrSales = getSumForCurrency(['INR', '₹']);
      const usdSales = getSumForCurrency(['USD', '$']);

      // Calculate others/unmapped and add to INR (as default) or keep track if you want
      const mappedCurrencies = ['EUR', '€', 'INR', '₹', 'USD', '$'];
      const otherSales = dayOrders
        .filter(o => !mappedCurrencies.includes(o.currency?.toUpperCase()))
        .reduce((sum, order) => sum + parseFloat(order.total_amount || 0), 0);

      history.push({
        name: dayName,
        INR: inrSales + otherSales,
        EUR: eurSales,
        USD: usdSales
      });
    }
    return history;
  })();

  // Calculate dynamic inventory/sales share for the pie chart
  const categoryShare = (() => {
    const categories = [
      { id: 1, name: "Machine Tools", value: 0, color: "#f17840" },
      { id: 2, name: "Hand Tools", value: 0, color: "#253d4e" },
      { id: 3, name: "Power Tools", value: 0, color: "#10b981" },
    ];

    (orders || []).forEach(order => {
      if (order.items && Array.isArray(order.items)) {
        order.items.forEach(item => {
          // Match product by title or id to find its category
          const product = (products || []).find(p => p.title === item.name || p.id === item.product_id);
          const catId = product ? product.category_id : 3; // Default to 3 if not found
          const cat = categories.find(c => c.id == catId);
          if (cat) {
            const price = parseFloat(item.price || 0);
            const qty = parseInt(item.qty || 0);
            cat.value += price * qty;
          }
        });
      }
    });

    // If no sales yet, show stock distribution instead so it's not empty
    if (categories.every(c => c.value === 0)) {
      (products || []).forEach(p => {
        const cat = categories.find(c => c.id == p.category_id);
        if (cat) cat.value += parseInt(p.stock_quantity || 0);
      });
    }

    return categories;
  })();

  const [form, setForm] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    badge: "10% Off",
    badge_type: "discount",
    old_price: "",
    category_id: 3, // Default to Power Tools
    stock_quantity: 10
  });

  const [shippingModal, setShippingModal] = useState({
    isOpen: false,
    orderId: null,
    courier_name: "",
    tracking_number: ""
  });

  const updateOrderStatus = async (id, status, paymentStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, {
        status: status,
        payment_status: paymentStatus || 'pending'
      });
      alert(`✅ Order ${status.toUpperCase()} successfully!`);
      fetchOrders();
    } catch (err) {
      console.error("Status update failed", err);
      alert("❌ Failed to update status: " + (err.response?.data?.error || err.message));
    }
  };

  const shipOrder = async () => {
    if (!shippingModal.courier_name || !shippingModal.tracking_number) {
      alert("Please enter both Courier and Tracking Number");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/orders/${shippingModal.orderId}`, {
        status: "shipped",
        payment_status: "completed", // Assume payment is settled by shipping
        courier_name: shippingModal.courier_name,
        tracking_number: shippingModal.tracking_number
      });
      setShippingModal({ ...shippingModal, isOpen: false });
      alert("✅ Order marked as SHIPPED successfully!");
      fetchOrders();
    } catch (err) {
      console.error("Shipping update failed", err);
      alert("❌ Failed to mark as shipped: " + (err.response?.data?.error || err.message));
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.warn("Products API returned non-array data:", res.data);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
      setErrorStatus("Failed to fetch products: " + err.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      if (Array.isArray(res.data)) {
        setUsers(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch users", err);
      setErrorStatus("Failed to fetch users: " + err.message);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact");
      if (Array.isArray(res.data)) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/orders");
      if (Array.isArray(res.data)) {
        setOrders(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const fetchBlogComments = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog-comments");
      if (Array.isArray(res.data)) {
        setBlogComments(res.data);
      }
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
      category_id: 3,
      stock_quantity: 10
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
      category_id: product.category_id || 3,
      stock_quantity: product.stock_quantity || 0
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

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${id}`);
        alert("✅ Customer deleted successfully!");
        fetchUsers();
      } catch (err) {
        console.error("Delete user failed", err);
        alert("❌ Failed to delete customer.");
      }
    }
  };

  const totalSales = (orders || []).reduce((acc, curr) => acc + parseFloat(curr.total_amount || 0), 0);
  const unreadMessagesCount = messages.filter(m => m.status === 'unread').length;

  // Calculate real active users (active in last 5 minutes)
  const activeUsers = users.filter(user => {
    if (!user.last_seen) return false;
    const lastSeen = new Date(user.last_seen).getTime();
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    return lastSeen > fiveMinutesAgo;
  });

  const stats = [
    { title: "Total Sales", value: `₹${totalSales.toLocaleString()}`, icon: TrendingUp, color: "bg-blue-600" },
    { title: "Total Orders", value: orders.length, icon: Package, color: "bg-[#f17840]" },
    { title: "Active Customers", value: activeUsers.length, icon: Users, color: "bg-green-500" },
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
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0b0c0d] font-sans text-[#253d4e] dark:text-gray-200 transition-colors duration-300 overflow-x-hidden">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`w-64 bg-white dark:bg-[#151618] border-r border-gray-100 dark:border-gray-800 flex flex-col transition-transform duration-300 fixed h-full z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#f17840] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#f17840]/20">
              <Box size={24} />
            </div>
            <span className="text-xl font-black tracking-tight text-[#f17840]">TORADO</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-gray-400 hover:text-[#f17840] transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === "dash"} onClick={() => { setActiveTab("dash"); setIsSidebarOpen(false); }} />
          <NavItem icon={Package} label="Products" active={activeTab === "products"} onClick={() => { setActiveTab("products"); setIsSidebarOpen(false); }} />
          <NavItem icon={ShoppingCart} label="Orders" active={activeTab === "orders"} onClick={() => { setActiveTab("orders"); setIsSidebarOpen(false); }} />
          <NavItem icon={Users} label="Customers" active={activeTab === "users"} onClick={() => { setActiveTab("users"); setIsSidebarOpen(false); }} />
          <NavItem icon={Mail} label="Messages" active={activeTab === "messages"} onClick={() => { setActiveTab("messages"); setIsSidebarOpen(false); }} />
          <NavItem icon={Edit} label="Blog Comments" active={activeTab === "blog_comments"} onClick={() => { setActiveTab("blog_comments"); setIsSidebarOpen(false); }} />
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
      <main className="flex-1 ml-0 lg:ml-64 overflow-y-auto pb-20 transition-all duration-300">
        {/* Header */}
        <header className="h-20 bg-white/80 dark:bg-[#151618]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 bg-gray-50 dark:bg-[#0b0c0d] text-gray-500 rounded-lg hover:text-[#f17840] transition-all"
            >
              <Box size={22} strokeWidth={2.5} />
            </button>

            <div className="relative w-full max-w-md group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f17840] transition-colors" size={18} strokeWidth={2.5} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 focus:border-[#f17840]/50 rounded-[12px] focus:outline-none transition-all text-xs font-bold shadow-sm"
              />
            </div>
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

        <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
          {/* Mobile Search Bar (Only on mobile) */}
          <div className="sm:hidden relative w-full group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#f17840] transition-colors" size={18} strokeWidth={2.5} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search everything..."
              className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#151618] border border-gray-100 dark:border-gray-800 focus:border-[#f17840]/50 rounded-xl focus:outline-none transition-all text-sm font-bold shadow-sm"
            />
          </div>
          {errorStatus && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl font-bold animate-pulse">
              ⚠️ {errorStatus}
            </div>
          )}

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#151618] p-5 sm:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 group hover:shadow-lg hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2.5 sm:p-3 rounded-xl ${stat.color} text-white shadow-lg`}>
                    <stat.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <span className="flex items-center gap-1 text-[11px] sm:text-[13px] font-black text-green-500 bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded-full">
                    <TrendingUp size={12} className="sm:w-3.5 sm:h-3.5" /> +12%
                  </span>
                </div>
                <h3 className="text-gray-500 dark:text-gray-400 text-[11px] sm:text-sm font-bold mb-1 uppercase tracking-wider">{stat.title}</h3>
                <p className="text-xl sm:text-2xl font-black tracking-tight">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === "users" ? (
            /* Users Table Area */
            <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 text-[#253d4e] dark:text-white">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black">Customer Directory</h2>
                  <p className="text-sm sm:text-base text-gray-500 font-bold tracking-tight">Manage registered users and roles</p>
                </div>
                <div className="px-4 sm:px-5 py-2 sm:py-2.5 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-xl font-black border border-green-100 dark:border-green-500/20 text-xs sm:text-sm">
                  {activeUsers.length} Active Now
                </div>
              </div>

              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                <table className="w-full text-left min-w-[800px] lg:min-w-full">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[11px] sm:text-[13px] text-gray-400 font-black uppercase tracking-widest">
                      <th className="px-6 sm:px-8 py-4 sm:py-5">User Profile</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Email Address</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Role</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Joined Date</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Actions</th>
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
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-gray-100 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                                  <img src={`https://ui-avatars.com/api/?name=${user.name}&background=f17840&color=fff`} className="w-full h-full object-cover" alt="" />
                                </div>
                                <div>
                                  <p className="font-black text-[14px] sm:text-[16px] text-[#253d4e] dark:text-white group-hover:text-[#f17840] transition-colors">
                                    {user.name}
                                  </p>
                                  <div className="flex items-center gap-1.5 text-[10px] sm:text-[12px] font-bold">
                                    {(() => {
                                      const lastSeen = new Date(user.last_seen).getTime();
                                      const isOnline = lastSeen > (Date.now() - 5 * 60 * 1000);
                                      return (
                                        <>
                                          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></div>
                                          <span className={isOnline ? 'text-green-600' : 'text-gray-400'}>
                                            {isOnline ? 'Online Now' : 'Offline'}
                                          </span>
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                              <div className="flex items-center gap-2 text-[#253d4e] dark:text-white text-sm sm:text-base font-bold">
                                <Mail size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                {user.email}
                              </div>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                              <span className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[12px] font-black uppercase tracking-wider ${user.role === 'admin'
                                ? "bg-purple-50 dark:bg-purple-500/10 text-purple-600"
                                : "bg-blue-50 dark:bg-blue-500/10 text-blue-600"
                                }`}>
                                {user.role || 'customer'}
                              </span>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                              <div className="flex items-center gap-2 text-gray-500 text-sm sm:text-base font-bold">
                                <Calendar size={14} className="text-gray-400 sm:w-4 sm:h-4" />
                                {new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                              </div>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 text-center">
                              <div className="flex items-center justify-center gap-2 sm:gap-3">
                                <button
                                  onClick={() => deleteUser(user.id)}
                                  className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all shadow-sm"
                                  title="Delete Customer"
                                >
                                  <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
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
              <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 text-[#253d4e] dark:text-white">
                <h2 className="text-xl sm:text-2xl font-black">Order Management</h2>
                <p className="text-sm sm:text-base text-gray-500 font-bold tracking-tight">Track and manage customer purchases</p>
              </div>

              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 text-[#253d4e] dark:text-white">
                <table className="w-full text-left min-w-[900px] lg:min-w-full">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[11px] sm:text-[13px] text-gray-400 font-black uppercase tracking-widest">
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Order details</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Customer INFO</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Total Amount</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Payment Status</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Order Status</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {orders.length > 0 ? (
                      orders
                        .filter(order =>
                          order.id.toString().includes(searchQuery) ||
                          (1000 + order.id).toString().includes(searchQuery) ||
                          `TRD-${1000 + order.id}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((order) => (
                          <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors group">
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                              <p className="font-black text-[#f17840] text-sm mb-1 whitespace-nowrap">#TRD-{1000 + parseInt(order.id)}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(order.created_at).toLocaleDateString()}</p>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6">
                              <p className="font-black text-sm">{order.customer_name}</p>
                              <p className="text-[11px] text-gray-400 font-bold">{order.email}</p>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {order.items && order.items.map((item, idx) => (
                                  <span key={idx} className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-[9px] font-bold text-gray-500">
                                    {item.qty}x {item.name}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 font-black text-base text-right uppercase">
                              <span className="text-[#f17840]">{order.currency || 'INR'}</span> {order.total_amount}
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 text-center">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.payment_status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' :
                                order.payment_status === 'failed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                                  'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                                }`}>
                                {order.payment_status}
                              </span>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 text-center">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${order.order_status === 'shipped' ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' :
                                order.order_status === 'confirmed' ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' :
                                  order.order_status === 'delivered' ? 'bg-emerald-700 text-white shadow-lg shadow-emerald-500/20' :
                                    'bg-blue-500 text-white shadow-lg shadow-blue-500/20'
                                }`}>
                                {order.order_status}
                              </span>
                              {(order.courier_name && order.order_status === 'shipped') && (
                                <p className="text-[9px] font-bold text-[#f17840] mt-1 uppercase">{order.courier_name}</p>
                              )}
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 text-center">
                              <div className="flex items-center justify-center gap-2">
                                {order.order_status === 'processing' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'confirmed')}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-[10px] font-black rounded-lg hover:bg-green-600 transition-all shadow-md active:scale-95"
                                  >
                                    <Check size={14} /> ACCEPT
                                  </button>
                                )}
                                {order.order_status === 'confirmed' && (
                                  <button
                                    onClick={() => setShippingModal({ isOpen: true, orderId: order.id, courier_name: "", tracking_number: "" })}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white text-[10px] font-black rounded-lg hover:bg-purple-700 transition-all shadow-md active:scale-95"
                                  >
                                    <Truck size={14} /> SHIP
                                  </button>
                                )}
                                {order.order_status === 'shipped' && (
                                  <button
                                    onClick={() => updateOrderStatus(order.id, 'delivered')}
                                    className="px-3 py-1.5 bg-emerald-600 text-white text-[10px] font-black rounded-lg hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                                  >
                                    DELIVERED
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr><td colSpan="6" className="px-8 py-32 text-center text-gray-400 font-black">No orders found.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "messages" ? (
            /* Messages Table Area */
            <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 text-[#253d4e] dark:text-white">
                <h2 className="text-xl sm:text-2xl font-black">Customer Messages</h2>
                <p className="text-sm sm:text-base text-gray-500 font-bold tracking-tight">Inquiries sent via Contact Us form</p>
              </div>

              <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 text-[#253d4e] dark:text-white">
                <table className="w-full text-left min-w-[1000px] lg:min-w-full">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[11px] sm:text-[13px] text-gray-400 font-black uppercase tracking-widest">
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Customer Info</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Subject & Message</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Status</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5">Date</th>
                      <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {messages.length > 0 ? (
                      messages
                        .filter(msg =>
                          msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (msg.subject && msg.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          msg.message.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((msg) => (
                          <tr key={msg.id} className={`hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors group ${msg.status === 'unread' ? 'bg-orange-50/30' : ''}`}>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 align-top">
                              <p className="font-black text-[#253d4e] dark:text-white text-sm">{msg.name}</p>
                              <p className="text-[11px] text-gray-500 font-bold">{msg.email}</p>
                              <p className="text-[10px] text-gray-400 font-medium">{msg.phone}</p>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 align-top max-w-md">
                              <p className="font-black text-[#f17840] mb-1 text-[13px]">{msg.subject || "No Subject"}</p>
                              <p className="text-[12px] text-gray-600 dark:text-gray-400 whitespace-pre-wrap line-clamp-3 group-hover:line-clamp-none transition-all">{msg.message}</p>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 align-top text-center">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${msg.status === 'unread' ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-green-500 text-white shadow-lg shadow-green-500/20'}`}>
                                {msg.status}
                              </span>
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 align-top whitespace-nowrap text-[11px] sm:text-xs font-bold text-gray-500">
                              {new Date(msg.created_at).toLocaleString()}
                            </td>
                            <td className="px-6 sm:px-8 py-4 sm:py-6 align-top text-center">
                              {msg.status === 'unread' && (
                                <button
                                  onClick={() => markAsRead(msg.id)}
                                  className="px-4 py-2 bg-[#f17840] text-white text-[10px] sm:text-[12px] font-black rounded-lg hover:bg-[#253d4e] transition-all whitespace-nowrap"
                                >
                                  Mark Read
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr><td colSpan="5" className="px-8 py-32 text-center text-gray-400 font-black">No messages received yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "blog_comments" ? (
            /* Blog Comments Table Area */
            <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center text-[#253d4e] dark:text-white">
                <div>
                  <h2 className="text-2xl font-black">Blog Comments</h2>
                  <p className="text-gray-500 font-bold">Manage reader comments on your blog posts</p>
                </div>
              </div>

              <div className="overflow-x-auto text-[#253d4e] dark:text-white">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[13px] text-gray-400 font-black uppercase tracking-widest">
                      <th className="px-8 py-5">Author</th>
                      <th className="px-8 py-5">Comment</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Date</th>
                      <th className="px-8 py-5 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {blogComments.length > 0 ? (
                      blogComments
                        .filter(comment =>
                          comment.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comment.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          comment.comment.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .map((comment) => (
                          <tr key={comment.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors group">
                            <td className="px-8 py-6">
                              <p className="font-black">{comment.name}</p>
                              <p className="text-xs text-gray-400 font-bold">{comment.email}</p>
                            </td>
                            <td className="px-8 py-6 max-w-md">
                              <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">{comment.comment}</p>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${comment.status === 'pending' ? 'bg-[#f17840] text-white shadow-lg shadow-orange-500/20' : 'bg-green-500 text-white shadow-lg shadow-green-500/20'}`}>
                                {comment.status}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-sm font-bold text-gray-400">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-8 py-6">
                              <div className="flex items-center justify-center gap-3">
                                {comment.status === 'pending' && (
                                  <button
                                    onClick={() => approveComment(comment.id)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500 text-white text-[11px] font-black rounded-lg hover:bg-green-600 transition-all shadow-md active:scale-95"
                                  >
                                    <ShieldCheck size={14} />
                                    APPROVE
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteComment(comment.id)}
                                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all"
                                  title="Delete"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr><td colSpan="5" className="px-8 py-32 text-center text-gray-400 font-black">No comments yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === "products" ? (
            /* Products Management Section */
            <div className="space-y-8">
              {showAddForm && (
                <div className="bg-white dark:bg-[#151618] rounded-2xl border-2 border-[#f17840]/20 overflow-hidden shadow-xl animate-in slide-in-from-top-4 duration-300">
                  <div className="p-6 bg-[#f17840]/5 border-b border-[#f17840]/10 flex justify-between items-center text-[#253d4e] dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-[#f17840] text-white rounded-lg">
                        {isEditing ? <Edit size={20} /> : <Plus size={20} />}
                      </div>
                      <h2 className="text-xl font-black">
                        {isEditing ? "Edit Product Details" : "Create New Product"}
                      </h2>
                    </div>
                    <button onClick={resetForm} className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-lg transition-all">
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="p-5 sm:p-8 flex flex-col gap-6 sm:gap-8 text-[#253d4e] dark:text-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                      <div className="space-y-6">
                        <div className="space-y-1.5">
                          <label className="text-[12px] font-black text-gray-500 uppercase px-1">Product Title</label>
                          <input
                            type="text"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white text-base sm:text-lg"
                            placeholder="e.g. Professional Cordless Drill"
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Current Price (₹)</label>
                            <input
                              type="number"
                              value={form.price}
                              onChange={(e) => setForm({ ...form, price: e.target.value })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white text-base sm:text-lg text-[#f17840]"
                              placeholder="99.99"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Old Price (₹)</label>
                            <input
                              type="number"
                              value={form.old_price}
                              onChange={(e) => setForm({ ...form, old_price: e.target.value })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white text-base sm:text-lg text-gray-400 line-through"
                              placeholder="120.00"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Badge Text</label>
                            <input
                              type="text"
                              value={form.badge}
                              onChange={(e) => setForm({ ...form, badge: e.target.value })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white"
                              placeholder="e.g. 10% Off"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Badge Type</label>
                            <select
                              value={form.badge_type}
                              onChange={(e) => setForm({ ...form, badge_type: e.target.value })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white appearance-none cursor-pointer"
                            >
                              <option value="discount">Discount (Orange)</option>
                              <option value="new">New (Green)</option>
                              <option value="sale">Sale (Red)</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Category</label>
                            <select
                              value={form.category_id}
                              onChange={(e) => setForm({ ...form, category_id: parseInt(e.target.value) })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white appearance-none cursor-pointer"
                            >
                              <option value={1}>Machine Tools</option>
                              <option value={2}>Hand Tools</option>
                              <option value={3}>Power Tools</option>
                            </select>
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Stock</label>
                            <input
                              type="number"
                              value={form.stock_quantity}
                              onChange={(e) => setForm({ ...form, stock_quantity: parseInt(e.target.value) })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white"
                              placeholder="0"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-[12px] font-black text-gray-500 uppercase px-1">Image URL</label>
                            <input
                              type="text"
                              value={form.image}
                              onChange={(e) => setForm({ ...form, image: e.target.value })}
                              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-bold dark:text-white"
                              placeholder="URL"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-6 flex flex-col">
                        <div className="space-y-1.5 flex-1 flex flex-col min-h-[150px]">
                          <label className="text-[12px] font-black text-gray-500 uppercase px-1">Full Description</label>
                          <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full flex-1 px-4 sm:px-5 py-3.5 sm:py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:outline-none focus:border-[#f17840] transition-all font-medium dark:text-white resize-none"
                            placeholder="Enter detailed product features and specifications..."
                          ></textarea>
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 sm:gap-4">
                          <button type="button" onClick={resetForm} className="order-2 sm:order-1 px-8 py-3.5 sm:py-4 rounded-xl font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                            Discard Changes
                          </button>
                          <button type="submit" className="order-1 sm:order-2 px-10 py-3.5 sm:py-4 bg-[#f17840] hover:bg-[#e06b38] text-white rounded-xl font-black transition-all shadow-lg shadow-[#f17840]/20 active:scale-95 text-base sm:text-lg">
                            {isEditing ? "Update Product" : "Confirm & Save"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-6 sm:p-8 border-b border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[#253d4e] dark:text-white">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black">Inventory Overview</h2>
                    <p className="text-sm sm:text-base text-gray-500 font-bold tracking-tight">You have {products.length} products in your store</p>
                  </div>
                  {!showAddForm && (
                    <button
                      onClick={() => { setIsEditing(null); setShowAddForm(true); }}
                      className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#f17840] hover:bg-[#e06b38] text-white px-8 py-4 rounded-xl font-black transition-all shadow-lg shadow-[#f17840]/20 active:scale-95 text-sm sm:text-base"
                    >
                      <Plus size={22} /> Add New Item
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                  <table className="w-full text-left min-w-[850px] lg:min-w-full">
                    <thead>
                      <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[11px] sm:text-[13px] text-gray-400 font-black uppercase tracking-widest">
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Product Details</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Stock Category</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Unit Price</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Quick Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {products.length > 0 ? (
                        products
                          .filter(product =>
                            product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors group">
                              <td className="px-6 sm:px-8 py-4 sm:py-6">
                                <div className="flex items-center gap-3 sm:gap-5">
                                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 p-1.5 sm:p-2 flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    <img
                                      src={product.image || "https://premium-shop.envytheme.com/assets/img/products/product-1.webp"}
                                      alt={product.title}
                                      className="w-full h-full object-contain"
                                      onError={(e) => { e.target.src = "https://placehold.co/100x100?text=No+Img"; }}
                                    />
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2 mb-1">
                                      <p className="font-black text-[14px] sm:text-[17px] text-[#253d4e] dark:text-white leading-tight group-hover:text-[#f17840] transition-all">
                                        {product.title}
                                      </p>
                                      {product.badge && (
                                        <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px] text-[8px] sm:text-[10px] font-black uppercase whitespace-nowrap shadow-sm ${product.badge_type === 'new' ? 'bg-[#10b981]/10 text-[#10b981]' :
                                          product.badge_type === 'discount' ? 'bg-[#f17840]/10 text-[#f17840]' :
                                            'bg-[#ef4444]/10 text-[#ef4444]'
                                          }`}>
                                          {product.badge}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] sm:text-[13px] text-gray-400 font-bold line-clamp-1 max-w-[200px] sm:max-w-sm">{product.description}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 sm:px-8 py-4 sm:py-6">
                                <div className="flex flex-col gap-1">
                                  <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-[11px] font-black whitespace-nowrap inline-flex items-center justify-center min-w-[100px] sm:min-w-[120px] ${product.category_id == 1 ? "bg-purple-50 text-purple-600 border border-purple-100" :
                                    product.category_id == 2 ? "bg-green-50 text-green-600 border border-green-100" :
                                      "bg-blue-50 text-blue-600 border border-blue-100"
                                    }`}>
                                    {product.category_id == 1 ? "MACHINE TOOLS" :
                                      product.category_id == 2 ? "HAND TOOLS" :
                                        "POWER TOOLS"}
                                  </span>
                                  <span className={`text-[10px] font-black uppercase text-center ${product.stock_quantity > 0 ? "text-green-500" : "text-red-500"}`}>
                                    {product.stock_quantity > 0 ? `${product.stock_quantity} In Stock` : "Out of Stock"}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 sm:px-8 py-4 sm:py-6">
                                <span className="text-lg sm:text-xl font-black text-[#f17840]">₹{product.price}</span>
                              </td>
                              <td className="px-6 sm:px-8 py-4 sm:py-6 text-center">
                                <div className="flex items-center justify-center gap-2 sm:gap-3 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-300 transform lg:translate-x-2 lg:group-hover:translate-x-0">
                                  <button onClick={() => handleEdit(product)} className="p-2 sm:p-3 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl transition-all shadow-sm">
                                    <Edit size={18} className="sm:w-5 sm:h-5" />
                                  </button>
                                  <button onClick={() => deleteProduct(product.id)} className="p-2 sm:p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all shadow-sm">
                                    <Trash2 size={18} className="sm:w-5 sm:h-5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr><td colSpan="4" className="px-8 py-32 text-center text-gray-400 font-black text-xl">Inventory is empty.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard Overview Area (Charts & Analytics) */
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Sales Chart & Pie Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Sales Activity */}
                <div className="bg-white dark:bg-[#151618] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="flex justify-between items-center mb-10">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-black text-[#253d4e] dark:text-white">Sales Analytics</h3>
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[10px] font-black rounded-full border border-green-500/20 animate-pulse">LIVE</span>
                      </div>
                      <p className="text-sm font-bold text-gray-400">Past 7 days performance</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-[#f17840] rounded-full"></span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">INR</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-[#411151] rounded-full"></span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">EUR</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 bg-[#10b981] rounded-full"></span>
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-wider">USD</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesHistory}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                        />
                        <YAxis hide />
                        <Tooltip
                          cursor={{ fill: 'transparent' }}
                          contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                            fontWeight: 800
                          }}
                        />
                        <Bar dataKey="sales" fill="#f17840" radius={[8, 8, 0, 0]} barSize={40} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Categories Share */}
                <div className="bg-white dark:bg-[#151618] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black text-[#253d4e] dark:text-white">Category Distribution</h3>
                      <span className="px-2 py-0.5 bg-green-500/10 text-green-600 text-[10px] font-black rounded-full border border-green-500/20 animate-pulse">LIVE</span>
                    </div>
                    <p className="text-sm font-bold text-gray-400">Performance by category</p>
                  </div>
                  <div className="h-[380px] w-full">
                    <CustomPieChart
                      categories={categoryShare}
                      label={orders.length > 0 ? "Sales" : "Stock"}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Orders Table */}
              <div className="bg-white dark:bg-[#151618] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-black text-[#253d4e] dark:text-white">Recent Orders</h3>
                    <p className="text-sm font-bold text-gray-400">Latest transactions from store</p>
                  </div>
                  <button
                    onClick={() => setActiveTab("orders")}
                    className="text-sm font-black text-[#f17840] hover:underline underline-offset-4"
                  >
                    View All Orders
                  </button>
                </div>
                <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
                  <table className="w-full text-left min-w-[700px] lg:min-w-full">
                    <thead>
                      <tr className="bg-gray-50/50 dark:bg-[#0b0c0d] text-[11px] sm:text-[12px] text-gray-400 font-black uppercase tracking-widest">
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Order ID</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Customer</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Amount</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5 text-center">Status</th>
                        <th className="px-6 sm:px-8 py-4 sm:py-5">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                      {orders.slice(0, 5).map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-[#1a1c1e] transition-colors">
                          <td className="px-6 sm:px-8 py-4 sm:py-6 whitespace-nowrap">
                            <span className="font-black text-[#253d4e] dark:text-white text-sm">#TRD-{1000 + parseInt(order.id)}</span>
                          </td>
                          <td className="px-6 sm:px-8 py-4 sm:py-6">
                            <p className="font-bold text-sm tracking-tight">{order.customer_name || "Guest Customer"}</p>
                            <p className="text-[10px] sm:text-[11px] text-gray-400 font-bold">{order.email}</p>
                          </td>
                          <td className="px-6 sm:px-8 py-4 sm:py-6">
                            <p className="font-black text-[#f17840] text-sm sm:text-base uppercase">{order.currency || 'INR'} {order.total_amount}</p>
                          </td>
                          <td className="px-6 sm:px-8 py-4 sm:py-6 text-center">
                            <span className="px-2 sm:px-3 py-1 bg-green-50 text-green-600 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider border border-green-100">
                              Paid
                            </span>
                          </td>
                          <td className="px-6 sm:px-8 py-4 sm:py-6 text-[11px] sm:text-xs font-bold text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                      {orders.length === 0 && (
                        <tr><td colSpan="5" className="px-8 py-10 text-center text-gray-400 font-black">No recent orders.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )
          }

          {/* Shipping Details Modal */}
          {shippingModal.isOpen && (
            <div className="fixed inset-0 bg-[#253d4e]/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 overflow-y-auto">
              <div className="bg-white dark:bg-[#151618] w-full max-w-md rounded-3xl border-2 border-purple-500/20 shadow-2xl animate-in zoom-in-95 duration-200">
                <div className="p-6 bg-purple-500/5 border-b border-purple-500/10 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 text-white rounded-lg">
                      <Truck size={20} />
                    </div>
                    <h2 className="text-xl font-black text-[#253d4e] dark:text-white">Shipping Details</h2>
                  </div>
                  <button onClick={() => setShippingModal({ ...shippingModal, isOpen: false })} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all text-gray-400">
                    <X size={20} />
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Courier Service</label>
                    <input
                      type="text"
                      placeholder="e.g. Delhivery, Bluedart, Ecom Express"
                      value={shippingModal.courier_name}
                      onChange={(e) => setShippingModal({ ...shippingModal, courier_name: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none font-bold text-[#253d4e] dark:text-white transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Tracking Number / AWB</label>
                    <input
                      type="text"
                      placeholder="Enter Tracking ID"
                      value={shippingModal.tracking_number}
                      onChange={(e) => setShippingModal({ ...shippingModal, tracking_number: e.target.value })}
                      className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0b0c0d] border border-gray-100 dark:border-gray-800 rounded-xl focus:border-purple-500 focus:outline-none font-bold text-[#253d4e] dark:text-white transition-all uppercase"
                    />
                  </div>

                  <button
                    onClick={shipOrder}
                    className="w-full py-5 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-base transition-all shadow-xl shadow-purple-500/20 active:scale-95"
                  >
                    CONFIRM & MARK AS SHIPPED
                  </button>
                </div>
              </div>
            </div>
          )}
        </div >
      </main >
    </div >
  );
};

// Helper Component
const NavItem = ({ icon: Icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    className={`p-4 flex items-center gap-4 rounded-xl cursor-pointer transition-all duration-300 font-black group ${active
      ? "bg-[#f17840] text-white shadow-xl shadow-[#f17840]/30"
      : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1a1c1e] hover:text-[#f17840]"
      }`}
  >
    <Icon size={22} className={`${active ? "scale-110" : "group-hover:scale-110"} transition-transform duration-300`} />
    <span className="text-[15px]">{label}</span>
  </div>
);

export default Dashboard;