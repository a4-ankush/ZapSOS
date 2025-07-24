require("dotenv").config();

const http = require("http");
const socketio = require("socket.io");

const express = require("express");
const app = express();
const session = require("express-session");
const passport = require("passport");
require("./config/passport");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//required routes
const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/alertRoutes");
const aiChatRoutes = require("./routes/aiChatRoutes");

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // set secure: true in production with HTTPS
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Routes

//auth routes
app.use("/auth", authRoutes);

//alert routes
app.use("/alerts", alertRoutes);

// ai chat route
app.use("/ai-chat", aiChatRoutes);

// socket.io
const server = http.createServer(app);
const io = socketio(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

//listen for client connections
io.on("connection", (socket) => {
  console.log("Admin connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Admin disconnected:", socket.id);
  });
});

//io avail to routes
app.set("io", io);

// mongoose connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      console.log(`Server + Socket.io running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
