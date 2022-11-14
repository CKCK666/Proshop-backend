import express, { Route } from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct
} from '../controllers/productController.js';
import protect from "../middlewares/authMiddleware.js";
import admin from "../middlewares/authMiddleware.js";


//fetch all products
//@route GET /api/products
router.route('/').get(getProducts)

//create products
//@route post /api/products/createproduct
router.route("/createproduct").post(protect,admin,createProduct)

//edit  product
//@route PUT /api/products/edit/:id
router.put("/edit/:id",protect,admin,updateProduct)

//fetch  product
//@route GET /api/products/:id
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct)
  



export default router;
