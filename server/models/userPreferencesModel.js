const mongoose = require("mongoose");

const UserPreferencesSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  notifications: { type: Boolean, default: true },
});

const UserPreferences = mongoose.model("UserPreferences", UserPreferencesSchema);
module.exports = UserPreferences;
