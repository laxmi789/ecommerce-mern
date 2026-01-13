const addPoductModel = require('../../models/web/product.js')

const allProduct = async (req, res) => {
  try {
    const productAll = await addPoductModel.find()

    res.status(200).json({ success: true, productAll })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}
module.exports = allProduct