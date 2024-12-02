import styles from "./paymentcard.module.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  saveCardDetails,
  selectCustomerDetails,
} from "../customerdetails/customerDetailsSlice";
import { BASE_URL } from "../../../apis/baseUrl";

export const PaymentCardDetails = ({ setKey }) => {
  const [validated, setValidated] = useState();
  const [cardDetails, setCardDetails] = useState({
    cardHName: "John Doe",
    cardNo: "1234123412341234",
    expiryDate: "2026-06",
    cvv: "123",
  });
  const [show, setShow] = useState(false);
  const reduxDetails = useSelector(selectCustomerDetails);
  console.log("from redux", reduxDetails);
  const { customerDetails, paymentDetails, productDetails } = reduxDetails;
  console.log("redux cust", customerDetails);
  console.log("redux paymnt", paymentDetails);
  console.log("redux cartPrdt", productDetails);

  const { email, fName, lName, stateRegion, address, contact } =
    customerDetails;
  const { cardHName, cardNo, expiryDate, cvv } = cardDetails;
  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log("details", cardDetails);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);

    dispatch(saveCardDetails(cardDetails));
  };

  return (
    <div className={styles.crCardWrapper}>
      <h4 className={styles.title}>
        You're almost done, please fill the card details to complete the
        purchase
      </h4>
      <Form
        noValidate
        validated={validated}
        className={styles.crCardForm}
        onSubmit={handleSubmit}
      >
        <Form.Group
          md="4"
          controlId="validationCustom01"
          className={styles.crCardFields}
        >
          <Form.Label>Card Holder's Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="John Doe"
            name="cardHName"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter name of the card holder
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          md="4"
          controlId="validationCustom02"
          className={styles.crCardFields}
        >
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="1111 2222 3333 4444"
            name="cardNo"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter card number
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Form.Group
            md="4"
            controlId="validationCustom03"
            className={styles.crCardFields}
            as={Col}
          >
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              required
              type="month"
              placeholder="MM/YY"
              name="expiryDate"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter expiry date
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            md="4"
            controlId="validationCustom04"
            className={styles.crCardFields}
            as={Col}
          >
            <Form.Label>CVV</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="123"
              name="cvv"
              maxLength="3"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter cvv
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <br />
        <Button type="submit" onClick={handleShow}>
          Add Card Details
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          animation={false}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Review your order</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.modalContainer}>
            <p className={styles.modalTitle}>Products</p>
            {productDetails?.map((pdt, index) => (
              <div key={index} className={styles.checkoutProducts}>
                <img
                  src={`${BASE_URL}/${pdt.productImage}`}
                  alt={`product-${pdt.title}`}
                  className={styles.pdtImage}
                />
                <p>{pdt.productTitle && `Product Name: ${pdt.productTitle}`}</p>
                <p>{pdt.quantity && `Quantity: ${pdt.quantity}`}</p>
              </div>
            ))}
            <p className={styles.modalTitle}>Shipping Information</p>
            {customerDetails && (
              <div>
                <p>{email && `Email:${email}`}</p>
                <p>{fName && `First Name:${fName}`}</p>
                <p>{lName && `Last Name:${lName}`}</p>
                <p>{stateRegion && `State/Region:${stateRegion}`}</p>
                <p>{address && `Address:${address}`}</p>
                <p>{contact && `Contact:${contact}`}</p>
              </div>
            )}
            <p className={styles.modalTitle}>Payment Details</p>
            {paymentDetails && (
              <div>
                <p>{cardHName && `Card Holder Name:${cardHName}`}</p>
                <p>{cardNo && `Card Number: ${cardNo}`}</p>
                <p>{expiryDate && `Expiry Date:${expiryDate}`}</p>
                <p>{cvv && `CVV:${cvv}`}</p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setKey("cart");
                handleClose();
              }}
            >
              Cancel
            </Button>
            <Button variant="success" onClick={handleClose}>
              Shop Now
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};
