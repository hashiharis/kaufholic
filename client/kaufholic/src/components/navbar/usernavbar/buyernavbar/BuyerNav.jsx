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
import { IoCartOutline } from "react-icons/io5";

export const BuyerNav = () => {
  const [buyerData, setBuyerData] = useState({
    name: "",
    email: "",
  });

  // const { crntBuyer } = useSelector(selectCurrentBuyerDetails);
  const dispatch = useDispatch();
  const buyerId = localStorage.getItem("kh-buyerId") || null;
  useEffect(() => {
    // if (buyerId) {
    //   fetchCurrentBuyerDetails(buyerId);
    // }
    // const buyerId = localStorage.getItem("kh-buyerId") || null;

    const token = localStorage.getItem("kh-buyerToken") || null;

    if (token && buyerId) {
      fetchCurrentBuyerByToken(token, buyerId);
    } else {
      setBuyerData({});
    }
  }, []);

  // const fetchCurrentBuyerDetails = async (id) => {
  //   try {
  //     const res = await axiosInstance.get(`/buyer/fetchCurrentBuyer/${id}`);
  //     if (res.status === 200) {
  //       setBuyerData({
  //         ...buyerData,
  //         name: res?.data?.data?.name,
  //         email: res?.data?.data?.email,
  //       });
  //       dispatch(saveBuyerDetails(buyerData));
  //       console.log(res);
  //       console.log(crntBuyer);
  //     }
  //   } catch (error) {
  //     const statusCode = error.response.status;
  //     if (statusCode === 400 || statusCode === 404) {
  //       toast.error("Something went wrong");
  //     } else {
  //       toast.error("Please try again after sometime");
  //     }
  //     console.log("Error on fetching buyer details", error);
  //   }
  // };

  const fetchCurrentBuyerByToken = async (token, id) => {
    try {
      const res = await axiosInstance.get(`/buyer/currentuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setBuyerData({
          ...buyerData,
          name: res?.data?.data?.name,
          email: res?.data?.data?.email,
        });

        let obj = {
          ...buyerData,
          name: res?.data?.data?.name,
          email: res?.data?.data?.email,
        };
        dispatch(saveBuyerDetails(obj));
        // console.log("redux", crntBuyer);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404 || statusCode === 403) {
        toast.error("Error on getting current buyer data");
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
          <Navbar.Brand href="/" className={styles.logo}></Navbar.Brand>
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
                <Nav.Link
                  href="/buyer/viewproducts"
                  className={`${styles.link}`}
                >
                  <FaTags size="20px" className={styles.icon} />
                  Products
                </Nav.Link>
                <Nav.Link
                  href={buyerData.name ? `#home` : `/buyer/signin`}
                  className={`${styles.link}`}
                >
                  <IoPersonOutline size="20px" className={styles.icon} />
                  {buyerData.name ? `Hi ${buyerData.name}` : `SignIn`}
                </Nav.Link>
                <Nav.Link href="/buyer/wishlist" className={`${styles.link}`}>
                  <FaRegHeart size="20px" className={styles.icon} />
                  Wishlist
                </Nav.Link>
                <Nav.Link
                  href={`/cart/${buyerId}`}
                  className={`${styles.link}`}
                >
                  <IoCartOutline size="20px" className={styles.icon} />
                  Cart
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
