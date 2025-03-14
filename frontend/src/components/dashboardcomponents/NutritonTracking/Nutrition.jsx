import React, { useState } from "react";

const Nutrition = ({ setSelectedPage}) => {
  const data = [
    {
      id: 1,
      mealType: "Breakfast",
      foodItems: "Oatmeal, Banana",
      quantity: "1 bowl",
      calories: 250,
      carbs: "45g",
      proteins: "8g",
      fats: "5g",
      createdAt: "2024-03-01",
      updatedAt: "2024-03-02",
    },
    {
      id: 2,
      mealType: "Lunch",
      foodItems: "Grilled Chicken, Rice",
      quantity: "200g",
      calories: 500,
      carbs: "60g",
      proteins: "40g",
      fats: "10g",
      createdAt: "2024-03-02",
      updatedAt: "2024-03-02",
    },
    {
      id: 3,
      mealType: "Dinner",
      foodItems: "Salmon, Vegetables",
      quantity: "150g",
      calories: 400,
      carbs: "30g",
      proteins: "35g",
      fats: "15g",
      createdAt: "2024-03-03",
      updatedAt: "2024-03-04",
    },
    {
      id: 4,
      mealType: "Snack",
      foodItems: "Almonds, Yogurt",
      quantity: "100g",
      calories: 300,
      carbs: "20g",
      proteins: "10g",
      fats: "20g",
      createdAt: "2024-03-04",
      updatedAt: "2024-03-05",
    },
    {
      id: 5,
      mealType: "Post-Workout",
      foodItems: "Protein Shake",
      quantity: "1 scoop",
      calories: 200,
      carbs: "15g",
      proteins: "25g",
      fats: "2g",
      createdAt: "2024-03-05",
      updatedAt: "2024-03-06",
    },
    {
      id: 6,
      mealType: "Post-Workout",
      foodItems: "Protein Shake",
      quantity: "1 scoop",
      calories: 200,
      carbs: "15g",
      proteins: "25g",
      fats: "2g",
      createdAt: "2024-03-05",
      updatedAt: "2024-03-06",
    },
  ];

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filteredData = data
    .filter(
      (item) =>
        search === "" ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(search.toLowerCase())
        )
    )
    .filter(
      (item) =>
        filter === "all" || item.mealType.toLowerCase() === filter.toLowerCase()
    );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="mt-20 shadow-lg text-center rounded w-[90%] mx-auto p-4">
      <p className="text-3xl mb-4">Nutrition List</p>

      <div className="py-3 flex flex-col md:flex-row items-center justify-evenly gap-3">
        <input
          type="search"
          placeholder="Search..."
          className="px-2 py-2 w-full md:w-auto rounded border border-gray-300 focus:outline-none focus:border-teal-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="px-2 py-2 w-full md:w-auto rounded border border-gray-300 focus:outline-none focus:border-teal-500"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Filter By Meal Type</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
          <option value="Post-Workout">Post-Workout</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center md:justify-evenly gap-3 my-3">
        <button className="px-3 py-2 bg-green-600 text-white rounded"
        onClick={()=> setSelectedPage("AddNutrition")}
        >
          Add Nutrition
        </button>
        <button className="px-3 py-2 bg-indigo-600 text-white rounded">
          Export PDF
        </button>
        <button className="px-3 py-2 bg-cyan-600 text-white rounded">
          Export CSV
        </button>
      </div>
    <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-cyan-950 text-white">
              <th className="p-2">ID</th>
              <th className="p-2">Meal Type</th>
              <th className="p-2">Food Items</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Calories</th>
              <th className="p-2">Carbs</th>
              <th className="p-2">Proteins</th>
              <th className="p-2">Fats</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Updated At</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-100 border-b">
                <td className="p-2">{item.id}</td>
                <td className="p-2">{item.mealType}</td>
                <td className="p-2">{item.foodItems}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">{item.calories}</td>
                <td className="p-2">{item.carbs}</td>
                <td className="p-2">{item.proteins}</td>
                <td className="p-2">{item.fats}</td>
                <td className="p-2">{item.createdAt}</td>
                <td className="p-2">{item.updatedAt}</td>
                <td className="p-2">
                  <button className="px-2 py-1 bg-yellow-500 text-white rounded mr-2">
                    Edit
                  </button>
                  <button className="px-2 py-1 bg-red-600 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-center mt-4 gap-3">
        <button
          className={`px-3 py-2 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="p-2">
          {currentPage} / {totalPages}
        </span>
        <button
          className={`px-3 py-2 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "bg-blue-500 text-white"}`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Nutrition;
