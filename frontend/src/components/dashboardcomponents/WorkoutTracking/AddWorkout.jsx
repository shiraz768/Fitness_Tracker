// AddWorkout.js
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTheme } from "../../../pages/Dashboard"; 
import { toast } from "react-toastify";

const AddWorkout = ({ setSelectedPage }) => {
  const { theme } = useTheme(); 
  const isDarkMode = theme === "dark";

  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID is missing. Please log in.");
      const { data } = await axios.get(`http://localhost:5000/api/workout/routines/${userId}`);
      setWorkouts(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch workouts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

 
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this routine?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/workout/${id}`);
      toast.dark("Routine Deleted Successfully",{style:{background:"red", color:"white"}})
     fetchWorkouts()
    } catch (error) {
      alert("Error deleting routine: " + (error.response?.data?.message || error.message));
    }
  };


  const handleEdit = (workout) => {
    setSelectedPage("AddRoutine", workout); 
  };

  const filteredData = useMemo(() => {
    return workouts.filter((item) => {
      if (!search) return true;
      return selectedColumn === "all"
        ? Object.values(item).some((value) => String(value).toLowerCase().includes(search.toLowerCase()))
        : String(item[selectedColumn] || "").toLowerCase().includes(search.toLowerCase());
    });
  }, [workouts, search, selectedColumn]);

  const paginatedData = useMemo(() => {
    return filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className={`shadow-lg mt-10 p-6 w-[90%] md:w-[80%] mx-auto rounded-lg ${isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"}`}>
      <p className="text-3xl font-semibold text-center mb-5">Workout Routines</p>
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <select
            className={`p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100"}`}
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="all">All Columns</option>
            <option value="exercisename">Name</option>
            <option value="category">Category</option>
            <option value="sets">Sets</option>
            <option value="reps">Reps</option>
          </select>
          <input
            type="search"
            className={`w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100"}`}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="px-3 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
            onClick={() => setSelectedPage({ page: "AddRoutine", data: null })}
          >
            Add Routine
          </button>
        </div>
      </div>
      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-[1200px] w-full border-collapse text-left">
            <thead>
              <tr className={isDarkMode ? "bg-gray-700 text-gray-100" : "bg-teal-600 text-white"}>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Tags</th>
                <th className="p-4">Sets</th>
                <th className="p-4">Reps</th>
                <th className="p-4">Weight</th>
                <th className="p-4">Notes</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item._id}
                  className={`transition ${index % 2 === 0 ? (isDarkMode ? "bg-gray-800" : "bg-gray-50") : (isDarkMode ? "bg-gray-750" : "bg-gray-100")} hover:bg-opacity-70`}
                >
                  <td className="p-4">{item.exercisename}</td>
                  <td className="p-4">{item.category?.name || "N/A"}</td>
                  <td className="p-4">{item.tags?.map(tag => tag.name).join(", ") || "N/A"}</td>
                  <td className="p-4">{item.sets}</td>
                  <td className="p-4">{item.reps}</td>
                  <td className="p-4">{item.weight || "N/A"}</td>
                  <td className="p-4">{item.notes || "N/A"}</td>
                  <td className="p-4">{new Date(item.dateTime).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-center space-x-4">
                    <button className="p-2 hover:text-teal-400 transition" onClick={() => handleEdit(item)}>
                      <FaEdit size={18} />
                    </button>
                    <button className="p-2 hover:text-red-400 transition" onClick={() => handleDelete(item._id)}>
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          className={`p-3 rounded-lg font-semibold ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="p-3 text-lg font-medium text-teal-600">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`p-3 rounded-lg font-semibold ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-teal-600 text-white hover:bg-teal-700"}`}
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddWorkout;
