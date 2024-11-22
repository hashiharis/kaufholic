import { useState } from "react";
import styles from "./quantitycounter.module.css";

export const QuantityCounter = () => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue((prevValue) => prevValue - 1);
    } else {
      setValue(0);
    }
  };
  return (
    <div className={styles.counterSection}>
      <button className={styles.counterBtn} onClick={handleIncrement}>
        +
      </button>
      <p className={styles.counter}>{value}</p>
      <button className={styles.counterBtn} onClick={handleDecrement}>
        -
      </button>
    </div>
  );
};
