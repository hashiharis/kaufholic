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
// productRouter.post(
//   "/testImageUpload",
//   upload.single("productImage"),
//   addProduct
// );
productRouter.get("/fetchProduct/:sellerId", fetchProductsBySeller);
productRouter.get("/viewall", getProducts);
productRouter.get("/productDetail/:productId", getProductById);
productRouter.patch(
  "/addRating/:buyerId/:productId",
  calculateAvgRating,
  addRatingToProduct
);
productRouter.get("/sortByLowToHigh", sortByPriceAscending);
productRouter.get("/sortByHighToLow", sortByPriceDescending);
productRouter.get("/sortByRating", sortByRatingsDescending);
productRouter.get("/filterByCategory", filterByCategory);
productRouter.get("/search", searchProduct);
productRouter.get("/priceRange", priceRangeFilter);

module.exports = productRouter;
