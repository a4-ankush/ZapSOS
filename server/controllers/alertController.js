const Alert = require("../models/AlertModel");

//Post  /alerts
module.exports.createAlert = async (req, res) => {
  try {
    const { message, location } = req.body;

    const alert = new Alert({
      user: req.user.id,
      message,
      location,
    });

    await alert.save();

    const io = req.app.get("io");
    io.emit("newAlert", alert);

    res.status(201).json({ msg: "Alert sent successfully", alert });
  } catch (err) {
    res.status(500).json({ msg: "error creating alert ", error: err.message });
  }
};

//get /alerts (only admin)
module.exports.getAllAlerts = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const alerts = await Alert.find().populate("user", "name email");

    res.json(alerts);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching alerts", error: err.message });
  }
};

//PATCH /alerts/:id/resolve
module.exports.resolveAlert = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "only admins can resolve alerts" });
    }

    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      { status: "resolved" },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ msg: "Alert not found" });
    }
  } catch (err) {
    res.status(500).json({ msg: "Error resolving alert", error: err.message });
  }
};
