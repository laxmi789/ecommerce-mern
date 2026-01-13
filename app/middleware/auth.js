const jwt = require('jsonwebtoken')
const userModel = require('../models/web/user.js')

const auth = async (req, res, next) => {
    const cookie = req.cookies
    console.log(req.cookies)
  const token = req.cookies.token
console.log(token)
  
  const jwtSecret ="hffhighegknvkhbfdgfdlkgjlzdgdlgzlgljr"

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
     //res.redirect('/')
  }

  try {
    const decoded = jwt.verify(token, jwtSecret)
    
           const user = await userModel.findById(decoded.id)
        if (!user) return res.status(401).json({ message: 'User not found' })
    
        req.user = user        
    
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

module.exports = auth
