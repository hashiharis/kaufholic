import { LandingCarousal } from "../carousal/LandingCarousal";
import { DealCardWrapper } from "../cards/deal-cards/DealCardWrapper";
import { TrendingCardWrapper } from "../cards/trending-cards/TrendingCardWrapper";
import { CategoryCardWrapper } from "../cards/category-cards/CategoryCardWrapper";
import { Link } from "react-router-dom";
import styles from "./landingpagewrapper.module.css";

export const LandingPageWrapper = () => {
  return (
    <div className={styles.landingPageWrapper}>
      <LandingCarousal />
      <div className={styles.cardSection}>
        <div  className={styles.headers}>
          <h6>Flash Sales</h6>
          <Link>View all</Link>
        </div>
        <DealCardWrapper />
        <div className={styles.headers}>
          <h6>Trending Must-Haves</h6>
          <Link>View all</Link>
        </div>

        <TrendingCardWrapper />
        <div className={styles.headers}>
          <h6>Explore our Categories</h6>
          <Link>View all</Link>
        </div>
        <CategoryCardWrapper />
      </div>
    </div>
  );
};
