import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddNutrition = ({ setSelectedPage, editData }) => {
  const [mealTypes, setMealTypes] = useState([]); 
  const [selectedMealType, setSelectedMealType] = useState(""); 
  const [userId, setUserId] = useState(""); 
  const [formData, setFormData] = useState({
    nutritionname: "",
    quantity: "",
    calories: "",
    carbohydrates: "",
    protein: "",
    fat: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mealtypes")
      .then((res) => setMealTypes(res.data))
      .catch((err) => console.error("Error fetching meal types:", err));

    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);


  useEffect(() => {
    if (editData) {
     
      setFormData({
        nutritionname: editData.nutritionname || "",
        quantity: editData.quantity || "",
        calories: editData.calories || "",
        carbohydrates: editData.carbohydrates || "",
        protein: editData.protein || "",
        fat: editData.fat || "",
      });
      if (editData.mealType_Id) {
        setSelectedMealType(editData.mealType_Id);
      }
    }
  }, [editData]);
 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMealTypeChange = (e) => {
    setSelectedMealType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMealType || !userId) {
      alert("Please select a meal type and ensure you are logged in.");
      return;
    }

    const nutritionData = { 
      ...formData, 
      mealType_Id: selectedMealType, 
      user_Id: userId 
    };

    console.log("Submitting nutrition data:", nutritionData);

    try {
      if (editData) {
    
        await axios.put(`http://localhost:5000/api/nutrition/${editData._id}`, nutritionData);
        toast.success("Nutrition updated successfully!");
        setSelectedPage("Nutrition");
      } else {
     
        await axios.post("http://localhost:5000/api/nutrition/add", nutritionData);
        toast.success("Nutrition added successfully!");
      }
      setSelectedPage("Nutrition");
    } catch (error) {
      console.error("Error adding/updating nutrition:", error);
      alert(error.response?.data?.message || "Failed to save nutrition.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold mb-6  text-gray-800 text-center">
          {editData ? "Edit Nutrition Tracker" : "Add Nutrition Tracker"}
        </h1>

        <label className="block mb-4">
          <span className="text-gray-700">Meal Type:</span>
          <select
            name="mealType"
            value={selectedMealType}
            onChange={handleMealTypeChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Meal Type</option>
            {mealTypes.map((meal) => (
              <option key={meal._id} value={meal._id}>
                {meal.mealtypename}
              </option>
            ))}
          </select>
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="nutritionname"
            value={formData.nutritionname}
            onChange={handleChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Quantity:</span>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Calories:</span>
          <input
            type="number"
            name="calories"
            value={formData.calories}
            onChange={handleChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Carbohydrates:</span>
          <input
            type="number"
            name="carbohydrates"
            value={formData.carbohydrates}
            onChange={handleChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Proteins:</span>
          <input
            type="number"
            name="protein"
            value={formData.protein}
            onChange={handleChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <label className="block mb-6">
          <span className="text-gray-700">Fats:</span>
          <input
            type="number"
            name="fat"
            value={formData.fat}
            onChange={handleChange}
            className="block w-full mt-1 border text-gray-800 border-gray-300 rounded px-3 py-2"
            required
          />
        </label>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-800"
        >
          {editData ? "Update Nutrition" : "Add Nutrition"}
        </button>
      </form>
    </div>
  );
};

export default AddNutrition;