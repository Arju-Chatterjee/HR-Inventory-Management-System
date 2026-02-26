require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.model");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: "admin@inventory.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      fullName: "Super Admin",
      email: "admin@inventory.com",
      password: hashedPassword,
      role: "Super Admin",
      department: "Administration",
      phone: "9999999999"
    });

    console.log("Admin Created Successfully");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();