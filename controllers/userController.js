

import User from '../models/userModel.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../utilies/generateToken.js';
import mongoose from 'mongoose'
//UserAuth
const UserSignUP = asyncHandler(async (req, res) => {
  const {name, email, password } = req.body;

  const userExist = await User.findOne({ email });
 if (userExist) {
  

     res.status(400)
     throw new Error("user already exist")
 }
 
 const user=await User.create({
     name,
     email,
     password
 })
if(user){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),

    })
}
else{
    res.status(404)
    throw new Error("User not found")
}
 
 
 
});

const UserAuth = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (user.isDisabled) {
      res.status(401)
      throw new Error('Not Authorized, Blocked User.')
    }
    if (user && (await user.matchPassword(password))) {   
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
        
        }
      
          
         else {
      res.status(401);
      throw new Error('invalid password or email');
    }
  });
  
//Get profile
const getProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.user._id);
 
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
   user.name=req.body.name || user.name
   user.email=req.body.email || user.email
   if(req.body.password){
    user.password=req.body.password
 }
 const updatedUser=await user.save()
 res.json({
   _id: updatedUser._id,
   name: updatedUser.name,
   email: updatedUser.email,
   isAdmin: updatedUser.isAdmin,
   token: generateToken(updatedUser._id),
 });
  } 


  else 
  {
    res.status(404);
    throw new Error('User not found');
  }
});

const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find({});
  

    res.json(users)
      

});

const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);
   if(user){
    await user.remove()
    res.json({message:"user removed"})
   }
  else{
    res.status(404);
    throw new Error('User not found');
  }
      

});

//block/unblock

const updateUser = asyncHandler(async (req, res, next) => {
  const isIdValid = mongoose.Types.ObjectId.isValid(req.params.id)
  if (isIdValid) {
 
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).select('-password')

    res.json({ user: user })
  } else {
    next()
  }
})









export { UserAuth, getProfile,UserSignUP, updateUserProfile,getUsers ,deleteUser,updateUser};
