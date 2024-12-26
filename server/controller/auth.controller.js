const SellerModel = require("../model/seller.model");
const BuyerModel = require("../model/buyer.model");
const isValidId = require("../utils/validId");

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
    console.log("Error on  password reset", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const updateAccountStatus = async (req, res) => {
  try {
    // const { sellerId } = req.params;
    // const { buyerId } = req.params;
    const { id } = req.params;
    const { isActive } = req.query;

    const isActiveBool = {};
    if (isActive === "true" || isActive === "false") {
      isActiveBool.isActive = isActive === "true";
    }

    // console.log(isActive);

    if (!isValidId(id)) {
      return res.status(400).json({ message: "Id is not valid" });
    }

    const sellerFound = await SellerModel.findById(id);
    const buyerFound = await BuyerModel.findById(id);
    // console.log(sellerFound);
    if (sellerFound) {
      const updSellerAccount = await SellerModel.findByIdAndUpdate(
        id,
        { isActive: isActiveBool.isActive },
        { new: true }
      );
      console.log(updSellerAccount);
      if (!updSellerAccount) {
        return res
          .status(404)
          .json({ message: "Seller account status not updated" });
      }
      return res.status(200).json({
        message: "Seller account status updated successfully",
        data: updSellerAccount,
      });
    }
    if (buyerFound) {
      const updBuyerAccount = await BuyerModel.findByIdAndUpdate(
        id,
        { isActive: isActiveBool.isActive },
        { new: true }
      );

      if (!updBuyerAccount) {
        return res
          .status(404)
          .json({ message: "Buyer account status not updated" });
      }
      return res.status(200).json({
        message: "Buyer account status updated successfully",
        data: updBuyerAccount,
      });
    }
  } catch (error) {
    console.log("Error in updating  account status", error);
    return res.status(500).json({ message: "Server error" });
  }
};
module.exports = { forgotPassword, updateAccountStatus };
