const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create user
router.post("/", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;