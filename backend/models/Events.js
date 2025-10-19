// const mongoose = require("../db");

// const eventSchema = new mongoose.Schema({
//   userId: { type: String, ref: 'User', required: true }, // linked to User
//   eventName: { type: String, required: true },
//   description: { type: String },
//   date: { type: Date, required: true },
//   time: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('Event', eventSchema);
const mongoose = require("../db");

const eventSchema = new mongoose.Schema({
  userId: { type: String, ref: 'User', required: true }, // linked to User
  eventName: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  reminderBefore: { type: Number, default: 10 }, // in minutes, default 10
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
