const {addProductDb, fetchProducts, fetchSingleProduct, fetchCategory} = require("../../controllers/web/product")
const allProduct = require("../../controllers/web/allProducts")
const express = require('express')
const router  = express.Router()
const upload = require("../../middleware/multer");

router.get('/fetch_product', fetchProducts)
router.get('/product/:id', fetchSingleProduct);
router.get('/category/:query', fetchCategory);
router.get('/productAll', allProduct)
router.post(
  "/add",
  upload.array("images", 5), // field name must match frontend
  addProductDb
)


module.exports = router