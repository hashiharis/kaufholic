const express = require("express");
const { validateEmail } = require("../middlewares/validateEmail");
const { validatePassword } = require("../middlewares/validatePassword");
const { buyerSignup, buyerSignin } = require("../controller/buyer.controller");
const {
  validateRequiredFields,
} = require("../middlewares/validateRequiredFields");
const {
  validateEmailPasswordRequired,
} = require("../middlewares/validateEmailPasswordRequired");

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

module.exports = buyerRouter;
