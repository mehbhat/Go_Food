const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      fooditem: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
      quantity: Number,
    },
  ],
  totalPrice: Number,
  address: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "processing", "completed", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["cash", "card", "paypal"],
    default: "cash",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Order", OrderSchema);
