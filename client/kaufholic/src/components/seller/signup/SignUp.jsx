import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import showPassIcon from "../../../assets/svg/showpassIcon.svg"
import googleIcon from "../../../assets/svg/googleLogo.svg";
import styles from "./signup.module.css";
import { useState } from "react";

export const SignUp = () => {

  const [showPassword,setShowPassword]=useState("password");
  const handleShowPassword=(e)=>{
    e.preventDefault();
    if(showPassword=="password"){
      setShowPassword("text")
    }
    else{
      setShowPassword("password")
    }
  }
  return (
    <div className={styles.signUpWrapper}>
      <div className={styles.imgSection}></div>
      <div className={`${styles.signUpSection}`}>
        <Form className={styles.form}>
          <header className={styles.signUpHeader}>Sign up</header>
          <Form.Group className="mb-3">
            <Form.Label className="label">
              Name<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="text"
                placeholder="Enter name"
                className={styles.formInput}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">
              Email<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className={styles.formInput}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">
              Password<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type={showPassword}
                placeholder="Enter Password"
                className={styles.formInput}
                onChange={(e)=>setShowPassword(e.target.type)}
              />
              <InputGroup.Text className={styles.symbol}>
              <button className={styles.iconBtn} onClick={handleShowPassword}>
                <img
                  src={showPassword=="text"?`${hidePassIcon}`:`${showPassIcon}`}
                  alt="icon-svg"
                  className={styles.iconImg}
                />
                </button>
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">
              Contact Number<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="number"
                placeholder="Enter contact number"
                className={styles.formInput}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="form-heading">
              Address<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="number"
                placeholder="Enter address"
                className={styles.formInput}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">
              Pincode<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="number"
                placeholder="Enter pincode"
                className={styles.formInput}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="label">
              Description<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                as="textarea"
                type="number"
                placeholder="Enter description about the item to be sold"
                className={styles.formInput}
              />
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
