import React, { useEffect, useState } from "react";
import axios from "axios";

const AddMoreCategory = ({ setSelectedPage }) => {
  const [categories, setCategories ] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  useEffect(() => {
      const fetchCategories = async () => {
        try {
          const userId = localStorage.getItem("userId"); // ✅ Ensure userId is retrieved
          if (!userId) {
            throw new Error("User ID is missing. Please log in.");
          }
  
          const response = await axios.get(
            `http://localhost:5000/api/categories?user_id=${userId}`
          );
  
          setCategories(response.data); // ✅ Axios automatically parses JSON
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCategories();
    }, []);
  return (
    <>
      <div className="shadow-lg mt-10 p-3 w-[60%] mx-auto rounded">
        <p className="text-3xl font-semibold">Workout Routines</p>
        <div className="flex justify-between items-center pt-3">
          <input
            type="search"
            className="p-2 border border-gray-300 rounded px-3 focus:border-blue-900 focus:outline-none"
            placeholder="Search..."
          />
          <button  className="p-2 text-white bg-green-500 rounded"
          onClick={() => setSelectedPage("AddCategory")} 
          >
            Add Category
          </button>
        </div>
        <div>
        <table className="w-full mt-10 border border-gray-300">
  <thead>
    
    <tr className="bg-gray-300 p-3 text-center border-none">
      <th className="p-3">Category Name</th>
      <th className="p-3">Actions</th>
    </tr>
  </thead>
  <tbody>
  {categories.map((item) => (
    <tr key={item._id} className="p-3 text-center"> 
      <td className="p-3">{item.name}</td>
      <td className="p-3 flex justify-center space-x-3">
        <button className="px-3 text-blue-500 hover:underline">Edit</button>
        <button className="px-3 text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  ))}
</tbody>

</table>

        </div>
      </div>
    </>
  );
};

export default AddMoreCategory;
