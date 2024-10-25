/* eslint-disable react/no-unescaped-entities */
import styles from "./buyersignin.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import showPassIcon from "../../../assets/svg/showpassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { LandingNavbar } from "../../navbar/landingnavbar/LandingNavbar";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../footer/Footer";
export const BuyerSignIn = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [validated, setValidated] = useState(false);
  const [buyerLoginDetails, setBuyerLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
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
    const { email, password } = buyerLoginDetails;

    if (!email || !password) {
      alert("Please enter you email id and password");
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
    setBuyerLoginDetails({
      ...buyerLoginDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log(buyerLoginDetails);

  const fetchDataFromServer = async () => {
    try {
      const res = await axiosInstance.post("buyer/signin", buyerLoginDetails);
      if (res.status === 200) {
        console.log("response", res);
        const buyerId = res?.data?.loginDetails?._id;
        const token = res?.data?.token;
        localStorage.setItem("kh-buyerId", buyerId);
        localStorage.setItem("kh-buyerToken", token);
        toast.success("You are logged in");
        navigate("/");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Your email id or password is incorrect");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error in sign in", error);
    }
  };
  return (
    <>
      <LandingNavbar />
      <div className={styles.bsignInWrapper}>
        <div className={styles.imgSection}></div>
        <div className={styles.bsignInSection}>
          <Form
            noValidate
            className={styles.form}
            validated={validated}
            onSubmit={handleSubmit}
          >
            <header className={styles.bsigninHeader}>Sign In </header>
            <Form.Group id="validationcustom01">
              <Form.Label className={styles.label}>
                Email <sup>*</sup>
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
                  Email is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group id="validationcustom02">
              <Form.Label className={styles.label}>
                Password <sup>*</sup>
              </Form.Label>
              <InputGroup className={styles.input} hasValidation>
                <Form.Control
                  required
                  type={showPassword}
                  placeholder="Enter password"
                  className={styles.formInput}
                  onChange={(e) => {
                    handleShowPassword;
                    handleChanges(e);
                  }}
                  name="password"
                />
                <InputGroup.Text className={styles.symbol}>
                  <button
                    className={styles.iconBtn}
                    onClick={handleShowPassword}
                  >
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
                  Password is required
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <div className={styles.forgotPassword}>
              <a href="">Forgot Password</a>
            </div>
            <Button
              className={`${styles.bsignInBtn} ${styles.colorSignIn}`}
              type="submit"
            >
              Sign In
            </Button>
            <div className={styles.divider}>OR</div>
            <Button
              className={`${styles.bsignInBtn} ${styles.googleSignIn}`}
              type="submit"
            >
              <img
                src={googleIcon}
                alt="icon-svg"
                className={styles.googleIcon}
              />
              Sign in by Google
            </Button>
          </Form>
          <div className={styles.bsignUpLink}>
            Don't have an account? <a href="#">Sign up</a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
