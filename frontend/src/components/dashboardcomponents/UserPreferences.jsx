import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../../pages/Dashboard"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserPreferences = () => {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/preferences/${userId}`);
        const fetchedTheme = response.data.theme || "light";
        setTheme(fetchedTheme); 
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    if (userId) {
      fetchPreferences();
    }
  }, [userId, setTheme]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/preferences/${userId}`,
        { theme, notifications }
      );
      toast.success("Preferences saved successfully!");
      const updatedPreferences = response.data.preferences;

      setTheme(updatedPreferences.theme);
      localStorage.setItem("theme", updatedPreferences.theme);
      if (updatedPreferences.theme === "dark") {
        document.documentElement.classList.add("dark");
        console.log("Dark mode enabled");
      } else {
        document.documentElement.classList.remove("dark");
        console.log("Dark mode disabled");
      }
    } catch (error) {
      console.error("Error saving preferences:", error);
      toast.error("Error saving preferences. Please try again.");
    }
  };

  return (
    <div className={`max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg ${theme}`}>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Preferences</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Theme</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
          value={theme}
          onChange={(e) => setTheme(e.target.value)} 
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
          />
          <span className="text-lg text-gray-700">Enable Notifications</span>
        </label>
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-teal-700 text-white font-semibold py-3 rounded-lg hover:bg-teal-900 transition duration-300"
      >
        Save Preferences
      </button>
    </div>
  );
};

export default UserPreferences;
