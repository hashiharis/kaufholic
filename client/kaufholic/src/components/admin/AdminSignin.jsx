import styles from "./adminsignin.module.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import passIcon from "../../assets/svg/showpassIcon.svg";
import hidePassIcon from "../../assets/svg/hidepassIcon.svg";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { axiosInstance } from "../../apis/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export const AdminSignin = () => {
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState("password");
  const [adminLogin, setAdminLogin] = useState({
    email: "admin123@gmail.com",
    password: "Admin123",
  });
  const navigate = useNavigate();

  const handlePassword = (e) => {
    e.preventDefault();
    showPassword === "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };

  const handleChange = (e) => {
    setAdminLogin({
      ...adminLogin,
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
      fetchAdminCredentials();
    }
  };

  const { email, password } = adminLogin;
  const validationSignin = () => {
    if (!email || !password) {
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

  const fetchAdminCredentials = async () => {
    try {
      const res = await axiosInstance.post("/admin/signin", adminLogin);
      if (res.status === 200) {
        toast.success("You are successfully logged in");
        navigate("/admin/dashboard");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Your email id or password is incorrect");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error in admin sign in", error);
    }
  };

  return (
    <div className={styles.adminSigninWrapper}>
      <div className={styles.adminIllustration}></div>
      <div className={styles.adminDetailSection}>
        <h2>Admin Sign In</h2>
        <Form
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          className={styles.adminForm}
        >
          <Form.Group id="validationcustom01">
            <Form.Label>Email</Form.Label>
            <InputGroup hasValidation className={styles.inputField}>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group id="validationcustom02">
            <Form.Label>Password</Form.Label>
            <InputGroup className={styles.inputField}>
              <Form.Control
                type={showPassword}
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
              <InputGroup.Text>
                <button onClick={handlePassword} className={styles.iconBtn}>
                  <img
                    src={showPassword === "password" ? passIcon : hidePassIcon}
                    alt="password-show-hide-icon"
                  />
                </button>
              </InputGroup.Text>
              <Form.Control.Feedback type="invalid">
                Password is required
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Button type="submit" className={styles.adminBtn}>
            Sign In
          </Button>
        </Form>
      </div>
    </div>
  );
};
