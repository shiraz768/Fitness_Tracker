import React from 'react'

const MealType = ({setSelectedPage}) => {
  return (
    <>
    <div className="shadow-lg mt-10 p-3 w-[60%] mx-auto rounded">
        <p className="text-3xl font-semibold text-center">Meal Type List</p>
        <div className="flex justify-between items-center pt-3">
          <input
            type="search"
            className="p-2 border border-gray-300 rounded px-3 focus:border-blue-900 focus:outline-none"
            placeholder="Search..."
          />
          <button className="p-2 text-white bg-green-500 rounded"
          onClick={()=>{setSelectedPage("AddMeal")}}
          >
            Add Meal
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
    <tr className=" p-3 text-center">
      <td className="p-3">hfjkhfk</td>
      <td className="p-3 flex justify-center space-x-3">
        <button className="px-3 text-blue-500 hover:underline">Edit</button>
        <button className="px-3 text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  </tbody>
</table>

        </div>
      </div>
    </>
  )
}

export default MealType