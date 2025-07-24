const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const passport = require("passport");
const {
  register,
  login,
  logoutUser,
  getCurrentUser,
} = require("../controllers/authController");

// Start Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    // Redirect to frontend after login
    res.redirect(process.env.CLIENT_URL);
  }
);

// Get current user (already exists)
router.get("/me", getCurrentUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);

module.exports = router;
