/* eslint-disable react/no-unescaped-entities */
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import styles from "./signin.module.css";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { Link } from "react-router-dom";
export const SignIn = () => {
  return (
    <div className={styles.signInWrapper}>
      <div className={styles.imgSection}></div>
      <div className={styles.signinSection}>
        <Form className={styles.form}>
          <header className={styles.signinHeader}>Sign In </header>

          <Form.Group>
            <Form.Label className={styles.label}>
              Email <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="text"
                placeholder="Enter name"
                className={styles.formInput}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className={styles.label}>
              Password <sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="password"
                placeholder="Enter password"
                className={styles.formInput}
              />
              <InputGroup.Text>
                <img
                  src={hidePassIcon}
                  alt="icon-svg"
                  className={styles.iconImg}
                />
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>
          <div className={styles.forgotPassword}>
            <a href="">Forgot Password</a>
          </div>
          <Button className={`${styles.signInBtn} ${styles.colorSignIn}`}>
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
          Don't have an account?  <Link to="#">Sign up</Link>
        </div>
      </div>
    </div>
  );
};
