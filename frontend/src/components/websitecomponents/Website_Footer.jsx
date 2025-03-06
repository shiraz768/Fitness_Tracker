import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Website_Footer = () => {
  return (
    <>
      <div className="bg-black flex w-[100%] text-center text-white justify-center items-center space-x-3 px-5 py-10">
        <div className="w-[35%] flex flex-col justify-center items-center">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 512 512"
            className="text-amber-300 text-2xl animate-pulse group-hover:scale-105 duration-200"
            height="5em"
            width="5em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M352 280H160c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h192c4.4 0 8 3.6 8 8v32c0 4.4-3.6 8-8 8zM378 362V150c0-12.1 9.9-22 22-22s22 9.9 22 22v212c0 12.1-9.9 22-22 22s-22-9.9-22-22zM460 192h-12c-4.4 0-8 3.6-8 8v112c0 4.4 3.6 8 8 8h12c11 0 20-9 20-20v-88c0-11-9-20-20-20zM134 362V150c0-12.1-9.9-22-22-22s-22 9.9-22 22v212c0 12.1 9.9 22 22 22s22-9.9 22-22zM64 192H52c-11 0-20 9-20 20v88c0 11 9 20 20 20h12c4.4 0 8-3.6 8-8V200c0-4.4-3.6-8-8-8z"></path>
          </svg>
          <p className="text-4xl">Fitness Tracker</p>
        </div>
        <div className="w-[35%] py-5">
          <ul className="flex flex-col justify-center items-center text-white space-y-4">
            <li>Home</li>
            <li>About Us </li>
            <li>Excercise</li>
            <li>Feedback</li>
          </ul>
        </div>
        <div className="w-[35%] ">
          <p className="text-2xl text-white">Follow us on</p>
          <div className=" flex space-x-5 justify-center items-center my-5">
          <FaFacebook />
          <FaTwitter />
          <FaSquareInstagram />
          </div>
        </div>
      </div>
    </>
  );
};

export default Website_Footer;
