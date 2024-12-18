import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Orders } from "./Orders";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import { Footer } from "../../footer/Footer";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const OrderCategories = () => {
  const [orders, setOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    const buyerId = localStorage.getItem("kh-buyerId") || null;

    if (buyerId) {
      fetchOrders(buyerId);
      fetchPastOrders(buyerId);
    }
  }, []);

  const fetchOrders = async (byrId) => {
    try {
      const res = await axiosInstance.get(`/orders/listOrders/${byrId}`);

      if (res.status === 200) {
        // console.log(
        //   "orders",
        //   res?.data?.data.map((item) => item.orderedProducts)
        // );
        let products = res?.data?.data.map((item) => item.orderedProducts);
        setOrders(products);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching pending order", error);
    }
  };

  const fetchPastOrders = async (byrId) => {
    try {
      const res = await axiosInstance.get(`/orders/listPastOrders/${byrId}`);

      if (res.status === 200) {
        let products = res?.data?.data.map((item) => item.orderedProducts);
        setPastOrders(products);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching past order", error);
    }
  };

  //   console.log("orders", orders);
  return (
    <>
      <BuyerNav />
      <Tabs
        defaultActiveKey="pending_orders"
        id="uncontrolled-tab-example"
        className="mb-3 my-5 px-3"
      >
        <Tab eventKey="pending_orders" title="Pending Orders">
          <Orders orders={orders} />
        </Tab>
        <Tab eventKey="delivered_orders" title="Buy Again">
          <Orders orders={pastOrders} />
        </Tab>
      </Tabs>
      <Footer />
    </>
  );
};
