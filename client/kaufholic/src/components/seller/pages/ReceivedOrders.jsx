import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { PendingOrders } from "./PendingOrders";
import { ConfirmedOrders } from "./ConfirmedOrders";
import { DeliveredOrders } from "./DeliveredOrders";
export const ReceivedOrders = () => {
  return (
    <div>
      <h1>Orders Page</h1>
      <Tabs
        defaultActiveKey="pending_orders"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="pending_orders" title="Pending Orders">
          <PendingOrders />
        </Tab>
        <Tab eventKey="confirmed_orders" title="Confirmed Orders">
          <ConfirmedOrders />
        </Tab>
        <Tab eventKey="delivered_orders" title="Delivered Orders">
          <DeliveredOrders />
        </Tab>
      </Tabs>
    </div>
  );
};
