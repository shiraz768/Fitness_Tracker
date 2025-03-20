import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { useTheme } from "../../../pages/Dashboard";
import { toast } from "react-toastify";

const CategoryManagement = ({ setSelectedPage }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) throw new Error("User ID is missing. Please log in.");
      const { data } = await axios.get(
        `http://localhost:5000/api/categories?user_id=${userId}`
      );
      setCategories(data);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setIsDeleting(true);
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
      
        setCategories((prevCategories) =>
          prevCategories.filter((category) => category._id !== id)
        );
        toast.dark("Category deleted successfully",{style:{background:"red", color:"white"}})
      } catch (error) {
        alert(
          error.response?.data?.message ||
            "Failed to delete category. Please try again."
        );
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setEditName(category.name);
  };

   
  const handleCancelEdit = () => {
    setEditId(null);
    setEditName("");
  };
  const handleSaveEdit = async () => {
    try {
      const { _id } = categories.find((cat) => cat._id === editId);
      const response = await axios.put(`http://localhost:5000/api/categories/${editId}`, {
        name: editName,
      });
      setCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat._id === editId ? response.data.category : cat
        )
      );
      setEditId(null);
      setEditName("");
      toast.success("Category updated successfully!");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update category. Please try again."
      );
    }
  };

  const filteredCategories = useMemo(
    () =>
      categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
      ),
    [categories, search]
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const paginatedCategories = useMemo(
    () =>
      filteredCategories.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
      ),
    [filteredCategories, currentPage, rowsPerPage]
  );

  return (
    <div
      className={`shadow-lg mt-10 p-6 w-[90%] md:w-[80%] mx-auto rounded-lg ${
        isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <p className="text-3xl font-semibold text-center mb-5">Category Management</p>

     
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
        <input
  type="search"
  className={`w-full px-2 py-2 md:py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${
    isDarkMode
      ? "border-gray-600 bg-gray-700 text-white"
      : "border-gray-300 bg-gray-100"
  }`}
  placeholder="Search categories..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>


          <button
            className="px-2 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
            onClick={() => setSelectedPage("AddCategory")}
          >
            Add Category
          </button>
        </div>
      </div>


      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full w-full border-collapse text-left">
            <thead>
              <tr
                className={
                  isDarkMode ? "bg-gray-700 text-gray-100" : "bg-teal-600 text-white"
                }
              >
                <th className="p-4">Category Name</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category, index) => (
                <tr
                  key={category._id}
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
                    {editId === category._id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="p-2 border rounded w-full"
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td className="p-4 flex justify-center space-x-4">
                    {editId === category._id ? (
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
                          onClick={() => handleEdit(category)}
                          className="p-2 hover:text-teal-400 transition"
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          onClick={() =>
                            !isDeleting && handleDelete(category._id)
                          }
                          disabled={isDeleting}
                          className={`p-2 hover:text-red-400 transition ${
                            isDeleting ? "opacity-50 cursor-not-allowed" : ""
                          }`}
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
        <span className="p-3 text-lg font-medium text-teal-600">
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

export default CategoryManagement;
