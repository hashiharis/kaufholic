import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ReactStars from "react-rating-stars-component";
import styles from "./review.module.css";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";

export const Review = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  return (
    <div className={styles.reviewWrapper}>
      <div>
        <p className={styles.reviewSectionTitle}>Customer Reviews</p>
        <div className={styles.buyerInfo}>
          <div>
            <FaRegCircleUser />
          </div>
          <p>Buyer Name</p>
          <div className={styles.rating}>
            <FaStar color={"#FFC000"} />
            <FaStar color={"#FFC000"} />
            <FaStar color={"#FFC000"} />
            <FaStar color={"#FFC000"} />
            <FaStar color={"#FFC000"} />
          </div>
        </div>
        <p className={styles.reviewTitle}>Excellent Product!!!</p>
        <p className={styles.reviewDesc}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi,
          rerum.
        </p>
        <p className={styles.reviewDate}>Posted on June 05,2024</p>
        <hr />
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
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className={styles.reviewLabel}>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label className={styles.reviewLabel}>Your Review</Form.Label>
          <Form.Control as="textarea" placeholder="Enter your review" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
