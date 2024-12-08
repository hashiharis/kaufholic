import Accordion from "react-bootstrap/Accordion";
import styles from "./orders.module.css";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import { Footer } from "../../footer/Footer";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseUrl";
import empty_image from "../../../assets/images/empty_illustration.png";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const buyerId = localStorage.getItem("kh-buyerId") || null;

    if (buyerId) {
      fetchOrders(buyerId);
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
      console.log("Error on fetching order", error);
    }
  };

  console.log("orders", orders);
  return (
    <>
      <BuyerNav />
      <div className={styles.ordersWrapper}>
        {orders.length === 0 ? (
          <>
            <h1>You have not placed any orders yet!!!</h1>
            <img
              src={empty_image}
              alt="empty image"
              className={styles.emptyImage}
            />
          </>
        ) : (
          <>
            <h1 className={styles.ordersHeading}>Your Orders</h1>
            {orders
              ?.flatMap((innerArray) => innerArray)
              .map((item, index) => (
                <Accordion key={index} className={styles.orderLists}>
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header>
                      <div className={styles.productIntro}>
                        <p>{item.productId.title}</p>
                        <p>
                          {item.quantity}×{item.productId.currentPrice}
                        </p>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div className={styles.productDescription}>
                        <img
                          src={`${BASE_URL}/${item.productId.productImage}`}
                          alt="product-image"
                          className={styles.productImg}
                        />
                        <p className={styles.productTitle}>
                          {item.productId.title}
                        </p>
                        <p className={styles.subtitle}>
                          {item.productId.subtitle}
                        </p>
                        <p className={styles.quantity}>
                          Quantity: {item.quantity}
                        </p>
                        <p className={styles.deliveryStatus}>
                          Delivery Status: {item.deliveryStatus}
                        </p>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              ))}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};
