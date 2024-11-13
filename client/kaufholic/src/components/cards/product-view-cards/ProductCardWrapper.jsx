import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "./productwrapper.module.css";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";

export const ProductCardWrapper = () => {
  const [productView, setProductView] = useState([]);
  const [inWishlist, setInWishlist] = useState([]);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    showProducts();
    const buyerId = localStorage.getItem("kh-buyerId") || null;
    console.log("buyer id", buyerId);
    if (buyerId) {
      fetchWishlistProducts(buyerId);
    }
  }, [isFav]);

  const showProducts = async () => {
    try {
      const res = await axiosInstance.get("/product/viewall");
      // console.log(res);
      if (res?.status === 200) {
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

  // console.log("product", productView);

  const fetchWishlistProducts = async (id) => {
    try {
      const res = await axiosInstance.get(`/wishlist/viewwishlist/${id}`);
      if (res.status === 200) {
        console.log("active wish", res?.data?.data);
        setInWishlist(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching wishlist", error);
    }
  };
  console.log("wishlist", inWishlist);

  const isProductInWishlist = (productId) => {
    const productFound = inWishlist?.some((item) => {
      let productIdInWishlist = item.productId._id.toString();

      console.log("wid,pid", productIdInWishlist, productId);
      return productIdInWishlist === productId;
    });
    console.log("prod found", productFound);
    return productFound;
  };

  return (
    <>
      <BuyerNav />
      <div className={styles.productCardWrapper}>
        {productView?.map((item, index) => {
          const isFavourite = isProductInWishlist(item._id);
          return (
            <ProductCard
              key={index}
              item={item}
              isFav={isFavourite}
              fetchWishlistProducts={fetchWishlistProducts} // passing the fetchwishlist api function inorder to invoke a rerender of the isFav
              // when api is triggered, the inwishlist update function is re rendered again, which inturn allows the
              //execution of the inProductInWishlist function.
            />
          );
        })}
      </div>
    </>
  );
};
