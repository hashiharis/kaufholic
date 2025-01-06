/* eslint-disable react/prop-types */
import styles from "./trendingcard.module.css";

export const TrendingCard = ({ trendingCardDetails }) => {
  const { imgUrl, title, subtitle, price } = trendingCardDetails;

  return (
    <div className={styles.trendingCardWrapper}>
      <div className={styles.tproductImage}>
        <img src={imgUrl} alt="shop-now-images" />
      </div>
      <div className={styles.tproductProperties}>
        <p className={styles.title}>{title}</p>
        <p className={styles.subtitle}>{subtitle}</p>
        <button className={styles.shopNowBtn}>{`${price}  Shop Now`}</button>
      </div>
    </div>
  );
};
