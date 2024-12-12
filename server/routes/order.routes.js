const express = require("express");
const {
  addOrder,
  fetchOrdersByBuyerId,
  fetchOrdersBySellerId,
  setDeliveryDate,
  fetchConfirmedOrders,
  fetchDeliveredOrders,
} = require("../controller/orders.controller");
const { validateDeliveryDate } = require("../middlewares/validateDeliveryDate");
const orderRouter = express.Router();

orderRouter.post("/new/:buyerId", addOrder);
orderRouter.get("/listOrders/:buyerId", fetchOrdersByBuyerId);
orderRouter.get("/sellerOrders/:sellerId", fetchOrdersBySellerId);
orderRouter.patch(
  "/setdeliverydate/:orderId/:productId",
  validateDeliveryDate,
  setDeliveryDate
);
orderRouter.get("/confirmedorders/:sellerId", fetchConfirmedOrders);
orderRouter.get("/deliveredorders/:sellerId", fetchDeliveredOrders);

module.exports = orderRouter;
