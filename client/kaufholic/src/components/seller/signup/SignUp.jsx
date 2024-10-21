import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import showPassIcon from "../../../assets/svg/showpassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import styles from "./signup.module.css";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [validated, setValidated] = useState(false);
  const [sellerDetails, setSellerDetails] = useState({
    name: "",
    email: "",
    password: "",
    contact: 0,
    address: "",
    pincode: 0,
    description: "",
  });

  const navigate = useNavigate();
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(e.target.type);
    if (showPassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleChanges = (e) => {
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

    if (validationSignup()) {
      sendDataToServer();
    }
  };

  const validationSignup = () => {
    const { name, email, password, contact, address, pincode, description } =
      sellerDetails;

    if (
      !name ||
      !email ||
      !password ||
      !contact ||
      !address ||
      !pincode ||
      !description
    ) {
      alert("Please fill the required fields");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email is invalid");
      return false;
    }

    if (password.length < 8) {
      alert("Password must be atleast 8 characters long");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!passwordRegex.test(password)) {
      alert(
        "Password must contain atleast one small letter, one capital letter and one number"
      );
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

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("seller/signup", sellerDetails);

      if (res.status === 201) {
        toast.success("Registered successfully");
        navigate("seller/signin");
      }
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode === 400 || statusCode === 404) {
        toast.error("Please enter all fields in required format");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on seller signup frontend", error);
    }
  };

  console.log(sellerDetails);
  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.imgSection}></div>
      <div className={`${styles.signUpSection}`}>
        <Form
          noValidate
          validated={validated}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <header className={styles.signUpHeader}>Sign up</header>
          <Form.Group className="mb-3" controlId="validationCustom01">
            <Form.Label className={styles.label}>
              Name<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                className={styles.formInput}
                name="name"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter name
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom02">
            <Form.Label className={styles.label}>
              Email<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                className={styles.formInput}
                name="email"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom03">
            <Form.Label className={styles.label}>
              Password<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type={showPassword}
                placeholder="Enter Password"
                className={styles.formInput}
                name="password"
                onChange={(e) => {
                  handleShowPassword;
                  handleChanges(e);
                }}
              />
              <InputGroup.Text className={styles.symbol}>
                <button className={styles.iconBtn} onClick={handleShowPassword}>
                  <img
                    src={
                      showPassword == "text"
                        ? `${hidePassIcon}`
                        : `${showPassIcon}`
                    }
                    alt="icon-svg"
                    className={styles.iconImg}
                  />
                </button>
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Please enter password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom04">
            <Form.Label className={styles.label}>
              Contact Number<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="number"
                placeholder="Enter contact number"
                className={styles.formInput}
                name="contact"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter contact number
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom05">
            <Form.Label className={styles.label}>
              Address<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Enter address"
                className={styles.formInput}
                name="address"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter address
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom06">
            <Form.Label className={styles.label}>
              Pincode<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="number"
                placeholder="Enter pincode"
                className={styles.formInput}
                name="pincode"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter pincode
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3" controlId="validationCustom07">
            <Form.Label className={styles.label}>
              Description<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                as="textarea"
                type="text"
                placeholder="Enter description about the item to be sold"
                className={styles.formInput}
                name="description"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter description
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            className={`${styles.signUpBtn} ${styles.ordSignUp}`}
          >
            Sign up
          </Button>
          <div className={styles.divider}>OR</div>
          <Button
            variant="primary"
            type="submit"
            className={`${styles.signUpBtn} ${styles.googleSignUp}`}
          >
            <img
              src={googleIcon}
              alt="icon-svg"
              className={styles.googleIcon}
            />
            Sign up by Google
          </Button>
        </Form>
      </div>
    </div>
  );
};
