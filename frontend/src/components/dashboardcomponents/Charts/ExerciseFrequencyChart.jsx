import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExerciseFrequencyChart = () => {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoutineData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(`http://localhost:5000/api/workout/routines/${userId}`);

        const routineData = response.data;
        const exerciseCounts = {};

        routineData.forEach((routine) => {
          const exercise = routine.exercisename;
          exerciseCounts[exercise] = (exerciseCounts[exercise] || 0) + 1;
        });

        setChartData({
          labels: Object.keys(exerciseCounts),
          datasets: [
            {
              label: "Workout Frequency",
              data: Object.values(exerciseCounts),
              backgroundColor: ["#4FD1C5", "#81E6D9", "#63B3ED", "#F6E05E"],
            },
          ],
        });
      } catch (error) {
        setError("Error fetching routine data.");
      }
    };

    fetchRoutineData();
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
          text: "Exercises",
          color: "#90CDF4", 
          font: { weight: "bold" },
        },
      },
      y: {
        ticks: {
          color: "#A0AEC0", 
        },
        title: {
          display: true,
          text: "Frequency",
          color: "#68D391", 
          font: { weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="rounded shadow-md border bg-gradient-to-r from-gray-900 w-full to-gray-700 text-white border-gray-600 p-6 ">
      <p className="text-2xl font-semibold p-3 text-center text-teal-300">
        Exercise Frequency
      </p>
      {error ? (
        <p className="text-red-400 text-center">{error}</p>
      ) : !chartData ? (
        <p className="text-gray-300 text-center">Loading...</p>
      ) : (
        <Bar data={chartData} options={options} />
      )}
    </div>
  );
};

export default ExerciseFrequencyChart;
