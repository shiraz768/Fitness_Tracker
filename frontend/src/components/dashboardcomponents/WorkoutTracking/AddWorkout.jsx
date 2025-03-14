import React, { useState, useEffect } from "react";
import axios from "axios";
const AddWorkout = ({ setSelectedPage }) => {
  const [workouts, setWorkouts] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const userId = localStorage.getItem("userId"); // ✅ Ensure userId is retrieved
        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }

        const response = await axios.get(
          `http://localhost:5000/api/workout?user_id=${userId}`
        );

        setWorkouts(response.data); // ✅ Axios automatically parses JSON
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // Filtering & Searching
  const filteredData = workouts
    .filter(
      (item) =>
        search === "" ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
    )
    .filter(
      (item) =>
        filter === "all" || item.category.toLowerCase() === filter.toLowerCase()
    );

  // Pagination
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

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <input
          type="search"
          className="w-full md:w-[40%] p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="flex items-center space-x-2">
          <p className="text-gray-700 font-medium">Filter by</p>
          <select
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="Endurance">Endurance</option>
            <option value="Flexibility">Flexibility</option>
          </select>
        </div>
        <button
          className="p-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
          onClick={() => setSelectedPage("AddRoutine")}
        >
          Add Routine
        </button>
      </div>

      {/* Loading & Error Handling */}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Category</th>
                <th className="p-3 border">Tags</th>
                <th className="p-3 border">Sets</th>
                <th className="p-3 border">Reps</th>
                <th className="p-3 border">Weights</th>
                <th className="p-3 border">Notes</th>
                <th className="p-3 border">Date</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={item._id}
                  className="border hover:bg-gray-100 transition duration-200"
                >
                  <td className="p-3 border">{item._id}</td>
                  <td className="p-3 border">{item.category?.name}</td> 
                  <td className="p-3 border">{item.category?.name}</td>
          
                  <td className="p-3 border">
                    {item.tags?.map((tag) => tag.name).join(", ")}
                  </td>
            
                  <td className="p-3 border">{item.sets}</td>
                  <td className="p-3 border">{item.reps}</td>
                  <td className="p-3 border">{item.weight}</td>
                  <td className="p-3 border">{item.notes}</td>
                  <td className="p-3 border">{item.dateTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-3">
        <button
          className={`p-3 rounded-lg font-semibold ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 transition"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="p-3 text-lg font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`p-3 rounded-lg font-semibold ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 transition"}`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AddWorkout;
