const mongoose = require("../db");

const todoSchema = new mongoose.Schema({
  username: { type: String, required: true },       // link task to username
  task: { type: String, required: true },           // ✅ renamed from text → task
  isCompleted: { type: Boolean, default: false },   // ✅ renamed from done → isCompleted
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Todo", todoSchema);
