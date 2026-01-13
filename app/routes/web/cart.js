const {cartDb, fetchCart, incrementQuantity, decrementQuantity, deleteCart, emptyCart} = require('../../controllers/web/cart.js')

const auth = require('../../middleware/auth.js')
const express = require('express')
const cartRouter = express.Router()

cartRouter.post('/cart', auth, cartDb)
cartRouter.get('/fetchCart', auth, fetchCart)
cartRouter.delete('/deleteCart', auth, deleteCart)

cartRouter.delete('/emptyCart', auth, emptyCart)
cartRouter.post('/incrementquantity', auth, incrementQuantity)
cartRouter.post('/decrementquantity', auth, decrementQuantity)
cartRouter.get("/profile", auth, (req, res) => {
  res.json(req.user);
});


module.exports = cartRouter