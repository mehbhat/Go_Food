// const { Result } = require("postcss");
const Offer = require("../models/OfferSchema.js"); // Adjust the path if needed

// Create a new offer
exports.createOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json(offer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all offers
exports.getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find().populate("restaurant");
    res.status(200).json({
      msg: "All offers retrieved successfully",
      Result: offers.length,
      offers,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single offer by ID
exports.getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id).populate("restaurant");
    if (!offer) return res.status(404).json({ error: "Offer not found" });
    res.status(200).json(offer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an offer
exports.updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedOffer)
      return res.status(404).json({ error: "Offer not found" });
    res.status(200).json({
      status: "success",
      data: updatedOffer,
      msg: "Offer updated successfully",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an offer
exports.deleteOffer = async (req, res) => {
  try {
    const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
    if (!deletedOffer)
      return res.status(404).json({ error: "Offer not found" });
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
