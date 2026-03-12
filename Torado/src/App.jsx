  import axios from "axios";
import { useEffect } from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";

// Pages
import About from "./Pages/About";
import BlogDetails from "./Pages/BlogDetails";
import BlogStandard from "./Pages/BlogStandard";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Compare from "./Pages/Compare";
import ContactUs from "./Pages/ContactUs";
import Error from "./Pages/Error";
import Faq from "./Pages/Faq";
import Home from "./Pages/Home";
import Myaccount from "./Pages/Myaccount";
import OrderSuccess from "./Pages/OrderSuccess";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import ShopGrid from "./Pages/ShopGrid";
import TermsofService from "./Pages/TermsofService";
import TrackOrder from "./Pages/TrackOrder";
import VerifyOTP from "./Pages/VerifyOTP";
import Wishlist from "./Pages/Wishlist";
import BlogDetailsLeftSidebar from "./Pages/blog-details-left-sidebar";
import BlogLeftSidebar from "./Pages/blog-left-sidebar";
import BlogRightSidebar from "./Pages/blog-righte-sidebar";
import ShopDetails from "./Pages/shopdetails";
import StoreLocation from "./Pages/storelocation";

// Components
import NewsletterPopup from "./Components/NewsletterPopup";
import StickyActions from "./Components/StickyActions";

// Admin

import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";

// Context
import { CartProvider } from "./context/CartContext";
import { CompareProvider } from "./context/CompareContext";
import { CurrencyProvider } from "./context/CurrencyContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  // Activity Heartbeat
  useEffect(() => {
    const updateActivity = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const adminData = JSON.parse(localStorage.getItem("adminData"));
      const email = user?.email || adminData?.email;

      if (email) {
        try {
          await axios.post("http://localhost:5000/api/auth/ping", { email });
        } catch (err) {
          // Silent fail
        }
      }
    };

    updateActivity();
    const interval = setInterval(updateActivity, 60 * 1000); // Ping every 1 min
    return () => clearInterval(interval);
  }, []);

  return (
    <CurrencyProvider>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog-standard" element={<BlogStandard />} />
                <Route path="/blog-details" element={<BlogDetails />} />
                <Route path="/blog-details-left-sidebar" element={<BlogDetailsLeftSidebar />} />
                <Route path="/blog-left-sidebar" element={<BlogLeftSidebar />} />
                <Route path="/blog-right-sidebar" element={<BlogRightSidebar />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/my-account" element={<Myaccount />} />
                <Route path="/login" element={<Myaccount />} />
                <Route path="/register" element={<Myaccount />} />
                <Route path="/forgot-password" element={<Myaccount />} /> {/* Re-using Myaccount or create a separate one */}
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shop-grid" element={<ShopGrid />} />
                <Route path="/terms-of-service" element={<TermsofService />} />
                <Route path="/terms" element={<TermsofService />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/shop-details/:id" element={<ShopDetails />} />
                <Route path="/shop-details" element={<ShopDetails />} />
                <Route path="/store-location" element={<StoreLocation />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />

                <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/Dashboard" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/ADMIN" element={<Navigate to="/admin/dashboard" replace />} />

                {/* 404 Route */}
                <Route path="*" element={<Error />} />
              </Routes>
              <NewsletterPopup />
              <StickyActions />
            </Router>
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
    </CurrencyProvider>
  );
}

export default App;
