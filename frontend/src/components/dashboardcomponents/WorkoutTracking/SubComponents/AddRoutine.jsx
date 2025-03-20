import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa"; 
import { toast } from "react-toastify";

const AddRoutine = ({ setSelectedPage, editData }) => {
  const [routine, setRoutine] = useState({
    exercisename: "",
    category: "",
    tags: [],
    sets: "",
    reps: "",
    weight: "",
    duration: "",
    caloriesBurned: "",
    notes: "",
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    if (editData) {
      console.log(editData)
      setRoutine(editData);
    }
  }, [editData]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
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
    const selectedTags = Array.from(e.target.selectedOptions, (option) => option.value);
    setRoutine({ ...routine, tags: selectedTags });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setError("User ID is missing! Please log in.");
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
      duration: routine.duration,
      caloriesBurned: routine.caloriesBurned,
      notes: routine.notes,
      dateTime: editData ? routine.dateTime : new Date(),
    };

    try {
      setLoading(true);
      if (editData) {
        await axios.put(`http://localhost:5000/api/workout/${editData._id}`, routineData, {
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Routine updated successfully!");
        setSelectedPage("AddWorkout");
      } else {
        await axios.post("http://localhost:5000/api/workout/add", routineData, {
          headers: { "Content-Type": "application/json" },
        });
        toast.success("Routine Added Successfully");
        setSelectedPage("AddWorkout");
        setRoutine({
          exercisename: "",
          category: "",
          tags: [],
          sets: "",
          reps: "",
          weight: "",
          duration: "",
          caloriesBurned: "",
          notes: "",
        });
      }
   
    } catch (error) {
      toast.error("Error:", error.response?.data || error);
      setError("Failed to save routine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        {editData ? "Edit Workout" : "Add Workout"}
      </h2>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Exercise Name:</label>
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
          <label className="block text-gray-700 font-medium mb-1">Category:</label>
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

        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "sets", label: "Sets" },
            { name: "reps", label: "Reps" },
            { name: "weight", label: "Weight (kg)" },
            { name: "duration", label: "Duration (mins)" },
            { name: "caloriesBurned", label: "Calories Burned" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium mb-1">{field.label}:</label>
              <input
                type="number"
                name={field.name}
                value={routine[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder={`Enter ${field.label}`}
                required
              />
            </div>
          ))}
        </div>

     
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Enter Notes:</label>
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
          className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          disabled={loading}
        >
          <FaSave className="mr-2" />
          {loading ? "Saving..." : editData ? "Update Routine" : "Save Routine"}
        </button>
      </form>
    </div>
  );
};

export default AddRoutine;
