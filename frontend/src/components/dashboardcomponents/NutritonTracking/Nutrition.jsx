import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTheme } from "../../../pages/Dashboard";
import { toast } from "react-toastify";

const Nutrition = ({ setSelectedPage }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [nutritions, setNutritions] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 
  const fetchNutritions = useCallback(async () => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID is missing. Please log in.");
      }
      const res = await axios.get(`http://localhost:5000/api/nutrition/${userId}`);
      setNutritions(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNutritions();
  }, [fetchNutritions]);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this nutrition item?")) {
      try {
        await axios.delete(`http://localhost:5000/api/nutrition/${id}`);
        setNutritions((prev) => prev.filter((item) => item._id !== id));
        toast.success("Nutrition item deleted successfully!");
        fetchNutritions()
      } catch (error) {
        alert("Failed to delete item. Please try again.");
      }
    }
  };


  const handleEdit = (item) => {
    setSelectedPage("AddNutrition", item);
  };

 
  const filteredData = nutritions.filter((item) =>
    search === "" ||
    (filter === "all"
      ? Object.values(item)
          .map((value) =>
            typeof value === "object" ? JSON.stringify(value) : String(value)
          )
          .some((value) => value.toLowerCase().includes(search.toLowerCase()))
      : String(filter.split(".").reduce((o, key) => o?.[key], item) || "")
          .toLowerCase()
          .includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div
      className={`shadow-lg mt-10 p-6 w-[90%] md:w-[80%] mx-auto rounded-lg ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <p className="text-3xl font-semibold text-center mb-5">Nutrition List</p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <input
            type="search"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100"
            }`}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              isDarkMode ? "border-gray-600 bg-gray-700 text-white" : "border-gray-300 bg-gray-100"
            }`}
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">Filter By Column</option>
            {[
              { key: "mealType_Id.mealtypename", label: "Meal Type" },
              { key: "nutritionname", label: "Food Items" },
              { key: "quantity", label: "Quantity" },
              { key: "calories", label: "Calories" },
              { key: "carbohydrates", label: "Carbs" },
              { key: "protein", label: "Proteins" },
              { key: "fat", label: "Fats" },
              { key: "createdAt", label: "Created At" },
              { key: "updatedAt", label: "Updated At" },
            ].map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          <button
            className="p-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
            onClick={() => setSelectedPage("AddNutrition")}
          >
            Add Nutrition
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
              <tr className={isDarkMode ? "bg-gray-700 text-gray-100" : "bg-teal-600 text-white"}>
                <th className="p-4">Meal Type</th>
                <th className="p-4">Food Items</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Calories</th>
                <th className="p-4">Carbs</th>
                <th className="p-4">Proteins</th>
                <th className="p-4">Fats</th>
                <th className="p-4">Created At</th>
                <th className="p-4">Updated At</th>
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
                  <td className="p-4">{item.mealType_Id?.mealtypename}</td>
                  <td className="p-4">{item.nutritionname}</td>
                  <td className="p-4">{item.quantity}</td>
                  <td className="p-4">{item.calories}</td>
                  <td className="p-4">{item.carbohydrates}</td>
                  <td className="p-4">{item.protein}</td>
                  <td className="p-4">{item.fat}</td>
                  <td className="p-4">{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">{new Date(item.updatedAt).toLocaleDateString()}</td>
                  <td className="p-4 flex justify-center space-x-4">
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

export default Nutrition;
