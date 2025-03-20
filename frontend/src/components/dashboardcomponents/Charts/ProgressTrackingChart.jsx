import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const ProgressTrackingChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }

        const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
        const progress = response.data;

        const labels = progress.map((entry) => new Date(entry.date).toLocaleDateString());
        const datasetNames = ["weight", "chest", "waist", "hips", "runTime", "benchPress", "squat", "deadLift"];
        const colors = ["#00A9A5", "#007C8A", "#005F73", "#0A9396", "#94D2BD", "#B3A7D6", "#E9D8A6", "#CA6702"];

        // Map progress data for the body measurements and main stats
        const datasets = datasetNames.map((key, index) => ({
          label: key.charAt(0).toUpperCase() + key.slice(1),
          data: progress.map((entry) => entry[key]),
          borderColor: colors[index],
          backgroundColor: colors[index] + "80",
          fill: false,
        }));

        // ✅ Include exercise progress if available
        if (progress.some((entry) => entry.exerciseProgress.length > 0)) {
          progress.forEach((entry) => {
            entry.exerciseProgress.forEach((exercise) => {
              const exerciseLabel = exercise.exerciseName || "Unknown Exercise";
              const existingDataset = datasets.find((dataset) => dataset.label === exerciseLabel);

              if (existingDataset) {
                existingDataset.data.push(exercise.repsCompleted || 0);
              } else {
                datasets.push({
                  label: exerciseLabel,
                  data: [exercise.repsCompleted || 0],
                  borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`, // Random color
                  backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}80`,
                  fill: false,
                });
              }
            });
          });
        }

        setChartData({ labels, datasets });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
  };

  return (
    <div className="rounded shadow-md border border-gray-300 p-6 mt-5">
      <p className="text-2xl p-3 text-center">Progress Tracking</p>
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ProgressTrackingChart;
