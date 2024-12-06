const express = require("express");
const {
  validateSellerRequiredFields,
} = require("../middlewares/validateRequiredFields");
const { validateEmail } = require("../middlewares/validateEmail");
const {
  validatePassword,
  validateResetPassword,
} = require("../middlewares/validatePassword");
const {
  validateContact,
  validatePincode,
} = require("../middlewares/validateContact");
const {
  sellerSignup,
  sellerSignin,
  sellerResetPassword,
} = require("../controller/seller.controller");
const {
  validateEmailPasswordRequired,
  validateResetPassFieldsrequired,
} = require("../middlewares/validateEmailPasswordRequired");
const sellerRouter = express.Router();

sellerRouter.post(
  "/signup",
  validateSellerRequiredFields,
  validateEmail,
  validatePassword,
  validateContact,
  validatePincode,
  sellerSignup
);

sellerRouter.post(
  "/signin",
  validateEmailPasswordRequired,
  validateEmail,
  validatePassword,
  sellerSignin
);

sellerRouter.patch(
  "/resetpassword",
  validateResetPassFieldsrequired,
  validateResetPassword,
  sellerResetPassword
);

module.exports = sellerRouter;
