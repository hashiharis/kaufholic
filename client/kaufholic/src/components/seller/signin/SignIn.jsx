/* eslint-disable react/no-unescaped-entities */
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import styles from "./signin.module.css";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import showPassIcon from "../../../assets/svg/showpassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const SignIn = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [validated, setValidated] = useState(false);
  const [sellerLoginDetails, setSellerLoginDetails] = useState({
    email: "",
    password: "",
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
    setSellerLoginDetails({
      ...sellerLoginDetails,
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
    if (validationSignin()) {
      fetchDataFromServer();
    }
  };

  const validationSignin = () => {
    const { email, password } = sellerLoginDetails;
    if (!email || !password) {
      alert("Email and password is required");
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
    return true;
  };

  const fetchDataFromServer = async () => {
    try {
      const res = await axiosInstance.post("seller/signin", sellerLoginDetails);
      console.log("response", res);
      if (res.status === 200) {
        const sellerId = res?.data?.seller?._id;
        const token = res?.data?.token;
        localStorage.setItem("kh-sellerId", sellerId);
        localStorage.setItem("kh-sellerToken", token);
        toast.success("Logged in");
        navigate("/seller/dashboard");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Your email id or password is incorrect");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on seller sign in", error);
    }
  };

  return (
    <div className={styles.signInWrapper}>
      <div className={styles.imgSection}></div>
      <div className={styles.signinSection}>
        <Form
          noValidate
          validated={validated}
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <header className={styles.signinHeader}>Sign In </header>

          <Form.Group controlId="validationCustom01">
            <Form.Label className={styles.label}>
              Email <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Enter email"
                name="email"
                className={styles.formInput}
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Please enter email
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="validationCustom02">
            <Form.Label className={styles.label}>
              Password <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type={showPassword}
                placeholder="Enter password"
                name="password"
                className={styles.formInput}
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
          <div className={styles.forgotPassword}>
            <Link to="/forgotpassword">Forgot Password</Link>
          </div>
          <Button
            type="submit"
            className={`${styles.signInBtn} ${styles.colorSignIn}`}
          >
            Sign In
          </Button>
          <div className={styles.divider}>OR</div>
          <Button className={`${styles.signInBtn} ${styles.googleSignIn}`}>
            <img
              src={googleIcon}
              alt="icon-svg"
              className={styles.googleIcon}
            />
            Sign in by Google
          </Button>
        </Form>
        <div className={styles.signUpLink}>
          Don't have an account? <Link to="#">Sign up</Link>
        </div>
      </div>
    </div>
  );
};
