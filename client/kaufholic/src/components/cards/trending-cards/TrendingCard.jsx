/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./trendingcard.module.css";

export const TrendingCard = ({ trendingCardDetails }) => {
  const { imgUrl, title, subtitle, price } = trendingCardDetails;

  const navigate = useNavigate();

  return (
    <div className={styles.trendingCardWrapper}>
      <div className={styles.tproductImage}>
        <img src={imgUrl} alt="shop-now-images" />
      </div>
      <div className={styles.tproductProperties}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
        <button
          className={styles.shopNowBtn}
          onClick={() => navigate("/buyer/viewproducts")}
        >{`${price}  Shop Now`}</button>
      </div>
    </div>
  );
};
