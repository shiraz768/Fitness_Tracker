import axios from "axios";
import { useEffect, useState } from "react";

const AddTag = () => {
  const [userId, setUserId] = useState(null);
  const [tag, setTag] = useState({ name: "", description: "" });

  useEffect(() => {
    // Fetch user from local storage (assuming it's stored after login)
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleChange = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user._id : null;
  
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/api/tags/add", {
        name: tag.name,
        description: tag.description,
        createdBy: userId, // Ensure user ID is included
      });
  
      console.log(response.data);
      alert("Tag added successfully!");
    } catch (error) {
      console.error("Error adding tag:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Add Tag</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Tag Name" onChange={handleChange} required className="w-full p-3 border mb-4" />
        <textarea name="description" placeholder="Description (Optional)" onChange={handleChange} className="w-full p-3 border mb-4"></textarea>
        <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded">Add Tag</button>
      </form>
    </div>
  );
};

export default AddTag;
