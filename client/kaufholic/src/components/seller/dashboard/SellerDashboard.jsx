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
import { ReceivedOrders } from "../pages/ReceivedOrders";
import { IoMdHome } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { useLocation } from "react-router-dom";

export const SellerDashboard = () => {
  const [activePage, setActivePage] = useState("Home");
  const [showMenu, setShowMenu] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const location = useLocation();
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeActivePage = (page) => {
    setActivePage(page);
  };

  const sideBarData = [
    {
      sidebarLink: "",
      icon: "",
      cName: "logo",
    },
    {
      sidebarLink: "Home",
      icon: <IoMdHome />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Profile",
      icon: <IoIosPerson />,
      cName: "sidebarLink",
    },

    {
      sidebarLink: "Add Product",
      icon: <FaCartArrowDown />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "My Products",
      icon: <IoBagCheck />,
      cName: "sidebarLink",
    },
    { sidebarLink: "Orders", icon: <FaBoxOpen />, cName: "sidebarLink" },
    {
      sidebarLink: "Logout",
      icon: <FaPowerOff />,
      cName: "sidebarLink",
    },
  ];
  return (
    <Container fluid className={styles.sellerDashBoardSection}>
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
            data={sideBarData}
            location={location}
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
              <SellerProductEdit
                changeActivePage={changeActivePage}
                currentProduct={currentProduct}
              />
            )}
            {activePage === "Orders" && <ReceivedOrders />}
          </Col>
        )}
      </Row>
    </Container>
  );
};
