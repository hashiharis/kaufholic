const BuyerModel = require("../model/buyer.model");
const CartModel = require("../model/cart.model");
const ProductModel = require("../model/product.model");
const isValidId = require("../utils/validId");

const addToCart = async (req, res) => {
  try {
    const { buyerId, productId } = req.params;

    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer Id is not valid" });
    }

    if (!isValidId(productId)) {
      return res.status(400).json({ message: "Product Id is not valid" });
    }

    let cartProduct = await CartModel.findOne({ buyerId, productId });

    cartProduct = new CartModel({
      buyerId,
      productId,
    });

    await cartProduct.save();

    return res.status(200).json({
      message: "Product added to cart successfully",
      data: cartProduct,
    });
  } catch (error) {
    console.log("Error on adding product to cart", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const fetchCartItems = async (req, res) => {
  try {
    const { buyerId } = req.params;

    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer Id is not valid" });
    }

    const cartItems = await CartModel.find({ buyerId })
      .populate("buyerId")
      .populate("productId")
      .exec();

    if (cartItems.length === 0) {
      return res.status(200).json({ message: "Cart is empty" });
    }

    return res
      .status(200)
      .json({ message: "Cart Items fetched successfully", data: cartItems });
  } catch (error) {
    console.log("Error on fetching items from cart", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const { buyerId, productId } = req.params;

    if (!isValidId(buyerId)) {
      return res.status(400).json({ message: "Buyer Id is not valid" });
    }

    if (!isValidId(productId)) {
      return res.status(400).json({ message: "Product Id is not valid" });
    }

    const removedItem = await CartModel.findOneAndDelete({
      productId,
      buyerId,
    });

    if (!removedItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    return res.status(200).json({
      message: "Product removed successfully from cart",
      data: removedItem,
    });
  } catch (error) {
    console.log("Error on removing product from cart");
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addToCart, fetchCartItems, deleteCartItem };
