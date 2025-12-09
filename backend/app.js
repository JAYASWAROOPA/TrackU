const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db");
const Calendar = require("./models/Calendar");
const Event = require("./models/Events");
const Todo = require("./models/Todo");
const User = require("./models/User");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* -------------------------- EVENT ROUTES -------------------------- */

// POST - Create event
app.post("/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    const saved = await event.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Get all events for a user
app.get("/events/:userId", async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update an event
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

/* -------------------------- TODO ROUTES -------------------------- */

// GET - Get todos for a user
app.get("/api/todos/:username", async (req, res) => {
  try {
    const todos = await Todo.find({ username: req.params.username });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST - Add a new todo
app.post("/api/todos/add", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Update a todo (task text or completion status)
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

/* -------------------------- CALENDAR ROUTES -------------------------- */

// POST — Add calendar entry
app.post("/calendar", async (req, res) => {
  try {
    console.log("Received event:", req.body);
    const calendarEntry = new Calendar({
      ...req.body,
      date: new Date(req.body.date),
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

/* -------------------------- USER ROUTES -------------------------- */

// POST - Create new user
app.post("/users", async (req, res) => {
  try {
    const { username, password, preferences } = req.body;
    const newUser = new User({ username, password, preferences });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET - Get all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET - Get user by username
app.get("/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT - Update user preferences or password
app.put("/users/:username", async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      { $set: updates },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.put('/change_password', async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    console.log("📩 Password change request received:", { username, currentPassword, newPassword });

    // 1️⃣ Validate input
    if (!username || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2️⃣ Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log("❌ User not found:", username);
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Check current password
    if (user.password !== currentPassword) {
      console.log("❌ Incorrect current password");
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // 4️⃣ Update to new password
    user.password = newPassword;
    await user.save();

    console.log("✅ Password updated successfully for user:", username);
    res.status(200).json({ message: "Password updated successfully" });

  } catch (error) {
    console.error("🔥 Error updating password:", error);
    res.status(500).json({ message: "Failed to update password", error: error.message });
  }
});
app.delete('/events/:id', async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// POST - User Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.password !== password)
      return res.status(401).json({ error: "Invalid password" });

    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        preferences: user.preferences,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* -------------------------- SERVER -------------------------- */
app.listen(5000, "0.0.0.0", () => {
  console.log("🚀 Server running on http://0.0.0.0:5000");
});
