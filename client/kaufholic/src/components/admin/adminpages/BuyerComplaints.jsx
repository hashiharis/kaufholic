/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Tables } from "./Tables";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";

export const BuyerComplaints = ({ activePage }) => {
  const [complaints, setComplaints] = useState([]);
  const complaintHeaders = ["Buyer Name", "Buyer Email", "Complaint"];

  useEffect(() => {
    getComplaints();
  }, []);

  const getComplaints = async () => {
    try {
      const res = await axiosInstance.get("/complaints/getComplaints");

      if (res.status === 200) {
        setComplaints(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching complaint details");
    }
  };
  console.log(complaints);
  return (
    <div>
      <h4 style={{ marginBlock: "2em" }}>List of Complaints</h4>
      <Tables
        headers={complaintHeaders}
        data={complaints}
        activePage={activePage}
      />
    </div>
  );
};