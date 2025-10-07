const mongoose = require("../db");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: {
    notifications: { type: Boolean, default: true },
    theme: { type: String, default: "light" },
  },
}, { timestamps: true });

// 🔧 Ensure indexes match schema
userSchema.set('autoIndex', true);

const User = mongoose.model('User', userSchema);

// Optional: Re-sync indexes on startup
User.syncIndexes().then(() => console.log("✅ User indexes synced with schema."));

module.exports = User;
