import React from 'react'

const AddMeal = () => {
  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Meal Type</h2>
      <form >
        <input
          type="text"
        
          placeholder="Meal Type Name"
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          type="submit"
      
          className="`w-full bg-blue-500 text-white py-2 px-4 rounded-lg transition-colors"
        >
            Submit
        </button>
      </form>
   
    </div>
    </>
  )
}

export default AddMeal