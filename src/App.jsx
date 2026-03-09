import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin.jsx";
import AdminRegister from "./admin/AdminRegister.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import ProtectedRoute from "./admin/ProtectedRoute.jsx";
import NewsletterPopup from "./Components/NewsletterPopup.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { CompareProvider } from "./context/CompareContext.jsx";
import { CurrencyProvider } from "./context/CurrencyContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import About from "./Pages/About.jsx";
import BlogDetails from "./Pages/BlogDetails.jsx";
import BlogStandard from "./Pages/BlogStandard.jsx";
import Cart from "./Pages/Cart.jsx";
import Checkout from "./Pages/Checkout.jsx";
import Compare from "./Pages/Compare.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import Error from "./Pages/Error.jsx";
import Faq from "./Pages/Faq.jsx";
import Home from "./Pages/Home.jsx";
import Myaccount from "./Pages/Myaccount.jsx";
import OrderSuccess from "./Pages/OrderSuccess.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import ShopGrid from "./Pages/ShopGrid.jsx";
import StoreLocation from "./Pages/storelocation.jsx";
import TermsofService from "./Pages/TermsofService.jsx";
import TrackOrder from "./Pages/TrackOrder.jsx";
import VerifyOTP from "./Pages/VerifyOTP.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import React from "react";

const App = () => {
  return (
    <CartProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CompareProvider>
            <BrowserRouter>
              <NewsletterPopup />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/storelocation" element={<StoreLocation />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/terms-of-service" element={<TermsofService />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/shop-grid" element={<ShopGrid />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/my-account" element={<Myaccount />} />
                <Route path="/track-order" element={<TrackOrder />} />
                <Route path="/verify-otp" element={<VerifyOTP />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about-us" element={<About />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/blog-grid" element={<BlogStandard />} />
                <Route path="/blog-details" element={<BlogDetails />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/register" element={<AdminRegister />} />
                <Route path="/order-success/:orderId" element={<OrderSuccess />} />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Error />} />

              </Routes>
            </BrowserRouter>

          </CompareProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </CartProvider>
  );
};
export default App;
