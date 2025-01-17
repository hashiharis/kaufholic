// import { useState } from 'react';
import styles from "./landingnavbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavDropdown from "react-bootstrap/NavDropdown";

import { BsPersonCircle } from "react-icons/bs";
export const LandingNavbar = () => {
  return (
    <>
      <Navbar
        expand="lg"
        className={`${styles.landingNavWrapper} bg-body-tertiary`}
      >
        <Container>
          <Navbar.Brand href="/" className={styles.logo}></Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className={styles.hamburgerIcon}
          />
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
              <Nav
                className={`justify-content-end flex-grow-1 pe-3  ${styles.navRightSection}`}
              >
                <div className={styles.personIcon}>
                  <BsPersonCircle size="20px" className={styles.icon} />
                  <NavDropdown
                    title="Sign in"
                    id="basic-nav-dropdown"
                    className={`${styles.signDropdown}`}
                  >
                    <NavDropdown.Item
                      href="/buyer/signin"
                      className={styles.buyerSignin}
                    >
                      Buyer
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/seller/signin">
                      Seller
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/admin/signin">
                      Admin
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <div className={styles.personIcon}>
                  <BsPersonCircle size="20px" className={styles.icon} />
                  <NavDropdown
                    title="Sign up"
                    id="basic-nav-dropdown"
                    className={`${styles.signDropdown}`}
                  >
                    <NavDropdown.Item
                      href="/buyer/signup"
                      className={styles.buyerSignin}
                    >
                      Buyer
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="/seller/signup">
                      Seller
                    </NavDropdown.Item>
                  </NavDropdown>
                </div>
                <Nav.Link href="/aboutus" className={`${styles.link}`}>
                  About us
                </Nav.Link>
                <Nav.Link href="/contactus" className={`${styles.link}`}>
                  Contact us
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
