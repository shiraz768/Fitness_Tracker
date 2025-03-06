import React from "react";
import Chart from "chart.js/auto";
import WorkoutProgressChart from "./Charts/WorkoutProgressChart";
import WorkoutFrequencyChart from "./Charts/WorkoutFrequencyChart";
import ExerciseHistoryChart from "./Charts/ExerciseHistoryChart";

const DashboardHome = () => {
  return (
    <div className="p-10  min-h-screen">

      <div className="w-full">
        <p className="text-3xl font-bold text-gray-800">Nutrition Analytics</p>
        <p className="text-gray-600">Track your daily intake & progress here.</p>

      
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 text-white">
     
          <div className="p-6 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 shadow-lg">
            <p className="text-lg font-semibold">Total Calories</p>
            <p className="text-2xl font-bold">0</p>
          </div>

      
          <div className="p-6 rounded-lg bg-gradient-to-r from-green-500 to-teal-500 shadow-lg">
            <p className="text-lg font-semibold">Macronutrient Distribution</p>
            <p>Carbohydrates: <span className="font-bold">0g</span></p>
            <p>Proteins: <span className="font-bold">0g</span></p>
            <p>Fats: <span className="font-bold">0g</span></p>
          </div>

   
          <div className="p-6 rounded-lg bg-gradient-to-r from-pink-500 to-red-500 shadow-lg">
            <p className="text-lg font-semibold">Daily Consumption Trends</p>
            <p className="text-2xl font-bold">0</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-10">
        <p className="text-3xl font-bold text-gray-800">Workout Analytics</p>
      </div>

      <div className="grid w-full grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
   
        <div className="w-full">
          <WorkoutProgressChart />
        </div>
        <div className="w-full">
          <WorkoutFrequencyChart />
        </div>

        <div className="col-span-1 sm:col-span-2 w-full">
          <ExerciseHistoryChart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
