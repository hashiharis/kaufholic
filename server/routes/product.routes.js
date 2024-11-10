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
} = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  validateProductAddRequiredFields,
  validateDiscount,
  addProduct
);
productRouter.get("/fetchProduct/:sellerId", fetchProductsBySeller);
productRouter.get("/viewall", getProducts);
productRouter.get("/productDetail/:productId", getProductById);
productRouter.patch("/addRating/:buyerId/:productId", addRatingToProduct);

module.exports = productRouter;
