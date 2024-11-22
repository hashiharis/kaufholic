const express = require("express");
const {
  addToCart,
  fetchCartItems,
  deleteCartItem,
} = require("../controller/cart.controller");

const cartRouter = express.Router();

cartRouter.post("/addToCart/:buyerId/:productId", addToCart);
cartRouter.get("/getCartItems/:buyerId", fetchCartItems);
cartRouter.delete("/removefromcart/:buyerId/:productId", deleteCartItem);

module.exports = cartRouter;
