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
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";

export const PaymentCardDetails = ({ setKey }) => {
  const [validated, setValidated] = useState();
  const [cardDetails, setCardDetails] = useState({
    cardHName: "",
    cardNo: "",
    expiryDate: "",
    cvv: "",
  });
  const [show, setShow] = useState(false);

  // Fetching order details from redux
  const reduxDetails = useSelector(selectCustomerDetails);

  console.log("from redux", reduxDetails);
  const { customerDetails, paymentDetails, productDetails, orderPriceDetails } =
    reduxDetails;
  console.log("redux cust", customerDetails);
  console.log("redux paymnt", paymentDetails);
  console.log("redux cartPrdt", productDetails);

  const { email, fName, lName, stateRegion, address, contact } =
    customerDetails;
  const { cardHName, cardNo, expiryDate, cvv } = cardDetails;
  const { price, shippingCharge, discountPrice, totalPrice } =
    orderPriceDetails;

  let buyerId = localStorage.getItem("kh-buyerId") || null;

  const serializedData = () => {
    let checkoutInfo = {
      productDetails,
      email,
      fName,
      lName,
      stateRegion,
      address,
      contact,
      cardHName,
      cardNo,
      expiryDate,
      cvv,
      price,
      shippingCharge,
      discountPrice,
      totalPrice,
    };

    return checkoutInfo;
  };

  // Modal event handlers
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
    if (validateFields()) {
      dispatch(saveCardDetails(cardDetails));
      handleShow();
    }
  };

  const handlePayment = () => {
    let checkoutData = serializedData();
    if (buyerId && checkoutData) {
      sendDataToServer(checkoutData, buyerId);
    }
  };

  const validateFields = () => {
    const { cardHName, cardNo, expiryDate, cvv } = cardDetails;
    if (!cardHName || !cardNo || !expiryDate || !cvv) {
      alert("Please fill all required fields");
      return false;
    }
    if (cardNo.length < 16 || cardNo.length > 16) {
      alert("Card no must be 16 digits");
      return false;
    }

    const [year, month] = expiryDate.split("-").map(Number);

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      alert(
        "The date you provided seems to be expired! Please provide a valid expiry date"
      );
      return false;
    }
    if (cvv.length < 3 || cvv.length > 3) {
      alert("CVV must be only 3 digits");
      return false;
    }
    return true;
  };

  const sendDataToServer = async (checkoutInfo, byrId) => {
    try {
      const res = await axiosInstance.post(
        `/orders/new/${byrId}`,
        checkoutInfo
      );

      if (res.status === 201) {
        toast.success("Order placed successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on adding order", error);
    }
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
        <Button type="submit">Add Card Details</Button>
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
            <p className={styles.modalTitle}>Order Price Details</p>
            {orderPriceDetails && (
              <div>
                <p>{price && `Price:₹${price}`}</p>
                <p>{`Shipping Charge:₹${
                  shippingCharge ? shippingCharge : 0
                }`}</p>
                <p>{discountPrice && `You saved:₹ ${discountPrice}`}</p>
                <p>{totalPrice && `Total Price:₹${totalPrice}`}</p>
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
            <Button
              variant="success"
              onClick={() => {
                handlePayment();
                handleClose();
              }}
            >
              Shop Now ₹{totalPrice ? totalPrice : 0}
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </div>
  );
};
