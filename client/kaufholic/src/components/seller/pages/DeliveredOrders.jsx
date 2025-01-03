import { useEffect, useState } from "react";
import styles from "./deliveredorders.module.css";
import Accordion from "react-bootstrap/Accordion";
import { BASE_URL } from "../../../apis/baseUrl";
import { axiosInstance } from "../../../apis/axiosInstance";
import no_results from "../../../assets/images/no_data.png";
import toast from "react-hot-toast";

export const DeliveredOrders = () => {
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [deliveredProducts, setDeliveredProducts] = useState([]);

  useEffect(() => {
    const sellerId = localStorage.getItem("kh-sellerId") || null;

    if (sellerId) {
      getDeliveredOrders(sellerId);
    }
  }, []);

  const getDeliveredOrders = async (id) => {
    try {
      const res = await axiosInstance.get(`/orders/deliveredorders/${id}`);

      if (res.status === 200) {
        console.log(res);
        setDeliveredOrders(res?.data?.data);
        setDeliveredProducts(
          res?.data?.data?.map((item) => item.orderedProducts)
        );
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching delivered orders", error);
    }
  };
  console.log("delivered orders", deliveredOrders);
  console.log("delivered products", deliveredProducts);
  return (
    <div>
      {deliveredProducts.length > 0 ? (
        deliveredProducts
          ?.flatMap((innerArray) => innerArray)
          .map((item, index) => (
            <Accordion key={index}>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{item.productId.title}</Accordion.Header>
                <Accordion.Body>
                  <div className={styles.orderDetails}>
                    <img
                      src={`${BASE_URL}/${item.productId.productImage}`}
                      alt={`${item.productId.productImage}`}
                      className={styles.prodImg}
                    />
                    <p className={styles.quantity}>Quantity:{item.quantity}</p>
                  </div>
                  <div>
                    <p className={styles.shippingDetails}>Shipping Details</p>
                    {deliveredOrders?.map((item, index) => (
                      <div key={index}>
                        <p>First Name: {item.fName}</p>
                        <p>Last Name: {item.lName}</p>
                        <p>Email: {item.email}</p>
                        <p>Address: {item.address}</p>
                        <p>State/Region: {item.stateRegion}</p>
                        <p>Contact: {item.contact}</p>
                      </div>
                    ))}
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          ))
      ) : (
        <div>
          <img
            src={no_results}
            alt="no-result-illustration"
            className={styles.empty_image}
          />
        </div>
      )}
    </div>
  );
};
