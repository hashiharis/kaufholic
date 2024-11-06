import styles from "./productdetails.module.css";
export const ProductDetails = () => {
  return (
    <div className={styles.productDetail}>
      <div className={styles.productDesc}>
        <p className={styles.productDescTitle}>Product Description</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ea.
        </p>
      </div>
      <div className={styles.productSpec}>
        <p className={styles.productDescTitle}>Product Specifications</p>
        <ul>
          <li>lorem</li>
          <li>ipsum</li>
          <li>dolor</li>
          <li>sit</li>
        </ul>
      </div>
      <div className={styles.productCare}>
        <p className={styles.productDescTitle}>Care Instructions</p>
        <ul>
          <li>lorem</li>
          <li>ipsum</li>
          <li>dolor</li>
        </ul>
      </div>
    </div>
  );
};
