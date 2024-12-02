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

// order model productDetails fetch from productId populate. customer details and payment details separate fields, final price details also separate fields
