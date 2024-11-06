import styles from "./productdetail.module.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { BiSolidCartAdd } from "react-icons/bi";
import { ProductTab } from "../productTab/productTab";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import { FaRegHeart } from "react-icons/fa";

export const ProductDetail = () => {
  return (
    <>
      <BuyerNav />
      <div className={styles.productFirstSection}>
        <div className={styles.productImg}>Placeholder</div>
        <div className={styles.productIntro}>
          <div className={styles.productTitleSection}>
            <p>Short Printed Dress</p>

            <FaRegHeart size="20px" />
          </div>
          <p>Subtitle</p>
          <p>Avg.Rating Count(Total no of ratings)</p>
          <p>
            <span>Current Price</span>
            <span>Actual Price</span>
            <span>Discount%</span>
          </p>
          <Dropdown as={ButtonGroup}>
            <Button variant="secondary">Qty</Button>

            <Dropdown.Toggle
              split
              variant="secondary"
              id="dropdown-split-basic"
            />

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">3</Dropdown.Item>
              <Dropdown.Item href="#/action-3">4</Dropdown.Item>
              <Dropdown.Item href="#/action-3">5</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <div className={styles.pdpBtnSection}>
            <button className={`${styles.buyBtn} ${styles.pdpBtn}`}>
              Buy Now
            </button>
            <button className={`${styles.addToCartBtn} ${styles.pdpBtn}`}>
              <BiSolidCartAdd size={"20px"} />
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ProductTab />
    </>
  );
};
