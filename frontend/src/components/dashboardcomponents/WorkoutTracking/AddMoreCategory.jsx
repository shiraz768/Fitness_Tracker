import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";

const AddMoreCategory = ({ setSelectedPage }) => {
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }

        const response = await axios.get(`http://localhost:5000/api/categories?user_id=${userId}`);
        setCategories(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:5000/api/categories/${id}`);
        setCategories(categories.filter((category) => category._id !== id));
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          alert("Failed to delete category. Please try again.");
        }
      }
    }
  };
  

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="shadow-lg mt-10 p-5 w-[80%] mx-auto bg-white rounded-lg">
      <p className="text-3xl font-semibold text-center mb-5 text-gray-800">
        Workout Routines
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <input
          type="search"
          className="w-full md:w-[40%] p-3 border-gray-100 border-2 focus:outline-none rounded focus:border-teal-900"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="p-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-900 transition"
          onClick={() => setSelectedPage("AddCategory")}
        >
          + Add Category
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="p-3 border">Category Name</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCategories.map((category) => (
                <tr key={category._id} className="border hover:bg-gray-100 transition">
                  <td className="p-3 border">{category.name}</td>
                  <td className="p-3 flex justify-center space-x-4 border">
                    <button className="flex items-center space-x-2 px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                      <FaEdit />
                      <span>Edit</span>
                    </button>
                    <button
                      className="flex items-center space-x-2 px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                      onClick={() => handleDelete(category._id)}
                    >
                      <FaTrash />
                      <span>Delete</span>
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
            currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="p-3 text-lg font-medium">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`p-3 rounded-lg font-semibold ${
            currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
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

export default AddMoreCategory;
