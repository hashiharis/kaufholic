const express = require("express");
const {
  validateProductAddRequiredFields,
} = require("../middlewares/validateProductAddRequiredFields");
const {
  addProduct,
  fetchProductsBySeller,
} = require("../controller/product.controller");

const productRouter = express.Router();

productRouter.post("/addProduct", validateProductAddRequiredFields, addProduct);
productRouter.get("/fetchProduct/:sellerId", fetchProductsBySeller);

module.exports = productRouter;
