/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { Tables } from "./Tables";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import noresult from "../../../assets/images/noresult.png";

export const Deactivate = ({ activePage }) => {
  const [activeSellers, setActiveSellers] = useState([]);
  const [inactiveSellers, setInActiveSellers] = useState([]);
  const [activeBuyers, setActiveBuyers] = useState([]);
  const [inactiveBuyers, setInActiveBuyers] = useState([]);
  const activeSellerHeaders = [
    "Name",
    "Email",
    "Description",
    "Change Account Status",
  ];
  const inactiveSellerHeaders = [
    ...activeSellerHeaders.slice(0, 3),
    "Activate Account",
  ];
  const activeBuyerHeaders = [
    ...activeSellerHeaders.slice(0, 2),
    ...activeSellerHeaders.slice(-1),
  ];
  const inactiveBuyerHeaders = [
    ...inactiveSellerHeaders.slice(0, 2),
    ...inactiveSellerHeaders.slice(-1),
  ];

  useEffect(() => {
    getActiveSellers();
    getInActiveSellers();
    getActiveBuyers();
    getInActiveBuyers();
  }, []);

  const getActiveSellers = async () => {
    try {
      const res = await axiosInstance.get(`/seller/allSellers`, {
        params: { isActive: true },
      });

      if (res.status === 200) {
        setActiveSellers(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching seller details");
    }
  };

  const getInActiveSellers = async () => {
    try {
      const res = await axiosInstance.get(`/seller/allSellers`, {
        params: { isActive: false },
      });

      if (res.status === 200) {
        setInActiveSellers(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching seller details");
    }
  };

  const getActiveBuyers = async () => {
    try {
      const res = await axiosInstance.get("/buyer/buyerAccountStatus", {
        params: {
          isActive: true,
        },
      });
      if (res.status === 200) {
        setActiveBuyers(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching active buyer details");
    }
  };

  const getInActiveBuyers = async () => {
    try {
      const res = await axiosInstance.get("/buyer/buyerAccountStatus", {
        params: {
          isActive: false,
        },
      });
      if (res.status === 200) {
        setInActiveBuyers(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching active buyer details");
    }
  };
  return (
    <>
      <h4 style={{ marginBlock: "2em" }}>List of Sellers and Buyers</h4>
      <Tabs
        defaultActiveKey="active_sellers"
        id="uncontrolled-tab-example"
        className="mb-3"
        justify
        onSelect={() => {
          getActiveSellers();
          getInActiveSellers();
          getActiveBuyers();
          getInActiveBuyers();
        }}
      >
        <Tab eventKey="active_sellers" title="Active Sellers">
          {activeSellers.length !== 0 ? (
            <Tables
              headers={activeSellerHeaders}
              data={activeSellers}
              activePage={activePage}
              fetchApi={getActiveSellers}
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
        </Tab>
        <Tab eventKey="inactive_sellers" title="Inactive Sellers">
          {inactiveSellers.length !== 0 ? (
            <Tables
              headers={inactiveSellerHeaders}
              data={inactiveSellers}
              activePage={activePage}
              fetchApi={getInActiveSellers}
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
        </Tab>
        <Tab eventKey="active_buyers" title="Active Buyers">
          {activeBuyers.length !== 0 ? (
            <Tables
              headers={activeBuyerHeaders}
              data={activeBuyers}
              activePage={activePage}
              fetchApi={getActiveBuyers}
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
        </Tab>
        <Tab eventKey="inactive_buyers" title="Inactive Buyers">
          {inactiveBuyers.length !== 0 ? (
            <Tables
              headers={inactiveBuyerHeaders}
              data={inactiveBuyers}
              activePage={activePage}
              fetchApi={getInActiveBuyers}
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
        </Tab>
      </Tabs>
    </>
  );
};
