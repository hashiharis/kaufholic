const BuyerModel = require("../model/buyer.model");
const validateEmail = async (req, res, next) => {
  const { email } = req.body;

  const isEmailTaken = await BuyerModel.findOne({ email });

  if (isEmailTaken) {
    return res.status(400).json({ message: "Email id already exist" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid entry" });
  }

  next();
};

module.exports = { validateEmail };
