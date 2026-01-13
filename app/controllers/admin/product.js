const addPoductModel = require("../../models/web/product.js")
const delp = async (req, res) => {
    try {
        const id = req.body.id
        const del = await addPoductModel.deleteOne({ _id: id })
        res.status(200).json({ msg: "product deleted successfully" })
    } catch (error) {
        console.log(error)
    }
}

const fetchSingle = async (req, res) => {
    try {
        const { id } = req.params
        const productDeatil = await addPoductModel.findOne({ _id: id })
        res.status(200).json({ productDeatil })
    } catch (error) {
        console.log(error)
    }
}
module.exports = { delp, fetchSingle }