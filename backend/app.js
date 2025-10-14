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
const Calendar = require("./models/Calendar");
const Event = require("./models/Events");
const Todo = require("./models/Todo");
require("./db");

const app = express();
app.use(cors()); // Allow requests from emulator / device
app.use(bodyParser.json());

// =====================
// 🌟 EVENT ROUTES 🌟
// =====================

// POST — Add new event
app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET — Events for a specific user
app.get("/events/:userId", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT — Update an event
app.put("/events/:id", async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Event not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// =====================
// 🌟 CALENDAR ROUTES 🌟
// =====================

// POST — Add calendar entry
app.post("/calendar", async (req, res) => {
  try {
    console.log("Received event:", req.body); // for debugging
    const calendarEntry = new Calendar({
      ...req.body,
      date: new Date(req.body.date), // ensure it's stored as Date
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
      date: { $gte: start, $lte: end },
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

// =====================
// 🌟 TODO ROUTES 🌟
// =====================

// GET — Todos for a user
app.get("/api/todos/:username", async (req, res) => {
  try {
    const todos = await Todo.find({ username: req.params.username });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST — Add a new todo
app.post("/api/todos/add", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT — Update a todo (task text or completion status)
app.put("/api/todos/update/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// =====================
// 🌟 SERVER START 🌟
// =====================
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

