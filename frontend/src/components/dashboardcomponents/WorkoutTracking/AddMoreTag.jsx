import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa"; // Importing icons

const AddMoreTag = ({ setSelectedPage }) => {
  const [tags, setTags] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [editTag, setEditTag] = useState(null); // Stores the tag being edited
  const [editName, setEditName] = useState(""); // Input field for editing
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

  // 🔥 Delete Tag
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        const res = await axios.delete(`http://localhost:5000/api/tags/${id}`);
        setTags(tags.filter((tag) => tag._id !== id));
        alert(res.data.message)
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
    <div className="shadow-lg mt-10 p-5 w-[80%] mx-auto bg-white rounded-lg">
      <p className="text-3xl font-semibold text-center mb-5 text-gray-800">
        Tags List
      </p>

      <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-4">
        <div className="flex flex-col md:flex-row gap-2">
   
          <select
            className="p-3 border-2 border-gray-100 focus:border-teal-900 rounded-lg outline-none"
            value={selectedColumn}
            onChange={(e) => setSelectedColumn(e.target.value)}
          >
            <option value="all">All Columns</option>
            <option value="name">Tag Name</option>
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
            onClick={() => setSelectedPage("AddTags")}
          >
            Add Tag
          </button>
        </div>
      </div>

     
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md">
          <table className="min-w-full border border-gray-300 text-left">
            <thead>
              <tr className="bg-slate-900 text-white">
                <th className="p-3 border">Tag Name</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTags.map((tag) => (
                <tr key={tag._id} className="border hover:bg-gray-100 transition">
                  <td className="p-3 border">
                    {editTag === tag._id ? (
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="p-2 border rounded w-full"
                      />
                    ) : (
                      tag.name
                    )}
                  </td>
                  <td className="p-3 flex justify-center space-x-4 border">
                    {editTag === tag._id ? (
                      <>
                   
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-700 transition"
                          onClick={handleSaveEdit}
                        >
                          Save
                        </button>

              
                        <button
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-700 transition"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
     
                        <button
                          className="flex items-center space-x-2 px-3 py-1 text-blue-500 border border-blue-500 rounded hover:bg-blue-500 hover:text-white transition"
                          onClick={() => handleEditClick(tag)}
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>

                 
                        <button
                          className="flex items-center space-x-2 px-3 py-1 text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition"
                          onClick={() => handleDelete(tag._id)}
                        >
                          <FaTrash />
                          <span>Delete</span>
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

export default AddMoreTag;
