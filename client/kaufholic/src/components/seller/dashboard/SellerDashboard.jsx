import { useState } from "react";
import { SellerProfile } from "../pages/SellerProfile";
import { Sidebar } from "../sidebar/Sidebar";
import { SellerAddProduct } from "../pages/SellerAddProduct";
import { SellerProductView } from "../pages/SellerProductView";
import { SellerHome } from "../pages/SellerHome";
import styles from "./sellerdashboard.module.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { SellerProductEdit } from "../pages/SellerProductEdit";
import { current } from "@reduxjs/toolkit";
import { RecievedOrders } from "../pages/RecievedOrders";

export const SellerDashboard = () => {
  const [activePage, setActivePage] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <Container fluid>
      <Row className={styles.sellerDashboardWrapper}>
        <Col
          lg={3}
          xs={12}
          className={showMenu ? styles.sidebarParent : styles.sidebarParentResp}
        >
          <Sidebar
            changeActivePage={changeActivePage}
            toggleMenu={toggleMenu}
            showMenu={showMenu}
          />
        </Col>
        {!showMenu && (
          <Col>
            {activePage === "Home" && <SellerHome />}
            {activePage === "Profile" && <SellerProfile />}
            {activePage === "Add Product" && (
              <SellerAddProduct changeActivePage={changeActivePage} />
            )}
            {activePage === "My Products" && (
              <SellerProductView
                changeActivePage={changeActivePage}
                setCurrentProduct={setCurrentProduct}
              />
            )}
            {activePage === "Edit_Products" && (
              <SellerProductEdit currentProduct={currentProduct} />
            )}
            {activePage === "Orders" && <RecievedOrders />}
          </Col>
        )}
      </Row>
    </Container>
  );
};
