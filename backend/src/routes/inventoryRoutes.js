console.log("Inventory Routes Loaded");
const express = require("express");
const router = express.Router();
const InventoryItem = require("../models/InventoryItem");

// GET ALL INVENTORY
router.get("/", async (req, res) => {
  const items = await InventoryItem.find();
  res.json(items);
});

// ADD INVENTORY
router.post("/", async (req, res) => {
  const item = new InventoryItem(req.body);
  const savedItem = await item.save();
  res.status(201).json(savedItem);
});

module.exports = router;