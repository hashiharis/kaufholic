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

    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer Id is not valid" });
    }

    productDetails.map(({ productId, quantity }) => {
      if (!isValidId(productId)) {
        return res.status(400).json({ message: "Product Id is not valid" });
      }
    });
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

const fetchOrdersByBuyerId = async (req, res) => {
  try {
    const { buyerId } = req.params;

    console.log(buyerId);

    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer id is not valid" });
    }

    const orderedProducts = await OrderModel.find({ buyerId })
      .populate("orderedProducts.productId")
      .exec();

    if (orderedProducts.length === 0) {
      return res.status(200).json({ message: "No orders found" });
    }

    return res
      .status(200)
      .json({ message: "Orders fetched successfully", data: orderedProducts });
  } catch (error) {
    console.log("Error on fetching orders by buyer id", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const fetchOrdersBySellerId = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!isValidId(sellerId)) {
      return res.status(400).json({ message: "Seller id is not valid" });
    }
    const orders = await OrderModel.find()
      .populate({
        path: "orderedProducts.productId", // Populate productId within orderedProducts
        populate: {
          path: "sellerId", // Populate sellerId from the ProductModel
        },
      })
      .exec();

    const filteredOrders = orders.filter((order) =>
      order.orderedProducts.some(
        (orderedProduct) =>
          orderedProduct.productId.sellerId.toString() === sellerId
      )
    );

    if (!filteredOrders) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res
      .status(200)
      .json({ message: "Orders fetched successfully", data: orders });
  } catch (error) {
    console.log("Error on fetching orders by seller id", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addOrder, fetchOrdersByBuyerId, fetchOrdersBySellerId };
