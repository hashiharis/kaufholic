import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import styles from "./productwrapper.module.css";
import { axiosInstance } from "../../../apis/axiosInstance";
import toast from "react-hot-toast";
import { BuyerNav } from "../../navbar/usernavbar/buyernavbar/BuyerNav";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { IoFilterOutline } from "react-icons/io5";
import Slider from "@mui/material/Slider";
import { CiSearch } from "react-icons/ci";
import { Footer } from "../../footer/Footer";
import { PaginationButton } from "./PaginationButton";

export const ProductCardWrapper = () => {
  const [productView, setProductView] = useState([]);
  const [inWishlist, setInWishlist] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [categoryFilterValue, setCategoryFilterValue] = useState("");
  const [range, setRange] = useState([500, 10000]);
  const [dropdownValue, setDropdownValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [resultsFound, setResultsFound] = useState("results found");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const isFav = false;

  const lastProductIndex = currentPage * productsPerPage; //pagination index
  const firstProductIndex = lastProductIndex - productsPerPage; //pagination index

  const mark = [
    {
      value: 500,
      label: "₹500",
    },
    {
      value: 2500,
      label: "₹2500",
    },
    {
      value: 5000,
      label: "₹5000",
    },
    {
      value: 7500,
      label: "₹7500",
    },
    {
      value: 10000,
      label: "₹10000",
    },
  ];

  const valueText = (value) => {
    return `₹${value}`;
  };

  useEffect(() => {
    showProducts();
    const buyerId = localStorage.getItem("kh-buyerId") || null;
    console.log("buyer id", buyerId);
    if (buyerId) {
      fetchWishlistProducts(buyerId);
    }
  }, [isFav]);

  const currentProducts = productView.slice(
    firstProductIndex,
    lastProductIndex
  );

  //  Debouncing for search results
  useEffect(() => {
    const searchResults = setTimeout(() => {
      if (searchQuery) {
        getSearchData(searchQuery);
      } else {
        setResultsFound("results found");
        showProducts();
      }
    }, 2000);

    return () => clearTimeout(searchResults);
  }, [searchQuery]);

  const handlePriceRange = (e, newValue) => {
    setRange(newValue);
    setTimeout(() => {
      filterByPriceRange(newValue);
    }, 1000);
  };

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

  const sortByLowToHigh = async (e) => {
    try {
      setDropdownValue(e.target.text);
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

  const sortByHighToLow = async (e) => {
    try {
      setDropdownValue(e.target.text);
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

  const sortByRatings = async (e) => {
    try {
      setDropdownValue(e.target.text);
      const res = await axiosInstance.get("/product/sortByRating");
      if (res.status === 200) {
        console.log("sorted by rating", res);
        setProductView(res?.data?.sortedByRating);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("Something went wrong");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on sorting by rating", error);
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

  const filterByPriceRange = async (rangeValues) => {
    try {
      const minPrice = rangeValues[0];
      const maxPrice = rangeValues[1];
      const res = await axiosInstance.get(
        `/product/priceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      if (res.status === 200) {
        console.log("product in price range", res);
        setProductView(res?.data?.productsByPriceRange);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("No Products available in this range");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on filtering the product list", error);
    }
  };

  const getSearchData = async (searchTerm) => {
    try {
      const res = await axiosInstance.get(
        `/product/search?query=${searchTerm}`
      );
      if (res.status === 200) {
        // console.log("search data", res?.data?.results);
        setProductView(res?.data?.results);
      }
    } catch (error) {
      const statusCode = error.response.status;
      if (statusCode === 400 || statusCode === 404) {
        toast.error("No Results found");
        setResultsFound("no results found");
      } else {
        toast.error("Please try again after sometime");
      }
      console.log("Error on searching the product list", error);
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
  console.log("query", searchQuery);
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
              Sort By {`${dropdownValue}`}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  sortByLowToHigh(e);
                }}
              >
                Price: Low to High
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  sortByHighToLow(e);
                }}
              >
                Price: High to Low
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  sortByRatings(e);
                }}
              >
                Customer Ratings
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className={styles.searchSection}>
          <input
            type="search"
            placeholder="Search for Products"
            className={styles.searchBox}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          />
          <CiSearch className={styles.searchIcon} size={"20px"} />
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
          <div className={styles.sliderComponent}>
            Filter By Price
            <Slider
              value={range}
              onChange={handlePriceRange}
              valueLabelDisplay="on"
              min={500}
              max={10000}
              step={1000}
              marks={mark}
              getAriaValueText={valueText}
            />
          </div>
        </div>
      )}
      {resultsFound === "results found" ? (
        <div className={styles.productCardWrapper}>
          {currentProducts?.map((item, index) => {
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
          <div className={styles.paginationSection}>
            <PaginationButton
              totalProducts={productView.length}
              productsPerPage={productsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
      ) : (
        <div className={styles.noResults}></div>
      )}
      <Footer />
    </>
  );
};
