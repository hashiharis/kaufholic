const express = require("express");
const {
  addOrder,
  fetchPendingOrdersByBuyerId,
  fetchOrdersBySellerId,
  setDeliveryDate,
  fetchConfirmedOrders,
  fetchDeliveredOrders,
  fetchDeliveredOrdersByBuyerId,
  fetchAllOrders,
} = require("../controller/orders.controller");
const { validateDeliveryDate } = require("../middlewares/validateDeliveryDate");
const orderRouter = express.Router();

orderRouter.post("/new/:buyerId", addOrder);
orderRouter.get("/listOrders/:buyerId", fetchPendingOrdersByBuyerId);
orderRouter.get("/listPastOrders/:buyerId", fetchDeliveredOrdersByBuyerId);
orderRouter.get("/sellerOrders/:sellerId", fetchOrdersBySellerId);
orderRouter.patch(
  "/setdeliverydate/:orderId/:productId",
  validateDeliveryDate,
  setDeliveryDate
);
orderRouter.get("/confirmedorders/:sellerId", fetchConfirmedOrders);
orderRouter.get("/deliveredorders/:sellerId", fetchDeliveredOrders);
orderRouter.get("/allOrders", fetchAllOrders);

module.exports = orderRouter;
