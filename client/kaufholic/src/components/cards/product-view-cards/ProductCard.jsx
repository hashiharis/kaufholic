/* eslint-disable react/prop-types */
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import styles from "./productcard.module.css";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const ProductCard = ({ item }) => {
  const [isFav, setIsFav] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const buyerId = localStorage.getItem("kh-buyerId") || null;
  const productId = item._id;

  const updateProductLiked = async (byrId) => {
    try {
      const res = await axiosInstance.patch(
        `/product/updateFavourite/${productId}/${byrId}`,
        null,
        { params: { isLiked: true } }
      );

      if (res.status === 200) {
        console.log("response", res);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating favourite for product", error);
    }
  };

  const updateProductDislike = async (byrId) => {
    try {
      const res = await axiosInstance.patch(
        `/product/updateFavourite/${productId}/${byrId}`,
        null,
        { params: { isLiked: false } }
      );

      if (res.status === 200) {
        console.log("response", res);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating favourite for product", error);
    }
  };

  const addToFavourites = async (byrId) => {
    try {
      const res = await axiosInstance.post(
        `/wishlist/addtowishlist/${byrId}/${productId}`
      );

      if (res.status === 200) {
        console.log("resp wishlist", res);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding to wishlist", error);
    }
  };

  const removeFromFavourites = async (byrId) => {
    try {
      const res = await axiosInstance.delete(
        `/wishlist/removefromwishlist/${byrId}/${productId}`
      );

      if (res.status === 200) {
        console.log("remove res", res);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding to wishlist", error);
    }
  };

  return (
    <div className={styles.productCards}>
      <div className={styles.productImg}>Placeholder</div>
      <div className={styles.productDetails}>
        <div className={styles.productTitle}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.subTitle}>{item.subtitle}</p>
          <p className={styles.favIcon}>
            {isFav ? (
              <FaHeart
                size="20px"
                color="red"
                onClick={() => {
                  setIsFav(() => !isFav);
                  removeFromFavourites(buyerId);
                  // updateProductDislike(buyerId);
                }}
              />
            ) : (
              <FaRegHeart
                size="20px"
                onClick={() => {
                  setIsFav(() => !isFav);
                  console.log("clicked");
                  // updateProductLiked(buyerId);
                  addToFavourites(buyerId);
                }}
              />
            )}
          </p>
        </div>
        <div className={styles.ratingStars}>
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={30}
            activeColor={"#ffd700"}
          />
          <span className={styles.ratingCount}>({item.avgRating})</span>
        </div>
        <div className={styles.pricingSection}>
          <span className={styles.price1}>
            {item.currentPrice
              ? ` ₹${item.currentPrice}`
              : ` ₹${item.actualPrice}`}
          </span>
          <span className={styles.price2}>
            {item.actualPrice && ` ₹${item.actualPrice}`}
          </span>
          <span className={styles.percent}>
            {item.discountPercent && `${item.discountPercent}%`}
          </span>
        </div>
      </div>
    </div>
  );
};
