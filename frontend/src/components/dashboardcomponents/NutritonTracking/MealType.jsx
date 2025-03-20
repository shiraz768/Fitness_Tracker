import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useTheme } from "../../../pages/Dashboard";
import { toast } from "react-toastify";

const MealType = ({ setSelectedPage }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [mealTypes, setMealTypes] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editMealName, setEditMealName] = useState("");


  useEffect(() => {
    const fetchMealTypes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/mealtypes");
        setMealTypes(res.data);
      } catch (error) {
        setError("Failed to fetch meal types.");
      } finally {
        setLoading(false);
      }
    };

    fetchMealTypes();
  }, []);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this meal type?")) {
      try {
        await axios.delete(`http://localhost:5000/api/mealtypes/${id}`);
        setMealTypes((prev) => prev.filter((item) => item._id !== id));
        toast.success("Meal type deleted successfully!");
      } catch (error) {
        alert("Failed to delete meal type. Please try again.");
      }
    }
  };

 
  const handleEdit = (item) => {
    setEditId(item._id);
    setEditMealName(item.mealtypename);
  };


  const handleCancelEdit = () => {
    setEditId(null);
    setEditMealName("");
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/api/mealtypes/${editId}`, {
        mealtypename: editMealName,
      });
      toast.success("Meal type updated successfully!");
      setMealTypes((prev) =>
        prev.map((item) => (item._id === editId ? res.data.mealType : item))
      );
      setEditId(null);
      setEditMealName("");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update meal type. Please try again."
      );
    }
  };

 
  const filteredMealTypes = mealTypes.filter((item) =>
    search === "" ||
    item.mealtypename.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMealTypes.length / rowsPerPage);
  const paginatedData = filteredMealTypes.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div
      className={`shadow-lg mt-10 p-6 w-[90%] md:w-[80%] mx-auto rounded-lg ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <p className="text-3xl font-semibold text-center mb-5">Meal Type List</p>

    
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            type="search"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-gray-100"
            }`}
            placeholder="Search meal type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
            onClick={() => setSelectedPage("AddMeal")}
          >
            Add Meal Type
          </button>
        </div>
      </div>


      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full border-collapse text-left">
            <thead>
              <tr
                className={isDarkMode ? "bg-gray-700 text-gray-100" : "bg-teal-600 text-white"}
              >
                <th className="p-4">Meal Type Name</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
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
                  <td className="p-4">
                    {editId === item._id ? (
                      <input
                        type="text"
                        value={editMealName}
                        onChange={(e) => setEditMealName(e.target.value)}
                        className="w-full p-2 border rounded"
                      />
                    ) : (
                      item.mealtypename
                    )}
                  </td>
                  <td className="p-4 flex justify-center space-x-4">
                    {editId === item._id ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="p-2 hover:text-green-500 transition"
                        >
                          <FaSave size={18} />
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 hover:text-red-500 transition"
                        >
                          <FaTimes size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 hover:text-teal-400 transition"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 hover:text-red-400 transition"
                        >
                          <FaTrash size={18} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
  );
};

export default MealType;
