import styles from "./buyersignup.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidepassIcon.svg";
import showPassIcon from "../../../assets/svg/showpassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { LandingNavbar } from "../../navbar/landingnavbar/LandingNavbar";
import { useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Footer } from "../../footer/Footer";
export const BuyerSignUp = () => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [buyerDetails, setBuyerDetails] = useState({
    name: "",
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
    if (validationSignup()) {
      sendDataToServer();
    }
  };

  const validationSignup = () => {
    const { name, email, password } = buyerDetails;

    if (!name || !email || !password) {
      alert("Please fill all required fields");
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
    setShowPassword(e.target.type);
    e.preventDefault();

    if (showPassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleChanges = (e) => {
    setBuyerDetails({
      ...buyerDetails,
      [e.target.name]: e.target.value,
    });
  };

  console.log(buyerDetails);

  const sendDataToServer = async () => {
    try {
      const res = await axiosInstance.post("buyer/signup", buyerDetails);
      console.log("Response", res);
      if (res.status === 201) {
        toast.success("Registration is successful");
        navigate("/buyer/signin");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on signup frontend", error);
    }
  };
  return (
    <>
      <LandingNavbar />
      <div className={styles.bSignupWrapper}>
        <div className={styles.imgSection}></div>
        <div className={styles.bSignUpSection}>
          <Form
            noValidate
            validated={validated}
            className={styles.form}
            onSubmit={handleSubmit}
          >
            <header className={styles.bsignUpHeader}>Sign up</header>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label className={styles.label}>
                Name<sup>*</sup>
              </Form.Label>
              <InputGroup className={styles.input} hasValidation>
                <Form.Control
                  required
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  className={styles.formInput}
                  onChange={handleChanges}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter name
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationcustom02">
              <Form.Label className={styles.label}>
                Email<sup>*</sup>
              </Form.Label>
              <InputGroup className={styles.input} hasValidation>
                <Form.Control
                  required
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className={styles.formInput}
                  onChange={handleChanges}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter email
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationcustom03">
              <Form.Label className={styles.label}>
                Password<sup>*</sup>
              </Form.Label>
              <InputGroup className={styles.input} hasValidation>
                <Form.Control
                  required
                  type={showPassword}
                  name="password"
                  placeholder="Enter Password"
                  className={styles.formInput}
                  onChange={(e) => {
                    handleShowPassword;
                    handleChanges(e);
                  }}
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
            <Button
              variant="primary"
              type="submit"
              className={`${styles.bsignUpBtn} ${styles.ordSignUp}`}
            >
              Sign up
            </Button>
            <div className={styles.divider}>OR</div>
            <Button
              variant="primary"
              type="submit"
              className={`${styles.bsignUpBtn} ${styles.googleSignUp}`}
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
      <Footer />
    </>
  );
};
