import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { PendingOrders } from "./PendingOrders";
export const RecievedOrders = () => {
  return (
    <div>
      <h1>Recieved Orders Page</h1>
      <Tabs
        defaultActiveKey="pending_orders"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pending_orders" title="Pending Orders">
          <PendingOrders />
        </Tab>
        <Tab eventKey="confirmed_orders" title="Confirmed Orders">
          Tab content for Profile
        </Tab>
      </Tabs>
    </div>
  );
};
