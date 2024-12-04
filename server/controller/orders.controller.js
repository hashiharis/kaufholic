const OrderModel = require("../model/order.model");
const isValidId = require("../utils/validId");

const addOrder = async (req, res) => {
  try {
    const { buyerId } = req.params;
    const {
      productDetails,
      email,
      fName,
      lName,
      stateRegion,
      address,
      contact,
      cardHName,
      cardNo,
      expiryDate,
      cvv,
      price,
      shippingCharge,
      discountPrice,
      totalPrice,
    } = req.body;

    const { productId, quantity } = productDetails;
    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer Id is not valid" });
    }

    // if (!isValidId(productId)) {
    //   return res.status(400).json({ message: "Product Id is not valid" });
    // }

    const newOrder = new OrderModel({
      buyerId,
      orderedProducts: productDetails.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      email,
      fName,
      lName,
      stateRegion,
      address,
      contact,
      cardHName,
      cardNo,
      expiryDate,
      cvv,
      price,
      shippingCharge,
      discountPrice,
      totalPrice,
    });
    await newOrder.save();
    return res
      .status(201)
      .json({ message: "Order added successfully", data: newOrder });
  } catch (error) {
    console.log("Error on adding orders", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addOrder };
