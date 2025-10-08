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
const Event = require("./models/Events");
const Todo = require("./models/Todo");
require("./db");
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


// Get todos for a user
app.get("/api/todos/:username", async (req, res) => {
  try {
    const todos = await Todo.find({ username: req.params.username });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new todo
app.post("/api/todos/add", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a todo (task text or completion status)
app.put("/api/todos/update/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: "Todo not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
