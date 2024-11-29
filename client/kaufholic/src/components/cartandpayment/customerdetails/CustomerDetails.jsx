import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "./customerdetails.module.css";
import { useState } from "react";

export const CustomerDetails = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
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
          <Form.Control required type="email" placeholder="Email" />
          <Form.Control.Feedback type="invalid">
            Please enter your email
          </Form.Control.Feedback>
        </Form.Group>
        <Row>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>First Name</Form.Label>
            <Form.Control required type="text" placeholder="First Name" />
            <Form.Control.Feedback type="invalid">
              Please enter first name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Last Name</Form.Label>
            <Form.Control required type="text" placeholder="Last Name" />
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
          <Form.Control required type="text" placeholder="State/Region" />
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
          <Form.Control required type="text" placeholder="Address" />
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
          <Form.Control required type="number" placeholder="Contact number" />
          <Form.Control.Feedback type="invalid">
            Please enter contact number
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">Add Details</Button>
      </Form>
    </div>
  );
};
