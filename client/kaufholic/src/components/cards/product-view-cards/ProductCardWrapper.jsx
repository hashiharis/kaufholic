import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "./productwrapper.module.css";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { IoFilterOutline } from "react-icons/io5";

export const ProductCardWrapper = () => {
  const [productView, setProductView] = useState([]);
  const [inWishlist, setInWishlist] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const isFav = false;

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

  const sortByLowToHigh = async () => {
    try {
      const res = await axiosInstance.get("/product/sortByLowToHigh");
      if (res.status === 200) {
        console.log("sorted", res);
        setProductView(res?.data?.priceSortLowToHigh);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on sorting the product list", error);
    }
  };

  const sortByHighToLow = async () => {
    try {
      const res = await axiosInstance.get("/product/sortByHighToLow");
      if (res.status === 200) {
        console.log("sorted", res);
        setProductView(res?.data?.priceSortHighToLow);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on sorting the product list", error);
    }
  };

  const filterByCategory = async (selectedCatgeory) => {
    try {
      const res = await axiosInstance.get(
        `/product/filterByCategory?category=${selectedCatgeory}`
      );
      if (res.status === 200) {
        console.log("cat", res);
        setProductView(res?.data?.category);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on filtering the product list", error);
    }
  };

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

      // console.log("wid,pid", productIdInWishlist, productId);
      return productIdInWishlist === productId;
    });
    // console.log("prod found", productFound);
    return productFound;
  };

  const showFilterOptions = () => {
    setShowFilter((showFilter) => !showFilter);
  };

  const manageCategoryFilter = (e) => {
    setCategoryFilterValue(e.target.value);
    if (e.target.value === "Men") {
      filterByCategory(e.target.value);
    } else if (e.target.value === "Women") {
      filterByCategory(e.target.value);
    } else {
      filterByCategory(e.target.value);
    }
  };
  console.log(categoryFilterValue);
  return (
    <>
      <BuyerNav />
      <div className={styles.filterSortSection}>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              id="dropdown-basic"
              className={styles.dropdownContainer}
            >
              Sort by Price
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={sortByLowToHigh}>
                Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={sortByHighToLow}>
                High to Low
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <Button onClick={showFilterOptions} className={styles.filterBtn}>
            <IoFilterOutline />
            Filters
          </Button>
        </div>
      </div>
      {showFilter && (
        <div className={styles.filterSection}>
          <div>
            <select
              onChange={manageCategoryFilter}
              className={styles.categorySelect}
              value="Categories"
            >
              <option disabled>Categories</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Accessories">Accessories</option>
            </select>
          </div>
        </div>
      )}
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
