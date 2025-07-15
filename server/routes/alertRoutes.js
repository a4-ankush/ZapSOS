const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { createAlert, getAllAlerts } = require("../controllers/alertController");

//student SOS
router.post("/", auth, createAlert);

//Admin See all alerts
router.get("/", auth, getAllAlerts);

module.exports = router;
