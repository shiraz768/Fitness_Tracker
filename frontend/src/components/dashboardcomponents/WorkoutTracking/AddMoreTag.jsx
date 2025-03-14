import React, { useEffect, useState } from "react";
import axios from "axios";  // ✅ Import Axios

const AddMoreTag = ({ setSelectedPage }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }

        const response = await axios.get(`http://localhost:5000/api/tags?user_id=${userId}`);
        setTags(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // ✅ Handle Delete from Database
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await axios.delete(`http://localhost:5000/api/tags/${id}`);  // ✅ DELETE request
        setTags(tags.filter((tag) => tag._id !== id)); // ✅ Remove from UI
      } catch (error) {
        alert("Failed to delete tag. Please try again.");
      }
    }
  };

  return (
    <div className="mt-20 shadow-lg w-[70%] mx-auto rounded bg-white p-6">
      <div className="mb-6">
        <p className="text-2xl font-bold text-gray-800">Tags List</p>
      </div>

      {/* 🔍 Search & Filter */}
      <div className="flex justify-between items-center pb-4 border-b">
        <input
          type="search"
          placeholder="Search..."
          className="w-1/3 p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
        />
        <div className="flex items-center space-x-2">
          <p className="text-gray-600">Filter by</p>
          <select className="p-2 border border-gray-300 rounded focus:outline-none">
            <option value="all">All Categories</option>
          </select>
        </div>
        <button 
          className="p-2 text-white bg-green-500 rounded hover:bg-green-600 transition"
          onClick={() => setSelectedPage("AddTags")}
        >
          ➕ Add Tag
        </button>
      </div>

      {/* 📌 Tags List */}
      {loading ? (
        <p className="text-center mt-6 text-gray-500">Loading tags...</p>
      ) : error ? (
        <p className="text-center mt-6 text-red-500">{error}</p>
      ) : tags.length === 0 ? (
        <p className="text-center mt-6 text-gray-500">No tags found.</p>
      ) : (
        <table className="w-full mt-6 border border-gray-200">
          <thead className="bg-gray-300">
            <tr>
              <th className="p-3 text-left">Tag Name</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{tag.name}</td>
                <td className="p-3 flex justify-center space-x-4">
                  <button className="px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition">
                    ✏️ Edit
                  </button>
                  <button 
                    className="px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                    onClick={() => handleDelete(tag._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 📜 Pagination Buttons */}
      <div className="flex justify-center mt-6 space-x-4">
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">⬅️ Prev</button>
        <span className="p-2 text-gray-700">1/2</span>
        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition">➡️ Next</button>
      </div>
    </div>
  );
};

export default AddMoreTag;
