const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "buyer",
      required: true,
    },
    orderedProducts: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          min: [1, "quantity must be atleast 1"],
          max: [10, "quantity must be less than or equal to 10"],
        },
      },
    ],
    email: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    stateRegion: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    cardHName: {
      type: String,
      required: true,
    },
    cardNo: {
      type: Number,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    cvv: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    shippingCharge: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: false,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryDate: {
      type: Date,
      default: "",
    },
    deliveryStatus: {
      type: String,
      enum: ["pending", "confirmed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const OrderModel = model("order", orderSchema);
module.exports = OrderModel;
// order model productDetails fetch from productId populate. customer details and payment details separate fields, final price details also separate fields
