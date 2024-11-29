const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema({
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
        min: 1,
        max: 10,
      },
    },
  ],
});
