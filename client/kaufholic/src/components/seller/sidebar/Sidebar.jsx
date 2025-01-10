/* eslint-disable react/prop-types */
// import { IoIosPerson } from "react-icons/io";
// import { FaCartArrowDown } from "react-icons/fa";
// import { IoBagCheck } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
// import { IoMdHome } from "react-icons/io";
// import { FaBoxOpen } from "react-icons/fa";
// import { FaPowerOff } from "react-icons/fa";
import styles from "./sidebar.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Sidebar = ({
  changeActivePage,
  toggleMenu,
  showMenu,
  data,
  location,
}) => {
  const navigate = useNavigate();
  const sidebarClass =
    location.pathname === "/admin/dashboard"
      ? showMenu
        ? `${styles.adminSidebar}`
        : `${styles.adminSidebarHide}`
      : location.pathname === "/seller/dashboard"
      ? showMenu
        ? `${styles.sidebar} `
        : `${styles.sidebarHide}`
      : " ";

  return (
    <div className={`${styles.sidebarWrapper}`}>
      <nav className={sidebarClass}>
        {showMenu ? (
          <IoClose onClick={toggleMenu} size={30} className={styles.navIcon} />
        ) : (
          <GiHamburgerMenu
            onClick={toggleMenu}
            size={30}
            className={styles.navIcon}
          />
        )}

        {data.map((item, index) => (
          <ul
            key={index}
            className={
              showMenu
                ? `${styles.sidebarOptionsactive}`
                : `${styles.sidebarOptions}`
            }
          >
            <span>{item.icon}</span>
            <li
              className={styles[item.cName]}
              onClick={() => {
                changeActivePage(item.sidebarLink);
                if (
                  item.sidebarLink === "Logout" &&
                  location.pathname === "/seller/dashboard"
                ) {
                  const sellerId = localStorage.getItem("kh-sellerId");
                  if (sellerId) {
                    localStorage.removeItem("kh-sellerId");
                    toast.success("Logged out successfully");
                    navigate("/seller/signin");
                  }
                }
                if (
                  item.sidebarLink === "Logout" &&
                  location.pathname === "/admin/dashboard"
                ) {
                  const adminCred = localStorage.getItem("kh-admin");

                  if (adminCred) {
                    localStorage.removeItem("kh-admin");
                    toast.success("Logged out successfully");
                    navigate("/admin/signin");
                  }
                }
              }}
            >
              {item.sidebarLink}
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
};
