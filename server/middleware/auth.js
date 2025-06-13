const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader)
      return res.status(401).json({ msg: "No token, authorization denied." });

    const token = authHeader.split(" ")[1];
    if (!token)
      return res.status(401).json({ msg: "No token, authorization denied." });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ msg: "Invalid Authentication." });
      }
      req.user = user;
      next();
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
module.exports = auth;
