const cartSchema = require('../../models/web/cart.js')

const cartDb = async (req, res) => {

  try {
    const userId = req.user.id
    const productId = req.body.id
    const productName = req.body.name
    const productPrice = req.body.price

    let cart = await cartSchema.findOne({ userId })

    // If cart does not exist
    if (!cart) {
      cart = new cartSchema({
        userId,
        items: [{
          productId, quantity: 1, productName,
          productPrice
        }]
      })
    } else {
      // Check if product already exists
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      )

      if (itemIndex > -1) {
        // Increment quantity
        cart.items[itemIndex].quantity += 1
      } else {
        // Add new product
        cart.items.push({
          productId, quantity: 1, productName,
          productPrice
        })
      }
    }

    await cart.save()

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      cart
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const incrementQuantity = async (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.body.id

    const cart = await cartSchema.findOne({ userId })
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    const item = cart.items.find(
      item => item.productId.toString() === productId
    )

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    item.quantity += 1

    await cart.save()

    res.status(200).json({ success: true, cart })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const decrementQuantity = async (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.body.id

    const cart = await cartSchema.findOne({ userId })
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    )

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" })
    }

    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1
    } else {
      // remove item if quantity is 1
      cart.items.splice(itemIndex, 1)
    }

    await cart.save()

    res.status(200).json({ success: true, cart })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const emptyCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await cartSchema.deleteMany({ userId: userId })
    res.status(200).json({ msg: "cart has been empty now" })
  } catch (err) {
    console.log(err)
  }
}


const fetchCart = async (req, res) => {
  try {
    const userId = req.user.id
    const cart = await cartSchema.find({ userId })


    if (cart.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Cart is empty",
        data: []
      })
    }


    res.status(200).json({
      success: true,
      message: "Cart details fetched",
      data: cart
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}


const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id
    const productId = req.body.id

    const cart = await cartSchema.findOne({ userId })
    if (!cart) return res.status(404).json({ message: "Cart not found" })

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    )

    await cart.save()

    res.status(200).json({ msg: 'Deleted successfully' })
  }
  catch (err) {
    res.status(500).json({ msg: 'Something went wrong', error: err })
  }

}

module.exports = { cartDb, fetchCart, emptyCart, incrementQuantity, decrementQuantity, deleteCart }