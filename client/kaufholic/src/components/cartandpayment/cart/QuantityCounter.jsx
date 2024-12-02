/* eslint-disable react/prop-types */
import styles from "./quantitycounter.module.css";

export const QuantityCounter = ({
  cartProductDetails,
  handleIncrement,
  handleDecrement,
  pId,
}) => {
  return (
    <div className={styles.counterSection}>
      <button className={styles.counterBtn} onClick={handleIncrement}>
        +
      </button>
      {/* {cartProductDetails?.map((item, index) => ( */}
      <p className={styles.counter}>
        {cartProductDetails?.map(
          (item) => item?.productId === pId && item.quantity
        )}
        {/* item?.productId === pId && item.quantity} */}
      </p>
      {/* // ))} */}
      <button className={styles.counterBtn} onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};
// {value === 11 ? value - 1 : value}
