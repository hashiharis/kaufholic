const express = require("express");
const { validateEmail } = require("../middlewares/validateEmail");
const { validatePassword } = require("../middlewares/validatePassword");
const {
  buyerSignup,
  buyerSignin,
  getBuyerById,
  getBuyerByToken,
} = require("../controller/buyer.controller");
const {
  validateRequiredFields,
} = require("../middlewares/validateRequiredFields");
const {
  validateEmailPasswordRequired,
} = require("../middlewares/validateEmailPasswordRequired");
const { protectRoute } = require("../middlewares/validateToken");

const buyerRouter = express.Router();

buyerRouter.post(
  "/signup",
  validateRequiredFields,
  validateEmail,
  validatePassword,
  buyerSignup
);

buyerRouter.post(
  "/signin",
  validateEmailPasswordRequired,
  validatePassword,
  buyerSignin
);

// buyerRouter.get("/fetchCurrentBuyer/:id", getBuyerById);
buyerRouter.get("/currentuser/:id", protectRoute, getBuyerByToken);

module.exports = buyerRouter;
