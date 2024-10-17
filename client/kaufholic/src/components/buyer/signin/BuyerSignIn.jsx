/* eslint-disable react/no-unescaped-entities */
import styles from "./buyersignin.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { LandingNavbar } from "../../navbar/landingnavbar/LandingNavbar";
import { useState } from "react";
export const BuyerSignIn = () => {
  const [validated,setValidated]=useState(false);

  const handleSubmit=(event)=>{
    const form = event.currentTarget;
    if(form.checkValidity()===false){
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    }
  return (
    <>
    <LandingNavbar/>
    <div className={styles.bsignInWrapper}>
      <div className={styles.imgSection}></div>
      <div className={styles.bsignInSection}>
        <Form noValidate className={styles.form} validated={validated} onSubmit={handleSubmit}>
          <header className={styles.bsigninHeader}>Sign In </header>
          <Form.Group id="validationcustom01">
            <Form.Label className={styles.label}>
              Email <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="text"
                placeholder="Enter name"
                className={styles.formInput}
              />
             <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group id="validationcustom02">
            <Form.Label className={styles.label}>
              Password <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input} hasValidation>
              <Form.Control
                required
                type="password"
                placeholder="Enter password"
                className={styles.formInput}
              />
              <InputGroup.Text className={styles.symbol}>
                <img
                  src={hidePassIcon}
                  alt="icon-svg"
                  className={styles.iconImg}
                />
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">Password is required</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <div className={styles.forgotPassword}>
            <a href="">Forgot Password</a>
          </div>
          <Button className={`${styles.bsignInBtn} ${styles.colorSignIn}`}   type="submit">
            Sign In
          </Button>
          <div className={styles.divider}>OR</div>
          <Button className={`${styles.bsignInBtn} ${styles.googleSignIn}`}   type="submit">
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
    </>
  );
};
