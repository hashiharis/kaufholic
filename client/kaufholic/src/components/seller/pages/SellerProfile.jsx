import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import styles from "./sellerprofile.module.css";
import { FiUser } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { IoIosPhonePortrait } from "react-icons/io";
import { FaRegAddressCard } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TbMapPinCode } from "react-icons/tb";
import { MdOutlineDescription } from "react-icons/md";

export const SellerProfile = () => {
  const [sellerDetails, setSellerDetails] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    pincode: "",
    description: "",
  });
  // const [updProfile, setUpdProfile] = useState({});
  const [isEdit, setIsEdit] = useState("not_edit");
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const sellerId = localStorage.getItem("kh-sellerId") || null;
    if (sellerId) {
      getSellerProfile(sellerId);
    }
  }, []);

  const handleChange = (e) => {
    setSellerDetails({
      ...sellerDetails,
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
    if (validateFields()) {
      updateSellerProfile(sellerDetails._id);
      setIsEdit("not_edit");
    }
  };

  const validateFields = () => {
    const { name, email, contact, address, pincode, description } =
      sellerDetails;

    if (!name || !email || !contact || !address || !pincode || !description) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email is invalid");
      return false;
    }
    if (contact > 9999999999 || contact < 1000000000) {
      alert("Contact number should be 10 digits");
      return false;
    }
    if (pincode > 999999 || pincode < 100000) {
      alert("Pincode should be 6 digits");
      return false;
    }

    return true;
  };

  const getSellerProfile = async (id) => {
    try {
      const res = await axiosInstance.get(`/seller/sellerprofile/${id}`);

      if (res.status === 200) setSellerDetails(res?.data?.data);
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching seller details", error);
    }
  };

  const updateSellerProfile = async (id) => {
    try {
      const res = await axiosInstance.patch(
        `seller/update/${id}`,
        sellerDetails
      );

      if (res.status === 200) {
        toast.success("Seller profile updated successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating seller details", error);
    } finally {
      getSellerProfile(id);
    }
  };

  const { name, email, contact, address, pincode, description } = sellerDetails;
  return (
    <div>
      <h1 className={styles.profileHeading}>My Profile</h1>
      {isEdit === "not_edit" ? (
        <div className={styles.profileSection}>
          <div className={styles.sellerIllustration}></div>
          <div className={styles.sellerProfileDisplay}>
            <p>
              <FiUser size={"30px"} className={styles.icons} />
              Name: {name}
            </p>
            <p>
              <MdOutlineEmail size={"30px"} className={styles.icons} />
              Email Address: {email}
            </p>
            <p>
              <IoIosPhonePortrait size={"30px"} className={styles.icons} />
              Contact: {contact}
            </p>
            <p>
              <FaRegAddressCard size={"30px"} className={styles.icons} />
              Address: {address}
            </p>
            <p>
              <TbMapPinCode size={"30px"} className={styles.icons} />
              Pin: {pincode}
            </p>
            <p>
              <MdOutlineDescription size={"30px"} className={styles.icons} />
              Description:{description}
            </p>
            <Button
              onClick={() => {
                setIsEdit("edit");
              }}
            >
              <FaUserEdit size={"20px"} />
              Edit Profile
            </Button>
          </div>
        </div>
      ) : (
        <Form
          noValidate
          className={styles.editForm}
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter name!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="Enter Email"
                name="email"
                value={email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom03">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Contact"
                name="contact"
                value={contact}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter the number!
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom04">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                name="address"
                value={address}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid address!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom05">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Pincode"
                name="pincode"
                value={pincode}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide a valid pincode
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom06">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Category of item being sold"
                name="description"
                value={description}
                onChange={handleChange}
                required
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide a valid description
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" variant="success" className={styles.save}>
            Save Changes
          </Button>
          <Button
            onClick={() => {
              setIsEdit("not_edit");
            }}
          >
            Back
          </Button>
        </Form>
      )}
    </div>
  );
};
