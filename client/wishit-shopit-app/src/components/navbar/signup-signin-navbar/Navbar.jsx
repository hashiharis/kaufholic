// import { useState } from 'react';
import styles from './navbar.module.css'
// import { MdMenu } from "react-icons/md";
// import { MdClose } from "react-icons/md";
export const Navbar=()=>{

    // const [isHamburgerHidden,setIsHamburgerHidden]=useState(false);

    // const toggleHamburger=()=>{
    //     setIsHamburgerHidden((prev)=>(!prev))
    // }
    // const hamburger=(
    //     <MdMenu
    //     className={styles.hamburgerMenu}
    //     size="35px"
    //     color="#023047"
    //     onClick={toggleHamburger}/>
    // );

    // const hamburgerClose=(
    //      <MdClose 
    //      className={styles.hamburgerClose}
    //      size="35px"
    //      color="#023047"
    //      onClick={toggleHamburger} />
    // );
    return(
        <nav className={`${styles.mobNavbarContainer}`}>
            <div className={styles.logo}></div>
            {/* <div className={styles.hamburgerIcon}>{isHamburgerHidden?hamburgerClose:hamburger}</div> */}
        </nav>
    )
}
