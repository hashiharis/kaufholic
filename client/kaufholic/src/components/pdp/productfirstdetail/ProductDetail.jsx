import styles from "./productdetail.module.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { BiSolidCartAdd } from "react-icons/bi";
import { ProductTab } from "../productTab/productTab";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import { FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "../../footer/Footer";
import { BASE_URL } from "../../../apis/baseUrl";
import { FaArrowRight } from "react-icons/fa";

export const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [addedToCart, setAddedToCart] = useState("not added to cart");
  const buyerId = localStorage.getItem("kh-buyerId") || null;

  const navigate = useNavigate();

  console.log(productId);
  const getProduct = async (productId) => {
    try {
      const res = await axiosInstance.get(
        `/product/productDetail/${productId}`
      );

      if (res.status === 200) {
        console.log("product", res);
        setProduct(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching the product", error);
    }
  };
  console.log("state", product);

  const addProductToCart = async (byrId, prdctId) => {
    try {
      const res = await axiosInstance.post(
        `/cart/addToCart/${byrId}/${prdctId}`
      );

      if (res.status === 200) {
        toast.success("Product added to cart successfully");
        setAddedToCart("added to cart");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding product to cart", error);
    }
  };

  useEffect(() => {
    if (productId) {
      getProduct(productId);
    }
  }, []);

  const {
    title,
    subtitle,
    avgRating,
    currentPrice,
    actualPrice,
    discountPercent,
    review,
    productImage,
  } = product;
  return (
    <>
      <BuyerNav />
      <div className={styles.productFirstSection}>
        <img
          className={styles.productImg}
          src={`${BASE_URL}/${productImage}`}
        />
        <div className={styles.productIntro}>
          <div className={styles.productTitleSection}>
            <p className={styles.title}>{title}</p>

            <FaRegHeart size="20px" />
          </div>
          <p>{subtitle}</p>
          <p>
            {avgRating} ({review?.length} ratings)
          </p>
          <p className={styles.pricing}>
            <span> ₹{currentPrice}</span>
            <span> ₹{actualPrice}</span>
            <span>{discountPercent}%</span>
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
            {addedToCart === "added to cart" ? (
              <button
                className={`${styles.goToCartBtn} ${styles.pdpBtn}`}
                onClick={() => {
                  navigate(`/cart/${buyerId}`);
                }}
              >
                Go to Cart
                <FaArrowRight size={"20px"} />
              </button>
            ) : (
              <button
                className={`${styles.addToCartBtn} ${styles.pdpBtn}`}
                onClick={() => {
                  addProductToCart(buyerId, productId);
                }}
              >
                <BiSolidCartAdd size={"20px"} />
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
      <ProductTab productId={productId} />
      <Footer />
    </>
  );
};
