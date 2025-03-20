import React, { useState, useEffect, createContext, useContext, useCallback } from "react";
import axios from "axios";
const ThemeContext = createContext();
import Dashboard_Navbar from "../components/dashboardcomponents/Dashboard_Navbar";
import DashboardHome from "../components/dashboardcomponents/DashboardHome";
import UserSettings from "../components/dashboardcomponents/UserSettings";
import WorkoutTracking from "../components/dashboardcomponents/WorkoutTracking";
import UserPreferences from "../components/dashboardcomponents/UserPreferences";
import AddWorkout from "../components/dashboardcomponents/WorkoutTracking/AddWorkout";
import ProgressTracking from "../components/dashboardcomponents/WorkoutProgress/ProgressTracking";
import SetReminder from "../components/dashboardcomponents/SetReminder";
import CategoryManagement from "../components/dashboardcomponents/WorkoutTracking/CategoryManagement";
import Nutrition from "../components/dashboardcomponents/NutritonTracking/Nutrition";
import MealType from "../components/dashboardcomponents/NutritonTracking/MealType";
import AddRoutine from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddRoutine";
import CreateProgress from "../components/dashboardcomponents/WorkoutProgress/CreateProgress";
import AddMoreTag from "../components/dashboardcomponents/WorkoutTracking/AddMoreTag";
import AddCategory from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddCategory";
import AddTags from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddTags";
import AddNutrition from "../components/dashboardcomponents/NutritonTracking/SubComponents/AddNutrition";
import { useAuth } from "../AuthContext";
export const useTheme = () => useContext(ThemeContext);

const getInitialSelectedPage = () => {
  const stored = localStorage.getItem("selectedPage");



  
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return { page: stored, data: null };
    }
  }
  return { page: "DashboardHome", data: null };
};

const Dashboard = () => {
  const { user, logout } = useAuth();
  const userId = localStorage.getItem("userId");

  const [selectedPage, setSelectedPage] = useState(getInitialSelectedPage());
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    JSON.parse(localStorage.getItem("isSidebarOpen")) ?? true
  );
  const [theme, setTheme] = useState("light");
  
  const [notificationList, setNotificationList] = useState([]);

  const addNotification = (notif) => {
    setNotificationList((prev) => [...prev, notif]);
  };

  const handleSetSelectedPage = (page, data = null) => {
    if (typeof page === "string") {
      setSelectedPage({ page, data });
    } else {
      setSelectedPage(page);
    }
  };

  useEffect(() => {
    const fetchTheme = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`http://localhost:5000/api/preferences/${userId}`);
        const userTheme = response.data.theme || "light";
        setTheme(userTheme);
        if (userTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } catch (error) {
        console.error("Error fetching theme:", error);
      }
    };
    fetchTheme();
  }, [userId]);

  useEffect(() => {
    localStorage.setItem("isSidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);

  useEffect(() => {
    localStorage.setItem("selectedPage", JSON.stringify(selectedPage));
  }, [selectedPage]);

  const toggleTheme = useCallback(
    async (newThemeValue) => {
      const newTheme =
        typeof newThemeValue === "string"
          ? newThemeValue
          : theme === "light"
          ? "dark"
          : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      try {
        await axios.put(`http://localhost:5000/api/preferences/${userId}`, { theme: newTheme });
        console.log("Theme updated in preferences:", newTheme);
      } catch (err) {
        console.error("Error updating theme in preferences:", err);
      }
    },
    [theme, userId]
  );

  const renderPage = () => {
    switch (selectedPage.page) {
      case "DashboardHome":
        return <DashboardHome />;
      case "UserSettings":
        return <UserSettings />;
      case "WorkoutTracking":
        return <WorkoutTracking />;
      case "UserPreferences":
        return <UserPreferences />;
      case "AddWorkout":
        return <AddWorkout setSelectedPage={handleSetSelectedPage} />;
      case "Nutrition":
        return <Nutrition setSelectedPage={handleSetSelectedPage} />;
      case "MealType":
        return <MealType setSelectedPage={handleSetSelectedPage} />;
      case "ProgressTracking":
        return <ProgressTracking setSelectedPage={handleSetSelectedPage} />;
      case "SetReminder":
        return <SetReminder setSelectedPage={handleSetSelectedPage} addNotification={addNotification} />;
      case "CategoryManagement":
        return <CategoryManagement setSelectedPage={handleSetSelectedPage} />;
      case "AddRoutine":
        return <AddRoutine setSelectedPage={handleSetSelectedPage} editData={selectedPage.data} />;
      case "AddMoreTag":
        return <AddMoreTag setSelectedPage={handleSetSelectedPage} />;
      case "AddCategory":
        return <AddCategory setSelectedPage={handleSetSelectedPage} />;
      case "AddTags":
        return <AddTags setSelectedPage={handleSetSelectedPage} />;
      case "AddNutrition":
        return <AddNutrition setSelectedPage={setSelectedPage} editData={selectedPage.data} />;
      case "CreateProgress":
        return <CreateProgress setSelectedPage={handleSetSelectedPage} editData={selectedPage.data} />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {user ? (
        <div className={`h-screen transition-all duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
          <Dashboard_Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setSelectedPage={handleSetSelectedPage}
            user={user}
            logout={logout}
            notifications={notificationList}
            toggleTheme={toggleTheme}
          />
          <div className={`p-6 pt-16 transition-all duration-300 ${isSidebarOpen ? "ml-[250px]" : "ml-[60px]"} ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
            {renderPage()}
          </div>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </ThemeContext.Provider>
  );
};

export default Dashboard;
