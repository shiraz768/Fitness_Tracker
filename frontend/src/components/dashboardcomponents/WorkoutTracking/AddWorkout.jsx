import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

const AddWorkout = ({ setSelectedPage }) => {
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editMode, setEditMode] = useState(null);
  const [editData, setEditData] = useState({});
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user._id) {
          throw new Error("User ID is missing. Please log in.");
        }
        const response = await axios.get(
          `http://localhost:5000/api/workout?user_id=${user._id}`
        );
        setWorkouts(response.data);
      } catch (error) {
        setError(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workout?")) return;
    try {
      const res = await axios.delete(`http://localhost:5000/api/workout/${id}`);
      setWorkouts(workouts.filter((workout) => workout._id !== id));
      alert(res.data.message)
    } catch (error) {
      alert("Error deleting workout: " + error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (workout) => {
    setEditMode(workout._id);
    setEditData(workout);
  };


  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/workout/${editMode}`, editData);
      setWorkouts(
        workouts.map((w) => (w._id === editMode ? editData : w))
      );
      setEditMode(null);
    } catch (error) {
      alert("Error updating workout: " + error.response?.data?.message || error.message);
    }
  };

  
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const filteredData = workouts.filter((item) => {
    if (search === "") return true;

    if (selectedColumn === "all") {
      return Object.values(item)
        .filter((val) => val !== null && val !== undefined)
        .some((value) => String(value).toLowerCase().includes(search.toLowerCase()));
    } else {
      return (
        item[selectedColumn] &&
        String(item[selectedColumn]).toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="shadow-lg mt-10 p-5 w-[80%] mx-auto bg-white rounded-lg">
      <p className="text-3xl font-semibold text-center mb-5 text-gray-800">
        Workout Routines
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2">
          <select
            className="p-3 border-2 border-gray-100 focus:border-teal-900 rounded-lg outline-none"
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
            className="w-full md:w-[40%] p-3 border-gray-100 border-2 focus:outline-none rounded focus:border-teal-900"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="p-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
            onClick={() => setSelectedPage("AddRoutine")}
          >
            Add Routine
          </button>
        </div>
      </div>

      {loading ? (
  <p className="text-center text-gray-600">Loading...</p>
) : error ? (
  <p className="text-center text-red-500">{error}</p>
) : (
  <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md">
    <table className="min-w-[1200px] w-full border border-gray-300 text-left">
      <thead>
        <tr className="bg-slate-900 text-white">
          <th className="p-3 border">ID</th>
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Category</th>
          <th className="p-3 border">Tags</th>
          <th className="p-3 border">Sets</th>
          <th className="p-3 border">Reps</th>
          <th className="p-3 border">Weight</th>
          <th className="p-3 border">Notes</th>
          <th className="p-3 border">Date</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {paginatedData.map((item) => (
          <tr key={item._id} className="border hover:bg-gray-100 transition">
            <td className="p-3 border">{item._id}</td>
            <td className="p-3 border">{item.exercisename}</td>
            <td className="p-3 border">{item.category?.name}</td>
            <td className="p-3 border">{item.tags?.map((tag) => tag.name).join(", ")}</td>
            <td className="p-3 border">{item.sets}</td>
            <td className="p-3 border">{item.reps}</td>
            <td className="p-3 border">{item.weight}</td>
            <td className="p-3 border">{item.notes}</td>
            <td className="p-3 border">{item.dateTime}</td>
            <td className="p-3 border flex gap-3">
              <FaEdit className="text-blue-500 cursor-pointer" onClick={() => handleEdit(item)} />
              <FaTrash className="text-red-500 cursor-pointer" onClick={() => handleDelete(item._id)} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

     </div>
  );
};

export default AddWorkout;
