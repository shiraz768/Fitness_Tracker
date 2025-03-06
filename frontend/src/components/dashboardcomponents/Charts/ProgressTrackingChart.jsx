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

const ProgressTrackingChart = () => {
  const data = {
    labels: [],
    datasets: [
      {
        label: "Weight",
        data: [], // Example data
        backgroundColor: ["#00A9A5"],
      },
      {
        label: "Chest",
        data: [], // Example data
        backgroundColor: ["#007C8A"],
      },
      {
        label: "Waist",
        data: [], // Example data
        backgroundColor: ["#005F73"],
      },
      {
        label: "Hips",
        data: [], // Example data
        backgroundColor: ["#0A9396"],
      },
      {
        label: "Run Time",
        data: [], // Example data
        backgroundColor: ["#94D2BD"],
      },
      {
        label: "Bench press",
        data: [], // Example data
        backgroundColor: ["#B3A7D6 "],
      },
      {
        label: "Squat",
        data: [], // Example data
        backgroundColor: ["#E9D8A6 "],
      },
      {
        label: "Dead Lift",
        data: [], // Example data
        backgroundColor: ["#CA6702"],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: { position: "top" },
      //   title: { display: true, text: "Weight Progress" },
    },
  };

  return (
    <div  className="rounded shadow-md  border  border-gray-300  p-6 mt-5">
      <p className="text-2xl p-3 text-center">Progress Tracking </p>

      <Line data={data} options={options} />
    </div>
  );
};

export default ProgressTrackingChart;
