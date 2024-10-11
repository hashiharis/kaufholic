import styles from "./buyersignup.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import hidePassIcon from "../../../assets/svg/hidePassIcon.svg";
import googleIcon from "../../../assets/svg/googleLogo.svg";
import { LandingNavbar } from "../../navbar/landingnavbar/LandingNavbar";
export const BuyerSignUp = () => {
  return (
    <>
    <LandingNavbar/>
    <div className={styles.bSignupWrapper}>
      <div className={styles.imgSection}></div>
      <div className={styles.bSignUpSection}>
        <Form className={styles.form}>
          <header className={styles.bsignUpHeader}>Sign up</header>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>
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
            <Form.Label className={styles.label}>
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
            <Form.Label className={styles.label}>
              Password<sup>*</sup>
            </Form.Label>
            <InputGroup className={styles.input}>
              <Form.Control
                type="password"
                placeholder="Enter Password"
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
