import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { SellersList } from "./sellerlist/SellersList";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const Sellers = () => {
  const [pendingSellers, setPendingSellers] = useState([]);
  const [approvedSellers, setApprovedSellers] = useState([]);
  const [rejectedSellers, setRejectedSellers] = useState([]);
  useEffect(() => {
    getPendingSellers();
    getApprovedSellers();
    getRejectedSellers();
  }, []);

  const getPendingSellers = async () => {
    try {
      const res = await axiosInstance.get(
        `/seller/getSellers?approval=pending`
      );

      if (res.status === 200) {
        setPendingSellers(res?.data?.data);
        console.log("worked pending");
      }
      if (res.status === 202) {
        setPendingSellers([]);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching pending sellers", error);
    }
  };
  console.log(pendingSellers);

  const getApprovedSellers = async () => {
    try {
      const res = await axiosInstance.get(
        `/seller/getSellers?approval=accepted`
      );

      if (res.status === 200) {
        setApprovedSellers(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching approved sellers", error);
    }
  };

  const getRejectedSellers = async () => {
    try {
      const res = await axiosInstance.get(
        `/seller/getSellers?approval=rejected`
      );

      if (res.status === 200) {
        setRejectedSellers(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching rejected sellers", error);
    }
  };
  return (
    <div>
      <h4 style={{ marginBlock: "1em" }}>List of Sellers</h4>
      <Tabs
        defaultActiveKey="pending"
        id="uncontrolled-tab-example"
        className="mb-3 my-5"
        justify
        onSelect={() => {
          getApprovedSellers();
          getRejectedSellers();
        }}
      >
        <Tab eventKey="pending" title="Waiting for approval">
          <SellersList sellers={pendingSellers} api={getPendingSellers} />
        </Tab>
        <Tab eventKey="accepted" title="Approved">
          <SellersList sellers={approvedSellers} api={getPendingSellers} />
        </Tab>
        <Tab eventKey="rejected" title="Rejected">
          <SellersList sellers={rejectedSellers} api={getPendingSellers} />
        </Tab>
      </Tabs>
    </div>
  );
};
