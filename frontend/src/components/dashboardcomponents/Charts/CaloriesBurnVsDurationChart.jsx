import React, { useEffect, useState } from "react";
import { Scatter } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, LinearScale, PointElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend);

const CaloriesVsDurationChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found. Please log in.");

        const response = await axios.get(`http://localhost:5000/api/workout/calories-vs-duration/${userId}`);

        if (!response.data || response.data.length === 0) throw new Error("No workout data available.");

        const data = response.data.map((entry) => ({ x: entry.duration, y: entry.caloriesBurned }));

        setChartData({
          datasets: [{ label: "Calories Burned vs Duration", data, backgroundColor: "rgba(255, 99, 132, 0.8)", pointRadius: 6, pointHoverRadius: 8 }],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutData();
  }, []);

  return (
    <div className="rounded shadow-md border bg-gradient-to-r from-gray-900 h-[50vh] w-full to-gray-700 text-white border-gray-600 p-6 ">
      <p className="text-2xl font-semibold p-3 text-center text-teal-300">Calories vs Workout Duration</p>
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Scatter data={chartData} />
      )}
    </div>
  );
  
};

export default CaloriesVsDurationChart;
