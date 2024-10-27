/* eslint-disable react/prop-types */
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import ReactStars from "react-rating-stars-component";
import styles from "./productcard.module.css";
import { useState } from "react";
export const ProductCard = ({ item }) => {
  const [isFav, setIsFav] = useState("false");

  const ratingChanged = (newRating) => {
    console.log(newRating);
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
                onClick={() => setIsFav(() => !isFav)}
              />
            ) : (
              <FaRegHeart
                size="20px"
                onClick={() => {
                  setIsFav(() => !isFav);
                  console.log("clicked");
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
