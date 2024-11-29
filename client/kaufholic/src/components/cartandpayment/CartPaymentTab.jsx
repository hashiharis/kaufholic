import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BuyerNav } from "../navbar/usernavbar/buyernavbar/BuyerNav";
import { Footer } from "../footer/Footer";
import { CartPage } from "./cart/CartPage";
import styles from "./cartpaymenttab.module.css";
import { CustomerDetails } from "./customerdetails/CustomerDetails";

export const CartPaymentTab = () => {
  return (
    <>
      <BuyerNav />
      <Tabs
        defaultActiveKey="cart"
        id="uncontrolled-tab-example"
        className={styles.tab}
      >
        <Tab eventKey="cart" title="Cart">
          <CartPage />
        </Tab>
        <Tab eventKey="customer_details" title="Customer Details">
          <CustomerDetails />
        </Tab>
        <Tab eventKey="payment" title="Payment">
          Tab content for payment
        </Tab>
      </Tabs>
      <Footer />
    </>
  );
};
