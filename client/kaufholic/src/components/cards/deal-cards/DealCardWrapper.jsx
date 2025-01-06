import { DealCard } from "./DealCard";
import styles from "./dealcardwrapper.module.css";
import star from "../../../assets/svg/ratingStar.svg";
import productBag from "../../../assets/svg/products/tonnyblack.svg";
import productShoe from "../../../assets/svg/products/reebok.svg";
import productBag1 from "../../../assets/svg/products/patsoBag.svg";
import productShoe1 from "../../../assets/svg/products/sketcher.svg";
import { useEffect, useState } from "react";

export const DealCardWrapper = () => {
  const [dealCards, setDealCards] = useState([
    {
      id: 1,
      dealProductUrl: productBag,
      title: "Tonny Black",
      subTitle: "Shoulder bag-White-Plain",
      ratingStarUrl: star,
      ratingCount: "(1)",
      discountPrice: "₹800",
      originalPrice: "₹1000",
      discountPercentage: "20%",
      hours: 12,
      mins: 5,
      secs: 5,
    },
    {
      id: 2,
      dealProductUrl: productShoe,
      title: "Reebok",
      subTitle: "Women's Powder sneakers",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "₹3,599.99",
      originalPrice: "₹3,999.99",
      discountPercentage: "10%",
      hours: 5,
      mins: 1,
      secs: 0,
    },
    {
      id: 3,
      dealProductUrl: productBag1,
      title: "Patso",
      subTitle: "Shoulder bag-Pink-Plain",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "₹5000",
      originalPrice: "₹10,000",
      discountPercentage: "50%",
      hours: 24,
      mins: 5,
      secs: 0,
    },

    {
      id: 4,
      dealProductUrl: productShoe1,
      title: "Sketchers",
      subTitle: "Sport-shoe 2102",
      ratingStarUrl: star,
      ratingCount: "(54)",
      discountPrice: "₹4000",
      originalPrice: "₹5000",
      discountPercentage: "20%",
      hours: 1,
      mins: 59,
      secs: 0,
    },
  ]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setDealCards((prevDealCards) =>
        prevDealCards.map((product) => {
          let { hours, mins, secs } = product;

          if (secs > 0) {
            secs = secs - 1;
          } else if (mins > 0 && secs == 0) {
            mins = mins - 1;
            secs = 59;
          } else if (hours > 0 && mins == 0 && secs == 0) {
            hours = hours - 1;
            mins = 59;
            secs = 59;
          }
          return {
            ...product,
            hours,
            mins,
            secs,
          };
        })
      );
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className={styles.cardCarousal}>
      {dealCards.map((card) => (
        <DealCard key={card.id} cardDetails={card} />
      ))}
    </div>
  );
};
