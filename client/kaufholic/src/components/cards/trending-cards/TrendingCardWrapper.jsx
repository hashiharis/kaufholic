import productImage from "../../../assets/images/ck1.png";
import formalImage1 from "../../../assets/images/formal1.png";
import formalImage2 from "../../../assets/images/formal2.png";
import { TrendingCard } from "./TrendingCard";
import styles from "./trendingcardwrapper.module.css";

export const TrendingCardWrapper = () => {
  const trendingCards = [
    {
      id: 1,
      imgUrl: productImage,
      title: "Cool & Sexy by Calvin Klein",
      subtitle: "Dotted dress-Casual",
      price: "₹2000",
    },
    {
      id: 2,
      imgUrl: formalImage1,
      title: "Formal Wears by Mango",
      subtitle: "Office wears-Formal",
      price: "₹1000",
    },
    {
      id: 3,
      imgUrl: formalImage2,
      title: "Beige Coat by Zara Exclusive",
      subtitle: "Cream-Brown-Formal",
      price: "₹1999",
    },
  ];
  return (
    <div className={styles.trendingCardCarousal}>
      {trendingCards.map((card, index) => (
        <TrendingCard key={index} trendingCardDetails={card} />
      ))}
    </div>
  );
};
