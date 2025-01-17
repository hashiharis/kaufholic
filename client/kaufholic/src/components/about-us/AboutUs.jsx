import { Footer } from "../footer/Footer";
import { BuyerNav } from "../navbar/usernavbar/buyernavbar/BuyerNav";
import { BsShop } from "react-icons/bs";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { LiaShippingFastSolid } from "react-icons/lia";
import styles from "./aboutus.module.css";
export const AboutUs = () => {
  const metrics = [
    {
      count: "10+",
      tag: "International Brands",
    },
    {
      count: "3M+",
      tag: "Loyal Customers",
    },
    {
      count: "4M+",
      tag: "Happy Clients",
    },
  ];

  const featureCards = [
    {
      icon: <BsShop size={"30px"} color={"#3E60C9"} />,
      title: "International Shopping Brands",
      para: "Explore our comprehensive online store where you'll find a diverse range of products",
    },
    {
      icon: <TbShoppingCartDiscount size={"30px"} color={"#3E60C9"} />,
      title: "Extraordinary discount",
      para: "Experience unparalled savinga on a wide range of premium products",
    },
    {
      icon: <LiaShippingFastSolid size={"30px"} color={"#3E60C9"} />,
      title: "Free Cargo",
      para: "Enjoy the convenience of free cargo services, ensuring your purchases are delivere to your doorstep",
    },
  ];
  return (
    <>
      <BuyerNav />
      <div className={styles.aboutUsWrapper}>
        <div className={styles.firstSection}>
          <div>
            <p>Let&#39;s get to know kaufholic</p>
            <h1>
              Providing the best experience to make your{" "}
              <span className={styles.blue}>Online Shopping</span>
            </h1>
            <p>
              At kaufholic, we are more than just an online store – we are your
              ultimate destination for an unparalleled shopping experience. Our
              journey began with a simple yet powerful idea: to create a
              platform that not only offers a wide array of products but also
              fosters a sense of community and connection among our customers.
            </p>
          </div>
          <div className={styles.about1Img}></div>

          <div className={styles.values}>
            {metrics.map((value, index) => (
              <div className={`styles.val${index}`} key={index}>
                <p className={styles.count}>{value.count}</p>
                <p className={styles.tag}>{value.tag}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.secondSection}>
        <div className={styles.aboutusImg}></div>
        <div className={`${styles.aboutUsWrapper} ${styles.secondInnerSec}`}>
          <p>Know our service</p>
          <h1>
            We offer the best service that will{" "}
            <span className={styles.blue}>make it easier</span>
          </h1>
          <p>
            Discover unparalleled convenience with our top-tier service,
            designed to make your shopping experience smoother than
            ever.Experience shopping made effortless through our exceptional
            service that puts your needs at the forefront. Elevate your shopping
            journey with our unmatched service, redefining convenience and
            satisfaction.
          </p>
          <div className={styles.cardSection}>
            {featureCards.map((card, index) => (
              <div className={styles.cards} key={index}>
                <p>{card.icon}</p>
                <p className={styles.cardTitle}>{card.title}</p>
                <p>{card.para}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
