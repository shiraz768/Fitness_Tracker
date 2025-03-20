import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkoutProgressChart from "./Charts/WorkoutProgressChart";
import WorkoutFrequencyChart from "./Charts/WorkoutFrequencyChart";
import ExerciseHistoryChart from "./Charts/ExerciseHistoryChart";
import ExerciseFrequencyChart from "./Charts/ExerciseFrequencyChart";
import { useTheme } from "../../pages/Dashboard";
import WorkoutCompletionChart from "./Charts/WorkoutCompletionChart";
import CaloriesVsDurationChart from "./Charts/CaloriesBurnVsDurationChart";
import BodyTransformationChart from "./Charts/BodyTransformationChart";

const DashboardHome = () => {
  const { theme } = useTheme(); 


  const textColor = theme === "dark" ? "text-white" : "text-gray-900";
  const bgColor = theme === "dark" ? "bg-gray-900" : "bg-gray-100";

  
  const [nutritionStats, setNutritionStats] = useState({
    totalCalories: 0,
    totalCarbs: 0,
    totalProteins: 0,
    totalFats: 0,
  });

  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchNutritionStats = async () => {
      try {
        if (!userId) return;
        const response = await axios.get(`http://localhost:5000/api/nutrition/daily-stats/${userId}`);
        setNutritionStats(response.data);
      } catch (error) {
        console.error("Error fetching nutrition stats:", error);
      }
    };

    fetchNutritionStats();
  }, [userId]);

  return (
    <div className={`p-8 min-h-screen `}>
   
      <div className="w-full mb-12">
        <p className={`text-3xl font-bold ${textColor}`}>Nutrition Analytics</p>
        <p className="text-gray-500">Track your daily intake & progress here.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
      
          <div className="p-6 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
            <p className="text-lg font-semibold">Total Calories</p>
            <p className="text-2xl font-bold">{nutritionStats.totalCalories} kcal</p>
          </div>

          <div className="p-6 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 text-white">
            <p className="text-lg font-semibold">Macronutrient Breakdown</p>
            <p>Carbs: <span className="font-bold">{nutritionStats.totalCarbs}g</span></p>
            <p>Proteins: <span className="font-bold">{nutritionStats.totalProteins}g</span></p>
            <p>Fats: <span className="font-bold">{nutritionStats.totalFats}g</span></p>
          </div>

         
          <div className="p-6 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 text-white">
            <p className="text-lg font-semibold">Daily Consumption Trends</p>
            <p className="text-2xl font-bold">{nutritionStats.totalCalories > 2000 ? "High" : "Normal"}</p>
          </div>
        </div>
      </div>

      <div className="w-full mb-8">
        <p className={`text-3xl font-bold ${textColor}`}>Workout Analytics</p>
      </div>

   
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <div className="w-full h-[50vh] flex justify-center items-center">
          <WorkoutProgressChart />
        </div>

        <div className="w-full h-[50vh] flex justify-center items-center">
          <CaloriesVsDurationChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
      
        <div className="w-full h-[100vh] flex justify-center items-center row-span-2">
          <BodyTransformationChart />
        </div>

        <div className="grid grid-rows-2 gap-8">
          <div className="w-full h-[50vh] flex justify-center items-center">
            <WorkoutCompletionChart />
          </div>

          <div className="w-full h-[50vh] flex justify-center items-center">
            <ExerciseHistoryChart />
          </div>
        </div>
      </div>

    
      <div className="w-full">
        <div className="w-full flex justify-center items-center">
          <ExerciseFrequencyChart />
        </div>
      </div>
      <style >{`
      @keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slideDown {
  from { max-height: 0; opacity: 0; }
  to { max-height: 500px; opacity: 1; }
}
.animate-fadeIn {
  animation: fadeIn 0.3s ease-in-out;
}
.animate-slideDown {
  animation: slideDown 0.3s ease-in-out;
}`}
      </style>
    </div>
  );
};

export default DashboardHome;
