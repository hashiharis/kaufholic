import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BuyerNav } from "../navbar/usernavbar/buyernavbar/BuyerNav";
import { Footer } from "../footer/Footer";
import { CartPage } from "./cart/CartPage";
import styles from "./cartpaymenttab.module.css";
import { CustomerDetails } from "./customerdetails/CustomerDetails";
import { useState } from "react";

export const CartPaymentTab = () => {
  const [key, setKey] = useState("cart");

  return (
    <>
      <BuyerNav />
      <Tabs
        // defaultActiveKey="cart"
        id="controlled-tab-example"
        className={styles.tab}
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="cart" title="Cart">
          <CartPage setKey={setKey} />
        </Tab>
        <Tab eventKey="customer_details" title="Customer Details">
          <CustomerDetails setKey={setKey} />
        </Tab>
        <Tab eventKey="payment" title="Payment">
          Tab content for payment
        </Tab>
      </Tabs>
      <Footer />
    </>
  );
};
