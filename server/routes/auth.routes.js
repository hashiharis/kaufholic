const express = require("express");
const {
  validateResetPassFieldsrequired,
} = require("../middlewares/validateEmailPasswordRequired");
const { validateResetPassword } = require("../middlewares/validatePassword");
const { forgotPassword } = require("../controller/auth.controller");
const authRouter = express.Router();

authRouter.patch(
  "/resetpassword",
  validateResetPassFieldsrequired,
  validateResetPassword,
  forgotPassword
);
module.exports = authRouter;
