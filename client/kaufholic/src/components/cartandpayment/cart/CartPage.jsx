import styles from "./cartpage.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { QuantityCounter } from "./QuantityCounter";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BASE_URL } from "../../../apis/baseUrl";
import { useDispatch } from "react-redux";
import {
  saveOrderPriceDetails,
  saveProductDetails,
} from "../customerdetails/customerDetailsSlice";

export const CartPage = ({ eventKey, setKey }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const [cartProductDetails, setCartProductDetails] = useState([
    {
      productId: "",
      productImage: "",
      productTitle: "",
      productPrice: "",
      productDiscountPrice: "",
      quantity: 1,
    },
  ]);

  const [orderPrice, setOrderPrice] = useState({
    price: 0,
    shippingCharge: 0,
    discountPrice: 0,
    totalPrice: 0,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (cartItems.length > 0) {
      const updCartItems = cartItems.map((item) => ({
        productId: item.productId._id,
        productImage: item.productId.productImage,
        productTitle: item.productId.title,
        productPrice: item.productId.currentPrice,
        productDiscountPrice: item.productId.discountPriceApplied,
        quantity: 1,
      }));
      setCartProductDetails(updCartItems);
    }
  }, [cartItems]);

  const priceByQuantity = cartProductDetails.reduce(
    (mul, item) => mul + item.productPrice * item.quantity,
    0
  );

  const totalDiscountPrice = cartProductDetails.reduce(
    (sum, item) => sum + item.productDiscountPrice * item.quantity,
    0
  );

  console.log("totalDis", totalDiscountPrice);

  useEffect(() => {
    if (cartProductDetails.length > 0) {
      setOrderPrice({
        price: priceByQuantity,
        shippingCharge: 0,
        discountPrice: totalDiscountPrice,
        totalPrice: priceByQuantity - totalDiscountPrice,
      });
    }
  }, [cartProductDetails, priceByQuantity, totalDiscountPrice]);

  console.log("order price", orderPrice);
  console.log("cartProduct", cartProductDetails);

  const { buyerId } = useParams();

  const handleIncrement = (pId) => {
    const incrementQuantity = cartProductDetails.map((product) => {
      if (product.productId === pId && product.quantity < 10) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }

      return product;
    });
    setCartProductDetails(incrementQuantity);
  };

  //const [product] = cartProductDetails; Destructuring cartProductDetails array of objects
  // console.log("quant",  product.productId, product.quantity);

  const handleDecrement = (pId) => {
    const decrementQuantity = cartProductDetails.map((product) => {
      if (product.productId === pId && product.quantity > 1) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
    setCartProductDetails(decrementQuantity);
  };

  const handleClick = () => {
    if (cartItems.length > 0) {
      dispatch(saveProductDetails(cartProductDetails)); //saving cart product details to redux
      if (priceValidation()) {
        dispatch(saveOrderPriceDetails(orderPrice)); //saving order price details to redux
      }

      setKey("customer_details");
    }
  };

  useEffect(() => {
    if (buyerId) {
      fetchCartItems(buyerId);
    }
  }, []);

  const priceValidation = () => {
    const { price, totalPrice } = orderPrice;
    if (price <= 0 && totalPrice <= 0) {
      alert("Price value should be non negative and greater than zero");
      return false;
    }
    return true;
  };

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
    } finally {
      fetchCartItems(buyerId);
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
                    <QuantityCounter
                      cartProductDetails={cartProductDetails}
                      handleIncrement={() => {
                        handleIncrement(item.productId._id);
                      }}
                      handleDecrement={() => {
                        handleDecrement(item.productId._id);
                      }}
                      pId={item.productId._id}
                    />
                  </p>

                  <p className={styles.priceQuantity}>
                    {cartProductDetails.map((pdt, index) => (
                      <div key={index}>
                        {pdt.productId === item.productId._id &&
                          pdt.productPrice * pdt.quantity}
                      </div>
                    ))}
                  </p>

                  <p className={styles.delete}>
                    <MdOutlineDelete
                      size={"20px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeCartItem(buyerId, item.productId._id);
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
                <td>₹{orderPrice.price}</td>
              </tr>
              <tr>
                <td>Shipping Charge</td>
                <td>₹{orderPrice.shippingCharge}</td>
              </tr>
              <tr>
                <td>You saved</td>
                <td>₹{orderPrice.discountPrice}</td>
              </tr>
              <hr />
              <tr className={styles.totalOrderPrice}>
                <td>Total Price</td>
                <td>₹{orderPrice.totalPrice}</td>
              </tr>
            </table>
            <button className={styles.buyNowBtn} onClick={handleClick}>
              Shop Now
            </button>
          </div>
        </div>
      )}
    </>
  );
};
