const router = require("express").Router();
const OrderController = require("../controller/OrderController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/")
  .post(OrderController.createOrder)
  .get(auth,OrderController.getAllOrders);
router 
.route("/:id")
  .get(OrderController.getOrderById)
  .put( auth, authAdmin, OrderController.updateOrderStatus);

module.exports = router;