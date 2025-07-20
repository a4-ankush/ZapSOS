const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ msg: "user registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "server error", error: err.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "please enter all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invaild credentials" });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false, //  false for localhost, true for production
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .json({
        msg: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

module.exports.logoutUser = (req, res) => {
  // Passport logout for Google auth
  if (req.logout) {
    req.logout(function (err) {
      if (err) {
        return res
          .status(500)
          .json({ msg: "Logout error", error: err.message });
      }
      // Destroy express-session
      if (req.session) {
        req.session.destroy(() => {
          res.clearCookie("connect.sid"); // default session cookie name
          res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
          });
          return res.json({ msg: "Logged out successfully" });
        });
      } else {
        res.clearCookie("token", {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        return res.json({ msg: "Logged out successfully" });
      }
    });
  } else {
    // Fallback for JWT only
    if (req.session) {
      req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.clearCookie("token", {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
        });
        return res.json({ msg: "Logged out successfully" });
      });
    } else {
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });
      return res.json({ msg: "Logged out successfully" });
    }
  }
};

// Get current user info for /auth/me
module.exports.getCurrentUser = async (req, res) => {
  // If using Passport (Google auth), user is attached to req.user
  if (req.user) {
    return res.json({
      user: {
        id: req.user._id || req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role || "student",
      },
    });
  }
  // If using JWT, user info is in token, decode it
  const token = req.cookies && req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) {
        return res.json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
        });
      }
    } catch (err) {
      return res.status(401).json({ user: null, msg: "Invalid token" });
    }
  }
  // No user found
  return res.json({ user: null });
};
