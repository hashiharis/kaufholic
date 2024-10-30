const express = require("express");
const {
  validateProductAddRequiredFields,
  validateDiscount,
} = require("../middlewares/validateProductAddRequiredFields");
const {
  addProduct,
  fetchProductsBySeller,
  getProducts,
  updateFavourite,
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
productRouter.patch("/updateFavourite/:productId/:buyerId", updateFavourite);

module.exports = productRouter;
