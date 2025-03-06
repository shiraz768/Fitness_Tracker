import React from "react";

const FeedbackForm = () => {
  return (
    <>
      <div className="feedback-form w-[100%]">
        <form className="w-[30%] mx-auto mt-10 px-14 py-20 " data-aos="fade-up">
          <p className="font-bold text-white text-3xl mb-10 text-center">
            Feedback
          </p>
          <label htmlFor="" className="text-white ">Enter your name</label>
          <input
            type="text"
            className="w-[100%] focus:outline-none  border-b-2 border-bottom text-white  focus:border-b-blue-500 mb-10"
          />
          <label htmlFor=""  className="text-white">Enter your Email </label>
          <input
            type="text"
            className="w-[100%]  focus:outline-none  border-b-2 border-bottom text-white  focus:border-b-blue-500  mb-10"
          />
          <label htmlFor=""  className="text-white">Enter your phone number</label>
          <input
            type="text"
            className="w-[100%]  focus:outline-none  border-b-2 border-bottom text-white  focus:border-b-blue-500  mb-10"
          />
          <label htmlFor=""  className="text-white">Feedback </label>
          <textarea className="w-[100%] focus:outline-none  border-b-2 border-bottom  text-white focus:border-b-blue-500 resize-none h-20 mb-3"></textarea>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Send Feedback
          </button>
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;
