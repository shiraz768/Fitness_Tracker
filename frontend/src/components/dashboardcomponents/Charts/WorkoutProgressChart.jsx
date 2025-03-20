import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WorkoutProgressChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkoutProgress = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }

        const response = await axios.get(
          `http://localhost:5000/api/progress/${userId}`
        );

        const progressData = response.data;

        if (!progressData.length) {
          throw new Error("No workout progress data available.");
        }

        const labels = progressData.map((entry) =>
          new Date(entry.date).toLocaleDateString()
        );

        const weightData = progressData.map((entry) => entry.weight || 0);
        const benchPressData = progressData.map((entry) => entry.benchPress || 0);
        const squatData = progressData.map((entry) => entry.squat || 0);
        const deadliftData = progressData.map((entry) => entry.deadLift || 0);
        const durationData = progressData.map((entry) => entry.duration || 0);
        const caloriesData = progressData.map((entry) => entry.caloriesBurned || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: "Weight",
              data: weightData,
              borderColor: "#36A2EB",
              backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
              label: "Bench Press",
              data: benchPressData,
              borderColor: "#FF6384",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "Squat",
              data: squatData,
              borderColor: "#FFCE56",
              backgroundColor: "rgba(255, 206, 86, 0.5)",
            },
            {
              label: "Deadlift",
              data: deadliftData,
              borderColor: "#4CAF50",
              backgroundColor: "rgba(76, 175, 80, 0.5)",
            },
            {
              label: "Duration (mins)",
              data: durationData,
              borderColor: "#8E44AD",
              backgroundColor: "rgba(142, 68, 173, 0.5)",
            },
            {
              label: "Calories Burned",
              data: caloriesData,
              borderColor: "#E74C3C",
              backgroundColor: "rgba(231, 76, 60, 0.5)",
            },
          ],
        });
      } catch (error) {
        setError(error.message || "Error fetching workout progress data.");
      } finally {
        setLoading(false);
      }
    };

    fetchWorkoutProgress();
  }, []);


  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#E2E8F0", 
          font: { size: 14 },
        },
      },
      title: {
        display: true,
        text: "Workout Progress Over Time",
        color: "#90CDF4", 
        font: { size: 16, weight: "bold" },
      },
      tooltip: {
        titleColor: "#A0AEC0",
        bodyColor: "#F7FAFC",
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#CBD5E0", 
        },
        title: {
          display: true,
          text: "Date",
          color: "#4FD1C5", 
          font: { weight: "bold" },
        },
      },
      y: {
        ticks: {
          color: "#A0AEC0", 
        },
        title: {
          display: true,
          text: "Progress Metrics",
          color: "#68D391", 
          font: { weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="rounded shadow-md border bg-gradient-to-r from-gray-900 w-full h-[50vh] to-gray-700 text-white border-gray-600 p-5">
      <p className="text-2xl font-semibold p-3 text-center text-teal-300">
        Workout Progress
      </p>
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default WorkoutProgressChart;
