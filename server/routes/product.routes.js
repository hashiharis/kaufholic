const express = require("express");
const {
  validateProductAddRequiredFields,
  validateDiscount,
} = require("../middlewares/validateProductAddRequiredFields");
const {
  addProduct,
  fetchProductsBySeller,
  getProducts,
  getProductById,
  addRatingToProduct,
  sortByPriceAscending,
  sortByPriceDescending,
  filterByCategory,
  searchProduct,
  priceRangeFilter,
  sortByRatingsDescending,
  editProductDetails,
  getReviews,
} = require("../controller/product.controller");
const { calculateAvgRating } = require("../middlewares/validateAvgRating");
const { upload } = require("../middlewares/imgUpload");

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  upload.single("productImage"),
  validateProductAddRequiredFields,
  validateDiscount,
  addProduct
);
productRouter.patch(
  "/editProductDetails/:productId",
  upload.single("productImage"),
  validateProductAddRequiredFields,
  validateDiscount,
  editProductDetails
);
productRouter.get("/fetchProduct/:sellerId", fetchProductsBySeller);
productRouter.get("/viewall", getProducts);
productRouter.get("/productDetail/:productId", getProductById);
productRouter.patch(
  "/addRating/:buyerId/:productId",
  calculateAvgRating,
  addRatingToProduct
);
productRouter.get("/reviews/:productId", getReviews);
productRouter.get("/sortByLowToHigh", sortByPriceAscending);
productRouter.get("/sortByHighToLow", sortByPriceDescending);
productRouter.get("/sortByRating", sortByRatingsDescending);
productRouter.get("/filterByCategory", filterByCategory);
productRouter.get("/search", searchProduct);
productRouter.get("/priceRange", priceRangeFilter);

module.exports = productRouter;
