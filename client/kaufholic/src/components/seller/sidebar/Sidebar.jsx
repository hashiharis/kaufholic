/* eslint-disable react/prop-types */
import { IoIosPerson } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import styles from "./sidebar.module.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Sidebar = ({ changeActivePage, toggleMenu, showMenu }) => {
  const navigate = useNavigate();
  const sideBarData = [
    {
      sidebarLink: "",
      icon: "",
      cName: "logo",
    },
    {
      sidebarLink: "Home",
      icon: <IoMdHome />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "Profile",
      icon: <IoIosPerson />,
      cName: "sidebarLink",
    },

    {
      sidebarLink: "Add Product",
      icon: <FaCartArrowDown />,
      cName: "sidebarLink",
    },
    {
      sidebarLink: "My Products",
      icon: <IoBagCheck />,
      cName: "sidebarLink",
    },
    { sidebarLink: "Orders", icon: <FaBoxOpen />, cName: "sidebarLink" },
    {
      sidebarLink: "Logout",
      icon: <FaPowerOff />,
      cName: "sidebarLink",
    },
  ];

  return (
    <div className={`${styles.sidebarWrapper}`}>
      <nav className={showMenu ? `${styles.sidebar}` : `${styles.sidebarHide}`}>
        {showMenu ? (
          <IoClose onClick={toggleMenu} size={30} className={styles.navIcon} />
        ) : (
          <GiHamburgerMenu
            onClick={toggleMenu}
            size={30}
            className={styles.navIcon}
          />
        )}

        {sideBarData.map((item, index) => (
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
                if (item.sidebarLink === "Logout") {
                  const sellerId = localStorage.getItem("kh-sellerId");
                  if (sellerId) {
                    localStorage.removeItem("kh-sellerId");
                    toast.success("Logged out successfully");
                    navigate("/seller/signin");
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
