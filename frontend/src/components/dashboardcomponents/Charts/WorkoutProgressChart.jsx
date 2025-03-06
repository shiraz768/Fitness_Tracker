import React from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WorkoutProgressChart = () => {
  const data = {
    labels: [],
    datasets: [
      {
        label: "Weight Progress",
        data: [], // Example data
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: { position: "top" },
        // title: { display: true, text: "Weight Progress" , },
        
    },
  };

  return (
    <div  className="rounded shadow-md  border border-gray-300 h-[100%] p-6 mt-5">
      <p className="text-2xl  p-3">Workout Progress </p>
      <Line data={data} options={options} />

    </div>
  );
};

export default WorkoutProgressChart;
