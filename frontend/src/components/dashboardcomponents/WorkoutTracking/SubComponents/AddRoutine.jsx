import React, { useState, useEffect } from "react";
import axios from "axios";

const AddRoutine = () => {
  const [routine, setRoutine] = useState({
    exercisename: "",
    category: "",
    tags: [],
    sets: "",
    reps: "",
    weight: "",
    notes: "",
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchTags = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tags");
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchCategories();
    fetchTags();
  }, []);

  const handleChange = (e) => {
    setRoutine({ ...routine, [e.target.name]: e.target.value });
  };

  const handleTagChange = (e) => {
    const selectedTags = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoutine({ ...routine, tags: selectedTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    const routineData = {
      user_id: userId,
      exercisename: routine.exercisename,
      category: routine.category,
      tags: routine.tags,
      sets: routine.sets,
      reps: routine.reps,
      weight: routine.weight,
      notes: routine.notes,
      dateTime: new Date(),
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/workout/add",
        routineData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Routine added successfully");
    } catch (error) {
      console.error("Error:", error.response?.data || error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Add Workout Routine
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Exercise Name:
          </label>
          <input
            type="text"
            name="exercisename"
            value={routine.exercisename}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter exercise name"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Category:
          </label>
          <select
            name="category"
            value={routine.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Tags:</label>
          <select
            name="tags"
            multiple
            value={routine.tags}
            onChange={handleTagChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            {tags.map((tag) => (
              <option key={tag._id} value={tag._id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-3">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Enter Sets:
            </label>
            <input
              type="number"
              name="sets"
              value={routine.sets}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter sets"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Enter Reps:
            </label>
            <input
              type="number"
              name="reps"
              value={routine.reps}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter reps"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">
              Enter Weight:
            </label>
            <input
              type="number"
              name="weight"
              value={routine.weight}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter weight"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Enter Notes:
          </label>
          <textarea
            name="notes"
            value={routine.notes}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Additional notes"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Save Routine
        </button>
      </form>
    </div>
  );
};

export default AddRoutine;
