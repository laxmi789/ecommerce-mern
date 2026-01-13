const express = require("express");
const router = express.Router();
const Order = require("../../models/web/order.js");
const auth = require('../../middleware/auth.js')


// CREATE ORDER
router.post("/order", auth, async (req, res) => {

  const userId = req.user.id
  try {
    const {
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;


    const order = new Order({
      user: userId,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/order/:id", auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    console.log(order)
    res.status(200).json({ msg: 'order found', order })
  } catch (err) {
    res.status(404).json({ message: "Order not found" });
  }
});


router.put("/order/:id/pay", auth, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();

    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order not found" });
  }
});


module.exports = router;
