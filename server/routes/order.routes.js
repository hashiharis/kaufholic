const express = require("express");
const {
  addOrder,
  fetchOrdersByBuyerId,
} = require("../controller/orders.controller");
const orderRouter = express.Router();

orderRouter.post("/new/:buyerId", addOrder);
orderRouter.get("/listOrders/:buyerId", fetchOrdersByBuyerId);

module.exports = orderRouter;
