const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addProductSchema = new Schema({
title:{
    type:String,
    required:true
},
category:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
price:{
    type:String,
    required:true
}, 
mainImage:{
    type:String,
    required:true
},

images:{
    type:[String],
    required:true
},
})

const addPoductModel = mongoose.model('product',addProductSchema)
module.exports = addPoductModel