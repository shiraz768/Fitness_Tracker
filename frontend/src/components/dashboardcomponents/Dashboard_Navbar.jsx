import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { GiTargetDummy, GiProgression } from "react-icons/gi";
import { RiCalendarTodoLine, RiTimer2Fill, RiHome2Fill } from "react-icons/ri";
import { MdRoomPreferences } from "react-icons/md";
import { IoPersonCircleSharp, IoLogOut, IoSettings } from "react-icons/io5";

const Dashboard_Navbar = ({ isSidebarOpen, setIsSidebarOpen, setSelectedPage,user,logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [workoutDropdown, setWorkoutDropdown] = useState(false);
  const [nutritionDropdown, setNutritionDropdown] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  return (
    <div>
     
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between fixed w-full z-10 h-16 shadow-lg">
        <button
          className="text-white text-2xl p-3 hover:bg-gray-700 rounded transition"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>

        <p className="text-xl font-semibold">Dashboard</p>

        <div className="relative">
          <div className="flex">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-white text-3xl hover:text-gray-300 transition"
          >
            <IoPersonCircleSharp />
          

            </button>
          <p className="text-center p-3">{user.username}</p>
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg animate-fadeIn">
              
              <button
                onClick={() => {
                  setSelectedPage("UserSettings");
                  setDropdownOpen(false);
                }}
                className="flex w-full px-4 py-2 text-left items-center gap-2 hover:bg-gray-200 transition"
              >
                <IoSettings className="text-2xl" />
                <span>User Settings</span>
              </button>
              <button
                onClick={logout}
                className="w-full px-4 py-2 text-left hover:bg-gray-200 flex items-center gap-2 transition"
              >
                <IoLogOut className="text-xl" />
                Logout
              </button>
              <button
                onClick={() => {
                  setSelectedPage("UserPreferences");
                  setDropdownOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-left gap-2 hover:bg-gray-200 transition"
              >
                <MdRoomPreferences />
                <span>User Preferences</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`bg-gray-900 text-white h-screen fixed left-0 top-[64px] transition-all duration-300 shadow-lg ${
          isSidebarOpen ? "w-[250px]" : "w-[60px]"
        }`}
      >
        <div className="space-y-6 mt-4">
    
          <button
            onClick={() => setSelectedPage("DashboardHome")}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
          >
            <RiHome2Fill className="text-2xl" />
            <span className={`ml-4 transition-all duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Dashboard
            </span>
          </button>

     
          <div className="relative">
            <button
              onClick={() => setWorkoutDropdown(!workoutDropdown)}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
            >
              <GiTargetDummy className="text-2xl" />
              <span className={`ml-4 transition-all duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                Workout Tracking ▾
              </span>
            </button>
            {workoutDropdown && isSidebarOpen && (
              <div className="ml-10 bg-gray-800 text-white rounded shadow-md overflow-hidden animate-slideDown">
                <button onClick={() => setSelectedPage("AddWorkout")} className="block px-4 py-2 w-full text-left hover:bg-gray-700 transition">Add Workout</button>
                <button onClick={() => setSelectedPage("AddMoreCategory")} className="block px-4 py-2 w-full text-left hover:bg-gray-700 transition">Add More Category</button>
                <button onClick={() => setSelectedPage("AddMoreTag")} className="block px-4 py-2 w-full text-left hover:bg-gray-700 transition">Add More Tags</button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setNutritionDropdown(!nutritionDropdown)}
              className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
            >
              <RiCalendarTodoLine className="text-2xl" />
              <span className={`ml-4 transition-all duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
                Nutrition Tracking ▾
              </span>
            </button>
            {nutritionDropdown && isSidebarOpen && (
              <div className="ml-10 bg-gray-800 text-white rounded shadow-md overflow-hidden animate-slideDown">
                <button onClick={() => setSelectedPage("Nutrition")} className="block px-4 py-2 w-full text-left hover:bg-gray-700 transition">Add Nutrition</button>
                <button onClick={() => setSelectedPage("MealType")} className="block px-4 py-2 w-full text-left hover:bg-gray-700 transition">Add More Meal</button>
              </div>
            )}
          </div>

          <button
            onClick={() => setSelectedPage("ProgressTracking")}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
          >
            <GiProgression className="text-2xl" />
            <span className={`ml-4 transition-all duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Progress Tracking
            </span>
          </button>

          <button
            onClick={() => setSelectedPage("SetReminder")}
            className="flex items-center px-4 py-2 w-full text-left hover:bg-gray-700 transition"
          >
            <RiTimer2Fill className="text-2xl" />
            <span className={`ml-4 transition-all duration-200 ${isSidebarOpen ? "opacity-100" : "opacity-0 w-0 overflow-hidden"}`}>
              Set Reminder
            </span>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { max-height: 0; opacity: 0; }
          to { max-height: 500px; opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
        .animate-slideDown { animation: slideDown 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default Dashboard_Navbar;
