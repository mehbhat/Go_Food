const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  options: {
    type: [
      {
        type: Map,
        of: String
      }
    ],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  }
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
