const addPoductModel = require("../../models/web/product.js")
const express = require("express");
const upload = require("../../middleware/multer");

// max 5 images
const addProductDb = async (req, res) => {
  try {
    const { title, price, category, description } = req.body

    const imagePaths = req.files.map(file => file.filename)

    const product = new addPoductModel({
      title,
      price,
      category,
      description,
      images: imagePaths
    })

    await product.save()

    res.status(201).json({
      success: true,
      message: "Product added with gallery",
      product
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}





const fetchCategory = async (req, res) => {
  try {
    const { query } = req.params
    

    const products = await addPoductModel.find({ category: query })

    
    if (products.length === 0) {
      return res.status(404).json({
        status: 0,
        message: "No products found"
      })
    }

    res.status(200).json({
      status: 1,
      data: products
    })

  } catch (err) {
    res.status(500).json({
      status: 0,
      error: err.message
    });
  }
};





const fetchProducts = async (req,res) => {
const productList = await addPoductModel.find() 
res.send({status:1, productlist:productList})
}

const fetchSingleProduct = async (req, res) => {
  try {
      const { id } = req.params;
  // Get the product ID from the query parameters
    
    // Make sure the id is valid (check for a valid ObjectId, if using MongoDB)
    if (!id) {
      return res.status(400).send({ status: 0, message: "Product ID is required" });
    }

    // Fetch the product by id (assuming MongoDB and that _id is used as the primary identifier)
    const singleProduct = await addPoductModel.findOne({ _id: id });

    // If no product is found, send an error message
    if (!singleProduct) {
      return res.status(404).send({ status: 0, message: "Product not found" });
    }

    // Send back the product data
    res.send({ status: 1, product: singleProduct });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 0, message: "Internal Server Error" });
  }
};


module.exports = {addProductDb, fetchProducts, fetchSingleProduct, fetchCategory}