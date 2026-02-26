console.log("THIS IS SRC SERVER FILE");

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const inventoryRoutes = require("./routes/inventoryRoutes");

const app = express();

// 🔍 Debug: log every incoming request
app.use((req, res, next) => {
  console.log("Incoming Request:", req.method, req.url);
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);

// Test root route
app.get("/", (req, res) => {
  res.send("API Running...");
});

// 🚨 Force a different port to avoid conflict
const PORT = 7000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});