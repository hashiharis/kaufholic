import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { ProductDetails } from "./ProductDetails";
import { Review } from "./Review";
import styles from "./producttab.module.css";

export const ProductTab = () => {
  return (
    <div className={styles.productTabWrapper}>
      <Tabs
        defaultActiveKey="product-details"
        id="product-detail-page-tab"
        className="mb-3"
        justify
      >
        <Tab eventKey="product-details" title="Product Details">
          <ProductDetails />
        </Tab>
        <Tab eventKey="reviews" title="Reviews">
          <Review />
        </Tab>
      </Tabs>
    </div>
  );
};
