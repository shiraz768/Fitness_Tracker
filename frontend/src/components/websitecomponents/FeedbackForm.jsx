import React from "react";

const FeedbackForm = () => {
  return (
    <>
      <div className="feedback-form w-full">
        <form
          className="w-full sm:w-4/5 md:w-1/2 lg:w-1/3 mx-auto mt-10 px-6 py-10"
          data-aos="fade-up"
        >
          <p className="font-bold text-white text-3xl mb-10 text-center">
            Feedback
          </p>
          <label className="text-white block mb-2">Enter your name</label>
          <input
            type="text"
            className="w-full focus:outline-none border-b-2 border-white text-white focus:border-b-blue-500 mb-10 bg-transparent"
          />
          <label className="text-white block mb-2">Enter your Email</label>
          <input
            type="text"
            className="w-full focus:outline-none border-b-2 border-white text-white focus:border-b-blue-500 mb-10 bg-transparent"
          />
          <label className="text-white block mb-2">Enter your phone number</label>
          <input
            type="text"
            className="w-full focus:outline-none border-b-2 border-white text-white focus:border-b-blue-500 mb-10 bg-transparent"
          />
          <label className="text-white block mb-2">Feedback</label>
          <textarea
            className="w-full focus:outline-none border-b-2 border-white text-white focus:border-b-blue-500 resize-none h-20 mb-3 bg-transparent"
          ></textarea>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">
            Send Feedback
          </button>
        </form>
      </div>
    </>
  );
};

export default FeedbackForm;
