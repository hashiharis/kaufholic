/* eslint-disable react/prop-types */
import Accordion from "react-bootstrap/Accordion";
import { axiosInstance } from "../../../../apis/axiosInstance";
import toast from "react-hot-toast";
import styles from "./sellerlist.module.css";

export const SellersList = ({ sellers, api }) => {
  const handleChange = (e, id) => {
    updateApproval(id, e.target.value);
  };

  const updateApproval = async (sellerId, status) => {
    try {
      const res = await axiosInstance.patch(
        `seller/updateApproval/${sellerId}?approval=${status}`
      );

      if (res.status === 200) {
        toast.success("Seller approval status is updated successfully");
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on updating seller approval", error);
    } finally {
      api();
    }
  };

  return (
    <>
      {sellers.length === 0 ? (
        <div className={styles.emptyImage}></div>
      ) : (
        sellers?.map((item, index) => (
          <Accordion key={item._id} className="mb-3">
            <Accordion.Item eventKey={index}>
              <Accordion.Header>{item.name}</Accordion.Header>
              <Accordion.Body>
                <p>Email:{item.email}</p>
                <p>Contact:{item.contact}</p>
                <p>Address:{item.address}</p>
                <p>Pincode:{item.pincode}</p>
                <p>Description:{item.description}</p>
                {item.approval === "pending" && (
                  <>
                    <label>Seller Approval: </label>
                    <select
                      onChange={(e) => {
                        handleChange(e, item._id);
                      }}
                    >
                      <option value="">Select</option>
                      <option value="accepted">Accept</option>
                      <option value="rejected">Reject</option>
                    </select>
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))
      )}
    </>
  );
};
