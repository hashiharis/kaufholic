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
    isLiked: {
      type: Boolean,
      enum: [true, false],
      default: false,
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
    review: [
      {
        buyerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Buyer",
          required: true,
        },
        reviewMessage: {
          type: String,
          required: true,
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

// First time product added by seller =>calculation price by discount
// Second time when seller edits price in my products page, then a separate api call needed for discount updation(calculation)
// actual Price->passed by seller, discountPercentage-type-number->passed by seller,currentPrice, discountPrice,rating:number,review:array of objects[{buyerId,reviewMsg}] avg review
// actualPRICE=1000 sdiscount=10 currentPrice=900, discountPrice=100
const ProductModel = model("product", productSchema);

module.exports = ProductModel;
