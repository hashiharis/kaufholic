import { Footer } from "../../footer/Footer";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import { Complaints } from "./Complaints";
import { Contact } from "./Contact";
import styles from "./contactcomplaint.module.css";

export const ContactComplaintWrapper = () => {
  return (
    <>
      <BuyerNav />
      <div className={styles.wrapper}>
        <Complaints />
        <Contact />
      </div>
      <Footer />
    </>
  );
};
