import React, { useState, useEffect } from "react";
import Dashboard_Navbar from "../components/dashboardcomponents/Dashboard_Navbar";
import DashboardHome from "../components/dashboardcomponents/DashboardHome";
import UserSettings from "../components/dashboardcomponents/UserSettings";
import WorkoutTracking from "../components/dashboardcomponents/WorkoutTracking";
import UserPreferences from "../components/dashboardcomponents/UserPreferences";
import AddWorkout from "../components/dashboardcomponents/WorkoutTracking/AddWorkout";
import AddMoreCategory from "../components/dashboardcomponents/WorkoutTracking/AddMoreCategory";
import AddMoreTag from "../components/dashboardcomponents/WorkoutTracking/AddMoreTag";
import AddNutrition from "../components/dashboardcomponents/NutritonTracking/SubComponents/AddNutrition";
import MealType from "../components/dashboardcomponents/NutritonTracking/MealType";
import ProgressTracking from "../components/dashboardcomponents/ProgressTracking";
import SetReminder from "../components/dashboardcomponents/SetReminder";
import AddRoutine from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddRoutine";
import AddCategory from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddCategory";
import { useAuth } from "../App";
import AddTags from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddTags";
import Nutrition from "../components/dashboardcomponents/NutritonTracking/Nutrition";
import AddMeal from "../components/dashboardcomponents/NutritonTracking/SubComponents/AddMeal";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [selectedPage, setSelectedPage] = useState(
    localStorage.getItem("selectedPage") || "DashboardHome"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    localStorage.setItem("selectedPage", selectedPage);
  }, [selectedPage]);

  const renderPage = () => {
    switch (selectedPage) {
      case "DashboardHome":
        return <DashboardHome />;
      case "UserSettings":
        return <UserSettings />;
      case "WorkoutTracking":
        return <WorkoutTracking />;
      case "UserPreferences":
        return <UserPreferences />;
      case "AddWorkout":
        return <AddWorkout setSelectedPage={setSelectedPage} />;

      case "AddMoreCategory":
        return <AddMoreCategory setSelectedPage={setSelectedPage} />;
      case "AddMoreTag":
        return <AddMoreTag setSelectedPage={setSelectedPage} />;
      case "Nutrition":
        return <Nutrition setSelectedPage={setSelectedPage} />;
      case "MealType":
        return <MealType setSelectedPage={setSelectedPage} />;
      case "ProgressTracking":
        return <ProgressTracking />;
      case "SetReminder":
        return <SetReminder />;
      case "AddRoutine":
        return <AddRoutine />;
      case "AddCategory":
        return <AddCategory />;
      case "AddTags":
        return <AddTags />;
      case "AddNutrition":
        return <AddNutrition />;
      case "AddMeal":
        return <AddMeal />;

      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      {user ? (
        <div className="h-screen">
          
          <Dashboard_Navbar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            setSelectedPage={setSelectedPage}
            user={user}
            logout={logout}
          />

          <div
            className={`p-6 pt-16 transition-all duration-300 ${
              isSidebarOpen ? "ml-[250px]" : "ml-[60px]"
            }`}
          >
            {renderPage()}
          </div>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </>
  );
};

export default Dashboard;
