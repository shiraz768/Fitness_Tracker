import React, { useEffect, useState } from "react";
import { Radar } from "react-chartjs-2";
import axios from "axios";
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";


ChartJS.register(RadialLinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BodyTransformationChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgressData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) throw new Error("User ID not found. Please log in.");

        const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
        const progress = response.data.slice(-2);

        if (progress.length < 2) throw new Error("Not enough data for comparison.");

        setChartData({
          labels: ["Chest", "Waist", "Hips"],
          datasets: [
            {
              label: "Before",
              data: [progress[0].chest, progress[0].waist, progress[0].hips],
              backgroundColor: "rgba(255, 99, 132, 0.5)",
              borderColor: "rgba(255, 99, 132, 1)",
            },
            {
              label: "After",
              data: [progress[1].chest, progress[1].waist, progress[1].hips],
              backgroundColor: "rgba(54, 162, 235, 0.5)",
              borderColor: "rgba(54, 162, 235, 1)",
            },
          ],
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgressData();
  }, []);

  return (
    <div className=" flex flex-col justify-between items-center h-full w-full rounded shadow-md border bg-gradient-to-r from-gray-900 to-gray-700 text-white border-gray-600 p-6 overflow-hidden">
      {/* Title */}
      <p className="text-2xl font-semibold text-center text-teal-300 mb-4">Body Transformation</p>
      
      {/* Chart Container */}
      <div className="flex-grow flex justify-center items-center w-full">
        {loading ? (
          <p className="text-center text-gray-300">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="w-full max-w-[500px] h-auto">
            <Radar data={chartData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyTransformationChart;
