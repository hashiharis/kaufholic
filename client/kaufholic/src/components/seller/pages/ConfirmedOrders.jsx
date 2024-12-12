import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseUrl";
import styles from "./confirmedorders.module.css";
import no_results from "../../../assets/images/no_data.png";

export const ConfirmedOrders = () => {
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const sellerId = localStorage.getItem("kh-sellerId") || null;

    if (sellerId) {
      getConfirmedOrders(sellerId);
    }
  }, []);

  const getConfirmedOrders = async (id) => {
    try {
      const res = await axiosInstance.get(`/orders/confirmedorders/${id}`);

      if (res.status === 200) {
        console.log(res);
        setConfirmedOrders(res?.data?.data);
        setProducts(res?.data?.data.map((item) => item.orderedProducts));
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching confirmed orders", error);
    }
  };

  console.log("confirmed orders", confirmedOrders);
  console.log(" products", products);
  return (
    <div>
      {products.length > 0 ? (
        products
          ?.flatMap((innerArray) => innerArray)
          .map((prod, index) => (
            <Accordion key={index}>
              <Accordion.Item eventKey={index}>
                <Accordion.Header>{prod.productId.title}</Accordion.Header>
                <Accordion.Body>
                  <div className={styles.orderDetails}>
                    <img
                      src={`${BASE_URL}/${prod.productId.productImage}`}
                      alt={`${prod.productId.productImage}`}
                      className={styles.prodImg}
                    />
                    <p className={styles.quantity}>Quantity:{prod.quantity}</p>
                    <p className={styles.deliveryStatus}>
                      Delivery Status:{prod.deliveryStatus}
                    </p>
                  </div>
                  <div>
                    <p className={styles.shippingDetails}>Shipping Details</p>
                    {confirmedOrders?.map((item, index) => (
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
