import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseUrl";
import styles from "./pendingorders.module.css";
import Button from "react-bootstrap/Button";
import { format } from "date-fns";
import no_results from "../../../assets/images/no_data.png";

export const PendingOrders = () => {
  const [byrShippingDetails, setByrShippingDetails] = useState([]);
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");

  const sellerId = localStorage.getItem("kh-sellerId") || null;
  useEffect(() => {
    if (sellerId) {
      fetchOrders(sellerId);
    }
  }, []);

  const handleOrders = (pdtId) => {
    const id = byrShippingDetails.map((item) => item._id);
    const orderId = id.toString();

    // console.log("orderId", orderId);
    if (!deliveryDate) {
      alert("Please select a delivery date!");
      return false;
    }
    if (validateDeliveryDate()) {
      updateDelivery(orderId, pdtId);
    }
  };

  const validateDeliveryDate = () => {
    const currentDate = format(new Date(), "yyyy-MM-dd");
    // console.log("currdate", currentDate);
    if (deliveryDate <= currentDate) {
      alert("Please select a future date for delivery");
      return false;
    }
    return true;
  };
  const fetchOrders = async (id) => {
    try {
      const res = await axiosInstance.get(`/orders/sellerOrders/${id}`);
      if (res.status === 200) {
        console.log(res);
        setByrShippingDetails(res?.data?.data);
        let products = res?.data?.data.map((item) => item.orderedProducts);
        setOrderedProducts(products);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching orders", error);
    }
  };
  console.log("shipping details", byrShippingDetails);
  console.log("ordered products", orderedProducts);
  console.log("delivery date", deliveryDate);

  const updateDelivery = async (orderId, productId) => {
    try {
      const res = await axiosInstance.patch(
        `/orders/setdeliverydate/${orderId}/${productId}?deliveryDate=${deliveryDate}`
      );

      if (res.status === 200) {
        toast.success("Delivery date added successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating delivery date on orders", error);
    } finally {
      fetchOrders(sellerId);
    }
  };
  return (
    <div>
      {orderedProducts.length > 0 ? (
        orderedProducts
          ?.flatMap((innerArray) => innerArray)
          .map((item, index) => (
            <Accordion key={index} className={styles.ordersAccord}>
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
                    <p className={styles.deliveryStatus}>
                      Delivery Status:{item.deliveryStatus}
                    </p>
                  </div>
                  <div>
                    <p className={styles.shippingDetails}>Shipping Details</p>
                    {byrShippingDetails?.map((buyer, index) => (
                      <div key={index}>
                        <p>First Name: {buyer.fName}</p>
                        <p>Last Name: {buyer.lName}</p>
                        <p>Email: {buyer.email}</p>
                        <p>Address: {buyer.address}</p>
                        <p>State/Region: {buyer.stateRegion}</p>
                        <p>Contact: {buyer.contact}</p>
                      </div>
                    ))}
                  </div>
                  <div className={styles.deliverydate}>
                    <label>Delivery Date:</label>
                    <input
                      type="date"
                      name="deliveryDate"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                    />
                  </div>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleOrders(item.productId._id);
                      // console.log("pdtId", item.productId._id);
                    }}
                  >
                    Save Changes
                  </Button>
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
