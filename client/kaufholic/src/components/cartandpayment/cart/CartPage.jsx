import styles from "./cartpage.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { QuantityCounter } from "./QuantityCounter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseUrl";
export const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const { buyerId } = useParams();

  useEffect(() => {
    if (buyerId) {
      fetchCartItems(buyerId);
    }
  }, []);

  const fetchCartItems = async (byrId) => {
    try {
      const res = await axiosInstance.get(`/cart/getCartItems/${byrId}`);

      if (res.status === 200) {
        console.log("cart", res);
        setCartItems(res?.data?.data);
      }
      if (res.data.message === "Cart is empty") {
        setIsCartEmpty(true);
        toast.error("Your shopping cart is empty !!!");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching items from cart", error);
    }
  };
  console.log("cartItemsstate", cartItems);

  const removeCartItem = async (buyerId, productId) => {
    try {
      const res = await axiosInstance.delete(
        `/cart/removefromcart/${buyerId}/${productId}`
      );

      if (res.status === 200) {
        toast.success("Item removed from cart");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on deleting item from cart", error);
    }
  };

  return (
    <>
      {isCartEmpty ? (
        <div className={styles.emptyCartImage}></div>
      ) : (
        <div className={styles.cartWrapper}>
          <div className={styles.cartList}>
            <h4 className={styles.cartTitle}>
              Items in Cart({cartItems?.length ? cartItems.length : 0})
            </h4>
            {cartItems?.map((item, index) => (
              <div key={index}>
                <div className={styles.cartProducts}>
                  <div className={styles.cartProductDetails}>
                    <img
                      src={`${BASE_URL}/${item.productId.productImage}`}
                      alt={`product-${item.productId.title}`}
                      className={styles.cartProductImage}
                    />
                    <p>{item.productId.title}</p>
                  </div>
                  <p className={styles.price}>₹{item.productId.currentPrice}</p>
                  <p className={styles.quantity}>
                    <QuantityCounter />
                  </p>
                  <p className={styles.priceQuantity}>
                    Price based on quantity
                  </p>
                  <p className={styles.delete}>
                    <MdOutlineDelete
                      size={"20px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeCartItem(buyerId, item.productId._id);
                        fetchCartItems(buyerId);
                      }}
                    />
                  </p>
                </div>
                <hr />
              </div>
            ))}
          </div>

          <div className={styles.orderSummarySection}>
            <h4>Order Summary</h4>
            <table className={styles.orderDetails}>
              <tr>
                <td>Price</td>
                <td>₹500</td>
              </tr>
              <tr>
                <td>Shipping Charge</td>
                <td>₹0</td>
              </tr>
              <tr>
                <td>Discount Price</td>
                <td>₹20</td>
              </tr>
              <hr />
              <tr className={styles.totalOrderPrice}>
                <td>Total Price</td>
                <td>₹480</td>
              </tr>
            </table>
          </div>
        </div>
      )}
    </>
  );
};
