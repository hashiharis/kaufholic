import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./customerdetails.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveCustomerDetails } from "./customerDetailsSlice";
import toast from "react-hot-toast";

export const CustomerDetails = ({ setKey }) => {
  const [validated, setValidated] = useState(false);
  const [checkoutDetails, setCheckoutDetails] = useState({
    email: "abc@gmail.com",
    fName: "Test",
    lName: "Buyer",
    stateRegion: "Kerala",
    address: "121 ABC Street",
    contact: "9876543210",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCheckoutDetails({
      ...checkoutDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    console.log("checkoutDetails", checkoutDetails);
    if (validateEmptyFields()) {
      dispatch(saveCustomerDetails(checkoutDetails));
      setKey("payment");
    }
  };

  const validateEmptyFields = () => {
    const { email, fName, lName, stateRegion, address, contact } =
      checkoutDetails;

    if (!email || !fName || !lName || !stateRegion || !address || !contact) {
      toast.error("Please fill all required fields!!!");
      return false;
    }
    return true;
  };
  return (
    <div className={styles.customerWrapper}>
      <h4 className={styles.titles}>Customer Information</h4>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group
          md="4"
          controlId="validationCustom01"
          className={styles.formFields}
        >
          <Form.Label>E-mail</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter your email
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="First Name"
              name="fName"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter first name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last Name"
              name="lName"
              onChange={handleChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter last name
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <h4 className={styles.titles}>Shipping Address</h4>
        <Form.Group
          md="4"
          controlId="validationCustom04"
          className={styles.formFields}
        >
          <Form.Label>State/Region</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="State/Region"
            name="stateRegion"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter state/region
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          md="4"
          controlId="validationCustom05"
          className={styles.formFields}
        >
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter address
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          md="4"
          controlId="validationCustom06"
          className={styles.formFields}
        >
          <Form.Label>Contact No</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Contact number"
            name="contact"
            onChange={handleChange}
          />
          <Form.Control.Feedback type="invalid">
            Please enter contact number
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Add Details</Button>
      </Form>
    </div>
  );
};
