import { useEffect, useState } from "react";
import { ProductCard } from "../product-view-cards/ProductCard";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import styles from "./wishlistwrapper.module.css";
import { Footer } from "../../footer/Footer";

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
        // console.log(res?.data?.data);
        setWishlist(res?.data?.data);
      }
      if (res.data.message === "Your wishlist is empty") {
        setIsWishlistEmpty(true);
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

  console.log(wishlist);
  return (
    <>
      <BuyerNav />
      {isWishlistEmpty ? (
        <>
          <h1>You have no favourite products!!!</h1>
          <div className={styles.emptyImage}></div>
        </>
      ) : (
        <div className={styles.wishlistWrapper}>
          {wishlist?.map((item, index) => (
            <ProductCard
              key={index}
              item={item.productId}
              isFav={true}
              fetchWishlistProducts={fetchWishlist}
            />
          ))}
        </div>
      )}
      <Footer />
    </>
  );
};
