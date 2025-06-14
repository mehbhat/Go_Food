const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "A user must have a email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have a password"],
  },
  passwordConfirm: {
    type: String,
  },
  mobile: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["customer", "admin", "seller"], // seller optional
    default: "customer",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  cart: [
    {
      foodItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
      },
      selectedOption: {
        type: String,
        default: "",
      },
    },
  ],
  address: {
    type: String,
    default: "",
  },
  favorites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoodItem",
      default: [],
    },
  ],
  profilePicture: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("User", userSchema);
