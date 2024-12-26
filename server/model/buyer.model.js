const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const buyerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const BuyerModel = model("buyer", buyerSchema);

module.exports = BuyerModel;
