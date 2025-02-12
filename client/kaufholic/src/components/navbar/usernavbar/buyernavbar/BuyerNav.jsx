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
import { FaHeart } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaTags } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { FaBoxOpen } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLocation, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

export const BuyerNav = () => {
  const [buyerData, setBuyerData] = useState({
    name: "",
    email: "",
  });

  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || null
  );

  const location = useLocation();
  const navigate = useNavigate();
  const { crntBuyer } = useSelector(selectCurrentBuyerDetails);
  // console.log("crnt", crntBuyer);
  const dispatch = useDispatch();
  const buyerId = localStorage.getItem("kh-buyerId") || null;
  const token = localStorage.getItem("kh-buyerToken") || null;
  useEffect(() => {
    // if (buyerId) {
    //   fetchCurrentBuyerDetails(buyerId);
    // }
    // const buyerId = localStorage.getItem("kh-buyerId") || null;

    if (token && buyerId) {
      fetchCurrentBuyerByToken(token, buyerId);
      fetchCurrentBuyerDetails(buyerId);
    } else {
      setBuyerData({});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  useEffect(() => {
    if (
      !["/buyer/wishlist", "/buyer/orders/", `/cart/${buyerId}`].includes(
        location.pathname
      )
    ) {
      setActiveLink(null);
    }
  }, [location.pathname]);

  const handleIcon = (link) => {
    setActiveLink(link);
  };

  const fetchCurrentBuyerDetails = async (id) => {
    try {
      const res = await axiosInstance.get(`/buyer/fetchCurrentBuyer/${id}`);
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
        // console.log(res);
        // console.log(crntBuyer);
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

  const fetchCurrentBuyerByToken = async (token, id) => {
    try {
      const res = await axiosInstance.get(`/buyer/currentuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        // console.log(res);
        setBuyerData({
          ...buyerData,
          name: res?.data?.data?.name,
          email: res?.data?.data?.email,
        });

        // let obj = {
        //   ...buyerData,
        //   name: res?.data?.data?.name,
        //   email: res?.data?.data?.email,
        // };
        // dispatch(saveBuyerDetails(obj));
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

  const handleLogout = () => {
    if (buyerId && token) {
      localStorage.removeItem("kh-buyerId");
      localStorage.removeItem("kh-buyerToken");
      dispatch(saveBuyerDetails({}));
      navigate("/buyer/signin");
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
                  href="/buyer/wishlist"
                  className={`${styles.link}`}
                  onClick={() => {
                    handleIcon("/buyer/wishlist");
                  }}
                >
                  {activeLink === "/buyer/wishlist" ? (
                    <FaHeart size="20px" className={styles.icon} />
                  ) : (
                    <FaRegHeart size="20px" className={styles.icon} />
                  )}
                  Wishlist
                </Nav.Link>
                <Nav.Link
                  href={`/cart/${buyerId}`}
                  className={`${styles.link}`}
                  onClick={() => {
                    handleIcon(`/cart/${buyerId}`);
                  }}
                >
                  {activeLink === `/cart/${buyerId}` ? (
                    <IoCart size="20px" className={styles.icon} />
                  ) : (
                    <IoCartOutline size="20px" className={styles.icon} />
                  )}
                  Cart
                </Nav.Link>
                <Nav.Link
                  href={"/buyer/orders/"}
                  className={`${styles.link}`}
                  onClick={() => {
                    handleIcon("/buyer/orders/");
                  }}
                >
                  {activeLink === "/buyer/orders/" ? (
                    <FaBoxOpen size="20px" className={styles.icon} />
                  ) : (
                    <FaBox size="15px" className={styles.icon} />
                  )}
                  Orders
                </Nav.Link>
                <div className={`${styles.personIcon}`}>
                  <IoPersonOutline
                    size="20px"
                    className={`${styles.icon}${styles.profileIcon}`}
                  />

                  {crntBuyer.name ? (
                    <NavDropdown
                      title={
                        crntBuyer.name
                        // crntBuyer.name ? `Hi ${crntBuyer.name}` : `Sign in`
                      }
                      id="basic-nav-dropdown"
                      className={`${styles.titleDropdown}`}
                    >
                      <NavDropdown.Item href="/buyer/profile">
                        Profile Page
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/contactus">
                        Register Complaints
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item
                        onClick={handleLogout}
                        style={{ color: "red" }}
                      >
                        <FiLogOut
                          size={"20px"}
                          style={{ marginRight: "0.3em" }}
                          color={"red"}
                        />
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <Nav.Link href="/buyer/signin" className={`${styles.link}`}>
                      Sign in
                    </Nav.Link>
                  )}
                </div>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
