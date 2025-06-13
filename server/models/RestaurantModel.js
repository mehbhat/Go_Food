const mongoose = require("mongoose");
 const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    cuisine :{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,
        default:3
    },
    isActive:{
        type:Boolean,
        default:true
    },
     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
     
 })
 module.exports = mongoose.model('Restaurant', restaurantSchema);   