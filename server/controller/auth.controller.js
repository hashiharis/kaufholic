const SellerModel = require("../model/seller.model");
const BuyerModel = require("../model/buyer.model");

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const isBuyerEmailTaken = await BuyerModel.findOne({ email });
    const isSellerEmailTaken = await SellerModel.findOne({ email });

    if (isBuyerEmailTaken) {
      const buyerFound = await BuyerModel.findOneAndUpdate(
        { email },
        { password: req.hashedPassword },
        { new: true }
      );

      if (!buyerFound) {
        return res.status(404).json({ message: "Buyer not found" });
      }
      return res.status(200).json({
        message: "Password is resetted succesfully",
        data: buyerFound,
        userType: "buyer",
      });
      // return res
      //   .status(400)
      //   .json({ message: "Email id already exist in buyer model" });
    } else if (isSellerEmailTaken) {
      const sellerFound = await SellerModel.findOneAndUpdate(
        { email },
        { password: req.hashedPassword },
        { new: true }
      );

      if (!sellerFound) {
        return res.status(404).json({ message: "Seller not found" });
      }

      return res.status(200).json({
        message: "Password is resetted succesfully",
        data: sellerFound,
        userType: "seller",
      });
    }
    return res.status(404).json({ message: "Such a user doesn't exist" });
  } catch (error) {
    console.log("Error on seller password reset", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { forgotPassword };
