const mongoose = require("mongoose");

const inventoryItemSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: String,
  category: String,
  quantity: Number,
  minStock: Number,
  price: Number,
  cost: Number,
  supplier: String,
  location: String,
  status: {
    type: String,
    enum: ["In Stock", "Low Stock", "Out of Stock"]
  },
  lastUpdated: Date
}, { timestamps: true });

module.exports = mongoose.model("InventoryItem", inventoryItemSchema);