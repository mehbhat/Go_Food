const router = require("express").Router();
const FoodItemController = require("../controller/FoodItemController.js");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/")
  .post( auth, authAdmin,FoodItemController.createFoodItem)
  .get(FoodItemController.getFoodItems);
router
  .route("/:id")
  .delete(auth, authAdmin, FoodItemController.deleteFoodItem)
  .put(auth, authAdmin,FoodItemController.updateFoodItem)
  .get(FoodItemController.getFoodItemById);

router
  .route("/restaurant/:restaurantId")
  .get(FoodItemController.getFoodItemsByRestaurant)
  
module.exports = router;
