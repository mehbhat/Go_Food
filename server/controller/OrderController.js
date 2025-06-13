const Order = require("../models/OrderSchema"); // Adjust path as necessary

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { user, items, totalPrice, address, paymentMethod } = req.body;

    if (!totalPrice || !items ) {
      return res.status(400).json({ message: "Missing cart items" });
    }
    if( !address || !paymentMethod){
      return res.status(400).json({ message: "Missing required fields" });
    }
    // Check if order already exists
    const existingOrder = await Order.findOne({ user, items });
    if (existingOrder) {
      return res
        .status(400)
        .json({ message: "Order already exists for this user and items" });
    }

    const newOrder = await Order.create({
      user,
      items,
      totalPrice,
      address,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email") // Populate user fields
      .populate("items.fooditem"); // Populate food items
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.fooditem");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["pending", "processing", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {

}
