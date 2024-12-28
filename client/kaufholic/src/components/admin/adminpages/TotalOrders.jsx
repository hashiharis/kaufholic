/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { Tables } from "./Tables";
import noresult from "../../../assets/images/noresult.png";
export const TotalOrders = ({ activePage }) => {
  const [orders, setOrders] = useState([]);
  const orderHeaders = [
    "OrderId",
    "BuyerName",
    "Product Details",
    "Total Order Price",
  ];
  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get("/orders/allOrders");
      if (res.status === 200) {
        setOrders(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching order details");
    }
  };

  console.log(orders);
  return (
    <div>
      <h4 style={{ marginBlock: "2em" }}>List of Orders</h4>
      {orders.length !== 0 ? (
        <Tables headers={orderHeaders} data={orders} activePage={activePage} />
      ) : (
        <div
          style={{
            backgroundImage: `url(${noresult})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            minHeight: "300px",
          }}
        >
          <h5 style={{ textAlign: "center" }}>No Results Found !!!</h5>
        </div>
      )}
    </div>
  );
};
