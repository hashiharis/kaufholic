import { useEffect, useState } from "react";
import styles from "./sellerhome.module.css";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
export const SellerHome = () => {
  const [sellerMetrics, setSellerMetrics] = useState({});

  useEffect(() => {
    const sellerId = localStorage.getItem("kh-sellerId") || null;

    if (sellerId) {
      getSellerMetrics(sellerId);
    }
  }, []);

  const getSellerMetrics = async (id) => {
    try {
      const res = await axiosInstance.get(`seller/metrics/${id}`);

      if (res.status === 200) {
        setSellerMetrics(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching metrics", error);
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <h1>Dashboard</h1>
      <div className={styles.cards}>
        <div className={styles.countCards}>
          <p className={styles.metrics}>{sellerMetrics.totalBuyers}</p>
          <p className={styles.metricName}>Total Buyers</p>
        </div>
        <div className={styles.countCards}>
          <p className={styles.metrics}>{sellerMetrics.totalOrders}</p>
          <p className={styles.metricName}>Total Orders</p>
        </div>
        <div className={styles.countCards}>
          <p className={styles.metrics}>{sellerMetrics.totalProducts}</p>
          <p className={styles.metricName}>Total Products</p>
        </div>
      </div>
    </div>
  );
};
