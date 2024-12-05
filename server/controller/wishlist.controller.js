const ProductModel = require("../model/product.model");
const WishlistModel = require("../model/wishlist.model");
const isValidId = require("../utils/validId");

const addToWishlist = async (req, res) => {
  try {
    const { buyerId, productId } = req.params;
    // const {  title,
    //     subtitle,
    //     category,
    //     actualPrice,
    //     discountPercent,
    //     description,
    //     sellerId}=req.body;

    if (!isValidId(buyerId)) {
      return res.status(404).json({ message: "Buyer is not found" });
    }

    if (!isValidId(productId)) {
      return res.status(404).json({ message: "Product not found" });
    }

    let favProduct = await WishlistModel.findOne({ buyerId, productId });

    if (favProduct) {
      return res.status(400).json({ message: "Product already in wishlist" });
    }

    favProduct = new WishlistModel({
      buyerId,
      productId,
    });

    await favProduct.save();
    return res
      .status(200)
      .json({ message: "Product added to wishlist", data: favProduct });
  } catch (error) {
    console.log("Error on adding product to wishlist", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getWishlist = async (req, res) => {
  try {
    const { buyerId } = req.params;

    console.log(buyerId);

    const wishlist = await WishlistModel.find({ buyerId })
      .populate("productId")
      .populate("buyerId")
      .exec();

    console.log(wishlist);

    if (wishlist.length === 0) {
      return res.status(200).json({ message: "Your wishlist is empty" });
    }

    return res
      .status(200)
      .json({ message: "Wishlist fetched", data: wishlist });
  } catch (error) {
    console.log("Error on fetching the wishlist", error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { buyerId, productId } = req.params;

    if (!isValidId(buyerId)) {
      return res.status(404).json({ message: "Buyer is not found" });
    }

    if (!isValidId(productId)) {
      return res.status(404).json({ message: "Product  not found" });
    }

    let favProduct = await WishlistModel.findOneAndDelete({
      productId,
      buyerId,
    });

    if (!favProduct) {
      return res.status(404).json({ message: "Favourite product not found" });
    }

    return res.status(200).json({
      message: "Product removed from wishlist successfully",
      removedProduct: favProduct,
    });
  } catch (error) {
    console.log("Error on removing from wishlist", error);
    return res.status(500).json({ message: "Server Error" });
  }
};
module.exports = { addToWishlist, getWishlist, removeFromWishlist };
