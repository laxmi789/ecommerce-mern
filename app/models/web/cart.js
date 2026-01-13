const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      },
      productName: {
        type: String
      },
      productPrice: {
        type: String
      }
    }
  ]
})

module.exports = mongoose.model("cart", cartSchema)
