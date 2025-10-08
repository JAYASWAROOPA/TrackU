// const express = require("express");
// const bodyParser = require("body-parser");
// const Event = require("./models/Events");

// const app = express();
// app.use(bodyParser.json());

// app.post("/postEvents", async (req, res) => {
//   try {
//     const event = new Event(req.body);
//     const saved = await event.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // ✅ Get events for a user
// app.get("/getEvents", async (req, res) => {
//   try {
//     Event.find({}).then(function(users){
//         res.json(users)
//     })
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.listen(5000, () => console.log("🚀 Server running on port 5000"));
// app.js (or server entry)
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Calendar = require('./models/Calendar');
const Event = require("./models/Events");

const app = express();
app.use(cors()); // <--- allow requests from emulator / device
app.use(bodyParser.json());

// POST (you already have this)
app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET events for a user (you already have this)
app.get("/events/:userId", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// NEW: Update an event
app.put("/events/:id", async (req, res) => {
  try {
    // req.body should contain { userId, eventName, description, date, time }
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Event not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Get events for a specific date
// =====================
// 🌟 CALENDAR ROUTES 🌟
// =====================

// POST — Add calendar entry
app.post("/calendar", async (req, res) => {
  try {
    console.log("Received event:", req.body); // for debugging
    const calendarEntry = new Calendar({
      ...req.body,
      date: new Date(req.body.date), // make sure it's stored as Date
    });
    const saved = await calendarEntry.save();
    console.log("Saved entry:", saved);
    res.status(201).json(saved);
  } catch (err) {
    console.log("Error:", err);
    res.status(400).json({ error: err.message });
  }
});


// GET — Calendar entries for a specific date
app.get("/calendar/:userId/:date", async (req, res) => {
  try {
    const { userId, date } = req.params;

    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const events = await Calendar.find({
      userId,
      date: { $gte: start, $lte: end }
    });

    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET — All calendar entries for a user
app.get("/calendar/:userId", async (req, res) => {
  try {
    const entries = await Calendar.find({ userId: req.params.userId });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));