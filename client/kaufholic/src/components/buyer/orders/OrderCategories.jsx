import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Orders } from "./Orders";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import { Footer } from "../../footer/Footer";
export const OrderCategories = () => {
  return (
    <>
      <BuyerNav />
      <Tabs
        defaultActiveKey="pending_orders"
        id="uncontrolled-tab-example"
        className="mb-3 my-5 px-5"
      >
        <Tab eventKey="pending_orders" title="Pending Orders">
          <Orders />
        </Tab>
        <Tab eventKey="delivered_orders" title="Buy Again">
          Tab content for Profile
        </Tab>
      </Tabs>
      <Footer />
    </>
  );
};
