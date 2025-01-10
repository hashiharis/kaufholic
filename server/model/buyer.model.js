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
      required: function () {
        this.signupMethod !== "google";
      },
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
    googleId: {
      type: String,
      required: function () {
        this.signupMethod === "google";
      },
    },
    signupMethod: {
      type: String,
      enum: ["google", "manual"],
      default: "manual",
    },
  },
  { timestamps: true }
);

const BuyerModel = model("buyer", buyerSchema);

module.exports = BuyerModel;
