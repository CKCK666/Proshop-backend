import express from "express";
const router = express.Router();
import {UserAuth,getProfile,UserSignUP,updateUserProfile,getUsers,deleteUser,updateUser} from "../controllers/userController.js"
import protect from "../middlewares/authMiddleware.js";
import admin from "../middlewares/authMiddleware.js";
//signUp
router.route("/").post(UserSignUP).get(protect,admin,getUsers)

router.route("/:id").delete(protect,admin,deleteUser).patch(protect, admin, updateUser)


// login
router.post("/login",UserAuth)

// /profile
router.route("/profile").get(protect,getProfile).put(protect,updateUserProfile)



export default router