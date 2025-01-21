import { Footer } from "../../footer/Footer";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import styles from "./buyerprofile.module.css";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { saveBuyerDetails } from "../../navbar/usernavbar/buyernavbar/buyerSlice";

export const BuyerProfile = () => {
  const [isEditing, setIsEditing] = useState("not_edit");
  const [validated, setValidated] = useState(false);
  const [buyerProfile, setBuyerProfile] = useState({
    name: "",
    email: "",
  });

  const dispatch = useDispatch();
  // const { crntBuyer } = useSelector(selectCurrentBuyerDetails);
  const buyerId = localStorage.getItem("kh-buyerId") || null;
  // const token = localStorage.getItem("kh-buyerToken") || null;
  useEffect(() => {
    if (buyerId) {
      getBuyer(buyerId);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (validateFields()) {
      updateProfile(buyerId);
      setIsEditing("not_edit");
    }
  };

  const handleChange = (e) => {
    setBuyerProfile({
      ...buyerProfile,
      [e.target.name]: e.target.value,
    });
  };

  const getBuyer = async (id) => {
    try {
      const res = await axiosInstance.get(`/buyer/fetchCurrentBuyer/${id}`);

      if (res.status === 200) {
        setBuyerProfile({
          ...buyerProfile,
          name: res?.data?.data.name,
          email: res?.data?.data.email,
        });
        let obj = {
          ...buyerProfile,
          name: res?.data?.data.name,
          email: res?.data?.data.email,
        };
        dispatch(saveBuyerDetails(obj));
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Error on getting buyer data");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching buyer details", error);
    }
  };

  console.log(buyerProfile);

  const validateFields = () => {
    const { name, email } = buyerProfile;

    if (!name || !email) {
      alert("All fields are required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email is invalid");
      return false;
    }
    return true;
  };

  const updateProfile = async (id) => {
    try {
      const res = await axiosInstance.patch(
        `/buyer/update/${id}`,
        buyerProfile
      );

      if (res.status === 200) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;

      if (statusCode === 400 || statusCode === 404) {
        toast.error("Error on updating buyer profile");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating buyer details", error);
    } finally {
      getBuyer(id);
    }
  };

  return (
    <>
      <BuyerNav />
      <h1 className={styles.profileTitle}>Profile Details</h1>
      <div className={styles.profileWrapper}>
        <div className={styles.buyerIllustration}></div>
        {isEditing === "edit" ? (
          <Form
            noValidate
            className={styles.buyerProfileForm}
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                value={buyerProfile.name}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Name cannot be empty!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                value={buyerProfile.email}
                onChange={handleChange}
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address!
              </Form.Control.Feedback>
            </Form.Group>
            <Button className={styles.updateBtn} type="submit">
              Update
            </Button>
            <Button
              className="mx-2"
              variant="secondary"
              onClick={() => setIsEditing("not_edit")}
            >
              Back
            </Button>
          </Form>
        ) : (
          <div className={styles.buyerDetails}>
            <p>Name: {buyerProfile.name} </p>
            <p>Email: {buyerProfile.email}</p>
            <Button
              className={styles.editBtn}
              onClick={() => {
                setIsEditing("edit");
              }}
            >
              Edit
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
