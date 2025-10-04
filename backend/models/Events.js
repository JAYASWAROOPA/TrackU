const mongoose = require("../db");

const eventSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true }, // linked to User
  eventName: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
