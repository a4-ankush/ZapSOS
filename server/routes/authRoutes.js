const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  register,
  login,
  logoutUser,
} = require("../controllers/authController");

router.get("/me", auth, (req, res) => {
  res.json({ user: req.user });
});
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);

module.exports = router;
