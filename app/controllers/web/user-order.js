const Order = require("../../models/web/order.js");


const orderDetail = async (req, res) => {
      try {
            userId = req.user.id
            const orders = await Order.find({ user: userId })
            res.status(200).json({ msg: "Orders found", orders })
      } catch (err) {
            res.status(500).json({
                  success: false,
                  message: err.message
            })
      }
}
module.exports = orderDetail