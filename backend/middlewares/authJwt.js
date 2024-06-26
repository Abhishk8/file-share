const jwt = require("jsonwebtoken");
const SECRET = process.env.secret;
const User = require("../models/userModel");
const isAuthenticated = async (req, res, next) => {
  try {
    console.log(req.headers);
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    if (!authHeader) {
      return res.status(401).json({
        err: "You must be logged in",
      });
    }

    const token = authHeader;

    if (!token) {
      return res.status(401).json({
        err: "No token, authorization denied",
      });
    }

    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({ id: decoded.user.id });

    if (!user) {
      return res.status(404).json({ err: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      err: err.message,
    });
  }
};
module.exports = isAuthenticated;
