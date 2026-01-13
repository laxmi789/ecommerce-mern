const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    orderItems: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        productName: String,
        productPrice: Number,
        quantity: Number,        
      },
    ],

    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      zip_code: String,      
    },

    paymentMethod: {
      type: String,
      default: "PayPal",
    },

    paymentResult: {
      id: String,
      status: String,
      email_address: String,
    },

    itemsPrice: Number,
    taxPrice: Number,
    shippingPrice: Number,
    totalPrice: Number,

    isPaid: {
      type: Boolean,
      default: false,
    },

    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
