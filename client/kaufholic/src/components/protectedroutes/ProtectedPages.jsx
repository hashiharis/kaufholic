import { Outlet, Navigate } from "react-router-dom";
export const BuyerProtectedPages = () => {
  const buyerId = localStorage.getItem("kh-buyerId");
  return buyerId ? <Outlet /> : <Navigate to="/buyer/signin" />;
};

export const SellerProtectedPages = () => {
  const sellerId = localStorage.getItem("kh-sellerId");
  return sellerId ? <Outlet /> : <Navigate to="/seller/signin" />;
};

export const AdminProtectedPages = () => {
  const adminCred = localStorage.getItem("kh-admin");
  return adminCred ? <Outlet /> : <Navigate to="/admin/signin" />;
};
