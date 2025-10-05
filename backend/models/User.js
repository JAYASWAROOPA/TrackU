const mongoose = require("../db");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  preferences: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: "light" }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
