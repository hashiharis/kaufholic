const express = require("express");
const { adminSignin } = require("../controller/admin.controller");
const {
  validateEmailPasswordRequired,
} = require("../middlewares/validateEmailPasswordRequired");
const { validateEmail } = require("../middlewares/validateEmail");
const { validatePassword } = require("../middlewares/validatePassword");
const adminRouter = express.Router();

adminRouter.post(
  "/signin",
  validateEmailPasswordRequired,
  validateEmail,
  validatePassword,
  adminSignin
);

module.exports = adminRouter;
