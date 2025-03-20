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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WorkoutFrequencyChart = () => {
  const data = {
    labels: [],
    datasets: [
      {
        label: "Weight Frequency",
        data: [], 
        backgroundColor: ["#ff4894", "#FF3324", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,

    plugins: {
      legend: { position: "top" },
     
    },
  };

  return (
    <div  className="text-white  bg-linear-210 from-black to-gray-600  h-[100%] p-6 mt-5">
      <p className="text-2xl p-3">Workout Frequency </p>

      <Line data={data} options={options} />
    </div>
  );
};

export default WorkoutFrequencyChart;
