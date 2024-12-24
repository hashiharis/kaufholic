import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import { Sidebar } from "../../seller/sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { Buyers } from "../adminpages/Buyers";
import { Sellers } from "../adminpages/Sellers";
import { Products } from "../adminpages/Products";
import { TotalOrders } from "../adminpages/TotalOrders";
import { FcConferenceCall } from "react-icons/fc";
import { FcShop } from "react-icons/fc";
import { FcRating } from "react-icons/fc";
import { FcShipped } from "react-icons/fc";
import { FcMakeDecision } from "react-icons/fc";
import { FcDisclaimer } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";

import styles from "./admindashboard.module.css";
import { BuyerComplaints } from "../adminpages/BuyerComplaints";

export const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("Buyers");
  const [showMenu, setShowMenu] = useState(false);
  //   const [isAdmin,setIsAdmin]=useState("false");

  const location = useLocation();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const changeActivePage = (page) => {
    setActivePage(page);
  };
  const adminSideBarData = [
    {
      sidebarLink: "",
      icon: "",
      cName: "logo",
    },
    {
      sidebarLink: "Buyers",
      icon: <FcConferenceCall size={"30px"} />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Sellers",
      icon: <FcShop size={"30px"} />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Products",
      icon: <FcRating size={"30px"} />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Orders",
      icon: <FcShipped size={"30px"} />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Take Actions",
      icon: <FcMakeDecision size={"30px"} />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Deactivate Seller/Buyer",
      icon: <FcDisclaimer size={"30px"} />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Logout",
      icon: <LuLogOut size={"30px"} />,
      cName: "sidebarLink",
    },
  ];
  return (
    <Container fluid>
      <Row className={styles.adminDashboardWrapper}>
        <Col
          lg={3}
          xs={12}
          className={showMenu ? styles.sidebarParent : styles.sidebarParentResp}
        >
          <Sidebar
            changeActivePage={changeActivePage}
            toggleMenu={toggleMenu}
            showMenu={showMenu}
            data={adminSideBarData}
            location={location}
          />
        </Col>
        {!showMenu && (
          <Col>
            {activePage === "Buyers" && <Buyers activePage={activePage} />}
            {activePage === "Sellers" && <Sellers />}
            {activePage === "Products" && <Products activePage={activePage} />}
            {activePage === "Orders" && <TotalOrders activePage={activePage} />}
            {activePage === "Take Actions" && (
              <BuyerComplaints activePage={activePage} />
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
};
