import mongoose from "mongoose";
// const reviewSchema=mongoose.Schema({
//     name:{
//         type:String,
//         // required:true
//  },
//  review:{
//      type:String,
//     //  required:true,
//  },
//  rating:{
//     type:Number,
//     // required:true,
// },

// },{
//     timestamp:true
// })

const productSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
,
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:Object,
        // required:true,
       
        
    },
    // review:[reviewSchema],
    brand:{
        type:String,
        required:true
    },
    category:{
        type:String,

        // required:true,
        
    },
    description:{
        type:String,

        required:true,
        
    },
    rating:{
        type:Number,
        // required:false,
        default:0
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    numReview:{
        type:Number,
        // required:true,
        default:0
    },
},{
    timestamp:true
})
const Product=mongoose.model("Product",productSchema)

export default Product