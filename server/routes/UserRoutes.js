const router = require("express").Router();
const UserController = require("../controller/Usercontroller.js");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router.post("/register", UserController.register);

router.post("/login", UserController.login);

router.get("/refresh-token", UserController.refreshToken);

router.get("/logout", UserController.logout);

router.get("/getCart", auth, UserController.getCart);

router.get("/:id", auth, UserController.getUserProfile);

router.get("/", auth, authAdmin, UserController.getAllUsers);

router.put("/:id", auth, UserController.updateUserProfile);

router.delete("/:id", auth, UserController.deleteUser);

// check for these routes
router.get("/address/:id", auth, UserController.getUserAddress);

router.put("/address/:id", auth, UserController.updateUserAddress);

router.delete("/address/:id", auth, UserController.deleteUserAddress);

router.get("/favorites/:id", auth, UserController.getFavorite);

router.patch("/addToCart/:id", auth, UserController.addToCart);

router.patch("/emptyCart/:id", auth, UserController.emptyCart);

router.post("/favorites/:id", auth, UserController.addFavorite);

router.delete(
  "/favorites/:id/:foodItemId",
  auth,
  UserController.removeFavorite
);

// router.get("/all-favorites", auth, UserController.getAllFavorites);

module.exports = router;
