// import { useState } from 'react';
import styles from "./landingnavbar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { BsPersonCircle } from "react-icons/bs";
export const LandingNavbar = () => {
  return (
    <>
      <Navbar expand="lg" className={`${styles.landingNavWrapper} bg-body-tertiary`}>
      
        <Container >
        <Navbar.Brand href="#home" className={styles.logo}></Navbar.Brand>
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
            <Offcanvas.Header closeButton className="bg-body-tertiary">
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className={`justify-content-end flex-grow-1 pe-3 ${styles.navRightSection}`}>
                <Nav.Link href= "#action1" className={`${styles.link}`}>
                  <BsPersonCircle size="20px" className={styles.icon}/>
                  Sign in
                </Nav.Link>
                <Nav.Link href="#action1" className={`${styles.link}`}>
                <BsPersonCircle size="20px" className={styles.icon}/>
                  Sign up
                </Nav.Link>
                <Nav.Link href="#action2" className={`${styles.link}`}>About us</Nav.Link>
                <Nav.Link href="#action2" className={`${styles.link}`}>Contact us</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
