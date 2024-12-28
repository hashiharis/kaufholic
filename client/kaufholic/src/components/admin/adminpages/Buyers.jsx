/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { Tables } from "./Tables";
import noresult from "../../../assets/images/noresult.png";
export const Buyers = ({ activePage }) => {
  const [buyerDetails, setBuyerDetails] = useState([]);
  const buyerHeader = ["Name", "Title"];
  useEffect(() => {
    fetchAllBuyers();
  }, []);

  const fetchAllBuyers = async () => {
    try {
      const res = await axiosInstance.get("/buyer/allBuyers");

      if (res.status === 200) {
        setBuyerDetails(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching buyer details");
    }
  };

  console.log(buyerDetails);

  return (
    <div>
      <h4 style={{ marginBlock: "2em" }}>List of buyers</h4>
      {buyerDetails.length != 0 ? (
        <Tables
          headers={buyerHeader}
          data={buyerDetails}
          activePage={activePage}
        />
      ) : (
        <div
          style={{
            backgroundImage: `url(${noresult})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100%",
            minHeight: "300px",
          }}
        >
          <h5 style={{ textAlign: "center" }}>No Results Found !!!</h5>
        </div>
      )}
    </div>
  );
};
