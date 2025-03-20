const UserPreferences = require("../models/userPreferencesModel");

exports.getUserPreferences = async (req, res) => {
  try {
    const { user_id } = req.params;
    const preferences = await UserPreferences.findOne({ user_id });

    if (!preferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    res.status(200).json(preferences);
  } catch (error) {
    console.error("Error fetching preferences:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateUserPreferences = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { theme, notifications } = req.body;

    let preferences = await UserPreferences.findOne({ user_id });

    if (!preferences) {
      preferences = new UserPreferences({ user_id, theme, notifications });
    } else {
      preferences.theme = theme;
      preferences.notifications = notifications;
    }

    await preferences.save();
    res.status(200).json({ message: "Preferences updated successfully", preferences });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deleteUserPreferences = async (req, res) => {
  try {
    const { user_id } = req.params;
    const deletedPreferences = await UserPreferences.findOneAndDelete({ user_id });

    if (!deletedPreferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    res.status(200).json({ message: "Preferences deleted successfully" });
  } catch (error) {
    console.error("Error deleting preferences:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
