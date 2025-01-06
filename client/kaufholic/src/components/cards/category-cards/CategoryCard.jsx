/* eslint-disable react/prop-types */

import styles from "./category.module.css";
import { useNavigate } from "react-router-dom";
export const CategoryCard = ({ categories }) => {
  const { categoryImage, categoryTitle } = categories;
  console.log(categories);

  const navigate = useNavigate();

  const backgroundImageStyles = {
    backgroundImage: `url(${categoryImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    maxWidth: "100%",
    minHeight: "300px",
  };
  return (
    <div className={styles.categoryWrapper}>
      <div style={backgroundImageStyles} className={styles.categoryImg}>
        <button
          className={styles.categoryBtn}
          onClick={() => navigate("/buyer/viewproducts")}
        >
          {categoryTitle}
        </button>
      </div>
    </div>
  );
};
