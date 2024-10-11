import styles from "./dealcard.module.css";

// eslint-disable-next-line react/prop-types
export const DealCard = ({ cardDetails }) => {
    console.log(cardDetails)
  return (
    <div className={styles.dealCardWrapper}>
      timer component
      <div className={styles.dealProduct}>
        <img src={cardDetails.dealProductUrl} alt="deal-product" />
      </div>
      <div className={styles.productDetails}>
        <p className={styles.productTitle}>{cardDetails.title}</p>
        <p className={styles.productSubtitle}>{cardDetails.subTitle}</p>
        <div className={styles.ratingStars}>
          <div>
            <img src={cardDetails.ratingStarUrl} alt="rating-star" />
            <img src={cardDetails.ratingStarUrl} alt="rating-star" />
            <img src={cardDetails.ratingStarUrl} alt="rating-star" />
            <img src={cardDetails.ratingStarUrl} alt="rating-star" />
          </div>
          <p className={styles.ratingCount}>{cardDetails.ratingCount}</p>
        </div>
        <div className={styles.priceOptions}>
          <p className={styles.discountPrice}>{cardDetails.discountPrice}</p>
          <p className={styles.originalPrice}>{cardDetails.originalPrice}</p>
          <p className={styles.discountPercentage}>
            {cardDetails.discountPercentage}
          </p>
        </div>
      </div>
    </div>
  );
};
