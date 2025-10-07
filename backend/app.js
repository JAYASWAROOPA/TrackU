const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Event = require("./models/Events");
const User = require("./models/User"); // fixed path (no ../ if same level)
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

/* -------------------------- SERVER START -------------------------- */
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

// POST - User Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Simple password check (you can later use bcrypt for encryption)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Login successful
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



