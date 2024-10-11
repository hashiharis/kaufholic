import { DealCard } from "./DealCard";
import styles from "./dealcardwrapper.module.css";
import star from "../../../assets/svg/ratingStar.svg";
import productBag from "../../../assets/svg/products/tonnyblack.svg";
import productShoe from "../../../assets/svg/products/reebok.svg";
import productBag1 from "../../../assets/svg/products/patsoBag.svg";
import productShoe1 from "../../../assets/svg/products/sketcher.svg";

export const DealCardWrapper = () => {
  const dealCards = [
    {
      id: 1,
      dealProductUrl: productBag,
      title: "Tonny Black",
      subTitle: "Shoulder bag-White-Plain",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "$69.99",
      originalPrice: "$129.99",
      discountPercentage: "-40%",
    },
    {
      id: 2,
      dealProductUrl: productShoe,
      title: "Reebok",
      subTitle: "Women's Powder sneakers",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "$112.02",
      originalPrice: "$129.99",
      discountPercentage: "-40%",
    },
    {
      id: 3,
      dealProductUrl: productBag1,
      title: "Patso",
      subTitle: "Shoulder bag-Pink-Plain",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "$69.99",
      originalPrice: "$129.99",
      discountPercentage: "-40%",
    },

    {
      id: 4,
      dealProductUrl: productShoe1,
      title: "Sketchers",
      subTitle: "Sport-shoe 2102",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "$80.00",
      originalPrice: "$129.99",
      discountPercentage: "-40%",
    },
  ];
  return (
    <div className={styles.cardCarousal}>
      {dealCards.map((card) => (
        <DealCard key={card.id} cardDetails={card} />
      ))}
    </div>
  );
};
