import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BuyerSignIn } from "./components/buyer/signin/BuyerSignIn";
import { BuyerSignUp } from "./components/buyer/signup/BuyerSignUp";
import { SignIn } from "./components/seller/signin/SignIn";
import { SignUp } from "./components/seller/signup/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPageWrapper } from "./components/landing-page/LandingPageWrapper";
import { Toaster } from "react-hot-toast";
import { SellerDashboard } from "./components/seller/dashboard/SellerDashboard";
import { ProductCard } from "./components/cards/product-view-cards/ProductCard";
import { ProductCardWrapper } from "./components/cards/product-view-cards/ProductCardWrapper";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<ProductCardWrapper />} />
        {/* <Route path="/" element={<LandingPageWrapper />} /> */}
        <Route path="/seller/signup" element={<SignUp />} />
        <Route path="/seller/signin" element={<SignIn />} />
        <Route path="/buyer/signin" element={<BuyerSignIn />} />
        <Route path="/buyer/signup" element={<BuyerSignUp />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
