const express = require("express");
const {
  validateProductAddRequiredFields,
  validateDiscount,
} = require("../middlewares/validateProductAddRequiredFields");
const {
  addProduct,
  fetchProductsBySeller,
  getProducts,
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

module.exports = productRouter;
