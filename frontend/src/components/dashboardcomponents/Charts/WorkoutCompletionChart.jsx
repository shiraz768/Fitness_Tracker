import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";


ChartJS.register(ArcElement, Tooltip, Legend);

const WorkoutCompletionChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found. Please log in.");

   
        const response = await axios.get(`http://localhost:5000/api/workout/completion-stats/${userId}`);
        const { completed, skipped } = response.data;

        setChartData({
          labels: ["Completed", "Skipped"],
          datasets: [
            {
              data: [completed, skipped],
              backgroundColor: ["#4CAF50", "#F44336"],
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading chart...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!chartData) return null; 

  return <Doughnut data={chartData} />;
};

export default WorkoutCompletionChart;
