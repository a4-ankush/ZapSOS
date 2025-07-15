require("dotenv").config();

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//required routes
const authRoutes = require("./routes/authRoutes");
const alertRoutes = require("./routes/alertRoutes");

app.use(express.json());
app.use(cors());
app.use(cookieParser());

//Routes
//auth routes
app.use("/auth", authRoutes);
//alert routes
app.use("/alerts", alertRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
