import React, { useState, useEffect } from "react";
import Dashboard_Navbar from "../components/dashboardcomponents/Dashboard_Navbar";
import DashboardHome from "../components/dashboardcomponents/DashboardHome";
import UserSettings from "../components/dashboardcomponents/UserSettings";
import WorkoutTracking from "../components/dashboardcomponents/WorkoutTracking";
import UserPreferences from "../components/dashboardcomponents/UserPreferences";
import AddWorkout from "../components/dashboardcomponents/WorkoutTracking/AddWorkout";
import AddMoreCategory from "../components/dashboardcomponents/WorkoutTracking/AddMoreCategory";
import AddMoreTag from "../components/dashboardcomponents/WorkoutTracking/AddMoreTag";
import AddNutrition from "../components/dashboardcomponents/NutritonTracking/AddNutrition";
import AddMoreMeal from "../components/dashboardcomponents/NutritonTracking/AddMoreMeal";
import ProgressTracking from "../components/dashboardcomponents/ProgressTracking";
import SetReminder from "../components/dashboardcomponents/SetReminder";
import AddRoutine from "../components/dashboardcomponents/WorkoutTracking/SubComponents/AddRoutine";
import { useAuth } from "../App";

const Dashboard = () => {

  const {user, logout} = useAuth();
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
        return <AddMoreCategory />;
      case "AddMoreTag":
        return <AddMoreTag />;
      case "AddNutrition":
        return <AddNutrition />;
      case "AddMoreMeal":
        return <AddMoreMeal />;
      case "ProgressTracking":
        return <ProgressTracking />;
      case "SetReminder":
        return <SetReminder />;
      case "AddRoutine":
        return <AddRoutine />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
      {user ? (
    <div className="h-screen">
      {/* ✅ Include Navbar & Sidebar */}
      <Dashboard_Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setSelectedPage={setSelectedPage}
        user={user}
        logout= {logout}
      />
      
    
      <div
      className={`p-6 pt-16 transition-all duration-300 ${
        isSidebarOpen ? "ml-[250px]" : "ml-[60px]"
        }`}
        >
        {renderPage()}
      </div>
      </div>
    ) : <p>Loading user...</p>
    }
    </>
  );
};

export default Dashboard;
