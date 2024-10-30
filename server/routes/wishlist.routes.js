const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controller/wishlist.controller");

const wishlistRouter = express.Router();

wishlistRouter.post("/addtowishlist/:buyerId/:productId", addToWishlist);
wishlistRouter.get("/viewwishlist/:buyerId", getWishlist);
wishlistRouter.delete(
  "/removefromwishlist/:buyerId/:productId",
  removeFromWishlist
);
module.exports = wishlistRouter;
