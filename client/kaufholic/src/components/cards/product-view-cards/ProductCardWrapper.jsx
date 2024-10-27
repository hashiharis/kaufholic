import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "./productwrapper.module.css";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";

export const ProductCardWrapper = () => {
  const [productView, setProductView] = useState();

  useEffect(() => {
    console.log("hi");
    showProducts();
  }, []);

  const showProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/viewall");
      console.log(res);
      if (res.status === 200) {
        setProductView(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching product", error);
    }
  };

  console.log("product", productView);

  return (
    <div className={styles.productCardWrapper}>
      {productView?.map((item, index) => (
        <ProductCard key={index} item={item} />
      ))}
    </div>
  );
};
