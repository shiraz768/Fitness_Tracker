import React, { useEffect, useState } from 'react'
import axios from "axios"
const AddMeal = () => {
  const [mealType,setMealType] = useState("");
  const handleMeal = async (e) => {
    e.preventDefault();
    
    const user_Id = localStorage.getItem("userId");
   
   
    if (!user_Id) {
      alert("User not found. Please log in.");
      return;
    }
  
    const mealTypeData = { mealtypename: mealType, user_Id };
  
    try {
      await axios.post("http://localhost:5000/api/mealtypes/add", mealTypeData);
      alert("Meal Type added successfully!");
      setMealType("");
    } catch (error) {
      console.error("Error adding meal type:", error);
      alert("Failed to add meal type.");
    }
  };
  
  
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg text-center shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Meal Type</h2>
      <form onSubmit={handleMeal}>
        <input
          type="text"
        value={mealType}
        onChange={(e)=>{setMealType(e.target.value)}}
          placeholder="Meal Type Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
          className="`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors cursor-pointer"
        >
            Add Meal
        </button>
      </form>
   
    </div>
    </>
  )
}

export default AddMeal