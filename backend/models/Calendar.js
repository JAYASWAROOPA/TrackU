
const mongoose = require("../db");
const calendarSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  eventName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: false }
}, {
});
module.exports = mongoose.model('Calendar', calendarSchema);

