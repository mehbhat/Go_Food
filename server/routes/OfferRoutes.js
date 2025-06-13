// routes/offerRoutes.js
const express = require("express");
const router = express.Router();
const offerController = require("../controller/OfferController.js");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router.post("/", auth, authAdmin,offerController.createOffer);
router.get("/",  offerController.getAllOffers);
router.get("/:id", offerController.getOfferById);
router.put("/:id",auth, authAdmin, offerController.updateOffer);
router.delete("/:id",auth, authAdmin, offerController.deleteOffer);

module.exports = router;
