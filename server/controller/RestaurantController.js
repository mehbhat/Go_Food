const Restaurant = require("../models/RestaurantModel");

// Create a new restaurant
exports.createRestaurant = async (req, res) => {
  try {
    const { name, address, cuisine, rating } = req.body;

    // Check for existing restaurant by name
    const existing = await Restaurant.findOne({ name });
    if (existing) {
      return res.status(400).json({ msg: "Restaurant with this name already exists." });
    }

    const newRestaurant = await Restaurant.create({
      name,
      address,
      cuisine,
      rating
    });

    res.status(201).json({
      status: "success",
      data: newRestaurant,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get all restaurants
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("createdBy");

    res.json({
      status: "success",
      result: restaurants.length,
      data: restaurants,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Get a single restaurant by ID
exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id).populate("createdBy");
    if (!restaurant) {
      return res.status(404).json({ msg: "Restaurant not found." });
    }

    res.json({
      status: "success",
      data: restaurant,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Update a restaurant
exports.updateRestaurant = async (req, res) => {
  try {
    const updated = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("createdBy");

    if (!updated) {
      return res.status(404).json({ msg: "Restaurant not found." });
    }

    res.json({
      status: "success",
      data: updated,
      msg: "Restaurant updated successfully.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
  try {
    const deleted = await Restaurant.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ msg: "Restaurant not found." });
    }

    res.json({
      status: "success",
      data: deleted,
      msg: "Restaurant deleted successfully.",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
