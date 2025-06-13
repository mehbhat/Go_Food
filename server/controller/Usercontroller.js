const UserModel = require("../models/Usermodel.js");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists." });
    if (password.length < 6)
      return res
        .status(400)
        .json({ msg: "Password must be at least 6 characters long." });
    // const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      password: bcryptjs.hashSync(password, 10) || password,
      role,
    });

    // Save mongodb
    await newUser.save();
    const accesstoken = createAccessToken({ id: newUser._id });
    const refreshtoken = createRefreshToken({ id: newUser._id });
    res.cookie("refreshtoken", refreshtoken, {
      expiresIn: "7d",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    req.user = user;

    res.status(201).json({
      msg: "User registered successfully",
      user: newUser,
      accesstoken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found." });
    // Check password
    console.log(user);
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password." });

    const accesstoken = createAccessToken({ id: user._id });
    const refreshtoken = createRefreshToken({ id: user._id });
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        accesstoken,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json({
      status: "success",
      data: users,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("cart.foodItem");
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user,
      msg: "User updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: null,
      msg: "User deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie(
      "refreshtoken"
      // { path: '/user/refresh_token' }
    );

    return res.status(200).json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

exports.refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    console.log("Refresh token is", rf_token);
    if (!rf_token)
      return res.status(401).json({ msg: "Please Login or Register." });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return res.status(400).json({ msg: err });

      console.log("Decoded refresh token:", decoded); // 👀 Add this line

      const accesstoken = createAccessToken({ id: decoded.id }); // ✅ use decoded.id
      res.status(200).json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.getUserAddress = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user.address,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.updateUserAddress = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user.address,
      msg: "User address updated successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.deleteUserAddress = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { address: null },
      {
        new: true,
      }
    );
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: null,
      msg: "User address deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.getFavorite = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate("favorites");
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      length: user.favorites.length,
      data: user.favorites,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.addFavorite = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { favorites: req.body.favorites } },
      {
        new: true,
      }
    ).populate("favorites");
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user.favorites,
      msg: "Added to favorite successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.removeFavorite = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { favorites: req.params.foodItemId } },
      {
        new: true,
      }
    );
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user.favorites,
      msg: "Removed from favorite successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.addToCart = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found." });

    const { foodItem, quantity, selectedOption } = req.body;
    if (!foodItem || !quantity) {
      return res.status(400).json({ msg: "Missing foodItem or quantity." });
    }
    // Check if item already exists in cart
    const existingItemIndex = user.cart.findIndex(
      (item) =>
        item.foodItem.toString() === foodItem &&
        item.selectedOption === selectedOption
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      user.cart[existingItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({ foodItem, quantity, selectedOption });
    }

    await user.save();
    await user.populate("cart.foodItem"); // populate foodItem info

    return res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
exports.getCart = async(req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate("cart.foodItem");
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user.cart,
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
}
exports.emptyCart = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndUpdate(
      req.user.id,
      { cart: [] },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found." });
    res.json({
      status: "success",
      data: user.cart,
      msg: "Cart emptied successfully.",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};
