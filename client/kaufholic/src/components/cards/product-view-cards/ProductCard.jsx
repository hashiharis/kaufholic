/* eslint-disable react/prop-types */
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import styles from "./productcard.module.css";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../apis/baseUrl";

export const ProductCard = ({ fetchWishlistProducts, item, isFav }) => {
  const [rating, setRating] = useState(0);
  // console.log("isFav", isFav);

  const buyerId = localStorage.getItem("kh-buyerId") || null;
  const productId = item._id;

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRating(newRating);
    addRating(buyerId, newRating);
  };

  const handleFavourite = () => {
    if (isFav) {
      removeFromFavourites(buyerId);
    } else {
      addToFavourites(buyerId);
    }
  };

  const addToFavourites = async (byrId) => {
    try {
      const res = await axiosInstance.post(
        `/wishlist/addtowishlist/${byrId}/${productId}`
      );

      if (res.status === 200) {
        console.log("resp wishlist", res);
        toast.success("Product added to wishlist");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding to wishlist", error);
    } finally {
      console.log("execute finally add");
      fetchWishlistProducts(buyerId);
    }
  };

  const removeFromFavourites = async (byrId) => {
    try {
      const res = await axiosInstance.delete(
        `/wishlist/removefromwishlist/${byrId}/${productId}`
      );

      if (res.status === 200) {
        console.log("remove res", res);
        toast.success("Product removed from wishlist");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding to wishlist", error);
    } finally {
      console.log("execute finally remove");
      fetchWishlistProducts(buyerId);
    }
  };

  const addRating = async (byrId, rating) => {
    try {
      const res = await axiosInstance.patch(
        `product/addRating/${byrId}/${productId}`,
        { rating }
      );

      if (res.status === 200) {
        console.log("rating added", rating);
        toast.success("Rating added succesfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding rating", error);
    }
  };

  return (
    <div className={styles.productCards}>
      <img
        className={styles.productImg}
        src={`${BASE_URL}/${item.productImage}`}
      />
      <div className={styles.productDetails}>
        <div className={styles.productTitle}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.subTitle}>{item.subtitle}</p>
          <p className={styles.favIcon}>
            {isFav ? (
              <FaHeart size="20px" color="red" onClick={handleFavourite} />
            ) : (
              <FaRegHeart size="20px" onClick={handleFavourite} />
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
          <span className={styles.viewMore}>
            <Link to={`/productdetail/${productId}`}>View More</Link>
          </span>
        </div>
      </div>
    </div>
  );
};
