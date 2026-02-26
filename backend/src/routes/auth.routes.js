const express = require("express");
const router = express.Router();

console.log("auth.routes.js loaded");   // ← IMPORTANT (must be here)

const { loginUser } = require("../controllers/auth.controller");

router.post("/login", loginUser);

module.exports = router;