const { loginUser, registerUser} = require('../../controllers/web/user.js')
const userList = require('../../controllers/admin/users.js')
const orderRouter = require('../../controllers/web/user-order.js')
const auth = require('../../middleware/auth.js')

const express = require('express')
const userRouter = express.Router()

userRouter.post('/user', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/userslist', userList)
userRouter.get('/orderDetail', auth, orderRouter)

module.exports = userRouter