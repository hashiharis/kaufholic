import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import styles from "./footer.module.css";

export const Footer = () => {
  return (
    <Container fluid className={styles.footerWrapper}>
      <Row>
        <Col xs={12} md={4}>
          <div className={styles.klogo}></div>
          <div className={styles.info}>
            <p>
              <LuPhoneCall />
              +91 1234567890
            </p>
            <p>
              <MdEmail />
              kaufholic@example.com
            </p>
            <p>
              <IoLocation />
              121 Abc Street, India, 123456
            </p>
          </div>
        </Col>
        <Col xs={6} md={4}>
          <p className={styles.footerHeader}>Company</p>
          <div>
            <Link>About Us</Link>
          </div>
          <div>
            <Link to="/contactus">Contact Us</Link>
          </div>
          <div>
            <Link>Privacy Policy</Link>
          </div>
          <div>
            <Link>Terms & Conditions</Link>
          </div>
        </Col>
        <Col xs={6} md={4}>
          <p className={styles.footerHeader}>Information</p>
          <div>
            {" "}
            <Link to="/buyer/profile">My Account</Link>
          </div>
          <div>
            <Link to="/">Login</Link>
          </div>
          <div>
            <Link to="/cart/:buyerId/">My Cart</Link>
          </div>
          <div>
            <Link to="/buyer/wishlist">My Wishlist</Link>
          </div>
          <div>
            <Link to="/buyer/orders/">Orders</Link>
          </div>
        </Col>
      </Row>
      <hr />
      <Row className={styles.copyRight}>
        <p>&#169; 2024 Kaufholic All Rights are reserved</p>
      </Row>
    </Container>
  );
};
