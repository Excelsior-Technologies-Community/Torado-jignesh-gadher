import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsletterPopup from "./Components/NewsletterPopup.jsx";
import Cart from "./Pages/Cart.jsx";
import Error from "./Pages/Error.jsx";
import Faq from "./Pages/Faq.jsx";
import Home from "./Pages/Home.jsx";
import Myaccount from "./Pages/Myaccount.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import ShopGrid from "./Pages/ShopGrid.jsx";
import StoreLocation from "./Pages/storelocation.jsx";
import TermsofService from "./Pages/TermsofService.jsx";
import React from "react";    

const App = () => {
  return (
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
        <Route path="/my-account" element={<Myaccount />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
