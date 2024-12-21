import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const Buyers = () => {
  const [buyerDetails, setBuyerDetails] = useState([]);

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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {buyerDetails.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
