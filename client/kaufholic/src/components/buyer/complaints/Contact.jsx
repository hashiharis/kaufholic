import { IoLocation } from "react-icons/io5";
import { Link } from "react-router-dom";
import styles from "./contact.module.css";

export const Contact = () => {
  const contactOptions = [
    {
      title: "Email Support",
      subTitle: "Email us and we'll get back to you within 24 hrs",
      link: "kaufholic@example.com",
    },
    {
      title: "Call us",
      subTitle: "Mon - Fri, 9:00 AM - 6:00 PM(IST)",
      link: "+91 1234567890",
    },
    {
      title: "Kerala,India",
      subTitle: "Visit our office Mon-Fri, 9:00AM- 6:00 PM(IST)",
      link: "121 Abc Street, India, 123456",
    },
  ];
  return (
    <div className={styles.contactSection}>
      {contactOptions.map((item, index) => (
        <div key={index} className={styles.contactData}>
          <p className={styles.contactTitle}>{item.title}</p>
          <p className={styles.contactSubTitle}>{item.subTitle}</p>
          <Link>
            {item.title === "Kerala,India" && <IoLocation />}
            {item.link}
          </Link>
        </div>
      ))}
    </div>
  );
};
