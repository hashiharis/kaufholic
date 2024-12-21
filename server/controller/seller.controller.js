const { genSaltSync } = require("bcrypt");
const BuyerModel = require("../model/buyer.model");
const OrderModel = require("../model/order.model");
const ProductModel = require("../model/product.model");
const SellerModel = require("../model/seller.model");
const { comparePassword } = require("../utils/comparePassword");
const isValidId = require("../utils/validId");
const generateAccessToken = require("../utils/generateToken");

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

    const accessToken = generateAccessToken(sellerDetails);

    if (sellerDetails.approval === "pending") {
      return res
        .status(202)
        .json({ message: "Sign in request is waiting for approval" });
    }

    if (sellerDetails.approval === "rejected") {
      return res
        .status(403)
        .json({ message: "Sign in request has been rejected" });
    }

    return res.status(200).json({
      message: "Login success",
      token: accessToken,
      seller: sellerDetails,
    });
  } catch (error) {
    console.log("Error on seller sign in", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const fetchSellerDetails = async (req, res) => {
  try {
    const { sellerId } = req.params;
    if (!isValidId(sellerId)) {
      return res.status(400).json({ message: "Seller id is not valid!" });
    }

    const sellerFound = await SellerModel.findById(sellerId);

    if (!sellerFound) {
      return res.status(404).json({ message: "Seller not found" });
    }
    return res.status(200).json({
      message: "Seller details fetched successfully",
      data: sellerFound,
    });
  } catch (error) {
    console.log("Error on fetching seller details", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const editSellerDetails = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { name, email, contact, address, pincode, description } = req.body;

    if (!isValidId(sellerId)) {
      return res.status(400).json({ message: "Seller id is not valid" });
    }

    const updSellerDetails = await SellerModel.findByIdAndUpdate(
      sellerId,
      {
        name,
        email,
        contact,
        address,
        pincode,
        description,
      },
      {
        new: true,
      }
    );

    if (!updSellerDetails) {
      return res.status(404).json({ message: "Updated seller not found" });
    }

    return res.status(200).json({
      message: "Seller details updated successfully",
      data: updSellerDetails,
    });
  } catch (error) {
    console.log("Error on updating seller details", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const sellerMetrics = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const buyers = await BuyerModel.find();
    const orders = await OrderModel.find()
      .populate({
        path: "orderedProducts.productId",
        populate: {
          path: "sellerId",
        },
      })
      .exec();

    const ordersBySeller = orders.filter((order) =>
      order.orderedProducts.some(
        (orderedProduct) =>
          orderedProduct.productId.sellerId._id.toString() === sellerId
      )
    );

    const products = await ProductModel.find({ sellerId });

    if (!isValidId(sellerId)) {
      return res.status(400).json({ message: "Seller id is not valid" });
    }
    // if (buyers.length === 0) {
    //   return res.status(404).json({ message: "No buyers found" });
    // }
    // if (orders.length === 0) {
    //   return res.status(404).json({ message: "No orders found" });
    // }
    // if (products.length === 0) {
    //   return res.status(404).json({ message: "No products found" });
    // }
    let metrics = {
      totalBuyers: buyers.length,
      totalOrders: ordersBySeller.length,
      totalProducts: products.length,
    };

    return res.status(200).json({ message: "metrices fetched", data: metrics });
  } catch (error) {
    console.log("Error on fetching dashboard metrics", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const sellerList = async (req, res) => {
  try {
    const { approval } = req.query;
    const sellers = await SellerModel.find({ approval });

    if (sellers.length === 0) {
      return res.status(202).json({ message: "Seller not found" });
    }

    return res
      .status(200)
      .json({ message: "Sellers fetched successfully", data: sellers });
  } catch (error) {
    console.log("Error on fetching sellers", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const sellerApprovalUpdate = async (req, res) => {
  try {
    const { approval } = req.query;
    const { sellerId } = req.params;

    if (!isValidId(sellerId)) {
      return res.status(400).json({ message: "Seller id is not valid" });
    }

    const updSellerApproval = await SellerModel.findByIdAndUpdate(
      sellerId,
      { approval },
      { new: true }
    );

    if (!updSellerApproval) {
      return res.status(404).json({ message: "Seller not found" });
    }

    return res.status(200).json({
      message: "Seller approval status is updated successfully",
      data: updSellerApproval,
    });
  } catch (error) {
    console.log("Error on updating approval status for sellers", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = {
  sellerSignup,
  sellerSignin,
  fetchSellerDetails,
  editSellerDetails,
  sellerMetrics,
  sellerList,
  sellerApprovalUpdate,
};
