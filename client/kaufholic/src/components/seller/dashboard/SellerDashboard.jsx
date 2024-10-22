import { useState } from "react";
import { SellerProfile } from "../pages/SellerProfile";
import { Sidebar } from "../sidebar/Sidebar";
import { SellerAddProduct } from "../pages/SellerAddProduct";
import { SellerProductView } from "../pages/SellerProductView";
import { SellerHome } from "../pages/SellerHome";
import styles from "./sellerdashboard.module.css";

export const SellerDashboard = () => {
  const [activePage, setActivePage] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <div className={styles.sellerDashboardWrapper}>
      <Sidebar
        changeActivePage={changeActivePage}
        toggleMenu={toggleMenu}
        showMenu={showMenu}
      />
      <div
        className={
          showMenu
            ? styles.sellerMainContentHide
            : styles.sellerMainContentActive
        }
      >
        {activePage === "Home" && <SellerHome />}
        {activePage === "Profile" && <SellerProfile />}
        {activePage === "Add Product" && <SellerAddProduct />}
        {activePage === "My Products" && <SellerProductView />}
      </div>
    </div>
  );
};
