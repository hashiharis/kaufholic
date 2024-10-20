const BuyerModel = require("../model/buyer.model");

const buyerSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let newBuyer = new BuyerModel({
      name,
      email,
      password,
    });

    await newBuyer.save();

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.log("Error on signup", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const buyerSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyerFound = await BuyerModel.findOne({ email });

    if (!buyerFound) {
      return res
        .status(404)
        .json({ message: "Incorrect email id and password" });
    }

    if (buyerFound.password !== password) {
      return res
        .status(400)
        .json({ message: "Incorrect email id and password" });
    }

    return res.status(200).json({ message: "Login successfull" });
  } catch (error) {
    console.log("Error on sign in ", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { buyerSignup, buyerSignin };
