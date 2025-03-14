import React from 'react'

const AddNutrition = () => {
  return (
   <>
   <div className="container mx-auto px-4 py-8">
     
      
      <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center"> Add Nutrition Tracker</h1>
        <label className="block mb-4">
          <span className="text-gray-700">Meal Type:</span>
          <select
            name="mealType"
      
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">Select Meal Type</option>
         
          </select>
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Name:</span>
          <input
            type="text"
            name="name"
          
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Quantity:</span>
          <input
            type="text"
            name="quantity"
        
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Calories:</span>
          <input
            type="number"
            name="calories"
        
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Carbohydrates:</span>
          <input
            type="number"
            name="carbohydrates"
         
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Proteins:</span>
          <input
            type="number"
            name="proteins"
      
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Fats:</span>
          <input
            type="number"
            name="fats"
       
            className="block w-full mt-1 border border-gray-300 rounded px-3 py-2"
            required
          />
        </label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"

        >
          Add Nutrition 
        </button>
      </form>
      
    </div>
  
   </>
  )
}

export default AddNutrition