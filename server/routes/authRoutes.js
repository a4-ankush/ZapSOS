const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logoutUser,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);

module.exports = router;
