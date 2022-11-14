import express from "express";
const router = express.Router();
import {addOrderItems,getOrderById,updateOrderDetails, getMyOrders,getOrders,markAsDelivered} from "../controllers/orderController.js"
import protect from "../middlewares/authMiddleware.js";
import admin from "../middlewares/authMiddleware.js";




// 
router.route("/").post(protect,addOrderItems).get(protect,admin,getOrders)
router.route("/myorders").get(protect,getMyOrders)
router.route("/:id").get(protect,getOrderById).patch(protect,admin,markAsDelivered)
router.route("/:id/pay").put(protect,updateOrderDetails)




export default router