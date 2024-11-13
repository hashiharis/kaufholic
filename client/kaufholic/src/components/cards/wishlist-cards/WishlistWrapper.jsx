import { useEffect, useState } from "react";
import { ProductCard } from "../product-view-cards/ProductCard";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import styles from "./wishlistwrapper.module.css";

export const WishlistWrapper = () => {
  const [wishlist, setWishlist] = useState([]);
  const [isWishlistEmpty, setIsWishlistEmpty] = useState(false);

  useEffect(() => {
    const buyerId = localStorage.getItem("kh-buyerId") || null;
    fetchWishlist(buyerId);
  }, []);

  const fetchWishlist = async (id) => {
    try {
      const res = await axiosInstance.get(`/wishlist/viewwishlist/${id}`);
      if (res.status === 200) {
        console.log(res.data.data);
        setWishlist(res?.data?.data);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400) {
        toast.error("Something went wrong");
      } else if (statusCode === 404) {
        setIsWishlistEmpty(true);
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on fetching wishlist", error);
    }
  };

  console.log(wishlist);
  return (
    <>
      <BuyerNav />
      {isWishlistEmpty ? (
        <div className={styles.emptyImage}></div>
      ) : (
        <div className={styles.wishlistWrapper}>
          {wishlist?.map((item, index) => (
            <ProductCard key={index} item={item.productId} />
          ))}
        </div>
      )}
    </>
  );
};
