const express = require("express");
const router = express.Router();
const Record = require("../models/Record");
const authorizeRoles = require("../middleware/roleMiddleware");

// CREATE
router.post("/", authorizeRoles("admin", "analyst"), async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    // Validation
    if (!amount || !type) {
      return res.status(400).json({ message: "Amount and type are required" });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      note
    });

    res.status(201).json(record);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const { type, category, sort } = req.query;

    let filter = {};
    let sortOption = {};

    if (type) {
      filter.type = type;
    }

    if (category) {
      filter.category = category;
    }

    if (sort) {
      sortOption[sort.replace("-", "")] = sort.startsWith("-") ? -1 : 1;
    }

    const records = await Record.find(filter).sort(sortOption);

    res.json(records);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE
router.put("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", authorizeRoles("admin"), async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DASHBOARD SUMMARY API
router.get("/summary", async (req, res) => {
  try {
    const income = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    const expense = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalIncome: income[0]?.total || 0,
      totalExpense: expense[0]?.total || 0,
      balance: (income[0]?.total || 0) - (expense[0]?.total || 0)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;