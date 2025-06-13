const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: "./config.env" });
app.use(cookieParser());  // Add cookie-parser middleware for handling cookies
app.use(cors({
  origin: 'http://localhost:3000', // Specify the allowed origin
  credentials: true, // Allow credentials (cookies)
}));
app.use(express.json());
//routes
app.use("/fooditems", require("./routes/foodItemRoutes.js"));
app.use("/user", require("./routes/UserRoutes.js"));
app.use("/restaurants", require("./routes/RestaurantRoutes.js"));
app.use("/offers", require("./routes/OfferRoutes.js"));
app.use("/order", require("./routes/OrderRoutes.js"));

const URI = process.env.MONGODB_URI;
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log("Server is running on PORT", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
