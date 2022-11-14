

import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';
import cloudinary from '../utilies/cloudinary.js';
const getProducts = asyncHandler(async (req, res) => {
  const keyword=req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options:"i"
    }
  }:{}
  const products = await Product.find({...keyword});

  if(Object.keys(products).length){
   
    res.json(products);
  }
  else {
    res.status(404);
    throw new Error('product not found');
  }
 
 
});

const getProductById = asyncHandler(async (req, res) =>       {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.image=product.image.url
    res.json(product);
  } else {
    res.status(404);
    throw new Error('product not found');
  }
});

const deleteProduct = asyncHandler(async (req, res) => {

  const product = await Product.findById(req.params.id);
   if(product){
    await product.remove()
    res.json({message:"product removed"})
   }
  else{
    res.status(404);
    throw new Error('product not found');
  }
      

});

const createProduct = asyncHandler(async (req, res) => {

  const {
    name,
    brand,
    price,
    description,
    image,
    countInStock}=req.body

    try {
      if(image){
        const uploadRes=await cloudinary.uploader.upload(image,{
          upload_preset:"proshop"
        })
     
  if(uploadRes){
    const product =new Product({
      name,
      price,
      user:req.user._id,
      image:uploadRes,
      brand,
      
      countInStock,
    
      description
    })
    const createdProduct=await product.save()
    res.json(createdProduct)
   
  
  }
}
      
    } catch (error) {
      res.status(404)
     throw new Error("product not created")
    }

   

  

      

});


const updateProduct = asyncHandler(async (req, res) => {

  const {
    name,
    price,
 
    image,
    brand,
    category,
    countInStock,
    numReview,
    description}=req.body

    const product =await Product.findById(req.params.id) 
if(product){
if(image){
  product.image=await cloudinary.uploader.upload(image,{
    upload_preset:"proshop"
  })
}



  product.name=name
  product. price=price
  
  product. brand= brand
  product. category= category
  product.countInStock=  countInStock
  // product. numReview= numReview
  product. description=description

  const updatedProduct=await product.save()
  res.json(updatedProduct)
 }
 else{
  res.status(404);
  throw new Error('product not found');
 }

      

});




export { getProducts, getProductById,deleteProduct,updateProduct,createProduct };
