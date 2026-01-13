const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModelSchema = new Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unque:true
},
password:{
    type:String,
    required:true
},
role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  }
})

const userModel = mongoose.model('Users',userModelSchema)
module.exports = userModel