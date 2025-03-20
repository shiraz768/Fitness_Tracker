import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSave, FaPlusCircle, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const CreateProgress = ({ setSelectedPage, editData }) => {
  const [progress, setProgress] = useState({
    weight: "",
    chest: "",
    waist: "",
    hips: "",
    runTime: "",
    benchPress: "",
    squat: "",
    deadLift: "",
    date: new Date().toISOString().split("T")[0], 
    exerciseProgress: [], 
  });

  const [exercise, setExercise] = useState({
    exerciseName: "",
    weightUsed: "",
    repsCompleted: "",
  });

  const navigate = useNavigate();

 
  useEffect(() => {
    if (editData) {
      setProgress({
        weight: editData.weight || "",
        chest: editData.chest || "",
        waist: editData.waist || "",
        hips: editData.hips || "",
        runTime: editData.runTime || "",
        benchPress: editData.benchPress || "",
        squat: editData.squat || "",
        deadLift: editData.deadLift || "",
        date: editData.date
          ? new Date(editData.date).toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        exerciseProgress: editData.exerciseProgress || [],
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setProgress({ ...progress, [e.target.name]: e.target.value });
  };

  const handleExerciseChange = (e) => {
    setExercise({ ...exercise, [e.target.name]: e.target.value });
  };

  
  const addExercise = () => {
    if (!exercise.exerciseName || !exercise.weightUsed || !exercise.repsCompleted) {
      toast.error("Please fill in all exercise fields before adding.");
      return;
    }

    setProgress({
      ...progress,
      exerciseProgress: [...progress.exerciseProgress, exercise],
    });

    setExercise({ exerciseName: "", weightUsed: "", repsCompleted: "" });
  };


  const removeExercise = (index) => {
    const updatedExercises = [...progress.exerciseProgress];
    updatedExercises.splice(index, 1);
    setProgress({ ...progress, exerciseProgress: updatedExercises });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    if (!userId) {
      toast.error("User ID is missing. Please log in.");
      return;
    }

    const progressData = {
      ...progress,
      user_id: userId,
      exerciseProgress: progress.exerciseProgress,
    };

    try {
      if (editData) {
   
        await axios.put(`http://localhost:5000/api/progress/${editData._id}`, progressData);
        toast.success("Progress updated successfully!");
      } else {
    
        await axios.post("http://localhost:5000/api/progress/add", progressData);
        toast.success("Progress added successfully!");
      }
      setSelectedPage("ProgressTracking");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Error saving progress. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      {/* <ToastContainer /> */}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        {editData ? "Edit Progress" : "Add Progress"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          {[
            { name: "weight", label: "Weight (kg)" },
            { name: "chest", label: "Chest (cm)" },
            { name: "waist", label: "Waist (cm)" },
            { name: "hips", label: "Hips (cm)" },
            { name: "runTime", label: "Run Time (min)" },
            { name: "benchPress", label: "Bench Press (kg)" },
            { name: "squat", label: "Squat (kg)" },
            { name: "deadLift", label: "Deadlift (kg)" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-gray-700 font-medium mb-1">
                {field.label}:
              </label>
              <input
                type="number"
                name={field.name}
                value={progress[field.name]}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                placeholder={`Enter ${field.label}`}
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Date:</label>
            <input
              type="date"
              name="date"
              value={progress.date}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

    
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Exercise Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                name="exerciseName"
                value={exercise.exerciseName}
                onChange={handleExerciseChange}
                placeholder="Exercise Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="weightUsed"
                value={exercise.weightUsed}
                onChange={handleExerciseChange}
                placeholder="Weight (kg)"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="number"
                name="repsCompleted"
                value={exercise.repsCompleted}
                onChange={handleExerciseChange}
                placeholder="Reps"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <button
              type="button"
              onClick={addExercise}
              className="mt-3 w-full flex items-center justify-center bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition"
            >
              <FaPlusCircle className="mr-2" />
              Add Exercise
            </button>
          </div>

       
          {progress.exerciseProgress.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Added Exercises:</h3>
              <ul className="bg-gray-100 p-3 rounded-lg">
                {progress.exerciseProgress.map((ex, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center mb-2 bg-white p-2 rounded shadow"
                  >
                    <span>
                      {ex.exerciseName} - {ex.weightUsed}kg x {ex.repsCompleted} reps
                    </span>
                    <button
                      type="button"
                      onClick={() => removeExercise(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <FaSave className="mr-2" />
            {editData ? "Update Progress" : "Save Progress"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProgress;
