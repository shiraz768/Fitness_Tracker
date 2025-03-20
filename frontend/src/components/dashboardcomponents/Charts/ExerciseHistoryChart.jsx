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


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ExerciseHistoryChart = () => {
  const [exerciseData, setExerciseData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExerciseHistory = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found. Please log in.");

        const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
        const progressData = response.data;

        if (!progressData.length) throw new Error("No exercise history available.");

        const labels = progressData.map((entry) => new Date(entry.date).toLocaleDateString());

        const datasets = progressData.reduce((acc, entry) => {
          entry.exerciseProgress.forEach((exercise) => {
            const existingDataset = acc.find((d) => d.label === exercise.exerciseName);

            if (existingDataset) {
              existingDataset.data.push(exercise.repsCompleted);
            } else {
              acc.push({
                label: exercise.exerciseName,
                data: [exercise.repsCompleted],
                borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                fill: false,
              });
            }
          });
          return acc;
        }, []);

        setExerciseData({ labels, datasets });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExerciseHistory();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { labels: { color: "#E2E8F0", font: { size: 14 } } },
      title: { display: true, text: "Exercise History", color: "#90CDF4", font: { size: 16, weight: "bold" } },
      tooltip: { titleColor: "#A0AEC0", bodyColor: "#F7FAFC" },
    },
    scales: {
      x: { ticks: { color: "#CBD5E0" }, title: { display: true, text: "Date", color: "#4FD1C5", font: { weight: "bold" } } },
      y: { ticks: { color: "#A0AEC0" }, title: { display: true, text: "Reps Completed", color: "#68D391", font: { weight: "bold" } } },
    },
  };

  return (
    <div className="rounded shadow-md border bg-gradient-to-r from-gray-900 h-full w-full to-gray-700 text-white border-gray-600 p-6 ">
      <p className="text-2xl font-semibold p-3 text-center text-teal-300">Exercise History</p>
      {loading ? (
        <p className="text-center text-gray-300">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <Line data={exerciseData} options={options} />
      )}
    </div>
  );
  
};

export default ExerciseHistoryChart;
