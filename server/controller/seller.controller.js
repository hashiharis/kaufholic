const SellerModel = require("../model/seller.model");
const { comparePassword } = require("../utils/comparePassword");

const sellerSignup = async (req, res) => {
  try {
    const { name, email, password, contact, address, pincode, description } =
      req.body;

    const isEmailTaken = await SellerModel.findOne({ email });

    if (isEmailTaken) {
      return res.status(400).json({ message: "Email id already exist" });
    }

    let newSeller = new SellerModel({
      name,
      email,
      password: req.hashedPassword,
      contact,
      address,
      pincode,
      description,
    });

    await newSeller.save();

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.log("Error on seller sign up", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const sellerSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sellerFound = await SellerModel.findOne({ email });

    if (!sellerFound) {
      return res.status(404).json({ message: "Seller not found" });
    }

    const isPasswordMatch = await comparePassword(
      password,
      sellerFound.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email id or password" });
    }

    const sellerDetails = sellerFound.toObject();
    delete sellerDetails.password;
    return res
      .status(200)
      .json({ message: "Login success", seller: sellerDetails });
  } catch (error) {
    console.log("Error on seller sign in", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const sellerResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const sellerFound = await SellerModel.findOneAndUpdate(
      { email },
      { password: req.hashedPassword },
      { new: true }
    );

    if (!sellerFound) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res
      .status(200)
      .json({ message: "Password is resetted succesfully", data: sellerFound });
  } catch (error) {
    console.log("Error on seller password reset", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { sellerSignup, sellerSignin, sellerResetPassword };
