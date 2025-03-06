import React from "react";

const AddRoutine = () => {
  return (
    <>
      <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Add Workout Routine
        </h2>

        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Exercise Name:
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter exercise name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">
            Category:
          </label>
         <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none">
            <option value="">
                Select Category
            </option>
         </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Enter Sets:</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your sets"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
        Enter Reps:
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your reps"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Enter Weight:
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter your weight"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">
            Enter Notes:
          </label>
          <textarea className="w-full p-3 border  border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" ></textarea>
        </div>

        {/* Save Button */}
        <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300">
          Save Changes
        </button>
      </div>
    </>
  );
};

export default AddRoutine;
