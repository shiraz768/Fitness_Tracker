import React from "react";

const AddMoreTag = () => {
  return (
    <>
      <div className="mt-20 shadow-lg w-[70%] mx-auto rounded ">
        <div className="p-4">
          <p className="text-2xl py-2 px-2 font-bold">Tags List</p>
          <div className="py-4 flex justify-around">
            <input
              type="search"
              placeholder="search..."
              className="py-2 px-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center space-x-1">
              <p>Filter by</p>
              <select className="p-2 border border-gray-300 rounded focus:outline-none">
                <option value="all">All Categories</option>
              </select>
            </div>
            <button className="p-2 text-white bg-green-500 rounded">
              Add Tag
            </button>
          </div>
          <div className='flex justify-center mt-4'>
        <button
         
        >
          Prev
        </button>
        <span className='p-2'>1/2</span>
        <button
       
        >
          Next
        </button>
      </div>
        </div>
      </div>
    </>
  );
};

export default AddMoreTag;
