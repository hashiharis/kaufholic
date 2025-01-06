import { LandingCarousal } from "../carousal/LandingCarousal";
import { DealCardWrapper } from "../cards/deal-cards/DealCardWrapper";
import { TrendingCardWrapper } from "../cards/trending-cards/TrendingCardWrapper";
import { CategoryCardWrapper } from "../cards/category-cards/CategoryCardWrapper";
import { Link } from "react-router-dom";
import styles from "./landingpagewrapper.module.css";
import { BuyerNav } from "../navbar/usernavbar/buyernavbar/BuyerNav";
import { Footer } from "../footer/Footer";
import { useEffect, useState } from "react";
import { LandingNavbar } from "../navbar/landingnavbar/LandingNavbar";

export const LandingPageWrapper = () => {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const buyerId = localStorage.getItem("kh-buyerId") || null;

    if (buyerId) {
      setIsLogged(() => !isLogged);
    }
  }, []);

  return (
    <div className={styles.landingPageWrapper}>
      {isLogged ? <BuyerNav /> : <LandingNavbar />}

      <LandingCarousal />
      <div className={styles.cardSection}>
        <div className={styles.headers}>
          <h6>Flash Sales</h6>
          <Link to="/buyer/viewproducts">View all</Link>
        </div>
        <DealCardWrapper />
        <div className={styles.headers}>
          <h6>Trending Must-Haves</h6>
          <Link to="/buyer/viewproducts">View all</Link>
        </div>

        <TrendingCardWrapper />
        <div className={styles.headers}>
          <h6>Explore our Categories</h6>
          <Link to="/buyer/viewproducts">View all</Link>
        </div>
        <CategoryCardWrapper />
      </div>
      <Footer />
    </div>
  );
};
