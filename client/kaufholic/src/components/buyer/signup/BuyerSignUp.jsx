import styles from "./buyersignup.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidepassIcon.svg";
import showPassIcon from "../../../assets/svg/showpassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { LandingNavbar } from "../../navbar/landingnavbar/LandingNavbar";
import { useState } from "react";
export const BuyerSignUp = () => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState("password");

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleShowPassword = () => {
    if (showPassword == "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
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
                  placeholder="Enter name"
                  className={styles.formInput}
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
                  placeholder="Enter email"
                  className={styles.formInput}
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
                  placeholder="Enter Password"
                  className={styles.formInput}
                  onChange={(e) => setShowPassword(e.target.type)}
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
    </>
  );
};
