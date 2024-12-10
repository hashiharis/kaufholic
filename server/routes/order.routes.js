const express = require("express");
const {
  addOrder,
  fetchOrdersByBuyerId,
  fetchOrdersBySellerId,
  setDeliveryDate,
} = require("../controller/orders.controller");
const orderRouter = express.Router();

orderRouter.post("/new/:buyerId", addOrder);
orderRouter.get("/listOrders/:buyerId", fetchOrdersByBuyerId);
orderRouter.get("/sellerOrders/:sellerId", fetchOrdersBySellerId);
orderRouter.patch("/setdeliverydate/:orderId/:productId", setDeliveryDate);

module.exports = orderRouter;
