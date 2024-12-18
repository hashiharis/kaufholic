/* eslint-disable react/prop-types */
import Accordion from "react-bootstrap/Accordion";
import styles from "./orders.module.css";
// import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
// import { Footer } from "../../footer/Footer";
import { BASE_URL } from "../../../apis/baseUrl";
import empty_image from "../../../assets/images/empty_illustration.png";

export const Orders = ({ orders }) => {
  return (
    <>
      {/* <BuyerNav /> */}
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
      {/* <Footer /> */}
    </>
  );
};
