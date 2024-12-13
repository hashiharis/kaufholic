/* eslint-disable react/prop-types */
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import styles from "./sellerproductview.module.css";
import emptyIllustration from "../../../assets/images/empty_illustration.png";
import { BASE_URL } from "../../../apis/baseUrl";

export const SellerProductView = ({ changeActivePage, setCurrentProduct }) => {
  const [products, setProducts] = useState();
  const [isProductEmpty, setIsProductEmpty] = useState(false);

  useEffect(() => {
    const sellerId = localStorage.getItem("kh-sellerId");
    fetchAllProducts(sellerId);
  }, []);

  const fetchAllProducts = async (sellerId) => {
    try {
      const res = await axiosInstance.get(`product/fetchProduct/${sellerId}`);
      console.log("product data", res);
      if (res.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
        setIsProductEmpty(true);
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching product", error);
    }
  };
  console.log(products);
  return (
    <>
      {isProductEmpty ? (
        <>
          <h4 className={styles.noProducts}>You have no products yet!!!</h4>
          <img
            src={emptyIllustration}
            alt="empty illustration"
            className={styles.emptyImage}
          />
        </>
      ) : (
        <div className={styles.sellerProductView}>
          {products?.map((item, index) => (
            <Card
              className={styles.productViewCard}
              key={index}
              style={{ width: "18rem" }}
            >
              <Card.Body>
                <Card.Img
                  variant="top"
                  src={`${BASE_URL}/${item.productImage}`}
                  className={styles.prodImage}
                />
                {/* {`${BASE_URL}/${imgPath}`} */}
                <Card.Title>{item.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.category}
                </Card.Subtitle>
                <Card.Text>Offer Price:{item.currentPrice}</Card.Text>
                <Card.Text>Original Price:{item.actualPrice}</Card.Text>
                <Card.Text>Discount: {item.discountPercent}</Card.Text>
                <Card.Text>{item.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => {
                    // navigate(`/seller/editproductdetails/${item._id}`);
                    changeActivePage("Edit_Products");
                    setCurrentProduct(item._id);
                  }}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
};
