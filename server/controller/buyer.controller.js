const BuyerModel = require("../model/buyer.model");
const { comparePassword } = require("../utils/comparePassword");
const generateAccessToken = require("../utils/generateToken");
const isValidId = require("../utils/validId");
const axios = require("axios");

const buyerSignup = async (req, res) => {
  try {
    const { name, email } = req.body;

    const isEmailTaken = await BuyerModel.findOne({ email });

    if (isEmailTaken) {
      return res.status(400).json({ message: "Email id already exist" });
    }

    let newBuyer = new BuyerModel({
      name,
      email,
      password: req.hashedPassword,
      signupMethod: "manual",
    });

    await newBuyer.save();

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.log("Error on signup", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const buyerGoogleSignup = async (req, res) => {
  try {
    const { token } = req.body;

    // Make a request to the Google UserInfo API using the access token

    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    // Get user data from the Google response
    const { name, email, sub: googleId } = googleUser.data;

    const isBuyerFound = await BuyerModel.findOne({ googleId });

    if (!isBuyerFound) {
      const buyer = new BuyerModel({
        name,
        email,
        googleId,
        signupMethod: "google",
      });

      await buyer.save();

      return res.status(201).json({ message: "Google sign up successful" });
    }
  } catch (error) {
    console.log("Error on google signup", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const buyerGoogleSignin = async (req, res) => {
  try {
    const { token } = req.body;

    const googleUser = await axios(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    const { name, email, sub: googleId } = googleUser.data;

    const isBuyerFound = await BuyerModel.findOne({ googleId });

    if (!isBuyerFound) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    const buyerDetails = isBuyerFound.toObject();

    const accessToken = generateAccessToken(buyerDetails);

    if (!buyerDetails.isActive) {
      return res.status(403).json({ message: "Buyer account is inactive" });
    }

    return res.status(200).json({
      message: "Google sign in successful",
      token: accessToken,
      data: buyerDetails,
    });
  } catch (error) {
    console.log("Error on google sign in ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const buyerSignin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const buyerFound = await BuyerModel.findOne({ email });

    if (!buyerFound) {
      return res
        .status(404)
        .json({ message: "Incorrect email id or password" });
    }

    const isPasswordMatch = await comparePassword(
      password,
      buyerFound.password
    );

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Incorrect email id or password" });
    }

    const buyerDetails = buyerFound.toObject();
    delete buyerDetails.password;

    const accessToken = generateAccessToken(buyerDetails);

    if (!buyerDetails.isActive) {
      return res.status(403).json({ message: "Buyer account is inactive" });
    }

    return res.status(200).json({
      message: "Login successful",
      token: accessToken,
      loginDetails: buyerDetails,
    });
  } catch (error) {
    console.log("Error on sign in ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBuyerById = async (req, res) => {
  try {
    const { id } = req.params;

    const buyerFound = await BuyerModel.findById(id);

    if (!buyerFound) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    return res
      .status(200)
      .json({ message: "Buyer details fetched", data: buyerFound });
  } catch (error) {
    console.log("Error on fetching buyer data ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getBuyerByToken = async (req, res) => {
  try {
    const { id } = req.params;

    const buyerFound = await BuyerModel.findById(id);

    if (!buyerFound) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    return res
      .status(200)
      .json({ message: "Buyer details fetched", data: req.buyer });
  } catch (error) {
    console.log("Error on fetching buyer data ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBuyerProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { buyerId } = req.params;

    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer id is invalid" });
    }

    const updBuyer = await BuyerModel.findByIdAndUpdate(
      buyerId,
      { name, email },
      { new: true }
    );

    if (!updBuyer) {
      return res.status(404).json({ message: "Buyer details not found" });
    }

    return res.status(200).json({
      message: "Buyer profile updated successfully",
      data: updBuyer,
    });
  } catch (error) {
    console.log("Error on updating buyer data ", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getAllBuyers = async (req, res) => {
  try {
    const buyers = await BuyerModel.find();

    if (buyers.length === 0) {
      return res.status(404).json({ message: "No buyers found" });
    }

    return res
      .status(200)
      .json({ message: "Fetched all buyers successfully", data: buyers });
  } catch (error) {
    console.log("Error in fetching all buyers", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getBuyersByAccountStatus = async (req, res) => {
  try {
    const { isActive } = req.query;

    const isActiveBool = {};

    if (isActive === "true" || isActive === "false") {
      isActiveBool.isActive = isActive === "true";
    }

    const allBuyers = await BuyerModel.find({
      isActive: isActiveBool.isActive,
    });

    if (allBuyers.length === 0) {
      return res.status(404).json({ message: "Buyers not found" });
    }

    return res
      .status(200)
      .json({ message: "Fetched buyers successfully", data: allBuyers });
  } catch (error) {
    console.log("Error on fetching buyers", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  buyerSignup,
  buyerGoogleSignup,
  buyerGoogleSignin,
  buyerSignin,
  getBuyerById,
  getBuyerByToken,
  updateBuyerProfile,
  getAllBuyers,
  getBuyersByAccountStatus,
};
