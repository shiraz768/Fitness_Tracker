import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

const Website_Footer = () => {
  return (
    <footer className="bg-black text-white px-5 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-around items-center space-y-8 md:space-y-0">
        <div className="w-full md:w-[35%] flex flex-col justify-center items-center">
          <div className="navLogo flex justify-center items-center">
            {/* <img src="./logo.jpg" alt="" height={40} width={40} /> */}
            <span className="text-6xl font-bold text-blue-500">𝓕</span>
            <p className="italic">
              it{" "}
              <span className="font-bold text-xl text-blue-500">Tracker</span>
            </p>
          </div>
        </div>

        <div className="w-full md:w-[35%] py-5">
          <ul className="flex flex-col justify-center items-center space-y-4">
            <li>Home</li>
            <li>About Us</li>
            <li>Excercise</li>
            <li>Feedback</li>
          </ul>
        </div>

        <div className="w-full md:w-[35%] flex flex-col justify-center items-center">
          <p className="text-2xl">Follow us on</p>
          <div className="flex space-x-5 justify-center items-center my-5">
            <FaFacebook />
            <FaTwitter />
            <FaSquareInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Website_Footer;
