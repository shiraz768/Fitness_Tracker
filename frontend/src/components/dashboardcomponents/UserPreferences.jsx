import React, { useState } from "react";

const UserPreferences = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Preferences</h2>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Theme</label>
        <select
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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


      <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300">
        Save Preferences
      </button>
    </div>
  );
};

export default UserPreferences;
