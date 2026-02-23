import { BrowserRouter, Route, Routes } from "react-router-dom";
import NewsletterPopup from "./Components/NewsletterPopup.jsx";
import Faq from "./Pages/Faq.jsx";
import Home from "./Pages/Home.jsx";
import StoreLocation from "./Pages/storelocation.jsx";
import React from "react";  

const App = () => {
  return (
    <BrowserRouter>
      <NewsletterPopup />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storelocation" element={<StoreLocation />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
