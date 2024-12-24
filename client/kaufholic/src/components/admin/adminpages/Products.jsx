/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import Table from "react-bootstrap/Table";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { Tables } from "./Tables";
export const Products = ({ activePage }) => {
  const [products, setProducts] = useState([]);
  const productHeader = ["Title", "Subtitle", "Category", "Description"];

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/viewall");
      if (res.status === 200) {
        setProducts(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching product details");
    }
  };
  return (
    <div>
      <h4 style={{ marginBlock: "2em" }}>List of Products</h4>
      <Tables headers={productHeader} data={products} activePage={activePage} />
    </div>
  );
};
