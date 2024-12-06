import { LandingNavbar } from "../navbar/landingnavbar/LandingNavbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../assets/svg/hidepassIcon.svg";
import showPassIcon from "../../assets/svg/showpassIcon.svg";
import styles from "./forgotpass.module.css";
import { useState } from "react";
import { axiosInstance } from "../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const ForgotPassword = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [validated, setValidated] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
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
    setResetPassword({
      ...resetPassword,
      [e.target.name]: e.target.value,
    });
  };

  console.log(resetPassword);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    if (validationForgotPasswordFields()) {
      resetPassAPI();
      alert("success");
    }
  };

  const validationForgotPasswordFields = () => {
    const { email, newPassword, confirmPassword } = resetPassword;

    if (!email || !newPassword || !confirmPassword) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email is invalid");
      return false;
    }

    if (newPassword.length < 8 || confirmPassword.length < 8) {
      alert("Password must be atleast 8 characters long");
      return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;

    if (!passwordRegex.test(newPassword)) {
      alert(
        "Password must contain atleast one small letter, one capital letter and one number"
      );
      return false;
    }

    if (newPassword !== confirmPassword) {
      alert("Password's dont match, please try again");
      return false;
    }
    return true;
  };

  const resetPassAPI = async () => {
    try {
      const res = await axiosInstance.patch(
        "/seller/resetpassword",
        resetPassword
      );

      if (res.status === 200) {
        toast.success("Your password is changed successfully");
        navigate("/seller/signin");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Your email id or password is incorrect");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error in resetting your password", error);
    }
  };

  return (
    <>
      <LandingNavbar />
      <div className={styles.resetPassWrapper}>
        <Form
          noValidate
          className={styles.resetPassForm}
          validated={validated}
          onSubmit={handleSubmit}
        >
          <header className={styles.rPasswordHeader}> Reset Password </header>
          <Form.Group id="validationcustom01">
            <Form.Label className={styles.rLabel}>
              Email <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="email"
                placeholder="Enter email"
                className={styles.rPassFormInput}
                name="email"
                onChange={handleChanges}
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group id="validationcustom02">
            <Form.Label className={styles.rLabel}>
              New Password <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type={showPassword}
                placeholder="Enter password"
                className={styles.rPassFormInput}
                onChange={(e) => {
                  handleShowPassword;
                  handleChanges(e);
                }}
                name="newPassword"
              />
              <InputGroup.Text className={styles.symbol}>
                <button
                  className={styles.rPassIconBtn}
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
          <Form.Group id="validationcustom03">
            <Form.Label className={styles.rLabel}>
              Confirm Password <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                className={styles.rPassFormInput}
                onChange={(e) => {
                  handleShowPassword;
                  handleChanges(e);
                }}
                name="confirmPassword"
              />
              <Form.Control.Feedback type="invalid">
                Password do not match, please try again
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button
            className={`${styles.resetBtn} ${styles.rPassColor}`}
            type="submit"
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </>
  );
};
