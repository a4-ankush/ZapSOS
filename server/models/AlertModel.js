const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const AlertSchema = new mongoose.Schema({
  alertId: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  message: {
    type: String,
    required: true,
  },
  location: {
    latitude: Number,
    longitude: Number,
  },
  status: {
    type: String,
    enum: ["active", "resolved"],
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("alert", AlertSchema);
