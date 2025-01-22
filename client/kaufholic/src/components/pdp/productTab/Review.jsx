/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactStars from "react-rating-stars-component";
import styles from "./review.module.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { format } from "date-fns";

export const Review = ({ productId }) => {
  const [review, setReview] = useState({
    rating: 0,
    buyerName: "",
    reviewMessage: "",
  });
  const [reviewData, setReviewData] = useState([]);

  const buyerId = localStorage.getItem("kh-buyerId") || null;
  useEffect(() => {
    if (productId) {
      fetchReviews(productId);
    }
  }, []);

  const handleChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };
  const ratingChanged = (newRating) => {
    console.log(newRating);
    setReview({
      ...review,
      rating: newRating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("review", review);
    if (buyerId && productId) {
      addReviewToServer(buyerId, productId);
    }
  };

  const addReviewToServer = async (byrId, prdtId) => {
    try {
      const res = await axiosInstance.patch(
        `/product/addRating/${byrId}/${prdtId}`,
        review
      );

      if (res.status === 200) {
        console.log("reviewres", res);
        toast.success("Review added successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding review", error);
    }
  };

  const fetchReviews = async (prdtId) => {
    try {
      const res = await axiosInstance.get(`/product/reviews/${prdtId}`);

      if (res.status === 200) {
        setReviewData(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        console.log("No reviews for this product!!!");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching review", error);
    }
  };

  console.log("reviewfetched", reviewData);
  return (
    <div className={styles.reviewWrapper}>
      <div>
        <p className={styles.reviewSectionTitle}>Customer Reviews</p>
        {reviewData.length === 0 ? (
          <p>No reviews yet, Be the first to review this product !!!</p>
        ) : (
          reviewData?.map((item, index) => (
            <div key={index}>
              <div className={styles.buyerInfo}>
                <div>
                  <FaRegCircleUser />
                </div>
                <p>{item.buyerName ? item.buyerName : `Anonymous Buyer`}</p>
                <div className={styles.rating}>
                  {item?.rating === 1 && <FaStar color={"#FFC000"} />}
                  {item?.rating === 2 && (
                    <>
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                    </>
                  )}
                  {item?.rating === 3 && (
                    <>
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                    </>
                  )}
                  {item?.rating === 4 && (
                    <>
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                    </>
                  )}
                  {item?.rating === 5 && (
                    <>
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                      <FaStar color={"#FFC000"} />
                    </>
                  )}
                </div>
              </div>
              <p className={styles.reviewTitle}>{item?.reviewMessage}</p>
              {/* <p className={styles.reviewDesc}>{review.}</p> */}
              <p className={styles.reviewDate}>
                {" "}
                Posted on {format(new Date(item.postedDate), "MMM dd, yyyy")}
              </p>
              <hr />
            </div>
          ))
        )}
      </div>
      <p className={styles.reviewAddSectionTitle}>Add your Review</p>
      <p className={styles.ratingSectionTitle}>Your rating</p>
      <div>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={30}
          activeColor={"#ffd700"}
        />
      </div>
      <Form onSubmit={handleSubmit} className={styles.reviewForm}>
        <Form.Group className="mb-3">
          <Form.Label className={styles.reviewLabel}>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="buyerName"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.reviewLabel}>Your Review</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter your review"
            name="reviewMessage"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
