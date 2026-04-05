const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const recordRoutes = require("./routes/recordRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// test route
app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(5000, () => console.log("Server running on port 5000"));