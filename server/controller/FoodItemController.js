const FoodItem = require("../models/FoodItem.js");
const Restaurant = require("../models/RestaurantModel.js");
const mongoose = require("mongoose");
exports.createFoodItem = async (req, res) => {
  try {
    const { categoryName, name, imageUrl, options, description, restaurant } = req.body;

    // Check if item already exists by name
    const itemExists = await FoodItem.findOne({ name });
    if (itemExists) {
      return res.status(400).json({ msg: "This food item already exists." });
    }
   const restaurantExists = await Restaurant.findById(restaurant);
    if (!restaurantExists) {
      return res.status(400).json({ msg: "Invalid restaurant ID." });
    }
    // Create new food item
    const newFoodItem = await FoodItem.create({
      categoryName,
      name,
      imageUrl,
      options,
      description,
      restaurant,
    });

    res.status(201).json({
      status: "success",
      data: {
        foodItem: newFoodItem,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getFoodItems = async (req, res) => {
  try {
    const Items = await FoodItem.find().populate("restaurant");

    res.json({
      status: "success",
      result: Items.length,
      Items: Items,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.deleteFoodItem = async (req, res) => {
  try {
    const item = await FoodItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ msg: "Food item not found." });
    res.json({
      status: "success",
      data: item,
      msg: "Food item deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.updateFoodItem = async (req, res) => {
  try {
    const updatedItem = await FoodItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("restaurant");
    if (!updatedItem)
      return res.status(404).json({ msg: "Food item not found." });
    res.json({
      status: "success",
      data: updatedItem,
      msg: "Food item updated successfully.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
exports.getFoodItemById = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id).populate("restaurant");
    if (!item) return res.status(404).json({ msg: "Food item not found." });
    res.json({
      status: "success",
      data: item,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
exports.getFoodItemsByRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    // Validate restaurant ID
    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ msg: "Invalid restaurant ID" });
    }

    // Properly filter using the restaurant ObjectId
    const items = await FoodItem.find({ restaurant: restaurantId}).populate("restaurant");
    // const items = await FoodItem.findById({ restaurant: req.params.id }).populate("restaurant");
    res.json({
      status: "success",
      result: items.length,
      items: items,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
