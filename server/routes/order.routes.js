const express = require("express");
const { addOrder } = require("../controller/orders.controller");
const orderRouter = express.Router();

orderRouter.post("/new/:buyerId", addOrder);

module.exports = orderRouter;
