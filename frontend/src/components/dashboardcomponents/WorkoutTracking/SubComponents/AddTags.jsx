import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

const AddTag = ({setSelectedPage}) => {
  const [tag, setTag] = useState({ name: "", description: "" });

  const handleChange = (e) => {
    setTag({ ...tag, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    try {
      const categoryResponse = await axios.get("http://localhost:5000/api/categories");
      const categories = categoryResponse.data;

      if (!categories.length) {
        toast.dark("No categories found. Please create a category first.",{style:{backgroundColor:"rebeccapurple",color:"white"}});
        setTag({name:"",description:""})
        
        return;
      }

      const categoryId = categories[0]._id; 

      
      await axios.post("http://localhost:5000/api/tags/add", {
        name: tag.name,
        user_id: userId,
        category: categoryId,
        description: tag.description,
        createdBy: userId, 
      });

      toast.success("Tag added successfully!");
      setTag({ name: "", description: "" }); 
      setSelectedPage("AddMoreTag")
    } catch (error) {
      console.error("Error adding tag:", error.response?.data || error.message);
      alert("Failed to add tag. Please try again.");
    }
  };

  return (
    <div className="w-[80%] md:w-[50%] mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Add Tag
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          name="name"
          placeholder="Tag Name"
          value={tag.name}
          onChange={handleChange}
          required
          className="w-full p-3 border-2 border-gray-100 focus:border-teal-900 rounded-lg outline-none text-gray-800"
        />

        <textarea
          name="description"
          placeholder="Description (Optional)"
          value={tag.description}
          onChange={handleChange}
          className="w-full p-3 border-2 border-gray-100 focus:border-teal-900 rounded-lg outline-none text-gray-800"
        />

        <button
          type="submit"
          className={`w-full bg-teal-700 text-white font-semibold py-3 rounded-lg hover:bg-teal-900 transition `}
        >
          Add Tag
        </button>
      </form>
    </div>
  );
};

export default AddTag;
