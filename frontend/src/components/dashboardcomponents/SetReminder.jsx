import React from "react";

const SetReminder = () => {
  return (
    <>
      <div className="mt-20 p-5 shadow-md w-[70%] rounded mx-auto">
        <p className="text-2xl text-center">Fitness Notification For Alerts</p>
        <div className="p-5">
          <select className="py-2 w-[23%] px-3 border-2 rounded-lg border-gray-300 focus:outline-none focus:border-blue-500 block mx-auto">
            <option value="">Workout</option>
            <option value="">Meal</option>
          </select>
          <input
            type="datetime-local"
            className="block mx-auto py-3 px-2 mt-5 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
          <button className="text-center mt-5 bg-blue-500 text-white p-3 rounded block mx-auto">
            Set Reminder
          </button>
        </div>
        <div className="">
          <p className="text-center font-bold">Add Your fitness Goal</p>
          <div className="flex justify-center space-x-2 items-center mt-5">
            <input type="text" className="py-2 px-2  border border-gray-300 rounded focus:outline-none focus:border-blue-500 "/>
            <button className="p-2 bg-blue-500 text-white rounded">Add Goal</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SetReminder;
