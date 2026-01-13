const express = require('express')
const router = express.Router()
const { delp, fetchSingle } = require('../../controllers/admin/product.js')

router.delete('/delp', delp)
router.get('/admin/product/:id', fetchSingle)

module.exports = router 