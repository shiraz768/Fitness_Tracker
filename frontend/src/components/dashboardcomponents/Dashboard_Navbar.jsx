import React, { useState, useEffect } from "react";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { GiTargetDummy, GiProgression } from "react-icons/gi";
import { RiCalendarTodoLine, RiTimer2Fill } from "react-icons/ri";
import { MdRoomPreferences } from "react-icons/md";
import { IoPersonCircleSharp, IoLogOut, IoSettings } from "react-icons/io5";
import { useTheme } from "../../pages/Dashboard";
import axios from "axios";

const Dashboard_Navbar = ({
  isSidebarOpen,
  setIsSidebarOpen,
  setSelectedPage,
  user,
  logout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workoutDropdown, setWorkoutDropdown] = useState(false);
  const [nutritionDropdown, setNutritionDropdown] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Local state for user data if not provided via props
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    // If user prop is not available, fetch the user from the backend
    if (!userData) {
      const userId = localStorage.getItem("userId");
      if (userId) {
        axios
          .get(`http://localhost:5000/api/auth/${userId}`)
          .then((res) => {
            setUserData(res.data);
          })
          .catch((err) => console.error("Error fetching user:", err));
      }
    }
    console.log(userData)
  }, [userData]);

  return (
    <div>
      <div
        className={`text-white p-4 flex items-center justify-between fixed w-full z-10 h-16 shadow-lg ${
          theme === "light" ? "bg-teal-600" : "bg-slate-900"
        }`}
      >
        <button
          className="text-white text-2xl p-3 hover:bg-gray-700 rounded transition"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>

        <p className="text-xl font-semibold">Dashboard</p>

        <div className="flex items-center space-x-3">
          <div className="relative flex space-x-3">
            <button
              onClick={toggleTheme}
              className="px-4 py-1 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-300"
              title="Toggle Theme"
            >
              {theme === "light" ? (
                <FaMoon className="text-sky-400" />
              ) : (
                <FaSun className="text-sky-500" />
              )}
            </button>
            <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="w-12 h-12 rounded-full overflow-hidden hover:opacity-80 transition"
>
  {userData && userData.profilepic ? (
    <img
      src={`http://localhost:5000/${userData.profilepic}`}
      alt="Profile"
      className="w-full h-full object-cover"
    />
  ) : (
    <IoPersonCircleSharp className="text-white text-3xl" />
  )}
</button>

          
            <p className="text-center p-3">
              {userData ? userData.username : "User"}
            </p>
            {dropdownOpen && (
              <div className="absolute right-0 mt-10 w-48 bg-white dark:bg-gray-700 text-black dark:text-white rounded shadow-lg animate-fadeIn">
                <button
                  onClick={() => {
                    setSelectedPage("UserSettings");
                    setDropdownOpen(false);
                  }}
                  className="flex w-full px-4 py-2 text-left items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <IoSettings className="text-2xl" />
                  <span>User Settings</span>
                </button>
                <button
                  onClick={logout}
                  className="w-full px-4 py-2 text-left hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center gap-2 transition"
                >
                  <IoLogOut className="text-xl" />
                  Logout
                </button>
                <button
                  onClick={() => {
                    setSelectedPage("UserPreferences");
                    setDropdownOpen(false);
                  }}
                  className="flex items-center w-full px-4 py-2 text-left gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <MdRoomPreferences />
                  <span>User Preferences</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        className={`${
          theme === "light" ? "bg-teal-600" : "bg-slate-900"
        } text-white h-screen fixed left-0 top-[64px] transition-all duration-300 shadow-lg ${
          isSidebarOpen ? "w-[250px]" : "w-[60px]"
        }`}
      >
        <div className="space-y-6 mt-4 flex flex-col justify-center">
          <button
            onClick={() => setSelectedPage("DashboardHome")}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
          >
            <RiHome2Fill className="text-2xl flex-shrink-0 w-5 h-5" />
            <span className={`${isSidebarOpen ? "ml-2 opacity-100" : "hidden"}`}>
              Dashboard
            </span>
          </button>
        
          <div className="relative">
            <button
              onClick={() => setWorkoutDropdown(!workoutDropdown)}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
            >
              <GiTargetDummy className="text-2xl flex-shrink-0 w-5 h-5" />
              <span className={`${isSidebarOpen ? "ml-2 opacity-100" : "hidden"}`}>
                Workout Tracking ▾
              </span>
            </button>
            {workoutDropdown && isSidebarOpen && (
              <div className="ml-10 bg-gray-800 dark:bg-gray-700 text-white rounded shadow-md overflow-hidden animate-slideDown">
                <button
                  onClick={() => setSelectedPage("AddWorkout")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300 hover:text-teal-600 transition"
                >
                  Add Workout
                </button>
                <button
                  onClick={() => setSelectedPage("CategoryManagement")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300 hover:text-teal-600 transition"
                >
                  Add More Category
                </button>
                <button
                  onClick={() => setSelectedPage("AddMoreTag")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300 hover:text-teal-600 transition"
                >
                  Add More Tags
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setNutritionDropdown(!nutritionDropdown)}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
            >
              <RiCalendarTodoLine className="text-2xl flex-shrink-0 w-5 h-5" />
              <span className={`${isSidebarOpen ? "ml-2 opacity-100" : "hidden"}`}>
                Nutrition Tracking ▾
              </span>
            </button>
            {nutritionDropdown && isSidebarOpen && (
              <div className="ml-10 bg-gray-800 dark:bg-gray-700 text-white rounded shadow-md overflow-hidden animate-slideDown">
                <button
                  onClick={() => setSelectedPage("Nutrition")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300 hover:text-teal-600 transition"
                >
                  Add Nutrition
                </button>
                <button
                  onClick={() => setSelectedPage("MealType")}
                  className="block px-4 py-2 w-full text-left hover:bg-gray-300 hover:text-teal-600 transition"
                >
                  Add More Meal
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedPage("ProgressTracking")}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
          >
            <GiProgression className="text-2xl flex-shrink-0 w-5 h-5" />
            <span className={`${isSidebarOpen ? "ml-2 opacity-100" : "hidden"}`}>
              Progress Tracking
            </span>
          </button>

          <button
            onClick={() => setSelectedPage("SetReminder")}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
          >
            <RiTimer2Fill className="text-2xl flex-shrink-0 w-5 h-5" />
            <span className={`${isSidebarOpen ? "ml-2 opacity-100" : "hidden"}`}>
              Set Reminder
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Navbar;
