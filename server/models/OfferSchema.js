const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true
    },
    discountPercentage:{
        type: Number,
        required: true
    },
    validFrom:{
        type: Date,
        required: true
    },
    validTo:{
        type: Date,
        required: true
    },
    restaurant:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    description:{
        type: String,
        required: true
    }
})
module.exports = mongoose.model("Offer", OfferSchema);