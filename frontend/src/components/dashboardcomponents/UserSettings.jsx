import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../pages/Dashboard";

const UserSettings = () => {
  const {theme} = useTheme()
  const [userSettings, setUserSettings] = useState({
    username: "",
    email: "",
    password: "", 
  });

  const userId = localStorage.getItem("userId");
  
  useEffect(() => {
    fetchUserSettings()
  }, [userId]);
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUserSettings({
          username: response.data.username,
          email: response.data.email,
          password: "",
        });
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    };

    if (userId) {
      fetchUserSettings();
    }

  const handleChange = (e) => {
    setUserSettings({ ...userSettings, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        username: userSettings.username,
        email: userSettings.email,
      };
      if (userSettings.password) {
        payload.password = userSettings.password;
      }
      const response = await axios.put(`http://localhost:5000/api/auth/${userId}`, payload);
      toast.success("User settings updated successfully!");
      setUserSettings({username:"", email: "", password: ""})
      fetchUserSettings()
    } catch (error) {
      console.error("Error updating user settings:", error);
      toast.error("Error updating settings. Please try again.");
    }
  };

  return (
    <div className={`max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg `}>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        User Settings
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={userSettings.username}
            onChange={handleChange}
            className="w-full p-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={userSettings.email}
            onChange={handleChange}
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Change Password</label>
          <input
            type="password"
            name="password"
            value={userSettings.password}
            onChange={handleChange}
            className="w-full p-3 border  text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter new password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg hover:bg-teal-900 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserSettings;
