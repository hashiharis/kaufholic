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
  fetchSellerDetails,
  editSellerDetails,
  sellerMetrics,
} = require("../controller/seller.controller");
const {
  validateEmailPasswordRequired,
  validateResetPassFieldsrequired,
} = require("../middlewares/validateEmailPasswordRequired");
const {
  validateSellerEditFields,
} = require("../middlewares/validateSellerDetails");
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

sellerRouter.get("/sellerprofile/:sellerId", fetchSellerDetails);
sellerRouter.patch(
  "/update/:sellerId",
  validateSellerEditFields,
  validateEmail,
  validateContact,
  validatePincode,
  editSellerDetails
);
sellerRouter.get("/metrics/:sellerId", sellerMetrics);

module.exports = sellerRouter;
