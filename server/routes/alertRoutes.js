const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createAlert,
  getAllAlerts,
  resolveAlert,
} = require("../controllers/alertController");

//student SOS
router.post("/", auth, createAlert);

//Admin See all alerts
router.get("/", auth, getAllAlerts);

//mark alert as resolved
router.patch("/:id/resolve", auth, resolveAlert);

module.exports = router;
