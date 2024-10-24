import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { saveBuyerDetails, selectCurrentBuyerDetails } from "./buyerSlice";
import styles from "./buyernav.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaRegHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaTags } from "react-icons/fa";

export const BuyerNav = () => {
  const [buyerData, setBuyerData] = useState({
    name: "",
    email: "",
  });

  const { crntBuyer } = useSelector(selectCurrentBuyerDetails);
  const dispatch = useDispatch();

  const buyerId = localStorage.getItem("kh-buyerId");

  useEffect(() => {
    if (buyerId) {
      fetchCurrentBuyerDetails(buyerId);
    }
  }, []);

  const fetchCurrentBuyerDetails = async (id) => {
    try {
      const res = await axiosInstance.get(`/buyer/fetchCurrentBuyer/${id}`);
      if (res.status === 200) {
        setBuyerData({
          ...buyerData,
          name: res?.data?.data?.name,
          email: res?.data?.data?.email,
        });
        dispatch(saveBuyerDetails(buyerData));
        console.log(res);
        console.log(crntBuyer);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching buyer details", error);
    }
  };
  return (
    <>
      <Navbar
        expand="lg"
        className={` ${styles.buyerNavWrapper} bg-body-tertiary`}
      >
        <Container>
          <Navbar.Brand href="#home" className={styles.logo}></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
            className={`${styles.sidebar}`}
          >
            <Offcanvas.Header
              closeButton
              className="bg-body-tertiary"
            ></Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className={`justify-content-end flex-grow-1 pe-3`}>
                <Nav.Link href="#action1" className={`${styles.link}`}>
                  <FaTags size="20px" className={styles.icon} />
                  Products
                </Nav.Link>
                <Nav.Link href="#action1" className={`${styles.link}`}>
                  <IoPersonOutline size="20px" className={styles.icon} />
                  {buyerData && `Hi ${buyerData.name}`}
                </Nav.Link>
                <Nav.Link href="#action2" className={`${styles.link}`}>
                  <FaRegHeart size="20px" className={styles.icon} />
                  Wishlist
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
