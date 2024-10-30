const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const WishlistSchema = new Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyer",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const WishlistModel = model("wishlist", WishlistSchema);

module.exports = WishlistModel;
