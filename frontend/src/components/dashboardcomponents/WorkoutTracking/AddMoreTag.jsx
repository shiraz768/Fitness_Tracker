import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useTheme } from "../../../pages/Dashboard";
import { toast } from "react-toastify";

const AddMoreTag = ({ setSelectedPage }) => {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editTag, setEditTag] = useState(null);
  const [editName, setEditName] = useState("");
  const rowsPerPage = 5;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID is missing. Please log in.");
        }
        const response = await axios.get(
          `http://localhost:5000/api/tags?user_id=${userId}`
        );
        setTags(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/tags/${id}`);
        setTags(tags.filter((tag) => tag._id !== id));
        toast.dark("Tag deleted successfully",{style:{backgroundColor:"red",color:"white"}})
      } catch (error) {
        alert("Failed to delete tag. Please try again.");
      }
    }
  };

  const handleEditClick = (tag) => {
    setEditTag(tag._id);
    setEditName(tag.name);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/tags/${editTag}`, {
        name: editName,
      });

      setTags(
        tags.map((tag) =>
          tag._id === editTag ? { ...tag, name: editName } : tag
        )
      );

      setEditTag(null); 
      toast.success("tag added successfully")
    } catch (error) {
      alert("Failed to update tag. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditTag(null);
  };

  const filteredTags = tags.filter((tag) => {
    if (search === "") return true;

    if (selectedColumn === "all") {
      return Object.values(tag)
        .filter((val) => val !== null && val !== undefined)
        .some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        );
    } else {
      return (
        tag[selectedColumn] &&
        String(tag[selectedColumn]).toLowerCase().includes(search.toLowerCase())
      );
    }
  });

  const totalPages = Math.ceil(filteredTags.length / rowsPerPage);
  const paginatedTags = filteredTags.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className={`shadow-lg mt-10 p-6 w-[90%] md:w-[80%] mx-auto rounded-lg ${
      isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
    }`}>
      <p className="text-3xl font-semibold text-center mb-5">Tags List</p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2 w-full">
          <select
            className={`px-2 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-gray-100"
            }`}
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="all">All Columns</option>
            <option value="name">Tag Name</option>
          </select>

          <input
            type="search"
            className={`w-full px-2 py-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:outline-none ${
              isDarkMode
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-gray-100"
            }`}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className=" px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition"
            onClick={() => setSelectedPage("AddTags")}
          >
            Add Tag
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
                <th className="p-4">Tag Name</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTags.map((tag, index) => (
                <tr
                  key={tag._id}
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
                    {editTag === tag._id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className={`p-2 border rounded w-full ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600"
                            : "bg-white border-gray-300"
                        }`}
                      />
                    ) : (
                      tag.name
                    )}
                  </td>
                  <td className="p-4 flex justify-center space-x-4">
                    {editTag === tag._id ? (
                      <>
                        <button
                          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="p-2 hover:text-teal-400 transition"
                          onClick={() => handleEditClick(tag)}
                        >
                          <FaEdit size={18} />
                        </button>
                        <button
                          className="p-2 hover:text-red-400 transition"
                          onClick={() => handleDelete(tag._id)}
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
        <span className={`p-3 text-lg font-medium ${
          isDarkMode ? "text-gray-300" : "text-teal-600"
        }`}>
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

export default AddMoreTag;