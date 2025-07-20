const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  // If Passport session exists, use it
  if (req.isAuthenticated && req.isAuthenticated() && req.user) {
    return next();
  }

  // Otherwise, check JWT
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ msg: "No token, access denied" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ msg: "User not found" });
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Invalid token" });
  }
};

module.exports = auth;
