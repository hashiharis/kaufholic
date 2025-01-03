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
import { ProductCardWrapper } from "./components/cards/product-view-cards/ProductCardWrapper";
import { WishlistWrapper } from "./components/cards/wishlist-cards/WishlistWrapper";
import { ProductDetail } from "./components/pdp/productfirstdetail/ProductDetail";
import { SellerProductEdit } from "./components/seller/pages/SellerProductEdit";
import { CartPaymentTab } from "./components/cartandpayment/CartPaymentTab";
import { ForgotPassword } from "./components/forgotpassword/ForgotPassword";
import { BuyerProfile } from "./components/buyer/profile/BuyerProfile";
import { OrderCategories } from "./components/buyer/orders/OrderCategories";
import { AdminDashboard } from "./components/admin/admindashboard/AdminDashboard";
import { AdminSignin } from "./components/admin/AdminSignin";
import { Complaints } from "./components/buyer/complaints/Complaints";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Toaster />
      </div>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/cart/:buyerId/" element={<CartPaymentTab />} />
        <Route path="/seller/signup" element={<SignUp />} />
        <Route path="/seller/signin" element={<SignIn />} />
        <Route path="/buyer/signin" element={<BuyerSignIn />} />
        <Route path="/buyer/signup" element={<BuyerSignUp />} />
        <Route path="/buyer/wishlist" element={<WishlistWrapper />} />
        <Route path="/buyer/viewproducts" element={<ProductCardWrapper />} />
        <Route path="/productdetail/:productId" element={<ProductDetail />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route
          path="/seller/editproductdetails/:productId"
          element={<SellerProductEdit />}
        />
        <Route path="/buyer/orders/" element={<OrderCategories />} />
        <Route path="/buyer/profile/" element={<BuyerProfile />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/signin" element={<AdminSignin />} />
        <Route path="/buyer/complaints" element={<Complaints />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
