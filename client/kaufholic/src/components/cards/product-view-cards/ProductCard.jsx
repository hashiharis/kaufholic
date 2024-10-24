/* eslint-disable react/prop-types */
import { FaRegHeart } from "react-icons/fa";
import ratingStar from "../../../assets/svg/ratingStar.svg";
import styles from "./productcard.module.css";
export const ProductCard = ({ item }) => {
  return (
    <div className={styles.productCards}>
      <div className={styles.productImg}></div>
      <div className={styles.productDetails}>
        <div className={styles.productTitle}>
          <p className={styles.title}>{item.title}</p>
          <p className={styles.subTitle}>{item.subTitle}</p>
          <p className={styles.favIcon}>
            {" "}
            <FaRegHeart size="20px" />
          </p>
        </div>
        <p>
          <img src={ratingStar} alt="rating-star" style={{ height: "30px" }} />
          <img src={ratingStar} alt="rating-star" style={{ height: "30px" }} />
          <img src={ratingStar} alt="rating-star" style={{ height: "30px" }} />
          <img src={ratingStar} alt="rating-star" style={{ height: "30px" }} />
          <span className={styles.ratingCount}>{item.ratingCount}</span>
        </p>
        <div className={styles.pricingSection}>
          <span className={styles.price1}>{item.price1}</span>
          <span className={styles.price2}>{item.price2}</span>
          <span className={styles.percent}>{item.percent}</span>
        </div>
      </div>
    </div>
  );
};
