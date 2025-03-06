import React from "react";

const UserSettings = () => {
  return (
    <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
 
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">User Settings</h2>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Username</label>
        <input 
          type="text" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          placeholder="Enter your username"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Email</label>
        <input 
          type="email" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          placeholder="Enter your email"
        />
      </div>

  
      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-1">Change Password</label>
        <input 
          type="password" 
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none" 
          placeholder="Enter new password"
        />
      </div>

 
      <button className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300">
        Save Changes
      </button>
    </div>
  );
};

export default UserSettings;
