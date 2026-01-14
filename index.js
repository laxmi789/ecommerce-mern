const express  =  require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./app/routes/web/product.js')
const userRouter = require('./app/routes/web/user.js')
const productRouter = require('./app/routes/admin/product.js')
const order = require('./app/controllers/admin/order.js')

require('dotenv').config()
const cartRouter = require('./app/routes/web/cart.js')

const cookieParser = require('cookie-parser')


app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: "https://shoppingclub.vercel.app",
    credentials: true
  })
)

app.use('/api',router)
app.use('/api',userRouter)
app.use('/api', cartRouter)
app.use('/api', productRouter)
app.use('/api', order)
app.use("/uploads", express.static("uploads"))


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('mongodb connected')
app.listen(process.env.PORT, () => {
console.log(`server is running on port ${process.env.PORT}`)
})
}).catch((error) => {
    console.log(error)
}) 
