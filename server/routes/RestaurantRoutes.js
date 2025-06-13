const router = require("express").Router();
const RestaurantController = require("../controller/RestaurantController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/")
  .post( auth, authAdmin,RestaurantController.createRestaurant)
  .get(RestaurantController.getRestaurants);

router
  .route("/:id")
  .get(RestaurantController.getRestaurantById)
  .put(auth, authAdmin,RestaurantController.updateRestaurant)
  .delete(auth, authAdmin,RestaurantController.deleteRestaurant);

module.exports = router;
