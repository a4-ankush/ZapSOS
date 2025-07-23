const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const auth = require("../middleware/authMiddleware");
const {
  createAlert,
  getAllAlerts,
  resolveAlert,
  getAISuggestions,
} = require("../controllers/alertController");

//student SOS
router.post("/", auth, createAlert);

//Admin See all alerts
router.get("/", auth, getAllAlerts);

//mark alert as resolved
router.patch("/:id/resolve", auth, resolveAlert);

//users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// AI suggestions endpoint
router.post("/:id/ai-suggestions", auth, getAISuggestions);

module.exports = router;
