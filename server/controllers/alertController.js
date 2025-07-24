const Alert = require("../models/AlertModel");
const axios = require("axios");

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
    res.json({ msg: "Alert resolved", alert });
  } catch (err) {
    res.status(500).json({ msg: "Error resolving alert", error: err.message });
  }
};

module.exports.getAISuggestions = async (req, res) => {
  try {
    const alert = await Alert.findById(req.params.id);
    if (!alert) return res.status(404).json({ msg: "Alert not found" });

    //  prompt for Gemini
    const prompt = `A student sent this emergency message: "${alert.message}" and location in the above map. 
Suggest the top 3 immediate actions an admin should take, in order of priority. 
Format as a numbered list.`;

    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      }
    );

    // Extract suggestions
    const suggestions =
      geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No suggestions found.";

    res.json({ suggestions });
  } catch (err) {
    if (err.response) {
      console.error(
        "Gemini API error:",
        err.response.status,
        err.response.data
      );
    } else {
      console.error("AI suggestion error:", err.message, err.stack);
    }
    res.status(500).json({
      msg: "AI suggestion error",
      error: err.message,
      details: err.response?.data,
    });
  }
};
