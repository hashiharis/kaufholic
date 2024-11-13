const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Men", "Women", "Accessories"],
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    discountPercent: {
      type: Number,
    },
    currentPrice: {
      type: Number,
      default: 0,
    },
    discountPriceApplied: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    isSold: {
      type: Boolean,
      default: false,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "seller",
      required: true,
    },
    productImage: {
      type: String,
      required: true,
    },
    review: [
      {
        buyerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Buyer",
          required: true,
        },
        reviewMessage: {
          type: String,
          required: false,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
      },
    ],
    avgRating: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Todo=>Second time when seller edits price in my products page, then a separate api call needed for discount updation(calculation)
const ProductModel = model("product", productSchema);

module.exports = ProductModel;
