/* eslint-disable react/prop-types */

import styles from "./productdetails.module.css";
export const ProductDetails = ({ data }) => {
  let prodSpec = data?.specification?.split(",") || [];
  // console.log(prodSpec);

  let careInstructions = data?.care?.split(",") || [];
  // console.log(careInstructions);

  return (
    <div className={styles.productDetail}>
      <div className={styles.productDesc}>
        <p className={styles.productDescTitle}>Product Description</p>
        <p>{data.description}</p>
      </div>
      <div className={styles.productSpec}>
        <p className={styles.productDescTitle}>Product Specifications</p>
        {prodSpec.map((spec, index) => (
          <ul key={index}>
            <li>{spec}</li>
          </ul>
        ))}
      </div>
      <div className={styles.productCare}>
        <p className={styles.productDescTitle}>Care Instructions</p>

        {careInstructions.map((inst, index) => (
          <ul key={index}>
            <li>{inst}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};
