import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { MdEditSquare, MdDeleteForever, MdFileDownload, MdAdd } from "react-icons/md";
import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CSVLink } from "react-csv";
import ProgressTrackingChart from "../Charts/ProgressTrackingChart";
import { useTheme } from "../../../pages/Dashboard";

const formatDateTime = (dateTimeString) => {
  return new Date(dateTimeString).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const ProgressTracking = ({ setSelectedPage }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);


   
   const [currentPage, setCurrentPage] = useState(1);
   const rowsPerPage = 5;
   const filteredProgress = progress.filter((item) =>
    searchTerm === "" ||
    JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const totalPages = Math.ceil(filteredProgress.length / rowsPerPage);
  
 
  const paginatedData = filteredProgress.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const fetchData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID is missing. Please log in.");
      const response = await axios.get(`http://localhost:5000/api/progress/${userId}`);
      if (Array.isArray(response.data)) {
        setProgress(response.data);
      } else {
        setProgress([]);
      }
    } catch (error) {
      setError("Error fetching progress data");
      setProgress([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this progress entry?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/progress/${id}`);
      setProgress(progress.filter((item) => item._id !== id));
      toast.success("Progress deleted successfully");
    } catch (error) {
      toast.error("Error deleting progress entry");
    }
  };

  const handleEdit = (item) => {
    // Navigate to CreateProgress page with edit data
    setSelectedPage("CreateProgress", item);
  };

  const handleGeneratePDF = () => {
    // Generate a PDF report using jsPDF
    const doc = new jsPDF();
    doc.text("Progress Report", 10, 10);
    progress.forEach((item, index) => {
      doc.text(
        `${index + 1}. Weight: ${item.weight}, Chest: ${item.chest}, Waist: ${item.waist}, Hips: ${item.hips}`,
        10,
        20 + index * 10
      );
    });
    doc.save("progress_data.pdf");
  };

  return (
    <>
      <div className={`w-[70%] mx-auto rounded-lg ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <ProgressTrackingChart darkMode={isDarkMode} />
      </div>

      <div className="flex flex-col items-center p-8">
      
        <div className={`w-full max-w-[90%] p-6 rounded-lg shadow-lg ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
          <h1 className={`text-3xl font-semibold text-center mb-5 ${isDarkMode ? "text-gray-100" : "text-gray-800"}`}>
            Progress Tracking
          </h1>

          <div className="flex flex-col md:flex-row justify-between items-center my-5 gap-4">
            <input
              type="text"
              placeholder="Search progress..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 outline-none ${
                isDarkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-100 border-gray-300 text-gray-900"
              }`}
            />
            <div className="flex flex-wrap md:flex-nowrap items-center justify-end gap-2 md:gap-3 w-full md:w-auto">
              <button
                onClick={() => setSelectedPage("CreateProgress")}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition whitespace-nowrap"
              >
                <MdAdd className="mr-2" size={20} />
                Add Progress
              </button>
              <CSVLink
                data={progress.map(({ weight, chest, waist, hips, runTime, benchPress, squat, deadLift, date }) => ({
                  weight,
                  chest,
                  waist,
                  hips,
                  runTime,
                  benchPress,
                  squat,
                  deadLift,
                  date,
                }))}
                headers={[
                  { label: "Weight", key: "weight" },
                  { label: "Chest", key: "chest" },
                  { label: "Waist", key: "waist" },
                  { label: "Hips", key: "hips" },
                  { label: "Run Time", key: "runTime" },
                  { label: "Bench Press", key: "benchPress" },
                  { label: "Squat", key: "squat" },
                  { label: "Deadlift", key: "deadLift" },
                  { label: "Date", key: "date" },
                ]}
                filename="progress_data.csv"
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition whitespace-nowrap"
              >
                <MdFileDownload className="mr-2" size={20} />
                Export CSV
              </CSVLink>
              <button
                onClick={handleGeneratePDF}
                className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition whitespace-nowrap"
              >
                <MdFileDownload className="mr-2" size={20} />
                Export PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full border-collapse text-left">
              <thead>
                <tr className={isDarkMode ? "bg-gray-700 text-gray-100" : "bg-teal-600 text-white"}>
                  <th className="p-4">Weight</th>
                  <th className="p-4">Chest</th>
                  <th className="p-4">Waist</th>
                  <th className="p-4">Hips</th>
                  <th className="p-4">Run Time</th>
                  <th className="p-4">Bench Press</th>
                  <th className="p-4">Squat</th>
                  <th className="p-4">Deadlift</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {progress.length > 0 ? (
                  progress.map((item, index) => (
                    <tr
                      key={item._id}
                      className={`transition ${
                        index % 2 === 0
                          ? isDarkMode
                            ? "bg-gray-800"
                            : "bg-gray-50"
                          : isDarkMode
                          ? "bg-gray-750"
                          : "bg-gray-100"
                      } hover:bg-opacity-70`}
                    >
                      <td className="p-4">{item.weight}</td>
                      <td className="p-4">{item.chest}</td>
                      <td className="p-4">{item.waist}</td>
                      <td className="p-4">{item.hips}</td>
                      <td className="p-4">{item.runTime}</td>
                      <td className="p-4">{item.benchPress}</td>
                      <td className="p-4">{item.squat}</td>
                      <td className="p-4">{item.deadLift}</td>
                      <td className="p-4">{formatDateTime(item.date)}</td>
                      <td className="p-4 flex justify-center gap-3">
                        <MdEditSquare
                          className={`cursor-pointer hover:text-teal-400 transition ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          size={22}
                          onClick={() => handleEdit(item)}
                        />
                        <MdDeleteForever
                          className={`cursor-pointer hover:text-red-400 transition ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
                          size={22}
                          onClick={() => handleDelete(item._id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="text-center p-4">
                      {loading ? "Loading..." : "No progress data found."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-6 space-x-3">
            <button
              className={`p-3 rounded-lg font-semibold ${
                currentPage === 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className={`p-3 text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-teal-600"}`}>
              {currentPage} / {totalPages}
            </span>
            <button
              className={`p-3 rounded-lg font-semibold ${
                currentPage === totalPages
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProgressTracking;
