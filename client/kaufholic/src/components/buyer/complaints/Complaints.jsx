import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";
import { selectCurrentBuyerDetails } from "../../navbar/usernavbar/buyernavbar/buyerSlice";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import styles from "./complaints.module.css";
export const Complaints = () => {
  const [concernData, setConcernData] = useState({
    name: "",
    email: "",
    complaint: "",
  });
  const [validated, setValidated] = useState(false);
  const buyerDetails = useSelector(selectCurrentBuyerDetails);
  const { crntBuyer } = buyerDetails;

  useEffect(() => {
    setConcernData({
      ...concernData,
      name: crntBuyer.name,
      email: crntBuyer.email,
    });
  }, [buyerDetails]);

  const handleChange = (e) => {
    setConcernData({
      ...concernData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("concern", concernData);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (checkValidation()) {
      sendComplaintsToServer();
    }
  };

  const checkValidation = () => {
    const { name, email, complaint } = concernData;
    if (!name || !email || !complaint) {
      alert("All fields are required");
      return false;
    }
    return true;
  };

  const sendComplaintsToServer = async () => {
    try {
      const res = await axiosInstance.post(
        "/complaints/savecomplaints",
        concernData
      );

      if (res.status === 201) {
        toast.success("Complaint registered successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error is registering the complaint", error);
    }
  };

  return (
    <>
      <div className={styles.complaintWrapper}>
        <h4 className={styles.headline}>
          Have any concerns??? Feel free to report them to our team
        </h4>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="validationCustom01">
            <Form.Label>Buyer Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={crntBuyer.name}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter name
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label>Buyer Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={crntBuyer.email}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="validationCustom03">
            <Form.Label>Describe your concern</Form.Label>
            <Form.Control
              as="textarea"
              name="complaint"
              value={concernData.complaint}
              onChange={handleChange}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a concern
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" className={styles.submitBtn}>
            Report
          </Button>
        </Form>
      </div>
    </>
  );
};
