const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { aiChat } = require("../controllers/aiChatController");

router.post("/", auth, aiChat);

module.exports = router;
