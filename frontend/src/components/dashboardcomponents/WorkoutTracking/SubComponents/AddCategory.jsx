import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory = ({setSelectedPage}) => {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Category name is required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/categories/add", {
        name: category, 
        description: "This is a test category",
        createdBy: "650f4c8e0f1b2c3a12345678",
      });

      toast.success("Category added successfully!");
      setCategory("")
      setSelectedPage("CategoryManagement")
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center  text-gray-800 mb-6">
        Add Category
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Category:</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 text-gray-800 rounded-lg focus:ring-2 focus:ring-slate-800 focus:outline-none"
            placeholder="Enter Category"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-teal-700 text-white font-semibold py-3 rounded-lg hover:bg-teal-900 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
