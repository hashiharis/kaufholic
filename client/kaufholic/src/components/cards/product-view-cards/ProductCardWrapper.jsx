import { ProductCard } from "./ProductCard";
import styles from "./productwrapper.module.css";

export const ProductCardWrapper = () => {
  const productCards = [
    {
      title: "Olalook",
      subTitle: "Kimon &Caftan -Black-Regular fit",
      ratingCount: "(289)",
      price1: "$228",
      price2: "$215",
      percent: "-10%",
    },
    {
      title: "Olalook",
      subTitle: "Kimon &Caftan -Black-Regular fit",
      ratingCount: "(289)",
      price1: "$228",
      price2: "$215",
      percent: "-10%",
    },
    {
      title: "Olalook",
      subTitle: "Kimon &Caftan -Black-Regular fit",
      ratingCount: "(289)",
      price1: "$228",
      price2: "$215",
      percent: "-10%",
    },
  ];

  return (
    <div className={styles.productCardWrapper}>
      {productCards.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </div>
  );
};
