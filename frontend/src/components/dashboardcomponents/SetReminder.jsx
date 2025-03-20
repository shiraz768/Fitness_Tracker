import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useTheme } from "../../pages/Dashboard";

const SetReminder = () => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [reminderData, setReminderData] = useState({
    type: "",
    message: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

 
  const scheduleNotification = (message, time) => {
    const reminderTime = new Date(time);
    const delay = reminderTime - new Date();

    if (delay <= 0) {
  
      alert(`Reminder Alert: ${message}`);
    } else {
      setTimeout(() => {
        alert(`Reminder Alert: ${message}`);
      }, delay);
    }
  };


  const handleReminderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await axios.post("http://localhost:5000/api/reminders", {
        userId,
        type: reminderData.type,
        message: reminderData.message,
        time: new Date(reminderData.time),
      });

      toast.success("Reminder set successfully!");

      scheduleNotification(response.data.reminder.message, reminderData.time);

  
      setReminderData({
        type: "",
        message: "",
        time: "",
      });
    } catch (error) {
      console.error("Reminder submission error:", error);
      toast.error("Failed to set reminder");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`mt-10 p-6 shadow-lg w-full md:w-[60%] rounded-lg mx-auto transition-colors ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      <p
        className={`text-2xl font-semibold text-center ${
          isDarkMode ? "text-gray-100" : "text-gray-800"
        }`}
      >
        Fitness Notification Alerts
      </p>

      <form
        onSubmit={handleReminderSubmit}
        className="p-5 space-y-4 flex flex-col items-center"
      >

        <select
          value={reminderData.type}
          onChange={(e) =>
            setReminderData({ ...reminderData, type: e.target.value })
          }
          required
          className={`py-2 w-full max-w-md px-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none mx-auto ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        >
          <option value="">Select Reminder Type</option>
          <option value="workout">Workout</option>
          <option value="meal">Meal</option>
          <option value="medication">Medication</option>
          <option value="custom">Custom</option>
        </select>

    
        <input
          type="text"
          value={reminderData.message}
          onChange={(e) =>
            setReminderData({ ...reminderData, message: e.target.value })
          }
          placeholder="Reminder message"
          required
          className={`w-full max-w-md py-2 px-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none mx-auto ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        />

       
        <input
          type="datetime-local"
          value={reminderData.time}
          onChange={(e) =>
            setReminderData({ ...reminderData, time: e.target.value })
          }
          required
          className={`w-full max-w-md py-2 px-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none mx-auto ${
            isDarkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-gray-100 border-gray-300 text-gray-900"
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full max-w-md py-2 px-4 rounded-lg font-medium transition-colors mx-auto ${
            isDarkMode
              ? "bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-800"
              : "bg-teal-600 text-white hover:bg-teal-700 disabled:bg-teal-800"
          }`}
        >
          {loading ? "Processing..." : "Set Reminder"}
        </button>
      </form>
    </div>
  );
};

export default SetReminder;
